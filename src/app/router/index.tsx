import { useEffect, lazy, useMemo } from 'react'
import { Switch, useHistory, Redirect } from 'react-router-dom'
import { useSelector } from '@redux'
import Pages from '@pages'
import RegionBlockPage from '@pages/regionBlock'
import AppRoute from './appRoute'
import { getRoutePath } from '@utils/route'

const REGION_BLOCK_PATH = '/regionBlock'

const EXCLUDE_MAINTENANCE_LIST = [Pages.downloadApp.path]

const Layout = lazy(() => import(`@brand/components/${process.env.APP_PLATFORM}/layout`))

const renderRoutes = Object.keys(Pages).map((pageKey) => {
    const { component: PageComponent, params, path, allowSubRoute } = Pages[pageKey]
    const pagePath = getRoutePath(path, params)

    return (
        <AppRoute key={path} exact={!allowSubRoute} path={pagePath} pageKey={pageKey}>
            <PageComponent />
        </AppRoute>
    )
})

const Router = () => {
    const isAppMaintenance = useSelector((state) => state.app.isAppMaintenance)
    const isAllowAccess = useSelector((state) => state.user.isAllowAccess)
    const history = useHistory()
    const isPageMaintenance = useMemo(
        () =>
            isAppMaintenance &&
            history.location.pathname !== Pages['sportMaintenance']?.path &&
            !EXCLUDE_MAINTENANCE_LIST.includes(history.location.pathname),
        [history.location.pathname, isAppMaintenance],
    )

    useEffect(() => {
        if (!isAllowAccess) {
            history.push(REGION_BLOCK_PATH)
        } else if (isPageMaintenance) {
            history.push(Pages.maintenance.path)
        }
    }, [history, isAllowAccess, isPageMaintenance])

    return (
        <Switch>
            <AppRoute exact path={REGION_BLOCK_PATH} pageKey="regionblock">
                <RegionBlockPage />
            </AppRoute>
            <Layout>
                <Switch>
                    {renderRoutes}
                    <Redirect to="/" />
                </Switch>
            </Layout>
        </Switch>
    )
}

export default Router
