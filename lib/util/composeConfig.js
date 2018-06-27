'use strict';

// ------------------------------------------------------------------------------
// function Definition
// ------------------------------------------------------------------------------

/**
 * Composing defaultConfig and userConfig
 * @param {Object} userConfig The user configuration.
 * @returns {Object} Composed config
 */
function composeConfig(defaultConfig, userConfig) {
  userConfig = userConfig || {};
  return Object.assign(defaultConfig, userConfig);
}

module.exports = composeConfig;
