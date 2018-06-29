/**
 * @fileoverview Restrict the use of methods.
 *               Inspired by https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
 * @author Donghyuk Jang
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');
const astUtil = require('../util/ast');
const composeConfig = require('../util/composeConfig');
const getNodeName = require('../util/getNodeName');

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const DEPRECATED_LIFECYCLE = ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate'];

const DEFAULT_CONFIG = {
  forbiddenMethods: []
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Restrict the use of methods',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-methods')
    },
    schema: [
      {
        type: 'object',
        properties: {
          forbiddenMethods: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: Components.detect((context, components, utils) => {
    const config = composeConfig(DEFAULT_CONFIG, context.options[0]);

    /**
     * Checks for forbidden method(s) property
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} Whether or not the property exists.
     */
    function hasForbiddenMethod(node) {
      const properties = astUtil.getComponentProperties(node);

      return properties.find(property => {
        const name = astUtil.getPropertyName(property);
        return DEPRECATED_LIFECYCLE.indexOf(name) >= 0 || config.forbiddenMethods.indexOf(name) >= 0;
      });
    }

    /**
     * Checks for violation of rule
     * @param {ASTNode} node The AST node being checked.
     */
    function checkForViolation(node) {
      const property = hasForbiddenMethod(node);

      if ((utils.isES5Component(node) || utils.isES6Component(node)) && typeof property === 'object') {
        context.report({
          node: node,
          message: `ERROR - ${getNodeName(node)} has forbidden method ${astUtil.getPropertyName(property)}`
        });
      }
    }

    return {
      ClassExpression: checkForViolation,
      ClassDeclaration: checkForViolation,
      ObjectExpression: checkForViolation
    };
  })
};
