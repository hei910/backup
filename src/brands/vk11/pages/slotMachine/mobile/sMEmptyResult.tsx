import React from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import NoneImg from '@brand/assets/images/slotMachine/none.png'
import bgImg from '@mixins/backgroundImg'

const Container = styled.div`
    padding: 0 13px;
    background-color: #f5f5f5;
    width: 100%;
`

const Title = styled.p`
    ${(props) => props.theme.typography.Subtitle1}
    color: #fd8524;
    margin: 0;
`

const NoneLogo = styled.div`
    ${bgImg(NoneImg)}
    margin: 0 auto;
    width: 77.5px;
    height: 81px;
    margin-top: 76px;
`

const Content = styled.p`
    ${(props) => props.theme.typography.Body2}
    color: #626d8e;
    text-align: center;
    margin: 5px auto 0;
`

const SMEmptyResult: React.FC = () => {
    const t = useTranslation()

    return (
        <Container>
            <Title>{t('slotMachine.emptyResult.span1')}</Title>
            <NoneLogo data-qa="imgNoResults" />
            <Content data-qa="txtNoResults">{t('slotMachine.emptyResult.span2')}</Content>
        </Container>
    )
}

export default SMEmptyResult
