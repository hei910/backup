import { useState, useEffect } from 'react'
import { RouteProps, Route } from 'react-router-dom'
import { getMaintenanceInfo } from '@services/app/api'
import { MaintenanceGames } from '@services/app/types'
import GameTypes from '@constants/gameTypes'
import useLocalesReady from '@hooks/useLocalesReady'
import Pages from '@pages'
import MaintenanceProvider from '../maintenanceProvider'
import GameProvider from '../gameProvider'

interface MaintainablePageProps {
    pageKey: string
}

const isGamePage = (pageKey: string) => pageKey.toLowerCase() in GameTypes

const MaintainablePage: React.FC<MaintainablePageProps> = ({ pageKey, children }) => {
    const [isMaintenance, setIsMaintenance] = useState(false)
    const [gameMaintenance, setGameMaintenance] = useState<MaintenanceGames[]>([])
    const [maintenanceTime, setMaintenanceTime] = useState('')
    const [isReady, setIsReady] = useState(false)
    const PagesMaintenanceComponent = Pages.maintenance.component

    useEffect(() => {
        const init = async () => {
            const maintenanceData = await getMaintenanceInfo(pageKey.toLowerCase())
            setIsMaintenance(maintenanceData.isMaintenance)
            setGameMaintenance(maintenanceData.games)
            setMaintenanceTime(maintenanceData.time)
            setIsReady(true)
        }
        init()
    }, [pageKey])

    if (!isReady) {
        return null
    }

    return isMaintenance ? (
        <PagesMaintenanceComponent pageKey={pageKey} />
    ) : (
        <MaintenanceProvider supplierMaintenance={gameMaintenance} maintenanceTime={maintenanceTime}>
            {isGamePage(pageKey) ? <GameProvider>{children}</GameProvider> : children}
        </MaintenanceProvider>
    )
}

const AppPage: React.FC<{ pageKey: string }> = ({ pageKey, children }) => {
    const isLocalesReady = useLocalesReady()

    if (!isLocalesReady) {
        return null
    }

    return Pages[pageKey]?.isMaintainable ? (
        <MaintainablePage pageKey={pageKey}>{children}</MaintainablePage>
    ) : (
        <>{children}</>
    )
}

const AppRoute: React.FC<RouteProps & { pageKey: string }> = ({ pageKey, children, ...otherProps }) => {
    return (
        <Route {...otherProps}>
            <AppPage pageKey={pageKey}>{children}</AppPage>
        </Route>
    )
}

export default AppRoute
