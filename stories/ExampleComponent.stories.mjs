import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import ExampleComponent from '../src/ExampleComponent.mjs';
import ExampleComponentWithProps from './ExampleComponentWithProps.mjs';

export default {
  title: 'ExampleComponent',
  component: ExampleComponent,
};

export const Example = {
  render: ExampleComponentWithProps,
  play: async ({ canvasElement, step }) => {
    const input = within(canvasElement).getByTestId('ExampleComponent');

    await step(`ExampleComponent value is updated if user types`, async () => {
      expect(input).not.toHaveValue();
      await userEvent.type(input, 'test');
      expect(input).toHaveValue('test');
    });
  },
};
