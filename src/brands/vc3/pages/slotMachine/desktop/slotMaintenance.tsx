import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import maintenanceImg from '@brand/assets/images/slotMachine/maintenance.png'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    background-color: #ffffff;
`
const ContentContainer = styled.div`
    width: auto;
`

const MainTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #1d30b5;
    letter-spacing: 0.48px;
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body1}
    padding-top: 25px;
`

const ReturnTime = styled.span`
    color: #1d30b5;
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
    color: #0c186c;
    padding: 10px 0;
`

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
        width: 60%;
    }
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, notice, time, csPhone, email, title, supplier } = useSlotMaintenance()

    return (
        <>
            {isMaintenance ? (
                <MainContainer>
                    <ContentContainer>
                        <MainTitle>{`${supplier}${t('slotMachine.maintenance.systemMain')}`}</MainTitle>
                        <MainNotice data-qa="maintenanceNotice">{notice}</MainNotice>
                        <MainPara>{t('slotMachine.maintenance.content1')}</MainPara>
                        <GameTitle>
                            {title}{' '}
                            <ReturnTime data-qa="resumeTime">
                                {t('slotMachine.maintenance.returnTime', { time })}
                            </ReturnTime>
                        </GameTitle>
                        <MainPara>
                            {t('slotMachine.maintenance.content2')}
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
                    </ContentContainer>
                    <ImageContainer>
                        <img src={maintenanceImg} />
                    </ImageContainer>
                </MainContainer>
            ) : (
                children
            )}
        </>
    )
}

export default SlotMaintenance
