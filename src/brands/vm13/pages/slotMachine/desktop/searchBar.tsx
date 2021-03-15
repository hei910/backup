import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import bgImg from '@mixins/backgroundImg'
import styled from 'styled-components/macro'
import SearchBtn from '@brand/assets/images/slotMachine/desktop/searchButton.png'
import useTranslation from '@hooks/useTranslation'

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
`

const SCSearchBar = styled(CSearchBar)`
    background: transparent;
    border-radius: 0;
`

const SLabel = styled.div`
    color: #fff;
    margin-right: 8px;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 16px;
    color: #fff;
    border-radius: 3px;
    border: solid 1px #616161;
    background-color: #333;
`

const SSearchBtn = styled.div`
    width: 25px;
    height: 25px;
    ${bgImg(SearchBtn, 'contain')}
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    const t = useTranslation()
    return (
        <SearchBarContainer>
            <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
                <SLabel>{t('slotMachine.searchBar.search')} :</SLabel>
                <SInput
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            </SCSearchBar>
            <SSearchBtn onClick={(e) => onSubmit && onSubmit()} />
        </SearchBarContainer>
    )
}

export default CustomSearchBar
