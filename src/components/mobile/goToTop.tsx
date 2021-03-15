import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import ToTopImage from '@brand/assets/images/goToTop.png'
import { scrollToTop } from '@utils/v1Functions'

type IbuttonProps = {
    show: boolean
}

const TopButton = styled.div<IbuttonProps>`
    background: url(${ToTopImage}) no-repeat center;
    background-size: 100%;
    width: 40px;
    height: 40px;
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 10px;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: 10;
`

const GoToTop = () => {
    const [showButton, setShowButton] = useState(false)
    const scrollCheck = useCallback((e: any) => {
        window.pageYOffset > window.innerHeight / 2 || e.target.scrollTop > window.innerHeight / 2
            ? setShowButton(true)
            : setShowButton(false)
    }, [])
    const onButtonClick = useCallback((e: any) => {
        scrollToTop()
        document.getElementById('layout-container')?.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', scrollCheck)
        document.getElementById('layout-container')?.addEventListener('scroll', scrollCheck)
        return () => {
            window.removeEventListener('scroll', scrollCheck)
            document.getElementById('layout-container')?.removeEventListener('scroll', scrollCheck)
        }
    }, [scrollCheck])

    return <TopButton show={showButton} onClick={onButtonClick} />
}

export default GoToTop
