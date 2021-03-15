import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 14px 19px;
`

const MainTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #ff9200;
    letter-spacing: 0.48px;
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body1}
    padding-top: 10px;
`

const ReturnTime = styled.span`
    color: #ff9200;
`

const MainPara = styled.div`
    padding: 10px 0;
    ${(props) => props.theme.typography.Body3}
`

const ContactInfo = styled.div`
    padding-top: 10px;
    ${(props) => props.theme.typography.Body3}
`
const GameTitle = styled.span`
    ${(props) => props.theme.typography.Subtitle2}
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
                        {brandName} <ReturnTime>{t('slotMachine.maintenance.returnTime', { time })}</ReturnTime>
                    </GameTitle>
                    <MainPara>
                        {t('slotMachine.maintenance.content2')}
                        <br />
                        {t('slotMachine.maintenance.content3')}
                    </MainPara>
                    <ContactInfo>
                        <div>
                            {t('slotMachine.maintenance.phone')}：{csPhone}
                        </div>
                        <div>
                            {t('slotMachine.maintenance.email')}：{email}
                        </div>
                    </ContactInfo>
                </MainContainer>
            ) : (
                children
            )}
        </>
    )
}

export default SlotMaintenance
