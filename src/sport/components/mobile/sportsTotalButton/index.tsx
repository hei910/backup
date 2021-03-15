import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

interface ComponentProps {
    title: string
    sport: string
    inplayNumber: number
    date: string
    competitionId?: number
}
const SOuterContainer = styled.div`
    width: 100%;
    padding: 5px 5px;
`

const StyledLayout = styled(Link)<{ inplay: string }>`
    display: flex;
    background: ${(props) => props.theme.sport.colors.active};
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    justify-content: ${(props) => (props.inplay === 'true' ? 'center' : 'space-between')};
    color: ${(props) => props.theme.sport.colors.primary};
    cursor: pointer;
    user-select: none;
    border-radius: 24px;
    box-shadow: 0 3px 10px 0 ${(props) => props.theme.sport.colors.topPage.boxShadow};
    /* padding: 10px; */
    height: 50px;
`

const SGameCount = styled.div`
    height: 24px;
    min-width: 24px;
    border-radius: 5px;
    color: ${(props) => props.theme.sport.colors.active};
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
`

const STitle = styled.span`
    text-align: center;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
    color: #333333;
    font-size: 16px;
    width: 100%;
    margin: 15px;
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
    color: ${(props) => props.theme.sport.colors.active};
    border-radius: 24px;
    display: flex;
    padding: 3px 10px 3px 15px;
    flex-direction: row;
    align-items: center;
    height: 80%;
    margin: auto 4px auto;
`

const SportsTotalButton: React.FC<ComponentProps> = ({ title, sport, inplayNumber, date, competitionId }) => {
    const flexHandler = (date: string) => {
        return date === 'inplay' ? true : false
    }

    const renderButton = () => {
        if (competitionId !== undefined) {
            return (
                <SOuterContainer>
                    <StyledLayout
                        inplay={flexHandler(date).toString()}
                        to={{
                            pathname: `/sport/${date}/${sport}/${competitionId}`,
                            state: { matchStatus: 'home' },
                        }}>
                        <STitle>{title}</STitle>
                        <SCount>
                            <SGameCount>{inplayNumber}</SGameCount>
                            <SChevron />
                        </SCount>
                    </StyledLayout>
                </SOuterContainer>
            )
        } else {
            return (
                <SOuterContainer>
                    <StyledLayout
                        inplay={flexHandler(date).toString()}
                        to={{
                            pathname: `/sport/select-competition/${date}/${sport}`,
                            state: { matchStatus: 'home' },
                        }}>
                        <STitle>{title}</STitle>
                        <SCount>
                            <SGameCount>{inplayNumber}</SGameCount>
                            <SChevron />
                        </SCount>
                    </StyledLayout>
                </SOuterContainer>
            )
        }
    }

    return <> {renderButton()}</>
}

export default SportsTotalButton
