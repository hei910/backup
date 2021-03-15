import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

interface IProps {
    searchWord: string
}

const Container = styled.div`
    ${(props) => props.theme.typography.Body1}
    min-width: 100%;
    min-height: 100%;
    text-align: center;
`

const SMEmptyResult: React.FC<IProps> = ({ searchWord }) => {
    const t = useTranslation()

    return (
        <Container>
            {t('slotMachine.emptyResult.span1', { searchWord })}
            <br />
            {t('slotMachine.emptyResult.span2')}
        </Container>
    )
}

export default SMEmptyResult
