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
const getNodeName = require('../util/getNodeName');

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
    function checkForViolation(node) {
      const expression = astUtil.getComponentProperties(node);

      if (expression.type === 'AssignmentExpression') {
        if (expression.left.type === 'MemberExpression') {
          // check if property of window is location
          if (
            expression.left.object &&
            expression.left.object.name === 'window' &&
            expression.left.property &&
            expression.left.property.name === 'location' &&
            (expression.right.type === 'Literal' ||
              expression.right.type === 'Identifier' ||
              (expression.right.type === 'CallExpression' &&
                expression.right.callee.type === 'Identifier' &&
                config.wrapperName.indexOf(expression.right.callee.name) === -1))
          ) {
            context.report({
              node: node,
              message: `ERROR - ${getNodeName(node)} has violation code(s) : XSS attack : ${astUtil.getPropertyName(
                expression.left
              )}`
            });

            return;
          }
          // check if property of window is hash
          else if (
            expression.left.object.object &&
            expression.left.object.object.name === 'window' &&
            expression.left.object.property &&
            expression.left.object.property.name === 'location' &&
            expression.left.property.name === 'hash' &&
            (expression.right.type === 'Literal' ||
              expression.right.type === 'Identifier' ||
              (expression.right.type === 'CallExpression' &&
                expression.right.callee.type === 'Identifier' &&
                config.wrapperName.indexOf(expression.right.callee.name) === -1))
          ) {
            context.report({
              node: node,
              message: `ERROR - ${getNodeName(node)} has violation code(s) : XSS attack : ${astUtil.getPropertyName(
                expression.left
              )}`
            });

            return;
          }
        }
      }
      // check if property of window is location.assign
      else if (
        expression.type === 'CallExpression' &&
        expression.callee.object &&
        expression.callee.object.object &&
        expression.callee.object.object.name === 'window' &&
        expression.callee.object.property.name === 'location' &&
        expression.callee.property.name === 'assign' &&
        (expression.arguments[0].type === 'Literal' ||
          expression.arguments[0].type === 'Identifier' ||
          (expression.arguments[0].type === 'CallExpression' &&
            expression.arguments[0].callee.type === 'Identifier' &&
            config.wrapperName.indexOf(expression.arguments[0].callee.name) === -1))
      ) {
        context.report({
          node: node,
          message: `ERROR - ${getNodeName(node)} has violation code(s) : XSS attack : ${astUtil.getPropertyName(
            expression.callee
          )}`
        });

        return;
      }

      return;
    }

    return {
      ExpressionStatement: checkForViolation
    };
  }
};
