import { ConvertedEvent, ConvertedOutcomes } from '@sport/converters/types'
import { NewCompetitors } from '@services/sportData/types'

export interface DetailComponentProps {
    data: ConvertedEvent
    marketCode: string
    ctid?: number
    firstHalf?: boolean
    title: string
    competitors?: NewCompetitors
}

export interface CtidComponentProps {
    data: ConvertedEvent
    // marketCode: string;
    ctid: number
    firstHalf?: boolean
}

export interface PenaltyComponentProps {
    data: ConvertedEvent[]
    ctid: number
    firstHalf?: boolean
    title?: string
    marketCode?: string
}

export interface EpsComponentProps {
    data: ConvertedEvent[]
    ctid: number
    marketCode: string
}

export interface TableBodyOutcomeObjectProps {
    outcomes: ConvertedOutcomes
}
