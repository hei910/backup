import React from 'react'
import styled from 'styled-components/macro'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import useTranslation from '@hooks/useTranslation'
import bgImg from '@mixins/backgroundImg'
import SearchIcon from '@brand/assets/images/searchBar/icon_search.svg'

const SSearchBarContainer = styled.div`
    width: 90%;
    height: 36px;
    margin: 8px auto 16px;
    background-color: transparent;
    text-align: center;
`

const SSearchBar = styled(CSearchBar)`
    box-shadow: 2px 2px 6px 0 rgb(255 132 12 / 9%);
`

const SButton = styled(CSearchBar.Button)`
    display: flex;
    color: #626d8e;
    background-color: #eaeaea;
`

const SInput = styled(CSearchBar.Input)`
    color: #626d8e;
`

const SIcon = styled(CSearchBar.Icon)`
    ${bgImg(SearchIcon, '20px 20px')}
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    const t = useTranslation()
    return (
        <SSearchBarContainer>
            <SSearchBar onSubmit={(e) => onSubmit && onSubmit(e)}>
                <SInput
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    data-qa="inputGameTitle"
                />
                <SButton data-qa="btnSearchGame">
                    <SIcon />
                    {t('slotMachine.searchBar.search')}
                </SButton>
            </SSearchBar>
        </SSearchBarContainer>
    )
}

export default CustomSearchBar
