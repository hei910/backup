import { SoccerIcon } from '@sport/components/icons'
import React from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import { bounce, rotate, shadow } from '@sport/styles/common/keyframes'

const SPageLoader = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background: #323232;
    z-index: 30;
    opacity: 0.9;
`

const SPageLoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const SLoader = styled.div`
    position: absolute;
    top: 50%;
    font-size: 1rem;
`

const SFootballIconWrap = styled.div`
    animation: ${bounce} 0.5s infinite alternate cubic-bezier(1, 0.12, 0.87, 1);
`

const SSoccerIcon = styled(SoccerIcon)`
    display: block;
    position: relative;
    width: 2.5em;
    height: 2.5em;
    z-index: 1;
    animation: ${rotate} 2s linear infinite;

    path {
        fill: #c4c4c4;
    }
`

const SShadow = styled.div`
    display: block;
    position: relative;
    width: 2em;
    height: 1em;
    background-color: #858585;
    border-radius: 50%;
    opacity: 0.4;
    margin: -0.4em auto;
    z-index: 0;
    animation: ${shadow} 0.5s infinite alternate cubic-bezier(1, 0.12, 0.87, 0.9);
`

const PageLoader: React.FC = (props: any) => {
    const show = useSelector((state) => state.sportGlobal.isGlobalLoading)

    if (!show) return null

    return (
        <SPageLoader>
            <SPageLoaderWrapper>
                <SLoader>
                    <SFootballIconWrap>
                        <SSoccerIcon />
                    </SFootballIconWrap>
                    <SShadow />
                </SLoader>
            </SPageLoaderWrapper>
        </SPageLoader>
    )
}

export default PageLoader
