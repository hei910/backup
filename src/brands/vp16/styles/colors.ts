const primary = '#167f5d'
const primaryDk = '#167f5d'
const primaryLt = '#167f5d'

const secondary = '#f6e41c'
const secondaryDk = '#f6e41c'
const secondaryLt = '#f6e41c'

export default {
    primary,
    primaryDk,
    primaryLt,
    secondary,
    secondaryDk,
    secondaryLt,

    brand: primary,
    accent: '#169f2d',
    component: {
        common: {
            title: {
                leftBorder: '#169f2d',
            },
        },
        desktop: {
            pagination: {
                color: '#fff',
                activeColor: '#fff',
                bgColor: '#3d3d3d',
                activeBgColor: '#0ca93b',
                borderColor: 'transparent',
                activeBorderColor: 'transparent',
            },
        },
    },
    page: {
        common: {
            maintenance: {
                bgColor: '#333333',
                color: '#ffffff',
                endTime: '#169f2d',
                contactSectionBg: '#414141',
                contact: {
                    bg: '#545454',
                    title: '#169f2d',
                    border: '#169f2d',
                },
                footer: '#ffffff',
            },
            slotMachine: {
                gamePage: {
                    boxShadow: '#0ca93b',
                    normalBg: '#202020',
                    gradientBg1: '#575757',
                    gradientBg2: '#363636',
                    color: '#ffffff',
                    noGameText: '#ffffff',
                },
                gameItem: {
                    cardBg: '#ffffff',
                    cardShadow: 'rgba(97, 97, 97, 0.31)',
                    score: '#0caa3a',
                    line: '#e3e3e3',
                    btnContainerBg: '#E4E4E4',
                    btnStartText: '#ffffff',
                    btnStartShadow: 'rgba(97, 97, 97, 0.49)',
                    btnStartBg: 'linear-gradient(to bottom, #078552, #0dab3a)',
                    btnTry: '#9d9d9d',
                    btnTryText: '#ffffff',
                },
            },
        },
        mobile: {
            lottery: {
                trialBtnColor: '#f6e41c',
            },
        },
    },
}
