import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    max-width: 1050px;
    width: 100%;
    margin: 0 auto;
    padding: 14px 19px;
    color: #ffffff;
    font-size: 23px;
`

const MainTitle = styled.div`
    font-size: 38px;
    letter-spacing: 0.48px;
    font-weight: bold;
    color: #f59211;
`
const MainNotice = styled.div`
    padding-top: 10px;
`

const ReturnTime = styled.span`
    padding: 0 10px;
    color: #f59211;
`

const MainPara = styled.div`
    padding-bottom: 20px;
    line-height: 1.21;
`

const SlotMaintenance: React.FC = ({ children }) => {
    const t = useTranslation()
    const { isMaintenance, notice, time, csPhone, email, brandName } = useSlotMaintenance()

    return (
        <>
            {isMaintenance ? (
                <MainContainer>
                    <MainTitle>{`${brandName} ${t('slotMachine.maintenance.systemMain')}`}</MainTitle>
                    <MainNotice>{notice}</MainNotice>
                    <MainPara>
                        {t('slotMachine.maintenance.content1')}
                        <br />
                        {brandName}
                        {t('slotMachine.maintenance.will')}
                        <ReturnTime>{time}</ReturnTime>
                        {t('slotMachine.maintenance.returnNormal')}
                        <br />
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
            ) : (
                children
            )}
        </>
    )
}

export default SlotMaintenance
