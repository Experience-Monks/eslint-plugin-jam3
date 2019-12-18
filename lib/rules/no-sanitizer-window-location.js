/**
 * @fileoverview Prevent window object based XSS attack
 * @author Donghyuk (Jacob) Jang
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const astUtil = require('../util/ast');
const docsUrl = require('../util/docsUrl');
const composeConfig = require('../util/composeConfig');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

// const DANGEROUS_MESSAGES = [
//   "Dangerous property '{{name}}' without sanitizer found.",
//   "Wrapper name is not one of '{{wrapperName}}'.",
//   'Direct use of xss library found.'
// ];

const DEFAULT_CONFIG = {
  wrapperName: ['sanitizer']
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent window obejct based XSS attack',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-sanitizer-with-danger')
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    const config = composeConfig(DEFAULT_CONFIG, context.options[0]);

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    /**
     * Checks for violation of rule
     * @param {ASTNode} node The AST node being checked.
     */
    function checkForViolationWhenAssigning(node) {
      const expression = astUtil.getComponentProperties(node);

      if (
        expression.type === 'AssignmentExpression' &&
        checkWindowLocationProperty(expression.left) &&
        (expression.right.type === 'Literal' ||
          (expression.right.type === 'CallExpression' &&
            expression.right.callee.type === 'Identifier' &&
            config.wrapperName.indexOf(expression.right.callee.name) === -1))
      ) {
        return context.report({
          node: node,
          message: '',
          data: {
            name: 'window.location',
            wrapperName: JSON.stringify(config.wrapperName)
          }
        });
      } else if (
        expression.type === 'CallExpression' &&
        checkWindowLocationProperty(expression) &&
        (expression.arguments[0].type === 'Literal' ||
          (expression.arguments[0].type === 'CallExpression' &&
            expression.arguments[0].callee.type === 'Identifier' &&
            config.wrapperName.indexOf(expression.arguments[0].callee.name) === -1))
      ) {
        return context.report({
          node: node,
          message: '',
          data: {
            name: 'window.location',
            wrapperName: JSON.stringify(config.wrapperName)
          }
        });
      }

      return;
    }

    function checkForViolationWhenReading(node) {
      const declarations = astUtil.getComponentProperties(node)[0];

      if (
        declarations &&
        declarations.init &&
        ((declarations.init.type === 'MemberExpression' && checkWindowLocationProperty(declarations.init)) ||
          (declarations.init.type === 'CallExpression' &&
            checkWindowLocationProperty(declarations.init.arguments[0]) &&
            config.wrapperName.indexOf(declarations.init.callee.name) === -1))
      ) {
        return context.report({
          node: node,
          message: '',
          data: {
            name: 'window.location',
            wrapperName: JSON.stringify(config.wrapperName)
          }
        });
      }

      return;
    }

    return {
      ExpressionStatement: checkForViolationWhenAssigning,
      VariableDeclaration: checkForViolationWhenReading
    };
  }
};

function checkWindowLocationProperty(target) {
  if (
    (target.type === 'MemberExpression' &&
      target.object &&
      target.object.type === 'Identifier' &&
      target.object.name === 'window' &&
      target.property &&
      target.property.type === 'Identifier' &&
      target.property.name === 'location') ||
    (target.type === 'MemberExpression' &&
      target.object &&
      target.object.type === 'MemberExpression' &&
      target.object.object &&
      target.object.object.type === 'Identifier' &&
      target.object.object.name === 'window' &&
      target.object.property &&
      target.object.property.type === 'Identifier' &&
      target.object.property.name === 'location' &&
      ['hash', 'href', 'search', 'origin', 'host', 'hostname', 'pathname', 'search'].indexOf(target.property.name) > -1)
  ) {
    return true;
  } else if (
    target.type === 'CallExpression' &&
    target.callee &&
    target.callee.type === 'MemberExpression' &&
    target.callee.object &&
    target.callee.object.type === 'MemberExpression' &&
    target.callee.object.object &&
    target.callee.object.object.type === 'Identifier' &&
    target.callee.object.object.name === 'window' &&
    target.callee.object.property &&
    target.callee.object.property.type === 'Identifier' &&
    target.callee.object.property.name === 'location' &&
    target.callee.property &&
    target.callee.property.type === 'Identifier' &&
    target.callee.property.name === 'assign'
  ) {
    return true;
  }

  return false;
}
