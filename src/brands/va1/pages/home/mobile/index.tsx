import LinkColumns from './linkColumns'
import styled from 'styled-components/macro'
import useHome from './hook'
import JetsoSection from '@components/mobile/jetsoSection'
import BannerSection from '@components/mobile/bannerSection'
import MobileAppBanner from '@components/mobile/mobileAppBanner'

const Container = styled.div`
    background: linear-gradient(180deg, #373737 25%, #f0f1f3 25%);
    padding: 0 8px;
`

const HomePage: React.FC<{}> = () => {
    const { isArticlesReady, articles, bottomBanner } = useHome()

    return (
        <>
            <Container>
                <LinkColumns />
                <MobileAppBanner />
                <JetsoSection articles={articles} isReady={isArticlesReady} />
            </Container>
            <BannerSection src={bottomBanner.imgUrl} onClick={bottomBanner.onClick} />
        </>
    )
}

export default HomePage
