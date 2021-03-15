import styled from "styled-components/macro";
import { getLotoColor } from '@pages/lottery/desktop/utils/index'

interface LotteryResultProps {
    lotoResult?: any,
    color?: string,
    shape?: string,
}

const SLotteryResult = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
const SGameBall = styled.div<{ color?: string, isCircle: boolean }>`
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

const SEmptyResultText = styled.div`
    font-weight: bold;
`

const LotteryResult = ({ lotoResult, color, shape }: LotteryResultProps) => {

    if (!lotoResult || lotoResult.length <= 1) return <SEmptyResultText>未有开奖结果</SEmptyResultText>

    return (
        <SLotteryResult>
            {lotoResult?.map((result: any, i: number) => (
                <SGameBall
                    color={getLotoColor(+lotoResult[i], color)}
                    isCircle={shape === 'circle'}>
                    {result}
                </SGameBall>
            ))}
        </SLotteryResult>
    )
}

export default LotteryResult;
