import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useSelector } from '@redux'
import CommonPanel from './panel'

interface BetPanelProps {
    children: (data: any) => void
}

const MBetPanel: React.FC<BetPanelProps> = ({ children }) => {
    const { sports, date, isHomePage, isOutrightPage } = useCustomParams()

    const sampleData = useSelector((state) => state.sportData.sampleData)
    const dataSource = useSelector((state) => state.sportGlobal.dataSource)
    const isInplay = date === 'inplay'
    const market = isOutrightPage ? 'or' : 'am'

    let dummyData

    if (sampleData) {
        try {
            if (isHomePage) {
                dummyData = require(`dummyData/m-home-${dataSource}.json`)
            } else if (isOutrightPage) {
                dummyData = require(`dummyData/m-outright-${sports}-${dataSource}.json`)
            } else {
                dummyData = require(`dummyData/${sports}${isInplay ? '-inplay' : ''}-${market}-${dataSource}.json`)
            }
        } catch (error) {
            //skip if dummyData file not exist
        }
    }

    return <CommonPanel apiData={dummyData}>{children}</CommonPanel>
}

export default MBetPanel
