import { ThemeProvider } from '@mui/material';
import type { Preview } from "@storybook/react";
import React from "react";
import { darkTheme } from '../src/theme/dark.ts';
import { themes } from '@storybook/theming';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: "dark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;