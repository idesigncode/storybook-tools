/**
 * Set the necessary webpackFinal config settings
 * @param {Object} config
 * @returns {Promise<*>}
 */
export const webpackFinal = async (config) => {
  // ? Enable 'raw imports' for all files
  config.module.rules.map((rule) => {
    if (!rule.type || rule.type !== 'asset/source') {
      rule.resourceQuery = { not: [/raw/] };
    }
    return rule;
  });

  // ? Enable correct display of dynamic source code in production
  config.optimization.minimizer.map((minimizer) => {
    minimizer.options.minimizer.options.compress = false;
    minimizer.options.minimizer.options.format = { comments: true };
    return minimizer;
  });

  return config;
};
