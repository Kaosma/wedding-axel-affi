// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* --- Custom Fonts --- */
  @font-face {
    font-family: "linnea-bold";
    src: url("/fonts/PPCirka-Bold.otf") format("opentype");
    font-display: swap;
    font-weight: bold;
  }
  @font-face {
    font-family: "linnea-light";
    src: url("/fonts/PPCirka-Light.otf") format("opentype");
    font-display: swap;
    font-weight: 300;
  }
  @font-face {
    font-family: "linnea-variable";
    src: url("/fonts/PPCirka-Variable.ttf") format("truetype");
    font-display: swap;
    font-weight: 100 900;
  }

  /* --- Base Styles --- */
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 400;
    background-color: #fff;
    color: #333;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
