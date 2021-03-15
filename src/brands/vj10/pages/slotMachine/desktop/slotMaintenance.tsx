import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import MaintenanceImg from '@brand/assets/images/slotMachine/maintain-img.svg'
import LogoIcon from '@brand/assets/images/slotMachine/338logo.svg'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    display: flex;
    color: #ffffff;
`

const MainTitle = styled.div`
    font-size: 40px;
    margin-top: 20px;
`

const ReturnTime = styled.div`
    color: black;
    font-size: 24px;
`

const MainPara = styled.div`
    padding: 10px 0;
    padding-right: 50px;
    ${(props) => props.theme.typography.Body2}
    letter-spacing: 1.5px;
`

const ContactInfo = styled.div`
    padding-left: 20px;
    ${(props) => props.theme.typography.Body3}
`

const ContentContainer = styled.div`
    width: 50%;
    padding: 70px;
`
const TimeContainer = styled.div`
    border-radius: 19px;
    width: 435px;
    height: 20%;
    background-color: #ffffff;
    padding: 10px 0 0 40px;
    margin-bottom: 20px;

    > img {
        height: 40%;
    }
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, notice, time, csPhone, email, complaintPhone } = useSlotMaintenance()

    return (
        <>
            {isMaintenance ? (
                <MainContainer>
                    <ContentContainer>
                        <img src={MaintenanceImg} />
                        <ContactInfo>
                            <div>
                                {t('slotMachine.maintenance.cs')}：{csPhone}
                            </div>
                            <div>
                                {t('slotMachine.maintenance.complaint')}：{complaintPhone}
                            </div>
                            <div>
                                {t('slotMachine.maintenance.email')}：{email}
                            </div>
                        </ContactInfo>
                    </ContentContainer>
                    <ContentContainer>
                        <MainTitle>
                            {t('slotMachine.maintenance.systemMain')}
                            <br />
                            <MainTitle>{notice} </MainTitle>
                        </MainTitle>

                        <MainPara>{t('slotMachine.maintenance.content1')}</MainPara>
                        <TimeContainer>
                            <img src={LogoIcon} />
                            <ReturnTime>{t('slotMachine.maintenance.returnTime', { time })}</ReturnTime>
                        </TimeContainer>
                        <MainPara>
                            {t('slotMachine.maintenance.content2')}
                            <br />
                            {t('slotMachine.maintenance.content3')}
                        </MainPara>
                    </ContentContainer>
                </MainContainer>
            ) : (
                children
            )}
        </>
    )
}

export default SlotMaintenance
