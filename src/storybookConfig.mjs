/**
 * Set the necessary webpackFinal config settings
 * @param {Object} config
 * @returns {Promise<*>}
 */
export const webpackFinal = async (config) => {
  // Enable 'raw imports' for all files
  config.module.rules.map((rule) => {
    if (!rule.type || rule.type !== 'asset/source') {
      rule.resourceQuery = { not: [/raw/] };
    }
    return rule;
  });

  return config;
};
