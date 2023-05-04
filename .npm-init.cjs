/* globals package, basename, yes */
// ? Reference: https://docs.npmjs.com/creating-a-package-json-file#customizing-the-packagejson-questionnaire
const fs = require('node:fs');
const path = require('node:path');

// Get repository URL from git config
const GIT_CONFIG_PATH = path.resolve('./.git/config');
const gitConfig = fs.existsSync(GIT_CONFIG_PATH)
  ? fs.readFileSync(GIT_CONFIG_PATH, 'utf8')
  : '';
const [, repository = ''] = gitConfig.split(/(?:url = )|(?:\.git)/gm);

/**
 * Prompt user for information with optional skipping using -y & -f args
 * @param {string} message
 * @param {*} [defaultValue]
 * @param {function} [callback]
 * @returns {string}
 */
function optionalPrompt(message, defaultValue = '', callback) {
  return yes ? defaultValue : prompt(message, defaultValue, callback);
}

/**
 * Prompt user for required information
 * @param {string} message
 * @returns {string}
 */
function requiredPrompt(message) {
  return prompt(message, '', (value) => {
    return value.length
      ? value
      : Object.assign(new Error(`Please enter the ${message}`), {
          notValid: true,
        });
  });
}

// Use scope option (if given)
const [scopeArg = ''] = process.argv.filter((arg) =>
  arg.startsWith('--scope=')
);
const scope = scopeArg.replace('--scope=', '');
// Use basename global as name
const repoName = basename.toLowerCase();

module.exports = {
  // Reset name
  name: scope.length ? `${scope}/${repoName}` : repoName,
  // Reset version
  version: '0.0.0',
  // Require a description - can't be unset by init
  description: requiredPrompt('GitHub repository description'),
  // Unset keywords if they are not given
  keywords: optionalPrompt(
    'GitHub repository keywords',
    '',
    // Split keywordString on spaces or commas
    (keywordString) => keywordString.split(/[\s,]+/g)
  ),
  license: optionalPrompt('License', package?.license),
  author: optionalPrompt('Author', package?.author?.name),
  // Reset repository, bugs and homepage
  repository,
  bugs: '',
  homepage: '',
};
