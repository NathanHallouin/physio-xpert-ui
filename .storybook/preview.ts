import type { Preview } from '@storybook/react-vite'

import '../src/styles/theme.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f0fdf4' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
}

export default preview
