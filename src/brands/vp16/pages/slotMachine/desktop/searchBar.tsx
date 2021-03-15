import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

const SCSearchBar = styled(CSearchBar)`
    border-radius: 6px;
    box-shadow: 0 5px 10px 0 rgba(23, 23, 23, 0.69);
    background-color: #ffffff;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 18px;
    color: #000000;
`

const SButton = styled(CSearchBar.Button)`
    font-size: 18px;
    border-radius: 6px;
    background-image: linear-gradient(to bottom, #078552, #0dab3a);
    color: #fff;
    padding: 8px 16px;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    const t = useTranslation()

    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <CSearchBar.Icon />
            <SInput
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
