import { isAndroid } from '@utils/userAgent'
import styled from 'styled-components/macro'
import anScreen from '@brand/assets/images/downloadAppTutorial/screen-an.png'
import iosScreen from '@brand/assets/images/downloadAppTutorial/screen-ios.png'
import anTitle from '@brand/assets/images/downloadAppTutorial/title-an.png'
import iosTitle from '@brand/assets/images/downloadAppTutorial/title-ios.png'

import useInitial from './hook'

const Container = styled.div`
    min-height: 100%;
    width: 100%;
    background-image: linear-gradient(to bottom, #0988de, #26defd);
`

const Img = styled.img`
    display: block;
    max-width: 100%;
`

const DownloadAppTutorial: React.FC<{ targetPath?: string }> = ({ targetPath }) => {
    const isReady = useInitial(targetPath)

    return isReady ? (
        <Container>
            <Img src={isAndroid() ? anTitle : iosTitle} />
            <Img src={isAndroid() ? anScreen : iosScreen} />
        </Container>
    ) : null
}

export default DownloadAppTutorial
