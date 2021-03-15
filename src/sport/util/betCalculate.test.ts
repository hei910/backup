// eslint-disable-next-line import/no-unused-modules
import { folds } from '@sport/util/betCalculate'

const parlayOddsArray = [
    {
        odds: [],
        parlay: [],
    },
    {
        odds: [1.96],
        parlay: [1.96],
    },
    {
        odds: [3.95, 4.55],
        parlay: [16.97, 16.97],
    },
    {
        odds: [2.58, 3.65, 1.94],
        parlay: [36.77, 18.5, 17.27],
    },
    {
        odds: [2.83, 2.2, 9.2, 13.0],
        parlay: [1710.93, 231.49, 735.81, 743.63],
    },
    {
        odds: [1.45, 1.87, 2.29, 2.08, 2.83],
        parlay: [235.37, 33.75, 79.09, 86.2, 35.55],
    },
    {
        odds: [2.58, 3.6, 3.65, 1.58, 2.85, 2.99],
        parlay: [2959.67, 107.53, 438.12, 934.11, 1024.46, 455.44],
    },
    {
        odds: [2.28, 2.09, 3.85, 1.82, 1.2, 1.82, 1.68],
        parlay: [2169.04, 70.0, 270.96, 571.4, 688.36, 446.81, 121.51],
    },
    {
        odds: [3.2, 3.35, 1.47, 2.01, 3.15, 2.96, 2.92, 2.19],
        parlay: [27644.75, 167.95, 967.37, 3238.67, 6719.53, 8546.61, 6117.03, 1887.59],
    },
    {
        odds: [1.79, 2.3, 1.37, 2.72, 3.1, 3.3, 5.9, 3.5, 1.01],
        parlay: [233.08, 1556.64, 6119.38, 15261.64, 24434.03, 24294.59, 13, 614.3, 88785.98],
    },
    {
        odds: [2.26, 4.8, 3.5, 3.05, 5.4, 2.52, 4.2, 3.8, 6.7, 4.1],
        parlay: [
            7608185.11,
            678.76,
            7492.01,
            51752.49,
            240324.32,
            764813.56,
            1649702.41,
            2308974.15,
            1893567.17,
            690880.25,
        ],
    },
]

describe('Bet list calculation', () => {
    it('From 0 to 10 items, test the to win are correct.', () => {
        for (const currentParlay of parlayOddsArray) {
            const result = folds(currentParlay.odds)

            for (const i in result) {
                if (Object.prototype.hasOwnProperty.call(result, i)) {
                    const upper = result[i] + 0.01
                    const lower = result[i] - 0.01
                    expect(currentParlay.parlay[i] < upper && currentParlay.parlay[i] > lower)
                }
            }
        }
    })
})
