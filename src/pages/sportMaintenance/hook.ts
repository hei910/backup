import { useSelector } from '@redux'
import useCopyRight from '@hooks/useCopyRight'

export default () => {
    const { appMainDomain, brandName } = useSelector((state) => state.app.brandInfo)
    const qrCodeUrl = `${appMainDomain}${'/mobile/sports/home'}`
    const copyRight = useCopyRight()

    return {
        qrCodeUrl,
        copyRight,
        brandName,
    }
}
