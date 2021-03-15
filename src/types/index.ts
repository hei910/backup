import theme from '@styles/theme'

export type GenericObject = Record<string, any>

export type Theme = typeof theme

export type sIdType = '1' | '2' | '3' | '4'

export type ISportItem = {
    title: string
    sId: sIdType
}

export type IPopularData = {
    events: {
        competitors: {
            away: {
                name: string
            }
            home: {
                name: string
            }
        }
        ctid: number
        description: string
        fixtureId: string
        liveStatusText: string
        markets: Record<
            string,
            {
                ename: string
                header: string
                marketCode: string
                market_id: string
                name: string
                outcomes: Record<
                    string,
                    {
                        active: number
                        euOdds: string
                        id: string
                        name: string
                        odds: string
                        outcomeCode: string
                        specifier: string
                    }
                >
            }
        >
        score: {
            homeScore: number
            awayScore: number
            hRedCard: number
            aRedCard: number
        }
    }
    info: {
        animationProviderVendor: null | string
        clock: string
        hasParlay: boolean
        haveLiveMatch: boolean
        isNeutral: boolean
        liveStatus: string
        liveStatusText: string
        matchId: string
        round: string
        scoreBarInfo: {
            period: string
        }
        source: string
        startTime: string
        status: string
        totalMarkets: number
        upComingInplay: any
        videoMid: string | null
        videoVendor: string | null
    }
    seasonInfo: {
        name: string
        sId: string
        seasonId: string
    }
}
