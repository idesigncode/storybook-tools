import { expect } from '@storybook/jest';
import exampleFunction from '../src/exampleFunction.mjs';

export default {
  title: 'exampleFunction',
  component: exampleFunction,
};

export const Example = {
  args: {
    arg: 'This is the argument given to exampleFunction',
  },
  render: (args) => exampleFunction(args.arg),
  play: async ({ args, canvasElement, step }) => {
    await step(`Outputs the given argument`, async () => {
      expect(canvasElement).toHaveTextContent(args.arg);
    });
  },
};
