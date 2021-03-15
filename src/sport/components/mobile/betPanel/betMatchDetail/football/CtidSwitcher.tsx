import { ConvertedEvent } from '@sport/converters/types'
import React from 'react'
import { newAhOuCtid, newCornerBallMarketCode, newOtherDetailGames } from '@sport/util/dataProcess'
import TableCommon from '../TableCommon'
import CtidMarketCodeSwitcher from './CtidMarketCodeSwitcher'

interface ComponentProps {
    data: ConvertedEvent[]
    ctid: number
    fixtureId?: string
}

const CtidSwitcher: React.FC<ComponentProps> = ({ data, ctid, fixtureId }) => {
    // console.log(ctid);

    const renderAhOuGames = () => {
        return (
            <>
                {newAhOuCtid(data).map((ctid, index) => (
                    <CtidMarketCodeSwitcher key={`CtidSwitcher-renderAhOu-${index}`} data={data} ctid={ctid} />
                ))}
            </>
        )
    }
    const renderFirstHalfGames = (corner: number, penalty: number, homeTeam: number, awayTeam: number) => {
        const cornerData = newOtherDetailGames(data, corner)[0]
        const homeTeamGoalsData = newOtherDetailGames(data, homeTeam)
        const awayTeamGoalsData = newOtherDetailGames(data, awayTeam)
        const penaltyData = newOtherDetailGames(data, penalty)

        return (
            <>
                {cornerData && (
                    <>
                        <CtidMarketCodeSwitcher data={data} ctid={corner} firstHalf={true} />
                    </>
                )}
                {penaltyData && <CtidMarketCodeSwitcher data={data} ctid={penalty} firstHalf={true} />}

                {homeTeamGoalsData.length > 0 && (
                    <CtidMarketCodeSwitcher data={data} ctid={homeTeam} firstHalf={true} />
                )}
                {awayTeamGoalsData.length > 0 && (
                    <>
                        <CtidMarketCodeSwitcher data={data} ctid={awayTeam} firstHalf={true} />
                    </>
                )}
            </>
        )
    }
    const renderOtherGames = () => {
        const cornerData = newOtherDetailGames(data, 1)[0]
        const penaltyData = newOtherDetailGames(data, 2)[0]
        const correctCompetitors = data.filter((fixture: ConvertedEvent) => fixture.ctid === 0)[0].competitors
        const cornerSwitcher = (marketCode: string) => {
            switch (marketCode) {
                case 'sp':
                    return (
                        <TableCommon
                            data={cornerData}
                            marketCode={marketCode}
                            ctid={ctid}
                            competitors={correctCompetitors}
                        />
                    )
            }
        }
        return (
            <>
                {cornerData && (
                    <>
                        {newCornerBallMarketCode(cornerData).map((marketCode, index) => (
                            <div key={index}>{cornerSwitcher(marketCode)}</div>
                        ))}
                    </>
                )}
                {penaltyData && (
                    <>
                        <CtidMarketCodeSwitcher data={data} ctid={2} />
                    </>
                )}
            </>
        )
    }

    const ctidSwitcher = (ctid: number) => {
        switch (ctid) {
            // // case number added for rendering 1st half filter
            case 244:
                return renderFirstHalfGames(1, 2, 12, 13)
            // case number added for rendering other filter
            case 255:
                return renderOtherGames()
            case 233:
                return renderAhOuGames()
            default:
                return <CtidMarketCodeSwitcher data={data} ctid={ctid} />
        }
    }
    return <>{ctidSwitcher(ctid)}</>
}

export default CtidSwitcher
