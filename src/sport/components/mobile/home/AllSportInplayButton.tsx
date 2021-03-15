import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

interface ComponentProps {
    sport: string
    date?: string
    count?: number
}
const SMainOuterContainer = styled.div`
    width: 95%;
    padding: 10px 5px;
`
const SMainContainer = styled(Link)`
    background: ${(props) => props.theme.sport.colors.active};
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-radius: 24px;
    box-shadow: 0 3px 10px 0 ${(props) => props.theme.sport.colors.topPage.boxShadow};

    /* margin: 0 5px; */
`
const SNumber = styled.div`
    color: ${(props) => props.theme.sport.colors.active};
    font-weight: bold;
`

const SChevron = styled.div`
    width: 10px;
    height: 10px;
    border-top: 1px solid ${(props) => props.theme.sport.colors.active};
    border-right: 1px solid ${(props) => props.theme.sport.colors.active};
    /* margin-right: 10px; */
    transform: rotate(45deg);
    margin: 0 2px;
`
const SCount = styled.div`
    background: ${(props) => props.theme.sport.colors.accent};
    width: 74px;
    height: 80%;
    color: ${(props) => props.theme.sport.colors.active};
    border-radius: 24px;
    display: flex;
    padding: 3px 10px 3px 15px;
    font-size: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: auto 4px auto;
`

const SSubTitle = styled.div`
    color: #333333;
    font-size: 16px;
    width: 100%;
    text-align: center;
    margin: 15px;
`

const AllSportInplayButton: React.FC<ComponentProps> = ({ sport, date, count }) => {
    const { t } = useTranslation()
    const title = (sport?: string) => {
        switch (sport) {
            case 'football':
                return 'topPage.inplaySubheader.football'
            case 'basketball':
                return 'topPage.inplaySubheader.basketball'
            case 'tennis':
                return 'topPage.inplaySubheader.tennis'
            case 'baseball':
                return 'topPage.inplaySubheader.baseball'
            default:
                return ''
        }
    }
    return (
        <>
            {sport && (
                <SMainOuterContainer>
                    <SMainContainer
                        to={{
                            pathname: `/sport/${date}/${sport}`,
                            state: { matchStatus: 'home' },
                        }}>
                        <SSubTitle>{t(title(sport))}</SSubTitle>
                        <SCount>
                            <SNumber>{count}</SNumber>
                            <SChevron />
                        </SCount>
                    </SMainContainer>
                </SMainOuterContainer>
            )}
        </>
    )
}

export default AllSportInplayButton
