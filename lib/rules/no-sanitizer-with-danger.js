/**
 * @fileoverview Prevent usage of dangerous JSX props without sanitizer
 * @author Donghyuk Jang
 */
'use strict';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------
const DANGEROUS_MESSAGES = [
  "Dangerous property '{{name}}' without sanitizer found.",
  "Wrapper name is not 'sanitizer'.",
  'Direct use of xss library found.'
];

const DANGEROUS_PROPERTY_NAMES = ['dangerouslySetInnerHTML'];
const SANITIZER_NAMES = ['sanitizer'];

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
      recommended: false
    },
    schema: []
  },

  create: function(context) {
    return {
      JSXAttribute: function(node) {
        let messageIndex = false;

        if (isDangerous(node.name.name) && node.value.expression.properties[0].value.type !== 'CallExpression') {
          messageIndex = 0;
        } else if (
          isDangerous(node.name.name) &&
          node.value.expression.properties[0].value.type === 'CallExpression' &&
          node.value.expression.properties[0].value.callee.type === 'Identifier' &&
          SANITIZER_NAMES.indexOf(node.value.expression.properties[0].value.callee.name) === -1
        ) {
          messageIndex = 1;
        } else if (
          isDangerous(node.name.name) &&
          node.value.expression.properties[0].value.type === 'CallExpression' &&
          node.value.expression.properties[0].value.callee.type !== 'Identifier'
        ) {
          messageIndex = 2;
        }

        if (messageIndex) {
          context.report({
            node: node,
            message: DANGEROUS_MESSAGES[messageIndex],
            data: {
              name: node.name.name
            }
          });
        }
      }
    };
  }
};
