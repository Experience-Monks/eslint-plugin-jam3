'use strict';

// ------------------------------------------------------------------------------
// function Definition
// ------------------------------------------------------------------------------

/**
 * Get name of node if available
 * @param {ASTNode} node The AST node being checked.
 * @return {String} The name of the node
 */
function getNodeName(node) {
  if (node.id) {
    return node.id.name;
  } else if (node.parent && node.parent.id) {
    return node.parent.id.name;
  }
  return '';
}

module.exports = getNodeName;
