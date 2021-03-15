export const allBet = [
    'serial',
    'category',
    'betDetail',
    'betCategory',
    'choice',
    'betAmount',
    'winLose',
    'status',
    'settle',
]
export const eSportsBet = ['serial', 'betDetail', 'betGamePlay', 'choice', 'betAmount', 'winable', 'winLose', 'status']
export const eSportsBetWithSettle = [
    'serial',
    'betDetail',
    'betGamePlay',
    'choice',
    'betAmount',
    'winable',
    'winLose',
    'status',
]
export const allSportsBet = [
    'serial',
    'betDetail',
    'betGamePlay',
    'choice',
    'betAmount',
    'canWinAmount',
    'winLose',
    'status',
]
export const allSportsBetWithSettle = [
    'serial',
    'betDetail',
    'betGamePlay',
    'choice',
    'betAmount',
    'canWinAmount',
    'winLose',
    'status',
    'settle',
]
export const bgagBet = ['serial', 'date', 'roundNumber', 'gameCategory', 'gameResult', 'betAmount', 'winLose', 'status']
export const mgBet = ['serial', 'date', 'gameCategory', 'betAmount', 'winLose', 'status']
export const dtkynnBet = ['serial', 'date', 'orderNumber', 'gameCategory', 'betAmount', 'winLose', 'status']
export const allLotteryBet = ['serial', 'betDetail', 'betVersion', 'betGamePlay', 'betAmount', 'winLose', 'status']
export const lotterySettledBet = ['serial', 'betDetail', 'betGame', 'betVersion', 'betAmount', 'winLose', 'status']
export const lotteryUnsettledBet = ['serial', 'betDetail', 'betGame', 'betVersion', 'betAmount', 'status']
export const isTableExpandable: any[] = ['all-bet', 'sportV2', 'sports-settled-bet', 'lotto', 'lottery-settled-bet']

export enum TableColumns {
    SERIAL = 'serial',
    CATEGORY = 'category',
    BET_DETAIL = 'betDetail',
    BET_CATEGORY = 'betCategory',
    CHOICE = 'choice',
    BET_AMOUNT = 'betAmount',
    WIN_LOSE = 'winLose',
    STATUS = 'status',
    BET_GAME_PLAY = 'betGamePlay',
    WINABLE = 'winable',
    CAN_WIN_AMOUNT = 'canWinAmount',
    DATE = 'date',
    ROUND_NUMBER = 'roundNumber',
    GAME_CATEGORY = 'gameCategory',
    GAME_RESULT = 'gameResult',
    ORDER_NUMBER = 'orderNumber',
    BET_GAME = 'betGame',
    BET_VERSION = 'betVersion',
    SETTLE = 'settle',
}
