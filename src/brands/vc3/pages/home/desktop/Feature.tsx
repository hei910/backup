import { directToJetsoArticle } from '@utils/v1Functions'
import { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'

import bg from '@brand/assets/images/home/Mask.svg'
import useJetso from '@hooks/useJetso'

const SLayout = styled.div`
    height: 100px;
    display: flex;
`

const SItemLayout = styled.div`
    width: 32.66667%;
    display: flex;
    background: #f8f8f8;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.08);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &:not(:first-child) {
        margin-left: 1%;
    }
`

const SDescription = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 8px;
    /* box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.08); */
    border-top-right-radius: 8px;
    ${bgImg(bg, 'cover')}
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
`

const SCover = styled.div<{ bg: string }>`
    width: 52%;
    ${(props) => bgImg(props.bg, 'cover')}
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
`

const STextContainer = styled.div<{ isFocus?: boolean }>`
    font-size: ${(props) => (props.isFocus ? '18px' : '12px')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Feature = () => {
    const { articles, isReady } = useJetso(true)

    const onItemClick = useCallback((rowId: number, contentPath: string) => {
        directToJetsoArticle(rowId, contentPath)
    }, [])

    return (
        <SLayout>
            {isReady &&
                articles?.slice(0, 3).map((item, index) => {
                    return (
                        <SItemLayout
                            key={index}
                            onClick={() => onItemClick(item.rowId, item.contentPath)}
                            data-qa={`btnJetso${index + 1}`}>
                            <SCover bg={`/${item.desktopHomepageUrl}`}></SCover>
                            <SDescription>
                                <STextContainer>{item.title}</STextContainer>
                                <STextContainer isFocus>{item.description}</STextContainer>
                                <STextContainer>{'点击进入详情 >>'}</STextContainer>
                            </SDescription>
                        </SItemLayout>
                    )
                })}
        </SLayout>
    )
}

export default Feature
