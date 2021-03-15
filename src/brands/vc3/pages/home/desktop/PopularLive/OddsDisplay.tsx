import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import { IPopularData } from '@type'
import { directToSourceASportDetail, showDesktopLoginPopup } from '@utils/v1Functions'
import React from 'react'
import styled from 'styled-components/macro'

const SBetLayout = styled.div`
    margin-top: 15px;
    display: flex;
`

const SOddsLayout = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const SOddsItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: flex-end;
`

const SOddsTitle = styled.div`
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    line-height: 22px;
`

const SInnerOddsLayout = styled.div<{ width: number }>`
    display: flex;
    width: ${(props) => `${props.width}px`};
    justify-content: space-between;
    margin-top: 8px;
`

const SOddsButton = styled.div`
    width: 70px;
    height: 85px;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.08);
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SHandicap = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #333333;
`

const SBetButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 70px;
    height: 85px;
    border-radius: 15px;
    border: solid 1px rgba(242, 242, 242, 0.6);
    background-image: linear-gradient(to bottom, #d2b497, #f4dfc8);
    color: #0c186c;
    font-size: 14px;
    font-weight: 900;
`

const SBetButtonLayout = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const SOdds = styled.div`
    margin-top: 15px;
    color: #333333;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
`

type IMarket = '1x2' | 'ah' | 'ou'
type IOUType = 'ov' | 'un'

const OddsLayout = ({ data }: { data?: IPopularData }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const t = useTranslation()

    const goToBet = () => {
        if (!isLoggedIn) {
            showDesktopLoginPopup()
        } else {
            if (data) {
                directToSourceASportDetail(data.info.matchId, data.info.status === 'Live')
            }
        }
    }

    const getMarket = (type: IMarket) => {
        if (!data) {
            return null
        }

        const market = Object.values(data.events.markets).find((item) => {
            return item.marketCode === type
        })

        if (!market) {
            return null
        }

        return market
    }

    const getOUSpecifier = (type: IOUType) => {
        if (!data) {
            return ''
        }

        const outcome = getMarket('ou')?.outcomes?.[type]

        if (!outcome?.specifier) {
            return ''
        }

        return `${outcome?.name} ${outcome?.specifier}`
    }

    return (
        <SBetLayout>
            <SOddsLayout>
                <SOddsItem>
                    <SOddsTitle>{t('home.had')}</SOddsTitle>
                    <SInnerOddsLayout width={230}>
                        <SOddsButton>
                            <SHandicap>{t('home.hadHome')}</SHandicap>
                            <SOdds>{getMarket('1x2')?.outcomes?.['h']?.odds ?? '-'}</SOdds>
                        </SOddsButton>
                        <SOddsButton>
                            <SHandicap>{t('home.hadDraw')}</SHandicap>
                            <SOdds>{getMarket('1x2')?.outcomes?.['d']?.odds ?? '-'}</SOdds>
                        </SOddsButton>
                        <SOddsButton>
                            <SHandicap>{t('home.hadAway')}</SHandicap>
                            <SOdds>{getMarket('1x2')?.outcomes?.['a']?.odds ?? '-'}</SOdds>
                        </SOddsButton>
                    </SInnerOddsLayout>
                </SOddsItem>
                <SOddsItem>
                    <SOddsTitle>{t('home.ah')}</SOddsTitle>
                    <SInnerOddsLayout width={150}>
                        <SOddsButton>
                            <SHandicap>{getMarket('ah')?.outcomes?.['h']?.specifier ?? ''}</SHandicap>
                            <SOdds>{getMarket('ah')?.outcomes?.['h']?.odds ?? '-'}</SOdds>
                        </SOddsButton>
                        <SOddsButton>
                            <SHandicap>{getMarket('ah')?.outcomes?.['a']?.specifier ?? ''}</SHandicap>
                            <SOdds>{getMarket('ah')?.outcomes?.['a']?.odds ?? '-'}</SOdds>
                        </SOddsButton>
                    </SInnerOddsLayout>
                </SOddsItem>
                <SOddsItem>
                    <SOddsTitle>{t('home.ou')}</SOddsTitle>
                    <SInnerOddsLayout width={150}>
                        <SOddsButton>
                            <SHandicap>{getOUSpecifier('ov')}</SHandicap>
                            <SOdds>{getMarket('ou')?.outcomes?.['ov']?.odds ?? '-'}</SOdds>
                        </SOddsButton>
                        <SOddsButton>
                            <SHandicap>{getOUSpecifier('un')}</SHandicap>
                            <SOdds>{getMarket('ou')?.outcomes?.['un']?.odds ?? '-'}</SOdds>
                        </SOddsButton>
                    </SInnerOddsLayout>
                </SOddsItem>
                <SOddsItem>
                    <SBetButtonLayout>
                        <SBetButton onClick={goToBet} data-qa="btnBet">
                            {t('home.bet')}
                        </SBetButton>
                    </SBetButtonLayout>
                </SOddsItem>
            </SOddsLayout>
        </SBetLayout>
    )
}

export default OddsLayout
