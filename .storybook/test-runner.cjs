const { toMatchImageSnapshot } = require('jest-image-snapshot');

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async prepare({ page, browserContext, testRunnerConfig }) {
    // ? Reference: https://github.com/storybookjs/test-runner/blob/next/src/setup-page.ts#L12
    const targetURL = process.env.TARGET_URL;
    const iframeURL = new URL('iframe.html', targetURL).toString();

    if (testRunnerConfig?.getHttpHeaders) {
      const headers = await testRunnerConfig.getHttpHeaders(iframeURL);
      await browserContext.setExtraHTTPHeaders(headers);
    }

    // Add clipboard write permission
    await browserContext.grantPermissions(['clipboard-write']);

    await page.goto(iframeURL, { waitUntil: 'load' }).catch((err) => {
      if (err.message?.includes('ERR_CONNECTION_REFUSED')) {
        const errorMessage = `Could not access the Storybook instance at ${targetURL}. Are you sure it's running?\n\n${err.message}`;
        throw new Error(errorMessage);
      }

      throw err;
    });
  },
  async postRender(page, context) {
    // ? Reference: https://github.com/storybookjs/test-runner#dom-snapshot-recipe
    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler.innerHTML();
    expect(innerHTML).toMatchSnapshot();

    // ? Reference: https://github.com/storybookjs/test-runner#image-snapshot-recipe
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customDiffDir: `${customSnapshotsDir}/failed/diff`,
      customReceivedDir: `${customSnapshotsDir}/failed`,
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
      failureThreshold: 0.015,
      failureThresholdType: 'percent',
      storeReceivedOnFailure: true,
    });
  },
};
