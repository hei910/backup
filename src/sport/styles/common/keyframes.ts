import { keyframes } from 'styled-components/macro'

export const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

// export const rerotate = keyframes`
//   from {
//     transform: rotate(360deg);
//   }

//   to {
//     transform: rotate(0deg);
//   }
// `;

export const shrinkBounce = keyframes`
    0% {
        transform: scale(1);
    }

    33% {    
        transform: scale(.85);
    }

    100% {
        transform: scale(1);    
    }
`

export const checkboxCheck = keyframes`
    0% {
        width: 0;
        height: 0;
        border-color: #555;
        transform: translate3d(0, 0, 0) rotate(45deg);
    }

    33% {
        width: .2em;
        height: 0;
        transform: translate3d(0, 0, 0) rotate(45deg);
    }
    
    100% {    
        width: .2em;
        height: .5em;    
        border-color: #555;
        transform: translate3d(-.15em, -.3em, 0) rotate(45deg);
    }
`

// export const fadeIn = keyframes`
//   from { opacity: 0; visibility:hidden;}
//   to { opacity: 1; visibility:visible;}
// `;

// export const fadeOut = keyframes`
//   from { opacity: 1; visibility:visible;}
//   to { opacity: 0; visibility:hidden;}
// `;

export const fadeInFromBottom = keyframes`
    from { opacity: 0; bottom: 0px; }
    to { opacity: 0.8; bottom: 30px; }
`

export const fadeOutToBottom = keyframes`
    from { opacity: 0.8; bottom: 30px; }
    to { opacity: 0; bottom: 0px; }
`

export const aniHorizontal = keyframes`
    0% {
        background-position: -100% 0;
        opacity: 1
    }

    50% {
        opacity: 0.3
    }

    100% {
        background-position: 100% 0;

    }
`

export const bounce = keyframes`
    0% {
        transform: translate3d(0, -8rem, 0) scale(1, 1.13);
    }

    100% {
        transform: translate3d(0, 0, 0) scale(1.35, 1);
    }
`

export const shadow = keyframes`
    0% {
        opacity: 0.05;
        transform: scale(1.5);
        filter: blur(0.1em);
    }

    100% {
        opacity: 0.2;
        transform: scale(1);
        filter: blur(0.01em);
    }
`
