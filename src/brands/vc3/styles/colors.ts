const primary = '#0c186c'
const primaryDk = '#07115b'
const primaryLt = '#102092'

export default {
    primary,
    primaryDk,
    primaryLt,

    brand: primary,
    component: {
        common: {
            tab: {
                color: '#333333',
                activeColor: '#0c186c',
                activeBorder: '#0c186c',
            },
            title: {
                leftBorder: '#0c186c',
            },
            button: {
                primary: {
                    normalBg: '#0C186C',
                    hoverBg: '#102092',
                    activeBg: '#07115B',
                    disableBg: '#B4B4B4',
                },
                secondary: {
                    normalBg: '#02072B',
                    hoverBg: '#11194E',
                    activeBg: '#000527',
                    disableBg: '#B4B4B4',
                },
                secondaryGhost: {
                    text: '#0c186c',
                    disableText: '#0c186c',
                    hoverText: '#0c186c',
                    activeText: '#0c186c',
                    normalBorder: 'solid 1px #0c186c',
                    hoverBorder: 'solid 1px #0c186c',
                    activeBorder: 'solid 1px #0c186c',
                    disableBorder: 'solid 1px #0c186c',
                },
            },
            searchBar: {
                bgColor: '#fff',
                btnBgColor: '#ebebeb',
                btnColor: '#0c186c',
            },
            gameFloatingButton: {
                borderColor: '#3b7eeb',
                textColor: '#3b7eeb',
            },
        },
        // desktop: {
        //     section: {
        //         title: {
        //             bgColor: '#fff2e2',
        //             color: '#ff840c',
        //         },
        //     },
        // },
        desktop: {
            pagination: {
                color: '#a5a5a5',
                activeColor: '#ffffff',
                bgColor: '#ffffff',
                activeBgColor: '#0c186c',
                borderColor: 'transparent',
                activeBorderColor: 'transparent',
            },
            betRecordPagination: {
                color: '#333333',
                activeColor: '#fff',
                bgColor: '#fff',
                activeBgColor: '#0c186c',
                borderColor: ' #ebebeb',
                activeBorderColor: 'transparent',
            },
            betRecordNav: {
                blockBgColor: '#EEE',
                activeBlockBgColor: '#ccc',
                blockColor: '#6e6e6e',
                activeBlockColor: '#333',
                bgColor: '#EEE',
                activeBgColor: '#ccc',
                color: '#333',
                activeColor: '#333',
                border: '#fff',
                hoverBgColor: '#ccc',
                titleColor: '#0c186c',
                titleBgColor: '#EEE',
            },
        },
        mobile: {
            pageContainer: {
                appBar: {
                    bgColor: '#0c186c',
                },
            },
            downloadAppAlert: {
                installBtnColor: '#0c186c',
                titleColor: '#0c186c',
            },
        },
    },
    page: {
        common: {
            maintenance: {
                endTime: '#0c186c',
                contact: {
                    title: '#0c186c',
                    border: '#0c186c',
                },
            },
            slotMachine: {
                gameItem: {
                    bgColor: '#ffffff',
                    boxShadow: 'rgba(0, 0, 0, 0.1)',
                    color: '#333333',
                    tryBtn: {
                        borderColor: '#0c186c',
                        color: '#0c186c',
                    },
                    startBtn: {
                        bgColor: '#0c186c',
                        color: '#ffffff',
                    },
                },
            },
            regionBlock: {
                logoBg: 'linear-gradient(to right,#113C9F,#113C9F 34%,#5588FE 51%,#113C9F 68%,#113C9F)',
                csBg: '#2a66ef',
            },
        },
        desktop: {
            betRecord: {
                generalDate: {
                    bgColor: '#eeee',
                    color: '#333333',
                    activeBgColor: '#CCC',
                    activeColor: '#333333',
                },
                tableHeader: {
                    bgColor: '#eeee',
                    color: '#333333',
                },
                expandableHeader: {
                    bgColor: '#eeee',
                    color: '#333333',
                },
                header: {
                    border: '#ffff',
                },
                button: {
                    bgColor: '#E1E1E1',
                    color: '#333333',
                    border: 'transparent',
                },
            },
        },
        mobile: {
            betRecord: {
                tab: {
                    bgColor: '#ffffff',
                    color: '#333333',
                    activeColor: '#0c186c',
                    activeBorder: '#0c186c',
                },
                recordHeader: {
                    bgColor: '#0c186c',
                },
                searchBtn: {
                    bgColor: '#0c186c',
                    color: '#ffffff',
                },
            },
            downloadApp: {
                bgColor: '#f2f2f2',
                topBgColor: '#ffffff',
                osColor: '#4d525a',
                cardBgColor: '#ffffff',
                titleColor: '#0c186c',
                infoColor: '#373737',
                hrColor: '#373737',
                supportBgColor: '#0c186c',
                supportColor: '#ffffff',
                gameColor: '#616161',
                promoColor: '#999999',
                linkColor: '#0c186c',
                btnBgColor: '#ffffff',
                btnColor: '#0c186c',
            },
            tutorIos: {
                color: '#333333',
                specialColor: '#1124b1',
                overlayColor: '#333333',
                overlayBgColor: '#f2f2f2e8',
                btnColor: '#e0e0e0',
                activeBtnColor: '#ffffff',
                btnBgColor: '#4c4c4c',
                activeBtnBgColor: '#1124b1',
                section: {
                    color: '#666666',
                    bgColor: '#f2f2f2',
                    stepColor: '#ffffff',
                    stepBgColor: '#1124b1',
                    stepShadowColor: '#1124b1',
                },
            },
            lottery: {
                trialBtnColor: '#122cc9',
                trialTextColor: '#ffffff',
            },
        },
    },
}
