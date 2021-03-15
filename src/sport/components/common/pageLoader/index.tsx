import img_logo_1 from 'assets/img/ui/loading/v3-loading-font-6-o2.svg'
import img_logo_2 from 'assets/img/ui/loading/v3-loading-font-6-w2.svg'
import img_logo_3 from 'assets/img/ui/loading/v3-loading-font-8-w1.svg'
import img_logo_4 from 'assets/img/ui/loading/v3-loading-font-name.svg'
import React, { useEffect, useState } from 'react'
import { useSelector } from '@sport/stores'
import { SLogoNum, SLogoTxt, SPageLoader, SPageLoaderWrapper } from './styles/styles'

// Interface & types
interface IProps {}

const logoItems = [img_logo_1, img_logo_1, img_logo_2, img_logo_3, img_logo_4]
let timer: any = null

const PageLoader: React.FC<IProps> = (props) => {
    // const { display } = props;
    // const [display, setDisplay] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)
    const show = useSelector((state) => state.sportGlobal.isGlobalLoading)

    useEffect(() => {
        initCustomLoading(900)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const initCustomLoading = (speed: number) => {
        timer = setInterval(function () {
            setActiveIndex((prev) => (prev < logoItems.length - 1 ? prev + 1 : 0))
        }, speed)
    }

    const renderLogoItems = () => {
        return logoItems.map((item, idx) => {
            const Component = idx !== logoItems.length - 1 ? SLogoNum : SLogoTxt

            return (
                <Component key={idx} active={idx === activeIndex}>
                    <img src={item} alt="" />
                </Component>
            )
        })
    }

    if (!show) return null

    return (
        <SPageLoader>
            <SPageLoaderWrapper>{renderLogoItems()}</SPageLoaderWrapper>
        </SPageLoader>
    )
}

export default PageLoader
