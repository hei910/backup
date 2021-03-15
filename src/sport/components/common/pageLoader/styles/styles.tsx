import styled, { css } from 'styled-components/macro';
import { margin, scaling } from './keyframes';

// Styled Components
export const SPageLoader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #323232;
    z-index: 30;
    /* display: none; */
    opacity: 0.9;

    img {
        width: 100%;
        display: block;
    }
`;

export const SPageLoaderWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    margin-top: -5vh;
`;

const SLogoItem = styled.div<{ active?: boolean }>`
    width: 80px;
    height: 100px;
    margin: 0 -28px;
    overflow: hidden;
    position: relative;
    transform-origin: center bottom;
    transform: scale(0.3);
`;

export const SLogoNum = styled(SLogoItem)`
    animation: ${props =>
        props.active
            ? css`${scaling} 1s 0s ease-in-out 1 normal both, ${margin} 1s 0s ease-in-out 1 normal both`
            : 'none'};
`;
export const SLogoTxt = styled(SLogoItem)`
    width: 144px;
    margin: 0 -100px 0 0;
    transform-origin: left bottom;
    animation: ${props =>
        props.active
            ? css`
                  ${scaling} 1s 0s ease-in-out 1 normal both
              `
            : 'none'};
`;
