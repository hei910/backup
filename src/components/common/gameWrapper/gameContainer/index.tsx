import newWindowGameContainer from './newWindowGameContainer'
import floatingBtnGameContainer from './floatingBtnGameContainer'
import currentWindowGameContainer from './currentWindowGameContainer'
// import useSupplierMaintenanceInit from '@hooks/useSupplierMaintenance'
import GameContainerModes from '@constants/gameContainerMode'
import { useContext } from 'react'
import { GameContext } from '@app/gameProvider'

type TEnterGameContainer = Record<string, React.FC>

const GameContainers: TEnterGameContainer = {
    [GameContainerModes.iframe]: floatingBtnGameContainer,
    [GameContainerModes.popup]: newWindowGameContainer,
    [GameContainerModes.redirect]: currentWindowGameContainer,
}

const GameContainer = () => {
    const { gameContainerMode } = useContext(GameContext)
    // const supplier = gameInfo.selectedSupplier
    // const supplierMaintenance = useSupplierMaintenanceInit()
    // const enterGameMethod = supplierMaintenance[supplier!] ? supplierMaintenance[supplier!].enterGameMethod : ''
    const FinalGameContainer = GameContainers[gameContainerMode]

    if (!FinalGameContainer) {
        console.error('[GameContainer] Error! Invalid game container mode:', gameContainerMode)
        return null
    }
    return <FinalGameContainer />
}

export default GameContainer
