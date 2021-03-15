import { keyframes } from 'styled-components/macro'

export const scaling = keyframes`
    0% {
        transform: scale(0.3);
    }

    50% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.3);
    }
`

export const margin = keyframes`
    0% {
        margin: 0 -28px;
    }

    50% {
        margin: 0 0;
    }
    
    100% {
        margin: 0 -28px;
    }
`
