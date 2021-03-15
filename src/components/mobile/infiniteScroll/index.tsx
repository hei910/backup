import { useEffect } from 'react'
import styled from 'styled-components/macro'
import InfiniteScroller from 'react-infinite-scroller'
import { useDispatch } from '@redux'
import bgImg from '@mixins/backgroundImg'
import rotation from '@mixins/rotation'
import { setLayoutVisibility } from '@services/layout/action'
import SpinnerImage from '@brand/assets/images/spinner.png'

type InfiniteScrollerProps = InfiniteScroller['props']

const newDesignBrands = ['vc3', 'vf6', 'vk11']
const isNewBrand = newDesignBrands.includes(process.env.BRAND_CODE)

const SBottomContainer = styled.div`
    height: 25px;
    width: 100%;
    ${rotation(2)}
`

const SSpinner = styled.div`
    height: 25px;
    width: 10%;
    margin: 0 auto 10px auto;
    ${bgImg(SpinnerImage, 'auto 100%')};
    ${rotation(4)}
`

const InfiniteScroll: React.FC<InfiniteScrollerProps> = ({ children, hasMore, ...rest }) => {
    const dispatch = useDispatch()
    const getScrollParent = () => {
        return (document.querySelector('#layout-container') as HTMLElement) || null
    }

    useEffect(() => {
        dispatch(
            setLayoutVisibility({
                footer: !hasMore,
            }),
        )
    }, [hasMore, dispatch])

    return (
        <InfiniteScroller
            {...rest}
            initialLoad={false}
            hasMore={hasMore}
            getScrollParent={isNewBrand ? getScrollParent : undefined}
            useWindow={!isNewBrand}>
            {children}
            {hasMore && (
                <SBottomContainer>
                    <SSpinner />
                </SBottomContainer>
            )}
        </InfiniteScroller>
    )
}

export default InfiniteScroll
