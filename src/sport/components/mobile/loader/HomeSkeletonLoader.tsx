import React from 'react'
import styled from 'styled-components/macro'
import { device } from '@sport/styles/common/device'
import MSkeletion from './MSkeletion'

const MSSkeletion = styled(MSkeletion)`
    /* width: ${(props) => (props.width ? props.width.toString() : '25')}%;
    height: 25px;
    margin: 10px; */
`

const SLoaderWrap = styled.div`
    border-radius: 10px;
    background: white;
    margin: 10px 8px;
`

const SLoaderTitleWrap = styled.div`
    width: 100%;
    display: flex;
    border-bottom: 1px solid #e2e2e2;
    justify-content: space-between;
`

const SCount = styled(MSSkeletion)`
    width: 30px;
    height: 30px;
`

const STeamWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-direction: column;

    @media ${device.tablet} {
        flex-direction: row;
    }
`

const SContentWrap = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        border-bottom: 1px solid ${(props) => props.theme.sport.colors.table.column.border};
    }
`

const HomeSkeletonLoader: React.FC = () => {
    return (
        <>
            <SLoaderWrap>
                <SLoaderTitleWrap>
                    <MSSkeletion width={20} />
                    <SCount />
                </SLoaderTitleWrap>
                <STeamWrap>
                    <SContentWrap>
                        <MSSkeletion width={25} />
                        <MSSkeletion width={70} />
                        <MSSkeletion width={70} />
                    </SContentWrap>
                    <SContentWrap>
                        <MSSkeletion width={28} />
                        <MSSkeletion width={70} />
                        <MSSkeletion width={70} />
                    </SContentWrap>
                </STeamWrap>
            </SLoaderWrap>
        </>
    )
}

export default HomeSkeletonLoader
