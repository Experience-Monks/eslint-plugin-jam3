/**
 * @fileoverview Prevent usage of dangerous JSX props without sanitizer
 * @author Donghyuk Jang
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const docsUrl = require('../util/docsUrl');
const composeConfig = require('../util/composeConfig');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DANGEROUS_MESSAGES = [
  "Dangerous property '{{name}}' without sanitizer found.",
  "Wrapper name is not one of '{{wrapperName}}'.",
  'Direct use of xss library found.'
];

const DANGEROUS_PROPERTY_NAMES = ['dangerouslySetInnerHTML'];

const DEFAULT_CONFIG = {
  wrapperName: ['sanitizer']
};

const DANGEROUS_PROPERTIES = DANGEROUS_PROPERTY_NAMES.reduce((props, prop) => {
  props[prop] = prop;
  return props;
}, Object.create(null));

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if a JSX attribute is dangerous.
 * @param {String} name - Name of the attribute to check.
 * @returns {boolean} Whether or not the attribute is dnagerous.
 */
function isDangerous(name) {
  return name in DANGEROUS_PROPERTIES;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of dangerous JSX props without sanitizer',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-sanitizer-with-danger')
    },
    schema: [
      {
        type: 'object',
        properties: {
          wrapperName: {
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

  create: function(context) {
    const config = composeConfig(DEFAULT_CONFIG, context.options[0]);

    return {
      JSXAttribute: function(node) {
        let messageIndex = -1;

        if (isDangerous(node.name.name) && node.value.expression.properties[0].value.type !== 'CallExpression') {
          messageIndex = 0;
        } else if (
          isDangerous(node.name.name) &&
          node.value.expression.properties[0].value.type === 'CallExpression' &&
          node.value.expression.properties[0].value.callee.type === 'Identifier' &&
          config.wrapperName.indexOf(node.value.expression.properties[0].value.callee.name) === -1
        ) {
          messageIndex = 1;
        } else if (
          isDangerous(node.name.name) &&
          node.value.expression.properties[0].value.type === 'CallExpression' &&
          node.value.expression.properties[0].value.callee.type !== 'Identifier'
        ) {
          messageIndex = 2;
        }

        if (messageIndex >= 0) {
          context.report({
            node: node,
            message: DANGEROUS_MESSAGES[messageIndex],
            data: {
              name: node.name.name,
              wrapperName: JSON.stringify(config.wrapperName)
            }
          });
        }
      }
    };
  }
};
