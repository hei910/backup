import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    padding: 40px 19px;
    color: #646464;
    ${(props) => props.theme.typography.Body1}
    width: 1366px;
    margin: 0 auto;
`

const MainTitle = styled.div`
    font-size: 20px;
    letter-spacing: 0.48px;
    ${(props) => props.theme.typography.H4Headline}
    font-weight: bold;
`
const MainNotice = styled.div`
    font-weight: bold;
`

const ReturnTime = styled.span`
    padding: 0 10px;
    color: #ff9900;
`

const MainPara = styled.div`
    padding: 20px 0;
`

const GameTitle = styled.span`
    padding: 10px 0;
`

const WhiteBanner = styled.div`
    width: 100%;
    height: 59px;
    box-shadow: 0px 1px 0 0 #ffffff;
    background-color: rgba(250, 250, 250, 0.7);
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, notice, time, csPhone, email, brandName } = useSlotMaintenance()

    return (
        <>
            {isMaintenance ? (
                <>
                    <WhiteBanner />
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
                        <MainPara>
                            {t('slotMachine.maintenance.content2')}
                            {t('slotMachine.maintenance.content3')}
                        </MainPara>
                        <div>
                            {t('slotMachine.maintenance.phone')}：{csPhone}
                        </div>
                        <div>
                            {t('slotMachine.maintenance.email')}：{email}
                        </div>
                    </MainContainer>
                </>
            ) : (
                children
            )}
        </>
    )
}

export default SlotMaintenance
