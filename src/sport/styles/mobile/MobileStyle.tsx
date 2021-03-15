/* stylelint-disable property-no-vendor-prefix, property-no-unknown */

import { createGlobalStyle } from 'styled-components/macro'

const MobileStyle = createGlobalStyle`
    html,body {
        height: 100%;
        /* overflow: hidden; */
        font-size: 16px;
        padding: 0;
        margin: 0;
    }
    
    * {
        box-sizing: border-box;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    body {
        font-family: Microsoft Yahei, 微软雅黑, Microsoft JhengHe, 微软正黑体, Open Sans, Sintony, 黑体, SimHei, customicons, FontAwesome, sans-serif;
        line-height: 1.5;
        margin: 0;
        background: ${(props) => props.theme.sport.colors.header.background};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        -webkit-overflow-scrolling: touch;
        scrollbar-arrow-color: ${(props) => props.theme.sport.colors.scrollbar.foreground};
        scrollbar-3dlight-color: ${(props) => props.theme.sport.colors.scrollbar.foreground};
        scrollbar-highlight-color: ${(props) => props.theme.sport.colors.scrollbar.foreground};
        scrollbar-face-color: ${(props) => props.theme.sport.colors.scrollbar.foreground};
        scrollbar-shadow-color: ${(props) => props.theme.sport.colors.scrollbar.background};
        scrollbar-track-color: ${(props) => props.theme.sport.colors.scrollbar.foreground};

        /* overflow-y: auto; */
        /* overflow-x: hidden; */
    }

    img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        touch-action: manipulation;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: ${(props) => props.theme.sport.colors.text.primary};
       
    }

    button {
        outline: none;
        cursor: pointer;
        touch-action: manipulation;
    }

    input {
        font-size: 100%;
    }
    
    ::-webkit-scrollbar-track {
        display: block;
    }

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 50px;
        border: 2px solid transparent;
    }
`

export default MobileStyle
