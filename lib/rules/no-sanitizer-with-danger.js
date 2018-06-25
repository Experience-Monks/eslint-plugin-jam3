/**
 * @fileoverview Prevent usage of dangerous JSX props without sanitizer
 * @author Donghyuk Jang
 */
'use strict';

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------
const DANGEROUS_MESSAGE = "Dangerous property '{{name}}' without sanitizer found.";

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
 * Checks if a node name match the JSX tag convention.
 * @param {String} tag - Name of the node to check.
 * @returns {boolean} Whether or not the node name match the JSX tag convention.
 */
function isValidTag(tag) {
  return /^[a-z]|\-/.test(tag);
}

/**
 * Checks if a JSX attribute is dangerous.
 * @param {String} name - Name of the attribute to check.
 * @returns {boolean} Whether or not the attribute is dnagerous.
 */
function isDangerous(name) {
  return name in DANGEROUS_PROPERTIES;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
        if (
          isValidTag(node.parent.name.name) &&
          isDangerous(node.name.name) &&
          (node.value.expression.properties[0].value.type !== 'CallExpression' ||
            (node.value.expression.properties[0].value.type === 'CallExpression' &&
              node.value.expression.properties[0].value.callee.type !== 'Identifier') ||
            (node.value.expression.properties[0].value.callee &&
              !node.value.expression.properties[0].value.callee.name in SANITIZER_NAMES))
        ) {
          context.report({
            node: node,
            message: DANGEROUS_MESSAGE,
            data: {
              name: node.name.name
            }
          });
        }
      }
    };
  }
};
