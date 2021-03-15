enum GameSuppliers {
    hot = 'hot',
    mg = 'mg',
    dt = 'dt',
    pt = 'pt',
    pg = 'pg',
    cq9 = 'cq9',
    jdb = 'jdb',
    avia = 'avia',
    nn = 'nn',
    ky = 'ky',
    ag = 'ag',
    bg = 'bg',
    loto = 'loto',
    sport = 'sport',
}

export const CN_ONLY_GAME_SUPPLIER = [GameSuppliers.pt]

export const SEPARATED_WALLET_SUPPLIER = [GameSuppliers.sport, GameSuppliers.ag, GameSuppliers.ky, GameSuppliers.pt]

export type SeparatedWalletSuppliers = 'sport' | 'ag' | 'ky' | 'nn' | 'pt'

export default GameSuppliers
