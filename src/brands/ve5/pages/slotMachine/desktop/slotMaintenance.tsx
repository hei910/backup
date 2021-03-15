import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 50px
`

const MainTitle = styled.div`
    font-size: 24px;
    letter-spacing: 0.48px;

    > span {
        font-weight: bold;
    }
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body1}
    padding-top: 25px;
`

const ReturnTime = styled.span`
    color: #ff9200;
    ${(props) => props.theme.typography.Subtitle2}
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
                    <MainTitle>
                        {brandName}
                        <span>{t('slotMachine.maintenance.systemMain')}</span>
                    </MainTitle>
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
