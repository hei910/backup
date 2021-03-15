import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import maintenanceImg from '@brand/assets/images/slotMachine/6686-maintenance.svg'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 14px 19px;
`
const ContentContainer = styled.div`
    width: auto;
`

const MainTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    color: #3d7eeb;
    letter-spacing: 0.48px;
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body2}
    padding-top: 10px;
`

const ReturnTime = styled.span`
    color: #3d7eeb;
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

const ImageContainer = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
        width: 60%;
    }
`
const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, notice, time, csPhone, email, supplier } = useSlotMaintenance()

    return (
        <>
            {isMaintenance ? (
                <MainContainer>
                    <ContentContainer>
                        <MainTitle>{`${supplier.toUpperCase()}${t('slotMachine.maintenance.systemMain')}`}</MainTitle>
                        <MainNotice data-qa="txtMaintenanceTitle">{notice}</MainNotice>
                        <MainPara data-qa="txtMaintenanceNotice">{t('slotMachine.maintenance.content1')}</MainPara>
                        <GameTitle>
                            {supplier} <ReturnTime data-qa="txtResumeTime">{t('slotMachine.maintenance.returnTime', { time })}</ReturnTime>
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
