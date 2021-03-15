import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 14px 19px;
    color: #c8c8c8;
    height: 400px;
    ${(props) => props.theme.typography.Body3}
`

const MainTitle = styled.div`
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0.48px;
    text-decoration: underline;
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body1}
    color: #ffffff;
`

const ReturnTime = styled.span`
    padding: 0 10px;
    color: #ffd452;
`

const MainPara = styled.div`
    padding: 20px 0;
`

const GameTitle = styled.span`
    padding: 10px 0;
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, notice, time, csPhone, email, brandName } = useSlotMaintenance()

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
                    <MainPara>
                        {t('slotMachine.maintenance.content2')}
                        {t('slotMachine.maintenance.content3')}
                    </MainPara>
                    <div>
                        {t('slotMachine.maintenance.hotline')}：{csPhone}
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
