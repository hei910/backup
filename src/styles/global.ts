import { createGlobalStyle } from 'styled-components/macro'
import { normalize } from 'styled-normalize'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'

export default createGlobalStyle`
    ${normalize}

    html {
        font-size: ${(props) => props.theme.vars.generalFontSize};
        color: #000000;
        font-family: Helvetica Neue, Helvetica, Microsoft YaHei, 微软雅黑, PingFang SC, Arial, sans-serif;
        -webkit-overflow-scrolling: touch;
    }

    html, body, #root, main {
        width: 100%;
        height: 100%;
    }

    * {
        box-sizing: border-box;
        outline: 0;
    }

    /* reset safari default radius on input */
    input {
        border-radius: 0;

        &::placeholder {
            color: #bbbbbb;
        }
    }

    /* reset some browser default border on iframe */
    iframe {
        border: none;
    }

    ${process.env.APP_PLATFORM === 'desktop' &&
        `
        button {
            cursor: pointer;
        }
    `}
`
