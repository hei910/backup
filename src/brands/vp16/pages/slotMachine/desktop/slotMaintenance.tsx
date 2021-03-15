import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import MainImg from '@brand/assets/images/slotMachine/maintaining_image.svg'
import LogoIcon from '@brand/assets/images/slotMachine/bet365_logo.svg'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'
import bgImg from '@mixins/backgroundImg'

const MainContainer = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #202020;
    color: #ffffff;
    display: flex;
    ${(props) => props.theme.typography.Body2}
`

const MainTitle = styled.div`
    font-size: 40px;
    padding: 20px 0;
    line-height: 1;
`

const ReturnTime = styled.div`
    color: #7b7b7b;
    font-size: 20px;
    padding: 10px 0;
`

const TimeContainer = styled.div`
    border-radius: 19px;
    width: 435px;
    height: 119px;
    background-color: #000000;
    padding: 20px 0 0 50px;
`

const MainPara = styled.div`
    padding: 10px 0;
    width: 60%;
    line-height: 2;
`

const ContactInfo = styled.div`
    padding-top: 10px;
    ${(props) => props.theme.typography.Body3}
`

const ImgContianer = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;

    > img {
        width: 60%;
    }
`

const ImgPlace = styled.div`
    height: 50%;
    width: 50%;
    ${bgImg(LogoIcon)};
`

const ContentContainer = styled.div`
    width: auto;
    position: relative;
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, time, csPhone, email, complaintPhone, notice } = useSlotMaintenance()
    return (
        <>
            {isMaintenance ? (
                <MainContainer>
                    <ImgContianer>
                        <img src={MainImg} />
                    </ImgContianer>
                    <ContentContainer>
                        <MainTitle>
                            {t('slotMachine.maintenance.systemMain')}
                            {notice}
                        </MainTitle>
                        <MainPara>{t('slotMachine.maintenance.content1')}</MainPara>
                        <TimeContainer>
                            <ImgPlace />
                            <ReturnTime>{t('slotMachine.maintenance.returnTime', { time })}</ReturnTime>
                        </TimeContainer>
                        <MainPara>
                            {t('slotMachine.maintenance.content2')}
                            <br />
                            {t('slotMachine.maintenance.content3')}
                        </MainPara>

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
                </MainContainer>
            ) : (
                children
            )}
        </>
    )
}

export default SlotMaintenance
