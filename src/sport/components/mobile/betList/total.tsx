import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface TotalProps {
    stake: number;
    toWin: number;
    count: number;
}

const SContainer = styled.div`
    background-color: #323232;
    margin-top: 1px;
    padding: 10px;
    color: #b4b4b3;
`;

const SRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SLeft = styled.div`
    display: flex;
    text-align: left;
`;

const SRight = styled.div`
    text-align: right;
`;

const SBetCount = styled.div`
    color: #fff;
    margin-right: 3px;
`;

const SAllStakeText = styled.div``;

const SAllStakeAmount = styled.div`
    color: #fff;
`;

const SAllToWinText = styled.div``;

const SAllToWinAmount = styled.div`
    color: #7ba94e;
`;

const SMessage = styled.div`
    background-color: #373737;
    color: #e1830c;
    text-align: center;
`;

const Total: React.FC<TotalProps> = ({ count, stake, toWin }) => {
    const { t } = useTranslation();

    return (
        <SContainer>
            <SRow>
                <SLeft>
                    <SBetCount>{count}</SBetCount>
                    <SAllStakeText>{t('betList.allStake')}:</SAllStakeText>
                </SLeft>
                <SRight>
                    <SAllStakeAmount>{stake.toFixed(2)}</SAllStakeAmount>
                </SRight>
            </SRow>
            <SRow>
                <SLeft>
                    <SAllToWinText>{t('betList.toWin')}:</SAllToWinText>
                </SLeft>
                <SRight>
                    <SAllToWinAmount>{toWin.toFixed(2)}</SAllToWinAmount>
                </SRight>
            </SRow>
            <SMessage></SMessage>
        </SContainer>
    );
};

export default React.memo(Total);
