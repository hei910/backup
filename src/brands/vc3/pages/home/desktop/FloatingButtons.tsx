import React, { useCallback, useEffect, useRef, useState } from 'react'
import CoreQrCode from 'qrcode.react'
import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import { directToSport } from '@utils/v1Functions'
import brandLogo from '@brand/assets/images/home/9393-qr.svg'
import logoCsActive from '@brand/assets/images/home/cs-g.svg'
import logoCs from '@brand/assets/images/home/cs-w.svg'
import logoWechatActive from '@brand/assets/images/home/wechat-g.svg'
import logoWechat from '@brand/assets/images/home/wechat-w.svg'
import logoBallActive from '@brand/assets/images/home/ball-g.svg'
import logoBall from '@brand/assets/images/home/ball-w.svg'
import activeBg from '@brand/assets/images/home/gold-hover.svg'

const SLayout = styled.div`
    position: fixed;
    right: 15px;
    bottom: 130px;
    z-index: 10;
`

const SBackgroundLayout = styled.div`
    background: #0c186c;
    border-radius: 12px;
`

const SAppLayout = styled.div`
    position: absolute;
    top: 58px;
    right: 65px;
    background: #0c186c;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    box-shadow: 0 4px 5px 0 #505050;
`

const SAppText = styled.div`
    margin-top: 9px;
    font-size: 16px;
    color: #fff;
`

const SIconLayout = styled.div<{ bg: string; activeBg: string }>`
    width: 50px;
    height: 50px;
    background: url(${(props) => props.bg}) center no-repeat;
    background-size: 60% 60%;
    cursor: pointer;

    &:hover {
        ${(props) => `
            background: url(${props.activeBg}) center no-repeat, url(${activeBg}) center no-repeat, linear-gradient(to bottom, #f9b87f , #fce0c8) left no-repeat;
            background-size: 50% 50%, 70% 70%, 3px 30px;
        `};
    }
`

const FloatingButtons = () => {
    const weChatRef = useRef<HTMLDivElement | null>(null)
    const [isWechatHover, setIsWechatHover] = useState(false)
    const csWxLink = useSelector((state) => state.app.brandInfo.csWxLink)
    const csLink = useSelector((state) => state.app.brandInfo.csLink)

    const handleMouseOver = () => setIsWechatHover(true)
    const handleMouseOut = () => setIsWechatHover(false)

    useEffect(() => {
        const node = weChatRef.current
        if (node) {
            node.addEventListener('mouseover', handleMouseOver)
            node.addEventListener('mouseout', handleMouseOut)

            return () => {
                node.removeEventListener('mouseover', handleMouseOver)
                node.removeEventListener('mouseout', handleMouseOut)
            }
        }
    }, [])

    const onCsLinkClick = useCallback(() => {
        window.open(csLink)
    }, [csLink])

    return (
        <SLayout>
            <SBackgroundLayout>
                <SIconLayout
                    bg={logoCs}
                    activeBg={logoCsActive}
                    onClick={onCsLinkClick}
                    title="在线客服"
                    data-qa="btnFloatingItemCs"
                />
                <SIconLayout
                    ref={weChatRef}
                    bg={logoWechat}
                    activeBg={logoWechatActive}
                    title="微信客服"
                    data-qa="btnFloatingItemWechat"
                />
                <SIconLayout
                    bg={logoBall}
                    activeBg={logoBallActive}
                    onClick={directToSport}
                    title="体育"
                    data-qa="btnFloatingItemSport"
                />
            </SBackgroundLayout>
            {isWechatHover && (
                <SAppLayout>
                    <CoreQrCode
                        value={csWxLink}
                        level="H"
                        renderAs="svg"
                        includeMargin={true}
                        size={160}
                        imageSettings={{
                            src: brandLogo,
                            height: 40,
                            width: 40,
                            excavate: true,
                        }}
                        data-qa="imgWechatQrCode"
                    />
                    <SAppText>微信客服</SAppText>
                </SAppLayout>
            )}
        </SLayout>
    )
}

export default FloatingButtons
