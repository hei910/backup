import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 14px 19px;
    color: #1a1a1a;
    ${(props) => props.theme.typography.Body3};
    background-color: #f2f2f2;
`

const MainTitle = styled.div`
    font-size: 20px;
    color: #ff9200;
    letter-spacing: 0.48px;
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body3}
`

const ReturnTime = styled.span`
    padding: 0 5px;
    color: #ff9200;
`

const MainPara = styled.div`
    padding: 20px 0;
`

const GameTitle = styled.span`
    padding: 10px 0;
`

const ContentText = styled.div`
    padding: 20px 0;
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, time, csPhone, email, brandName, notice } = useSlotMaintenance()

    return (
        <>
            {isMaintenance ? (
                <MainContainer>
                    <MainTitle>{`${brandName}${t('slotMachine.maintenance.systemMain')}`}</MainTitle>
                    <MainNotice>{notice}</MainNotice>
                    <MainPara>{t('slotMachine.maintenance.content1')}</MainPara>
                    <GameTitle>
                        {brandName}

                        {t('slotMachine.maintenance.will')}
                        <ReturnTime>{time}</ReturnTime>
                        {t('slotMachine.maintenance.returnNormal')}
                    </GameTitle>
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
