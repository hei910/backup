import styled from 'styled-components/macro'
import useMobileAppBanner from './hook'
import { getImgSrc } from '@utils/img'

interface IMobileAppBannerProps {
    withPadding?: boolean
}

const BannerWrapper = styled.div<{ withPadding?: boolean }>`
    padding: ${(props) => (props.withPadding ? '0 12px' : 0)};
`

const Banner = styled.img`
    width: 100%;
    margin-bottom: 20px;
`

const MobileAppBanner: React.FC<IMobileAppBannerProps> = ({ withPadding }) => {
    const { banner, isShown } = useMobileAppBanner()

    if (!isShown || !banner) return null

    return (
        <BannerWrapper withPadding={withPadding}>
            <Banner src={getImgSrc(banner.imgUrl)} onClick={banner.onClick} />
        </BannerWrapper>
    )
}

export default MobileAppBanner
