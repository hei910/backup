import React from 'react'
import styled from 'styled-components/macro'
import MSkeleton from './MSkeletion'

// const MSSkeleton = styled(MSkeleton)`
//     height: 20px;
//     margin: 10px;
//     max-width: 250px;
// `;

const MSFilterSkeleton = styled(MSkeleton)`
    height: 40px;
    margin: 10px;
    max-width: 250px;
`

const MSBannerSkeleton = styled(MSkeleton)`
    height: 60px;
    margin: 10px;
    max-width: 250px;
`

const MSButtonSkeleton = styled(MSkeleton)`
    height: 50px;
    margin: 10px;
    max-width: 250px;
`

const MSTitleSkeleton = styled(MSkeleton)`
    height: 20px;
    margin: 10px;
`

const SRootContainer = styled.div`
    background: ${(props) => props.theme.sport.colors.text.background};
`

// const SSkeletonContainer = styled.div`
//     margin-top: -5px;
//     margin-bottom: 20px;
// `;

const SFilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    background: ${(props) => props.theme.sport.colors.text.background};
    box-shadow: 0 1.5px 9.5px 0 rgba(0, 0, 0, 0.1);
`

const SColumnContainer = styled.div`
    box-shadow: 0 1.5px 9.5px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${(props) => props.theme.sport.colors.text.background};
`

const SRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background: ${(props) => props.theme.sport.colors.text.background};
`
const STableContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 5px;
    background: ${(props) => props.theme.sport.colors.text.background};
    box-shadow: 0 1.5px 9.5px 0 rgba(0, 0, 0, 0.1);
`

const GameFilterSkeleton = (
    <SFilterContainer>
        <MSFilterSkeleton width={30} />
        <MSFilterSkeleton width={30} />
        <MSFilterSkeleton width={30} />
        <MSFilterSkeleton width={30} />
    </SFilterContainer>
)
const BetDetailSkeleton = (
    <>
        <SFilterContainer>
            <MSBannerSkeleton width={40} />
            <MSBannerSkeleton width={20} />
            <MSBannerSkeleton width={40} />
        </SFilterContainer>
        <STableContainer>
            <MSTitleSkeleton width={60} />

            <SFilterContainer>
                <MSButtonSkeleton width={50} />
                <MSButtonSkeleton width={50} />
            </SFilterContainer>
        </STableContainer>
        <STableContainer>
            <MSTitleSkeleton width={60} />

            <SColumnContainer>
                <SRowContainer>
                    <MSButtonSkeleton width={50} />
                    <MSButtonSkeleton width={50} />
                </SRowContainer>
                <SRowContainer>
                    <MSButtonSkeleton width={50} />
                    <MSButtonSkeleton width={50} />
                </SRowContainer>
            </SColumnContainer>
        </STableContainer>
        <STableContainer>
            <MSTitleSkeleton width={60} />

            <SColumnContainer>
                <SRowContainer>
                    <MSButtonSkeleton width={50} />
                    <MSButtonSkeleton width={50} />
                </SRowContainer>
                <SRowContainer>
                    <MSButtonSkeleton width={50} />
                    <MSButtonSkeleton width={50} />
                </SRowContainer>
            </SColumnContainer>
        </STableContainer>
    </>
)

const DetailSkeletonLoader: React.FC = () => {
    return (
        <SRootContainer>
            {GameFilterSkeleton}
            {BetDetailSkeleton}
        </SRootContainer>
    )
}

export default DetailSkeletonLoader
