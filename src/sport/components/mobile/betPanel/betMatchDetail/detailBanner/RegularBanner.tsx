import { ConvertedMatches } from '@sport/converters/types'
import dayjs from 'dayjs'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { device } from '@sport/styles/common/device'
import { SAlignCenter } from '../common/styles'
interface ComponentProps {
    // data?: Fixture[];
    convertedData: ConvertedMatches
    fixtureId?: string
    // seasonName: string;
}
interface SportsBannerProps {
    competitors: NewCompetitors
    startTime: string
}

const SMainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid #f2f2f2;
`

const SAlignCenterContainer = styled(SAlignCenter)`
    justify-content: space-between;
    width: 100%;
`

const SCompetitors = styled.div<{ textAlign: string }>`
    text-align: ${(props) => (props.textAlign === 'left' ? 'left' : 'right')};
    font-size: 15px;
    font-weight: 900;
    flex: 3.5;
    max-width: 120px;
    color: #232323;
    word-break: break-all;

    @media ${device.tablet} {
        max-width: 200px;
    }
`

// const SScores = styled.div<{ textAlign: string }>`
//     font-size: 40px;
//     font-weight: 900;
//     color: ${props => props.theme.sport.colors.accent};
//     text-align: ${props => (props.textAlign === 'left' ? 'left' : 'right')};
//     flex: 1;
//     line-height: 35px;
// `;

const STimeStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1.5;
    color: #232323;
`

const SClock = styled.div`
    font-size: 16px;
    line-height: 16px;
`

const SLiveStatus = styled.div`
    font-size: 12px;
    color: ${(props) => props.theme.sport.colors.primary};
`

const FootballBanner: React.FC<SportsBannerProps> = ({ competitors, startTime }) => {
    // console.log(formatData);
    return (
        <SMainContainer>
            <SAlignCenterContainer>
                <SCompetitors textAlign={'left'}>{competitors?.home?.name}</SCompetitors>

                <STimeStatusContainer>
                    <SClock>{dayjs(startTime).format('HH:mm')}</SClock>
                    <SLiveStatus>{dayjs(startTime).format('DD/MM')}</SLiveStatus>
                </STimeStatusContainer>

                <SCompetitors textAlign={'right'}>{competitors?.away?.name}</SCompetitors>
            </SAlignCenterContainer>
        </SMainContainer>
    )
}
const RegularBanner: React.FC<ComponentProps> = ({ convertedData, fixtureId }) => {
    const { sports } = useCustomParams()

    const detailSportsSwitcher = () => {
        switch (sports) {
            case 'football':
            case 'basketball':
            case 'tennis':
            case 'baseball':
                return (
                    <FootballBanner
                        competitors={convertedData?.info?.competitors}
                        startTime={convertedData?.info.startTime}
                    />
                )
            default:
                return (
                    <FootballBanner
                        competitors={convertedData?.info?.competitors}
                        startTime={convertedData?.info.startTime}
                    />
                )
        }
    }
    return <>{detailSportsSwitcher()}</>
}

export default RegularBanner
