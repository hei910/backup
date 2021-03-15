import blockCover from '@sport/assets/img/block-background.jpg'
import blockText from '@sport/assets/img/block-text.png'
import React from 'react'
import styled from 'styled-components/macro'

const SLayout = styled.div<{
    isMobile: boolean
}>`
    background: #252524;
    margin: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    font-size: 13px;
    ${({ isMobile }) =>
        !isMobile &&
        `
        min-width: 1366px;
    `}
`

const SCoverImg = styled.img``

const SBlockTextImg = styled.img`
    margin-top: 40px;
`

const SBlockLayout = styled.div`
    padding: 0 30px;
`

const STextLayout = styled.div`
    margin: 20px auto 0 auto;
    padding: 0 20px;
    max-width: 450px;
    text-align: left;
    color: #fff;
`

const SIpLayout = styled.div`
    margin-top: 25px;
    color: #fff;
`

const RegionBlock: React.FC<{ isMobile: boolean; clientIp: string }> = ({ clientIp, isMobile }) => {
    return (
        <SLayout isMobile={isMobile}>
            <SCoverImg src={blockCover} alt={'block-cover'} />
            <SBlockLayout>
                <SBlockTextImg src={blockText} alt={'block-text'}></SBlockTextImg>
                <STextLayout>
                    <div>亲爱的用户：</div>
                    <div>由于您的国家和地区限制，我们无法为您提供服务。</div>
                    <div>我们很抱歉给您带来不便，非常感谢您的支持。</div>
                </STextLayout>
                <SIpLayout>阁下现在的IP 为: {clientIp}</SIpLayout>
            </SBlockLayout>
        </SLayout>
    )
}

export default RegionBlock
