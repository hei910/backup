import React from 'react'
import BetMatchDetail from './betMatchDetail'

interface BetDetailSwitcherProps {
    convertedData?: any
    seasonGames?: any
}

const BetDetailSwitcher: React.FC<BetDetailSwitcherProps> = ({ convertedData, seasonGames }) => (
    <div>
        <BetMatchDetail convertedData={convertedData} seasonGames={seasonGames} />
    </div>
)

const BetDetailPanel: React.FC<BetDetailSwitcherProps> = ({ convertedData, seasonGames }) => {
    // const { market, sports, fixtureId, date } = useCustomParams();
    // const dummyData = null;

    // if (sampleData) {
    //     try {
    //         if (importedData) {
    //             dummyData = importedData;
    //         } else if (date === 'inplay') {
    //             dummyData = require(`dummyData/${sports}-inplay-${market}-${dataSource.toLocaleLowerCase()}.json`);
    //         } else {
    //             dummyData = require(`dummyData/${sports}-detail-${market}-${dataSource.toLocaleLowerCase()}.json`);
    //         }
    //     } catch (error) {
    //         //skip if dummyData file not exist
    //     }
    // }

    return <BetDetailSwitcher convertedData={convertedData} seasonGames={seasonGames} />
}

export default BetDetailPanel
