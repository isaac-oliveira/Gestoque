import { createGlobalStyle } from 'styled-components';
import Color from './themes/Color';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        max-width: 100vw;
        max-height: 100vh;
        background-color: ${Color.background};
    }
`;

export default GlobalStyle;
