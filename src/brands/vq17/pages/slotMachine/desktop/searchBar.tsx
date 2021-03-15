import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

const SCSearchBar = styled(CSearchBar)`
    background: transparent;
    border-radius: 0;
    flex: 0 0 350px;
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

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    const t = useTranslation()
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <SLabel>{t('slotMachine.searchBar.search')} :</SLabel>
            <SInput
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
        </SCSearchBar>
    )
}

export default CustomSearchBar
