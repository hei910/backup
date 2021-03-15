import { BetRecord, BetRecordBetData, BetRecordDetail } from '@services/sportBet/types'

/**
 * Return specifier if necessary (e.g "0.5 / 1")
 * @param marketCode - market code of the match
 * @param specifier - specifier of the match
 */
export const getSpecifier = (marketCode: string, specifier: string) => {
    if (marketCode.startsWith('ou') || marketCode.startsWith('ah')) {
        return ` ${specifier}`
    }
    return ''
}

/**
 * Return description of the bet item (e.g "巴黎圣日尔曼 -2.5/3")
 * @param recordDetail - detail info of the match
 */
export const getBetInfo = (recordDetail: BetRecordDetail) => {
    const { marketCode, marketName, outcomeName, specifier } = recordDetail
    return `${marketCode === 'or' ? `${marketName} ` : ''}${outcomeName}${getSpecifier(marketCode, specifier)}`
}

/**
 * Return score as text (e.g "( 3 : 1 )") if it is a live match(滾球)
 * @param recordDetail - detail info of the match
 */
export const getLiveScore = (recordDetail: BetRecordDetail) => {
    try {
        const { live, score } = recordDetail
        if (live) {
            const { homeScore, awayScore } = JSON.parse(score)
            return ` ( ${homeScore} : ${awayScore} )`
        }
        return ''
    } catch (e) {
        return ''
    }
}

/**
 * Use odds to calculate the match result.
 * @param oddsInfo - include origin and final odds as numerator and denumerator
 */
export const getCompetitionResult = (status: string | null) => {
    if (status === 'DANGEROUS_CANCEL') {
        return 'dangerousCancel'
    } else if (status === 'CANCEL') {
        return 'cancel'
    } else if (status === 'WINNER') {
        return 'win'
    } else if (status === 'LOSER') {
        return 'lose'
    } else if (status === 'HALFWIN') {
        return 'winHalf'
    } else if (status === 'HALFLOSE') {
        return 'loseHalf'
    } else if (status === 'PUSHED') {
        return 'tie'
    } else {
        return 'unknown'
    }

    // const { metadata, resultOddsNumerator: resultNumerator, resultOddsDenominator: resultDenominator } = oddsInfo;
    // const { numerator, denominator } = JSON.parse(metadata);
    // if (!resultNumerator && !resultDenominator) return 'unsettle';
    // if (resultNumerator === 0) return 'lose';
    // if (resultNumerator === 1 && resultDenominator === 1) return 'tie';
    // if (resultNumerator === numerator && resultDenominator === denominator) return 'win';
    // if (resultNumerator / resultDenominator > 1) return 'winHalf';
    // if (resultNumerator / resultDenominator < 1) return 'loseHalf';
    // return 'unknown';
}

/**
 * Return match result's outcome name (e.g team name, score, etc...)
 * @param betData - bet data
 * @param language - display language
 */
export const getBetResultOutcomeName = (betData: BetRecordBetData | undefined, language: string) => {
    try {
        if (betData?.matchResult) {
            const result = JSON.parse(betData.matchResult)
            if (result?.outcomeName?.[language]?.length) {
                return result.outcomeName[language].join(', ')
            } else if (result?.score?.homeScore && result?.score?.awayScore) {
                return `${result.score.homeScore} - ${result.score.awayScore}`
            }
        }
        return null
    } catch (err) {
        return null
    }
}

/**
 * Return absolute float number (e.g "2000.00") representing estimated winning amount(unsettle) or net win/lose amount(settle)
 * @param settled - settled = match is finish
 * @param data - bet record
 * @param estimatedWinnings - max win amount for the bet
 * @param absolute - if true, return result amount without negative sign
 */
export const getBetResultAmount = (
    settled: boolean | undefined,
    data: BetRecord,
    estimatedWinnings: number,
    absolute = true,
) => {
    const { totalPayoutAmount, totalAnte } = data
    if (settled) {
        return absolute
            ? Math.abs(totalPayoutAmount - totalAnte).toFixed(2)
            : (totalPayoutAmount - totalAnte).toFixed(2)
    } else {
        return estimatedWinnings?.toFixed(2)
    }
}
