import { ConvertedEvent } from '@sport/converters/types'

export interface DetailComponentProps {
    data: ConvertedEvent
    marketCode: string
    ctid?: number
    firstHalf?: boolean
    title: string
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
