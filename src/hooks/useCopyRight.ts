import { useSelector } from '@redux'
import useTranslation from '@hooks/useTranslation'

const currentYear = new Date().getFullYear()

export default () => {
    const { brandName } = useSelector((state) => state.app.brandInfo)
    const t = useTranslation()

    return t('general.components.footer.copyRight', { currentYear, brandName })
}
