import { css, FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components/macro'

export const footerTextStyle: FlattenInterpolation<ThemeProps<DefaultTheme>> = css`
    ${(props) => props.theme.typography.Body3}
    color: #999999;
`

export const footerLinkStyle: FlattenInterpolation<ThemeProps<DefaultTheme>> = css`
    ${footerTextStyle}
    cursor: pointer;
    transition-duration: 0.3s;

    :hover {
        color: #ffffff;
    }
`
