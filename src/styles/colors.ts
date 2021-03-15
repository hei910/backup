const primary = '#FF840C'
const primaryDk = '#e97300'
const primaryLt = '#ffa136'

const secondary = '#FF840C'
const secondaryDk = '#e97300'
const secondaryLt = '#ffa136'

const grayDk3 = '#333333'
const grayDk2 = '#4d4d4d'
const grayDk = '#666666'
const gray = '#999999'
const grayLt = '#b4b4b4'
const grayLt2 = '#e0e0e0'
const grayLt3 = '#f2f2f2'

const warning = '#f66363'
const positive = '#83cb2c'
const notice = '#c04800'

export default {
    brand: primary,
    accent: primary,
    warning,
    primary,
    primaryDk,
    primaryLt,
    secondary,
    secondaryDk,
    secondaryLt,
    gray,
    grayDk,
    grayDk2,
    grayDk3,
    grayLt,
    grayLt2,
    grayLt3,
    positive,
    notice,

    component: {
        common: {
            tab: {
                color: '#1f1f1f',
                activeColor: '#ff840c',
                activeBorder: '#ff840c',
            },
            title: {
                leftBorder: '#ff840c',
            },
            baseInput: {
                borderColor: 'transparent',
                textColor: '#333',
                placeholderColor: '#a5a5a5',
                disabledBorderColor: '#a5a5a5',
            },
            searchBar: {
                bgColor: '#fff',
                btnBgColor: '#ebebeb',
                btnColor: '#ff840c',
            },
            button: {
                primary: {
                    normalBg: '#FF840C',
                    hoverBg: '#ffa136',
                    activeBg: '#E97300',
                    disableBg: '#B4B4B4',
                    text: '#FFFFFF',
                    disableText: '#FFFFFF',
                    hoverText: '#FFFFFF',
                    activeText: '#FFFFFF',
                    normalBorder: 'none',
                    hoverBorder: 'none',
                    activeBorder: 'none',
                    disableBorder: 'none',
                },
                secondary: {
                    normalBg: '#333333',
                    hoverBg: '#4d4d4d',
                    activeBg: '#000000',
                    disableBg: '#B4B4B4',
                    text: '#FFFFFF',
                    disableText: '#FFFFFF',
                    hoverText: '#FFFFFF',
                    activeText: '#FFFFFF',
                    normalBorder: 'none',
                    hoverBorder: 'none',
                    activeBorder: 'none',
                    disableBorder: 'none',
                },
                ghost: {
                    normalBg: 'transparent',
                    hoverBg: '#f2f2f2',
                    activeBg: '#e0e0e0',
                    disableBg: 'transparent',
                    text: '#1F1F1F',
                    disableText: '#B4B4B4',
                    hoverText: '#1F1F1F',
                    activeText: '#1F1F1F',
                    normalBorder: 'solid 1px #999999',
                    hoverBorder: 'solid 1px #999999',
                    activeBorder: 'solid 1px #999999',
                    disableBorder: 'solid 1px #b4b4b4',
                },
                secondaryGhost: {
                    normalBg: 'transparent',
                    hoverBg: 'transparent',
                    activeBg: 'transparent',
                    disableBg: 'transparent',
                    text: '#FF840C',
                    disableText: '#FF840C',
                    hoverText: '#FF840C',
                    activeText: '#FF840C',
                    normalBorder: 'solid 1px #FF840C',
                    hoverBorder: 'solid 1px #FF840C',
                    activeBorder: 'solid 1px #FF840C',
                    disableBorder: 'solid 1px #FF840C',
                },
            },
            gameFloatingButton: {
                borderColor: '#FF840C',
                textColor: '#FF840C',
            },
        },
        desktop: {
            section: {
                title: {
                    bgColor: '#fff2e2',
                    color: '#ff840c',
                },
            },
            betRecordPagination: {
                color: '#333333',
                activeColor: '#fff',
                bgColor: '#fff',
                activeBgColor: '#ff840c',
                borderColor: ' #ebebeb',
                activeBorderColor: 'transparent',
            },
            calendar: {
                bgColor: '#ff9200',
                weekBgColor: '#363636',
                weekColor: '#fff',
            },
            betRecordNav: {
                blockBgColor: '#373737',
                activeBlockBgColor: '#717171',
                blockColor: '#aeaeae',
                activeBlockColor: '#fff',
                bgColor: '#373737',
                activeBgColor: '#717171',
                color: '#aeaeae',
                activeColor: '#fff',
                border: '#0c0c0c',
                hoverBgColor: '#4b4b4b',
                titleColor: '#ff9200',
                titleBgColor: '#333',
            },
            pagination: {
                color: '#a5a5a5',
                activeColor: '#fff',
                bgColor: '#fff',
                activeBgColor: '#ff840c',
                borderColor: 'transparent',
                activeBorderColor: 'transparent',
            },
        },
        mobile: {
            pageContainer: {
                sPageContainer: {
                    bgColor: '#f2f2f2',
                },
                appBar: {
                    bgColor: '#4b4b4b',
                    color: '#ffffff',
                    boxShadow: 'none',
                },
                arrow: {
                    color: '#ffffff',
                },
            },
            downloadAppAlert: {
                color: '#6d7278',
                bgColor: '#ffffff',
                installBtnColor: '#ff840c',
                titleColor: '#ff840c',
            },
            gameGridSection: {
                color: '#333333',
                bgColor: '#e0e0e0',
            },
            jetsoSection: {
                headerColor: '#666666',
                moreColor: '#999999',
                color: '#333333',
                bgColor: '#e0e0e0',
            },
            datePicker: {
                border: '0.5px solid #6d6d6d',
                bgColor: 'transparent',
                toolBarColor: '#1b79e2',
            },
        },
    },
    page: {
        common: {
            maintenance: {
                bgColor: '#ffffff',
                color: '#000000',
                endTime: '#ff840c',
                contactSectionBg: '#f5f5f5',
                contact: {
                    bg: '#ffffff',
                    title: '#ff840c',
                    border: '#ff840c',
                },
                footer: '#6d6d6d',
            },
            regionBlock: {
                logoBg: 'linear-gradient(to right,#944721,#f9a755 34%,#f9b955 51%,#f9a755 68%,#944721)',
                csBg: '#ff9f1a',
            },
            betRecord: {
                popUpModal: {
                    primaryBgColor: '#fff',
                    headerBg: '#444444',
                    headerColor: '#fff',
                    oddsColor: '#999999',
                    buttonColor: '#fff',
                    overlayColor: 'rgba(165, 165, 165, 0.7)',
                },
            },
        },
        desktop: {
            betRecord: {
                contentHeader: {
                    bgColor: '#e1e1e1',
                    color: '#6e6e6e',
                },
                expandableHeader: {
                    bgColor: '#373737',
                    color: '#fff',
                },
                button: {
                    bgColor: '#404040',
                    color: '#fff',
                    border: '#404040',
                },
                generalDate: {
                    bgColor: '#e3e3e3',
                    color: '#747474',
                    activeBgColor: '#363636',
                    activeColor: '#fff',
                },
                tableHeader: {
                    border: '#5a5a5a',
                    bgColor: '#5a5a5a',
                    color: '#fff',
                },
                header: {
                    border: '#5a5a5a',
                },
                summary: {
                    bgColor: '#e3e3e3',
                    color: '#000',
                    numberColor: '#6e6e6e',
                },
            },
        },
        mobile: {
            betRecord: {
                dateRangePickerContainer: {
                    bgColor: '#ffffff',
                    border: '1px solid #e5e5e5',
                },
                tab: {
                    bgColor: '#363636',
                    color: '#ffffff',
                    activeColor: '#ffffff',
                    activeBorder: '#ff840c',
                },
                recordHeader: {
                    bgColor: '#363636',
                    color: '#ffffff',
                },
                searchBtn: {
                    bgColor: '#4b4b4b',
                    color: '#ffffff',
                },
                noRecordText: '#cccccc',
            },
            downloadApp: {
                bgColor: '#f2f2f2',
                topBgColor: '#373737',
                osColor: '#ffffff',
                cardBgColor: '#ffffff',
                titleColor: '#ff840c',
                infoColor: '#373737',
                hrColor: '#373737',
                supportBgColor: '#ff840c',
                supportColor: '#ffffff',
                gameColor: '#616161',
                promoColor: '#010101',
                linkColor: '#ff840c',
                btnBgColor: '#ffffff',
                btnColor: '#ff840c',
            },
            tutorIos: {
                color: '#333333',
                specialColor: '#ff840c',
                overlayColor: '#ffffff',
                overlayBgColor: 'rgba(0,0,0,0.8)',
                btnColor: '#666666',
                activeBtnColor: '#ffffff',
                btnBgColor: '#4c4c4c',
                activeBtnBgColor: '#ff840c',
                section: {
                    color: '#5c5c5c',
                    bgColor: '#d3d3d3',
                    stepColor: '#ffffff',
                    stepBgColor: '#ff840c',
                    stepShadowColor: '#dd8000',
                },
            },
            contactUs: {
                titleColor: '#000000',
            },
            gameRules: {
                tabShadow: 'none',
                sportSelectShadow: '4px 0px 16px #00000019',
            },
            lottery: {
                trialBtnColor: '#fd9201',
                trialTextColor: '#373737',
            },
        },
    },
}
