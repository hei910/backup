import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding-top: 75px;
    color: #1a1a1a;
    ${(props) => props.theme.typography.Body3};
    font-size: 24px;
    margin: 0 auto;
    max-width: 1366px;
`

const MainTitle = styled.div`
    font-size: 40px;
    color: #ff9200;
    letter-spacing: 0.48px;
    padding-bottom: 20px;
`

const ReturnTime = styled.span`
    padding: 0 10px;
    color: #f6931c;
`

const MainPara = styled.div`
    padding: 20px 0;
`

const GameTitle = styled.span`
    font-weight: 600;
`
const ContentText = styled.div`
    padding: 20px 0;
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, notice, time, csPhone, email, brandName, supplier } = useSlotMaintenance()

    return (
        <>
            {isMaintenance ? (
                <MainContainer>
                    <MainTitle>
                        {`${brandName} ${supplier.toUpperCase()}`}
                        {t('slotMachine.maintenance.game')}
                        {notice}
                    </MainTitle>
                    <MainPara>{t('slotMachine.maintenance.content1')}</MainPara>
                    <GameTitle>
                        {`${brandName} ${supplier.toUpperCase()}`}
                        {t('slotMachine.maintenance.game')}
                    </GameTitle>
                    {t('slotMachine.maintenance.will')}
                    <ReturnTime>{time}</ReturnTime>
                    {t('slotMachine.maintenance.returnNormal')}
                    <ContentText>
                        {t('slotMachine.maintenance.content2')}
                        <br />
                        {t('slotMachine.maintenance.content3')}
                    </ContentText>
                    <div>
                        {t('slotMachine.maintenance.phone')}：{csPhone}
                    </div>
                    <div>
                        {t('slotMachine.maintenance.email')}：{email}
                    </div>
                </MainContainer>
            ) : (
                children
            )}
        </>
    )
}

export default SlotMaintenance
