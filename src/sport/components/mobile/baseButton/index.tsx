import styled, { css } from 'styled-components/macro'

const hoverEffect = css<{ withOutBg?: boolean }>`
    background: ${(props) => (props.withOutBg ? 'transparent' : props.theme.sport.colors.button.hover)};
    color: ${(props) => props.theme.sport.colors.button.hoverText};

    svg rect,
    circle,
    path,
    g {
        fill: ${(props) => props.theme.sport.colors.button.hoverText};
        stroke: ${(props) => props.theme.sport.colors.button.hoverText};
    }
`

const activeEffect = css<{ withOutBg?: boolean }>`
    background: ${(props) => (props.withOutBg ? 'transparent' : props.theme.sport.colors.button.activeBackground)};
    color: ${(props) => props.theme.sport.colors.button.activeText};

    svg rect,
    circle,
    path,
    g {
        fill: ${(props) => props.theme.sport.colors.button.activeText};
        stroke: ${(props) => props.theme.sport.colors.button.activeText};
    }
`

const BaseButton = styled.button<{ withOutBg?: boolean; active?: boolean }>`
    background: ${(props) => (props.withOutBg ? 'transparent' : props.theme.sport.colors.button.background)};
    border-radius: 5px;
    line-height: 1;
    border: none;
    padding: 5px;
    margin: 0 5px;
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => props.theme.sport.colors.button.text};
    transition: all 0.2s ease-in-out;

    svg rect,
    circle,
    path,
    g {
        fill: ${(props) => props.theme.sport.colors.button.text};
        stroke: ${(props) => props.theme.sport.colors.button.text};
        transition: all 0.15s ease-in-out;
    }

    @media (hover: hover) {
        &:hover {
            ${hoverEffect}
        }
    }

    ${(props) => props.active && activeEffect}
`

export default BaseButton
