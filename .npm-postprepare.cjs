'use strict';

const fsPromises = require('node:fs/promises');
const path = require('node:path');

const PACKAGE_PATH = path.resolve('./package.json');
const README_PATH = path.resolve('./README.md');

const KEYS_ORDER = [
  'name',
  'version',
  'description',
  'keywords',
  'license',
  'author',
  'repository',
  'bugs',
  'homepage',
  'engines',
  'browserslist',
  'scripts',
  'main',
  'files',
  'exports',
  // ...any unspecified keys will be added here
  'dependencies',
  'devDependencies',
  'peerDependencies',
];

/**
 * Sort an object by key
 * Keys that are not specified in `order` will be placed at the end of the object
 * If no `order` given the order will default to alphabetical sorting
 * @param {object} object - the object to be sorted
 * @param {array} [order] - an array of keys
 * @returns {{}}
 */
function sortObjectByKey(object, order) {
  return Object.keys(object)
    .sort(
      order
        ? (accumulator, key) => {
            if (!order.includes(accumulator)) {
              return 1;
            }
            if (!order.includes(key)) {
              return -1;
            }
            return order.indexOf(accumulator) - order.indexOf(key);
          }
        : undefined
    )
    .reduce((accumulator, key) => {
      return { ...accumulator, [key]: object[key] };
    }, {});
}

/**
 * Update the pkg field values
 * @param {object} pkg
 * @returns {{}}
 */
function updatePkg(pkg) {
  // Format shorthand urls
  if (pkg.repository && pkg.repository.url) {
    pkg.repository = new URL(pkg.repository.url).pathname
      .replace('/', 'github:')
      .replace('.git', '');
  }
  if (pkg.bugs && pkg.bugs.url) {
    pkg.bugs = pkg.bugs.url;
  }

  // Sort sub-keys alphabetically
  Object.keys(pkg).forEach((key) => {
    // Sort only objects, not arrays
    if (pkg[key].constructor === Object) {
      pkg[key] = sortObjectByKey(pkg[key]);
    }
  });

  // Sort pkg keys
  const { dependencies, devDependencies, peerDependencies, ...sortedPkg } =
    sortObjectByKey(pkg, KEYS_ORDER);

  return {
    ...sortedPkg,
    dependencies,
    devDependencies,
    peerDependencies,
  };
}

/**
 * Update the README.md contents
 * @param {string} description
 * @param {string} name
 * @param {string} readme
 * @returns {string}
 */
function updateReadme(description, name, readme) {
  const [, ...remainingSections] = readme.split(/(\n^#)/m);

  return [
    // Main title
    `# ${name}`,
    '',
    // First paragraph
    description,
    remainingSections.join(''),
  ].join('\n');
}

/**
 * Log file changes
 * @param {string} filename
 */
function logFileUpdate(filename) {
  // eslint-disable-next-line no-console
  return console.log(`.npm-postprepare.cjs - ${filename} updated`);
}

(async function () {
  try {
    const pkg = await fsPromises.readFile(PACKAGE_PATH, 'utf8');
    const pkgUpdated = updatePkg(JSON.parse(pkg));
    const pkgUpdatedString = `${JSON.stringify(pkgUpdated, null, 2)}\n`;
    if (pkgUpdatedString !== pkg) {
      await fsPromises.writeFile(PACKAGE_PATH, pkgUpdatedString);
      logFileUpdate('package.json');
    }

    const readme = await fsPromises.readFile(README_PATH, 'utf8');
    const readmeUpdated = updateReadme(
      pkgUpdated.description,
      pkgUpdated.name,
      readme
    );
    if (readmeUpdated !== readme) {
      await fsPromises.writeFile(README_PATH, readmeUpdated);
      logFileUpdate('readme.md');
    }
  } catch (error) {
    console.error(error);
  }
})();
