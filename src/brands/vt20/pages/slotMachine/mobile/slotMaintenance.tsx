import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'

const MainContainer = styled.div`
    width: 100%;
    padding: 28px 19px;
    color: #ffff;
    ${(props) => props.theme.typography.Body2}
`

const MainTitle = styled.div`
    font-size: 30px;
    color: #f59211;
    letter-spacing: 0.48px;
    font-weight: bold;
`
const MainNotice = styled.div`
    margin-top: 15px;
`

const ReturnTime = styled.span`
    padding: 0 10px;
    color: #f59211;
`

const MainPara = styled.div`
    padding-bottom: 20px;
`

const SubPara = styled.div`
    padding: 20px 0px;
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
                    <SubPara>
                        {t('slotMachine.maintenance.content2')}
                        {t('slotMachine.maintenance.content3')}
                    </SubPara>
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
