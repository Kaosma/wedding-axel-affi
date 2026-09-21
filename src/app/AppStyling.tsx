import { createGlobalStyle } from "styled-components";

const DefaultTheme = {
  breakpoints: {
    xs: 600,
    mobile: 768,
    sm: 900,
    md: 1200,
    lg: 1536,
    xl: 1920,
  },
  lineColor: '#dcdcdc',
  lineWidth: '1px',
  lineWidthBold: '2px',
  hoverBackground: '#e9eef2',
  breakLine: {
    hard: '1px solid #929292',
    soft: '1px solid #dae1e7',
  },
  font: {
    size: {
      small: '12px',
      medium: '16px',
      large: '18px',
    },
    weight: {
      bold: 'bold',
    },
    family: {

    }
  },
  shadow: {
    primary: 'rgba(0, 0, 0, 0.35)',
    secondary: '#acacac47',
  },
  colors: {
    mix: {
      lightest: '#fff4ea',
      lighter: '#f2ccb7',
      light: '#edb18f',
      dark: '#ff864e',
      darker: '#f47149',
      darkest: '#75714e',
    },
    red: {
      primary: '#fc2211',
      secondary: '#f8dfdb',
    },
    border: {
      gray: '#6e8294',
    },
    warning: {
      iconDetails: '#ffca30',
      icon: '#ffe38c',
      iconBackground: '#fff1c7',
      pin: '#ffe38c',
      pinBorder: '#ffca30',
    },
    success: {
      iconDetails: '#00Be8c',
      icon: '#8af5cd',
      iconBackground: '#d4f7ee',
      pin: '#89dcbe',
      pinBorder: '#68a68f',
    },
    unknown: {
      iconDetails: '#668399',
      icon: '#c2cdd6',
      iconBackground: '#9badbc',
      pin: '#c2cdd6',
      pinBorder: '#668399',
    },
    error: {
      dark: '#aa162e',
      delete: '#c8102e',
      light: '#d32f2f',
      lighter: '#ffdddd',
    },
    primary: '#d96c4a', // terracotta secondary
    foreground: '#333333',
    accent: '#b55239', // terracotta dark
  },
  fonts: {
    serif: "'Playfair Display', serif",
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
};


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Playfair Display', serif;
    margin: 0;
    background: #fefaf6;
    color: #333;
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
  }

  .script-accent {
    font-family: 'Great Vibes', cursive;
    font-size: 1.5rem;
  }
`;

function useTheme() {
  return DefaultTheme;
}

export { DefaultTheme, useTheme, GlobalStyle };