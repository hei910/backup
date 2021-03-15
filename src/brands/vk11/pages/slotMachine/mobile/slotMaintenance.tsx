import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import maintenanceImg from '@brand/assets/images/slotMachine/maintenance.png'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 14px 19px;
    background-color: #f5f5f5;
    color: #626d8e;
`
const ContentContainer = styled.div`
    width: auto;
`

const MainTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    color: #fd8524;
`
const MainNotice = styled.div`
    ${(props) => props.theme.typography.Body2}
    padding-top: 10px;
`

const ReturnTime = styled.span`
    color: #fd8524;
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
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
        width: 144px;
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
                        <MainTitle data-qa="txtMaintenanceTitle">{`${supplier}${t(
                            'slotMachine.maintenance.systemMain',
                        )}`}</MainTitle>
                        <MainNotice data-qa="txtMaintenanceNotice">{notice}</MainNotice>
                        <MainPara>{t('slotMachine.maintenance.content1')}</MainPara>
                        <GameTitle>
                            {`${title}`}{' '}
                            <ReturnTime data-qa="txtResumeTime">
                                {t('slotMachine.maintenance.returnTime', { time })}
                            </ReturnTime>
                        </GameTitle>
                        <MainPara>
                            {t('slotMachine.maintenance.content2')}
                            {t('slotMachine.maintenance.content3')}
                        </MainPara>
                        <ContactInfo>
                            <div data-qa="txtMaintenanceTel">
                                {t('slotMachine.maintenance.phone')}：{csPhone}
                            </div>
                            <div data-qa="txtMaintenanceEmail">
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
