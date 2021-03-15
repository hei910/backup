import React from 'react'
import styled from 'styled-components/macro'
import MSkeletion from './MSkeletion'

const MSSkeletion = styled(MSkeletion)`
    height: 20px;
    margin: 10px;
    max-width: 250px;
`

const SRootContainer = styled.div`
    background: ${(props) => props.theme.sport.colors.text.background};
`

const SSkeletonContainer = styled.div`
    margin-top: -5px;
    margin-bottom: 20px;
`

const SHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    background: ${(props) => props.theme.sport.colors.text.background};
    box-shadow: 0 1.5px 9.5px 0 rgba(0, 0, 0, 0.1);
`

const SHeaderRContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 50%;
`

const SHeaderRSkeletion = styled(MSSkeletion)`
    max-width: 55px;
    margin: 10px 5px;
`

const SSubHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

const SContectContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const SContectLContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const SContectRContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const SOddsBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const TeamSkeletion = styled(MSSkeletion)`
    max-width: 200px;
    height: 25px;
    margin: 15px 10px;
`

const SOddsBtnSkeletion = styled(MSSkeletion)`
    border-radius: 8px;
    max-width: 55px;
    height: 44px;
    margin: 5px;
`

const BetMatchSkeleton = (
    <SSkeletonContainer>
        <SHeaderContainer>
            <MSSkeletion width={25} />
            <SHeaderRContainer>
                <SHeaderRSkeletion width={33} />
                <SHeaderRSkeletion width={33} />
                <SHeaderRSkeletion width={33} />
            </SHeaderRContainer>
        </SHeaderContainer>
        <SSubHeaderContainer>
            <MSSkeletion width={35} />
            <MSSkeletion width={20} />
        </SSubHeaderContainer>
        <SContectContainer>
            <SContectLContainer>
                <TeamSkeletion width={50} />
                <TeamSkeletion width={50} />
            </SContectLContainer>
            <SContectRContainer>
                <SOddsBtnContainer>
                    <SOddsBtnSkeletion width={30} />
                    <SOddsBtnSkeletion width={30} />
                    <SOddsBtnSkeletion width={30} />
                </SOddsBtnContainer>
                <SOddsBtnContainer>
                    <SOddsBtnSkeletion width={30} />
                    <SOddsBtnSkeletion width={30} />
                    <SOddsBtnSkeletion width={30} />
                </SOddsBtnContainer>
            </SContectRContainer>
        </SContectContainer>
    </SSkeletonContainer>
)

const BetMatchSkeletonLoader: React.FC = () => {
    return (
        <SRootContainer>
            {BetMatchSkeleton}
            {BetMatchSkeleton}
        </SRootContainer>
    )
}

export default BetMatchSkeletonLoader
