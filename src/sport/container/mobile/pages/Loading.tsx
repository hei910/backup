import { NavFootballIconRotate } from '@sport/components/icons'
import React from 'react'
import styled from 'styled-components/macro'

const SLoadingLayout = styled.div`
    display: flex;
    height: 80vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const SLoadingIcon = styled(NavFootballIconRotate)`
    width: 55px;
    height: 55px;

    path {
        fill: #ffffff;
    }
`

const LoadingPage: React.FC<{}> = () => {
    return (
        <SLoadingLayout>
            <SLoadingIcon />
        </SLoadingLayout>
    )
}

export default LoadingPage
