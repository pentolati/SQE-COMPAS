import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    purple: {
      50: '#EDE9FE',
      100: '#DDD6FE',
      200: '#C4B5FD',
      300: '#A78BFA',
      400: '#A855F7',
      500: '#8B5CF6',
      600: '#6D28D9',
      700: '#5B21B6',
      800: '#4C1D95',
      900: '#3B0764',
    },
    navy: {
      500: '#1E3A5F',
      800: '#112233',
    },
    teal: {
      500: '#134E4A',
      700: '#0D3634',
    },
    mint: {
      100: '#D1FAE5',
      200: '#A7F3D0',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#FAFAFA',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'purple',
      },
    },
  },
});

export default theme;
