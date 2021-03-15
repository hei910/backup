import BannerSwiper from './BannerSwiper'
import Feature from './Feature'
import PopularLive from './PopularLive'
import AppDownload from './AppDownload'
import styled from 'styled-components/macro'
import TopGame from './TopGame'
import HomeFooter from './HomeFooter'
import FloatingButtons from './FloatingButtons'

import backgroundPattern from '@brand/assets/images/home/pattern_bg.png'

const SLayout = styled.div`
    max-width: 1024px;
    margin: auto;
    padding-top: 24px;

    * {
        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-button {
            width: 0px;
            height: 0px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 50px;
            background: rgba(141, 150, 160, 0.6);
        }

        ::-webkit-scrollbar-track {
            display: block;
            background: #f2f2f2;
        }
    }
`

const SBackground = styled.div`
    background-image: url(${backgroundPattern});
    background-position: top center;
    background-repeat: no-repeat;
    background-color: #f5f6f9;
`

const SPopularLiveLayout = styled.div`
    margin-top: 64px;
`

const SFeatureLayout = styled.div`
    margin-top: 64px;
`

const SAppDownloadLayout = styled.div`
    margin-top: 64px;
`

const STopGameLayout = styled.div`
    margin-top: 64px;
`

const SFooterLayout = styled.div`
    margin-top: 64px;
    background: #0b186c;
`

const Index = () => {
    return (
        <SBackground>
            <SLayout>
                <BannerSwiper />
                <SFeatureLayout>
                    <Feature />
                </SFeatureLayout>
                <SPopularLiveLayout>
                    <PopularLive />
                </SPopularLiveLayout>
                <SAppDownloadLayout>
                    <AppDownload />
                </SAppDownloadLayout>
                <STopGameLayout>
                    <TopGame />
                </STopGameLayout>
            </SLayout>
            <SFooterLayout>
                <HomeFooter />
            </SFooterLayout>
            <FloatingButtons />
        </SBackground>
    )
}

export default Index
