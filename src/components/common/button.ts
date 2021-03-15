import styled from 'styled-components/macro'

type RoundedButtonType = 'primary' | 'secondary' | 'ghost' | 'secondaryGhost'

export const RoundedButton = styled.button<{ buttonType: RoundedButtonType }>`
    width: 100%;
    border-radius: 20px;
    padding: 10px 0;
    color: ${(props) => props.theme.colors.component.common.button[props.buttonType].text};
    background-color: ${(props) => props.theme.colors.component.common.button[props.buttonType].normalBg};
    border: ${(props) => props.theme.colors.component.common.button[props.buttonType].normalBorder};
    ${(props) => props.theme.typography.Button1}

    &:hover {
        color: ${(props) => props.theme.colors.component.common.button[props.buttonType].hoverText};
        background-color: ${(props) => props.theme.colors.component.common.button[props.buttonType].hoverBg};
        border: ${(props) => props.theme.colors.component.common.button[props.buttonType].normalBorder};
    }

    &:disabled {
        color: ${(props) => props.theme.colors.component.common.button[props.buttonType].disableText};
        background-color: ${(props) => props.theme.colors.component.common.button[props.buttonType].disableBg};
        border: ${(props) => props.theme.colors.component.common.button[props.buttonType].normalBorder};
    }

    &:active {
        color: ${(props) => props.theme.colors.component.common.button[props.buttonType].activeText};
        background-color: ${(props) => props.theme.colors.component.common.button[props.buttonType].activeBg};
        border: ${(props) => props.theme.colors.component.common.button[props.buttonType].normalBorder};
    }
`
