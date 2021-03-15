import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #171717;
    color: #ffffff;
`

const MainTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    color: #f6e51d;
    letter-spacing: 0.48px;
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body2}
    padding-top: 10px;
`

const ReturnTime = styled.span`
    color: #f6e51d;
    ${(props) => props.theme.typography.Subtitle3}
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
    ${(props) => props.theme.typography.Subtitle3}
    padding: 10px 0;
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
