import { useState } from 'react'
import styled from 'styled-components/macro'
import SportPreview from './SportPreview'
import Introduction from './Introduction'
import usePopularData from '@hooks/usePopularData'
import { sIdType } from '@type'

const SOutLayout = styled.div`
    width: 100vw;
    height: 100%;
    overflow: hidden;
`

const SLayout = styled.div`
    display: flex;
    min-width: 1366px;
    max-width: 1440px;
    overflow: hidden;
    margin: auto;
    height: 100%;
`

const SLeftSection = styled.div`
    display: flex;
    min-width: 1000px;
    min-height: 520px;
`

const SRightSection = styled.div`
    display: flex;
    flex-grow: 1;
    background: #fdfdfd;
    min-height: 500px;
`

const HomePage = () => {
    const [sId, setSId] = useState<sIdType>('1')
    const { data, loading, error } = usePopularData({ sId })

    const onSIdChange = (sId: sIdType) => {
        setSId(sId)
    }

    return (
        <SOutLayout>
            <SLayout>
                <SLeftSection>
                    <Introduction />
                </SLeftSection>
                <SRightSection>
                    <SportPreview
                        data={data}
                        dataLoading={loading}
                        dataError={error}
                        onSIdChange={onSIdChange}
                        currentSId={sId}
                    />
                </SRightSection>
            </SLayout>
        </SOutLayout>
    )
}

export default HomePage
