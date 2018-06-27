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

const DEFAULT_CONFIG = {
  forbiddenMethods: ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate']
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

      return properties.some(property => {
        const name = astUtil.getPropertyName(property);
        return config.forbiddenMethods.indexOf(name) >= 0;
      });
    }

    /**
     * Checks for violation of rule
     * @param {ASTNode} node The AST node being checked.
     */
    function checkForViolation(node) {
      if (utils.isES6Component(node) && hasForbiddenMethod(node)) {
        context.report({
          node: node,
          message: `ERROR - ${getNodeName(node)}`
        });
      }
    }

    return {
      ClassDeclaration: checkForViolation,
      ClassExpression: checkForViolation
    };
  })
};
