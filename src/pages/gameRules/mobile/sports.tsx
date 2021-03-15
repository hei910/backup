import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'

const DropdownContainer = styled.div`
    position: relative;
`

const Select = styled.select`
    width: 100%;
    background-color: #ffffff;
    margin-top: 11px;
    padding: 15px 20px;
    border: none;
    box-shadow: ${(props) => props.theme.colors.page.mobile.gameRules.sportSelectShadow};
    border-radius: 10px;
    appearance: none;

    ::-ms-expand {
        display: none;
    }

    ::-moz-focus-inner {
        border: 0;
    }

    ${(props) => props.theme.typography.Subtitle4}
`

const Option = styled.option`
    ${(props) => props.theme.typography.Subtitle4}
`

const DownArrow = styled.div`
    position: absolute;
    top: 28px;
    right: 24px;
    width: 10px;
    height: 10px;
    border-width: 2px 2px 0 0;
    border-style: solid;
    transform: rotate(135deg);
`

const Sports = () => {
    const locale = useSelector((state) => state.app.locale)
    const t = useTranslation()
    const [type, setType] = useState('sport')
    const [htmlContent, setHtmlContent] = useState('')
    const onSelectChange = useCallback((e) => {
        setType(e.target.value)
    }, [])

    useEffect(() => {
        const getHtmlContent = async () => {
            const content = await import(`@html/${locale}/sports/${type}.html`)
            setHtmlContent(content.default)
        }
        getHtmlContent()
    }, [type, locale])

    return (
        <>
            <h3>{t('gameRules.sportHeader')}</h3>
            <DropdownContainer>
                <DownArrow />
                <Select value={type} onChange={onSelectChange}>
                    <Option value="sport">{t('gameRules.sportOptions.sport')}</Option>
                    <Option value="or">{t('gameRules.sportOptions.or')}</Option>
                    <Option value="parley">{t('gameRules.sportOptions.parley')}</Option>
                    <Option value="football">{t('gameRules.sportOptions.football')}</Option>
                    <Option value="basketball">{t('gameRules.sportOptions.basketball')}</Option>
                    <Option value="tennis">{t('gameRules.sportOptions.tennis')}</Option>
                    <Option value="baseball">{t('gameRules.sportOptions.baseball')}</Option>
                </Select>
            </DropdownContainer>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
    )
}

export default Sports
