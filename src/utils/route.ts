import Pages from '@pages'

export const getRoutePath = (path: string, matchParams?: string[]) =>
    matchParams ? `${path}/${(matchParams || []).join('/')}` : path

export const getPageKeyByRouterPath = (routerPath: string) => {
    const pageKey = Object.keys(Pages).filter(
        (pageKey) => getRoutePath(Pages[pageKey].path, Pages[pageKey].params) === routerPath,
    )[0]
    if (pageKey) return pageKey
    else if (routerPath === '/regionBlock') return 'regionblock'
    else return ''
}
