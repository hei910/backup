import { lazy, useEffect } from 'react'
import { IRegionBlockProps } from './types'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import { directToHomePage } from '@utils/v1Functions'

const BrandRegionBlock: React.FC<IRegionBlockProps> = lazy(
    () => import(`@brand/pages/regionBlock/${process.env.APP_PLATFORM}`),
)

const RegionBlock: React.FC = () => {
    const clientIp = useSelector((state) => state.user.ipInfo.ip)
    const isAllowAccess = useSelector((state) => state.user.isAllowAccess)
    const t = useTranslation()

    useEffect(() => {
        if (process.env.NODE_ENV === 'production' && clientIp && isAllowAccess) {
            directToHomePage()
        }
    }, [isAllowAccess, clientIp])

    useEffect(() => {
        document.title = t('regionBlock.forbiddenAccess')
    }, [t])

    return <BrandRegionBlock ip={clientIp} />
}

export default RegionBlock
