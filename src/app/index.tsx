import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Loading from '@components/common/loading'
import AppRouter from './router'
import useInitial from './hook'
import AppLoading from './loading'
import AppModals from './modals'
import LocalesProvider from './localesProvider'

export default () => {
    useInitial()

    return (
        <BrowserRouter basename={process.env.BASE_NAME}>
            <Suspense fallback={<Loading />}>
                <LocalesProvider>
                    <AppRouter />
                    <AppLoading />
                    <AppModals />
                </LocalesProvider>
            </Suspense>
        </BrowserRouter>
    )
}
