import BrandMobilePages from '@brand/pages/mobile'
import BrandDesktopPages from '@brand/pages/desktop'
interface IPage {
    path: string
    params?: string[]
    hideSubheader?: boolean
    hideHeader?: boolean
    hideFooter?: boolean
    component: React.LazyExoticComponent<React.FC<any>>
    isMaintainable?: boolean
    isHeaderLogoCenter?: boolean
    allowSubRoute?: boolean
}

const pages: Record<string, IPage> = process.env.APP_PLATFORM === 'mobile' ? BrandMobilePages : BrandDesktopPages

export default pages
