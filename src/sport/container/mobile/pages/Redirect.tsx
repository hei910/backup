import React from 'react'
import styled from 'styled-components/macro'
import { getCookieByName, goBackOldVersion } from '@sport/util/general'

const SRedirectLayout = styled.div`
    display: flex;
    height: 80vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: #fff;
`

const SLoginText = styled.span`
    color: #fff;
    margin: 10px;
    cursor: pointer;
`

const RedirectPage: React.FC<{
    isMaintenance: boolean | null
}> = ({ isMaintenance }) => {
    const redirectToLogin = () => {
        const loginReferer = getCookieByName('loginReferer')
        if (loginReferer) {
            goBackOldVersion()
        } else {
            console.log('no referrer is found', loginReferer)
        }
    }

    return (
        <SRedirectLayout>
            <SLoginText onClick={redirectToLogin}>{isMaintenance ? '维护中，' : ''}返回主頁</SLoginText>
        </SRedirectLayout>
    )
}

export default RedirectPage
