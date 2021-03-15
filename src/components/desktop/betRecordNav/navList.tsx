const appWindow = window as any

const isInsideIframe = () => {
    return window.parent !== window
}

const sideNav = {
    title: '我的账户',
    child: [
        {
            id: 'statement',
            title: '账户记录',
            child: [
                {
                    id: 'bet-history',
                    title: '投注记录',
                    child: [
                        {
                            id: 'all-bet',
                            title: '全部注单',
                        },
                        {
                            id: 'sports',
                            title: '体育',
                            child: [
                                {
                                    id: 'sportV2',
                                    title: '全部注单',
                                },
                                {
                                    id: 'sports-settled-bet',
                                    title: '已结算注单',
                                },
                                {
                                    id: 'sports-unsettled-bet',
                                    title: '未结算注单',
                                },
                            ],
                        },
                        {
                            id: 'bg',
                            title: isInsideIframe() && appWindow.parent.gameTitle.bg,
                        },
                        {
                            id: 'ag',
                            title: isInsideIframe() && appWindow.parent.gameTitle.ag + '/捕鱼游戏',
                        },
                        {
                            id: 'esport',
                            title: '电子竞技',
                            child: [
                                {
                                    id: 'esport',
                                    title: '全部注单',
                                },
                                {
                                    id: 'esport-settled-bet',
                                    title: '已结算注单',
                                },
                                {
                                    id: 'esport-unsettled-bet',
                                    title: '未结算注单',
                                },
                            ],
                        },
                        {
                            id: 'mg',
                            title: 'MG老虎机',
                        },
                        {
                            id: 'dt',
                            title: 'DT老虎机',
                        },
                        {
                            id: 'pt',
                            title: 'PT老虎机',
                        },
                        {
                            id: 'pg',
                            title: 'PG老虎机',
                        },
                        {
                            id: 'cq9',
                            title: 'CQ9老虎机',
                        },
                        {
                            id: 'jdb',
                            title: 'JDB老虎机',
                        },
                        {
                            id: 'ky',
                            title: '开元棋牌',
                        },
                        {
                            id: 'lottery',
                            title: '彩票',
                            child: [
                                {
                                    id: 'loto',
                                    title: '全部注单',
                                },
                                {
                                    id: 'lottery-settled-bet',
                                    title: '已结算注单',
                                },
                                {
                                    id: 'lottery-unsettled-bet',
                                    title: '未结算注单',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'transaction-history',
                    title: '交易记录',
                    child: [
                        {
                            id: 'transaction-history-deposit',
                            title: '存款',
                            link: 'my-account/transaction-history-deposit.html',
                        },
                        {
                            id: 'transaction-history-withdrawal',
                            title: '提款',
                            link: 'my-account/transaction-history-withdrawal.html',
                        },
                        {
                            id: 'transaction-history-transfer',
                            title: '转账',
                            link: 'my-account/transaction-history-transfer.html',
                        },
                    ],
                },
                {
                    id: 'summary',
                    title: '摘要',
                    link: 'my-account/summary.html',
                },
            ],
        },
    ],
}

export default sideNav
