import GameSuppliers from './gameSuppliers'

enum GameTypes {
    boardgame = 'boardgame',
    slotmachine = 'slotmachine',
    livecasino = 'livecasino',
    fishhunter = 'fishhunter',
    lottery = 'lottery',
    sport = 'sport',
    esport = 'esport',
}

export const GameTypeSupplierMap = {
    [GameTypes.boardgame]: [GameSuppliers.ky],
    [GameTypes.slotmachine]: [
        GameSuppliers.mg,
        GameSuppliers.dt,
        GameSuppliers.pt,
        GameSuppliers.pg,
        GameSuppliers.cq9,
        GameSuppliers.jdb,
    ],
    [GameTypes.livecasino]: [GameSuppliers.ag, GameSuppliers.bg],
    [GameTypes.fishhunter]: [GameSuppliers.ag],
    [GameTypes.lottery]: [GameSuppliers.loto],
    [GameTypes.sport]: [GameSuppliers.sport],
    [GameTypes.esport]: [GameSuppliers.avia],
}

export default GameTypes
