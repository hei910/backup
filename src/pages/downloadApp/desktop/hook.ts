import { useSelector } from '@redux'
import mobilePages from '@pages/mobile'

export default () => {
    const { brandName } = useSelector((state) => state.app.brandInfo)
    const { ios, android } = useSelector((state) => state.download)
    const downloadAppTutorPath = mobilePages.downloadAppTutorial.path

    return {
        brandName,
        iosAppVersion: ios.version,
        androidAppVersion: android.version,
        qrCodeUrl: `${window.location.origin}/m20${downloadAppTutorPath}`,
    }
}
