import { darken, invert, lighten, mix } from 'polished'
import { ColorPalette, Theme } from '@sport/styles/common/types'

const defaultPalette: ColorPalette = {
    accent: '#ff9200',
    background: '#f2f2f2',
    primary: '#4b4b4b',
    secondary: '#b4b4b4',
    tertiary: '#232323',
    active: '#FFF',
    contrastText: {
        secondary: '#b4b4b4',
        primary: '#4b4b4b',
        tertiary: '#000',
        background: '#FFF',
    },
    info: '#02a7d7',
    success: '#44c38a',
    error: '#df2e31',
}

const darkPalette: ColorPalette = {
    accent: '#f9cc1b',
    background: '#2d2d2d',
    primary: '#262626',
    secondary: '#151515',
    tertiary: '#b4b4b4',
    active: '#FFF',
    contrastText: {
        secondary: '#151515',
        primary: '#cfcfcf',
        tertiary: '#FFF',
        background: '#191919',
    },
    info: '#f28000',
    success: '#5df34e',
    error: '#f9423b',
}

const ubsPalette: ColorPalette = {
    accent: '#f9cc1b',
    background: '#2d2d2d',
    primary: '#262626',
    secondary: '#151515',
    tertiary: '#b4b4b4',
    active: '#FFF',
    contrastText: {
        secondary: '#151515',
        primary: '#cfcfcf',
        tertiary: '#FFF',
        background: '#191919',
    },
    info: '#f28000',
    success: '#5df34e',
    error: '#f9423b',
}

const customize = (c: ColorPalette): Theme => ({
    colors: {
        accent: c.accent,
        accent1: c.error,
        background: c.background,
        primary: c.primary,
        secondary: c.secondary,
        tertiary: c.tertiary,
        active: c.active,
        info: c.info,
        success: c.success,
        error: c.error,
        text: {
            header: lighten(0.5, c.primary),
            title: invert(darken(0.01, c.secondary)),
            active: {
                primary: c.accent,
                secondary: c.active,
            },
            secondary: c.contrastText.secondary,
            primary: c.contrastText.primary,
            tertiary: c.contrastText.tertiary,
            background: c.contrastText.background,
            hover: lighten(0.3, c.contrastText.primary),
            span: darken(0.2, c.accent),
        },
        button: {
            background: c.background,
            background2: lighten(0.25, c.secondary),
            hover: lighten(0.2, c.primary),
            text: c.contrastText.primary,
            hoverText: lighten(0.3, c.contrastText.primary),
            activeText: c.active,
            activeBackground: lighten(0.2, c.primary),
        },
        table: {
            extendsHeader: {
                border: darken(0.12, c.primary),
                background: darken(0.08, c.primary),
                hover: darken(0.05, c.primary),
            },
            header: {
                background: lighten(0.2, c.primary),
            },
            subHeader: {
                background: darken(0.28, c.secondary),
                border: darken(0.15, c.contrastText.background),
                title: c.contrastText.secondary,
            },
            column: {
                border: darken(0.115, c.contrastText.background),
                background: c.contrastText.background,
                secondBackground: mix(0.1, '#C6E28C', c.contrastText.background),
                ballColor: darken(0.25, '#C6E28C'),
                hover: mix(0.1, c.accent, c.contrastText.background),
                icon: darken(0.1, c.secondary),
                versusText: c.accent,
                neutralColor: '#fff',
            },
            title: {
                background: lighten(0.2, c.secondary),
                marketBackground: lighten(0.2, c.primary),
                ctidText: '#0d5494',
            },
            detail: {
                header: {
                    background: '#fff',
                    border: '#fff',
                    text: '#333333',
                    activeText: '#99bbf5',
                },
                subHeader: {
                    background: '#fff',
                    border: '#d9d9d9',
                    title: '#9d9d9d',
                },
                column: {
                    border: '#e2e2e2',
                    background: '#fff',
                },
                higherRate: {
                    background: c.accent,
                    hover: lighten(0.1, '#4c9eea'),
                    headerText: c.active,
                    boxShadow: 'rgba(212, 129, 49, 0.23)',
                },
                extended: {
                    background: lighten(0.2, c.primary),
                    hover: '#f2f2f2',
                },
            },
        },
        scrollbar: {
            foreground: '#464646',
            background: '#FFF',
        },
        header: {
            background: darken(0.1, c.primary),
            secondBackground: lighten(0.05, c.primary),
            active: lighten(0.2, c.primary),
            tertiary: '#f9cc1b',
            secondary: c.accent,
            primary: c.contrastText.secondary,
        },
        subHeader: {
            border: lighten(0.1, c.primary),
        },
        betMatchHeader: {
            background: c.contrastText.background,
            border: darken(0.05, c.contrastText.background),
        },
        searchBar: {
            background: c.contrastText.background,
            buttonBackgroud: darken(0.1, c.primary),
            buttonColor: c.contrastText.primary,
            text: c.contrastText.primary,
        },
        betList: {
            background: darken(0.08, c.primary),
            empty: lighten(0.2, c.primary),
            border: lighten(0.08, c.primary),
            betTabButton: {
                background: c.background,
                activeBackground: lighten(0.2, c.primary),
                hoverBackground: lighten(0.2, c.primary),
                text: c.contrastText.primary,
                activeText: c.active,
                hoverText: lighten(0.3, c.contrastText.primary),
            },
            amount: '#4caf50',
            total: '#fff',
            submitButton: {
                background: c.primary,
                text: '#FFF',
            },
            cencalButton: {
                background: c.primary,
                text: '#FFF',
            },
            stakeIncrementButton: {
                background: c.primary,
                hoverBackground: darken(0.28, c.secondary),
                text: c.contrastText.primary,
                hoverText: '#FFF',
            },
            content: {
                detailTeam: c.active,
                border: '#373737',
            },
            header: {
                infoIcon: {
                    background: darken(0.1, c.primary),
                    hoverBackground: lighten(0.2, c.primary),
                    text: c.contrastText.primary,
                    hoverText: lighten(0.3, c.contrastText.primary),
                },
            },
            updateBackground: 'rgba(30,30,30,0.7)',
        },
        backToTopButton: {
            background: c.primary,
            icon: '#FFF',
        },
        footer: {
            background: darken(0.1, c.primary),
            border: darken(0.15, c.primary),
        },
        nav: {
            background: c.primary,
            border: '#2d2d2d',
            menu: {
                background: {
                    normal: darken(0.08, c.primary),
                    active: c.active,
                },
                circle: {
                    background: '#FFF',
                },
                active: invert(c.active),
                activeText: invert(c.active),
                activeMarket: 'white',
            },
        },
        topPage: {
            boxShadow: 'rgba(212, 129, 49, 0.23)',
            mainHeader: invert(c.active),
        },
    },
    palette: c,
    boxShadow: '0 2.5px 7.5px 0 rgba(0,0,0,0.1)',
})

export const mDefaultTheme: Theme = customize(defaultPalette)
export const mDarkTheme: Theme = customize(darkPalette)
export const mUbsTheme: Theme = customize(ubsPalette)
