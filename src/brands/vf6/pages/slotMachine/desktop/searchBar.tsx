import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

const SCSearchBar = styled(CSearchBar)`
    background-color: #fff;
`

const SButton = styled(CSearchBar.Button)`
    background-color: #ebebeb;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value, placeholder, onChange, onSubmit }) => {
    const t = useTranslation()
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit(e)}>
            <CSearchBar.Icon />
            <CSearchBar.Input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <SButton>{t('slotMachine.searchBar.search')}</SButton>
        </SCSearchBar>
    )
}

export default CustomSearchBar
