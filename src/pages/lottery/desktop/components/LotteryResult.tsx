import styled from "styled-components/macro";
import { getLotoColor } from '@pages/lottery/desktop/utils/index'
import * as colorCodes from '@pages/lottery/desktop/constants/resultColorCodes'
import { IColorCodes } from '@pages/lottery/desktop/types'
import useTranslation from '@hooks/useTranslation'


interface LotteryResultProps {
    lotoResult?: string[],
    color?: string,
    brandColorCodes?: IColorCodes,
    shape?: string,
    className?: string,
}

const SLotteryResult = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
export const SGameBall = styled.div<{ color?: string, isCircle: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: ${(props) => props.isCircle ? '50%' : '6px'};
    background: ${(props) => props.color ? props.color : '#ff7300'};
    color: #FFFFFF;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
`

export const SEmptyResultText = styled.div`
    font-weight: bold;
`

const LotteryResult = ({ lotoResult, color, brandColorCodes, shape, className }: LotteryResultProps) => {
    const t = useTranslation()
    let colorPool = brandColorCodes || colorCodes;

    return (
        <SLotteryResult className={className}>
            {
                (!lotoResult || lotoResult.length <= 1) ?
                    <SEmptyResultText>{t('lottery.emptyDetail')}</SEmptyResultText>
                    :
                    lotoResult?.map((result: string, i: number) => (
                        <SGameBall
                            key={'loto-result-' + i}
                            color={getLotoColor(+lotoResult[i], colorPool, color,)}
                            isCircle={shape === 'circle'}>
                            {parseInt(result, 10)}
                        </SGameBall>
                    ))
            }
        </SLotteryResult>
    )
}

export default LotteryResult;
