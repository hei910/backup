import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

const SCSearchBar = styled(CSearchBar)`
    border: solid 1px #aaaaaa;
    border-radius: 6px;
    background-color: #161616;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 18px;
    color: #848484;
`

const SButton = styled(CSearchBar.Button)`
    font-size: 18px;
    border-radius: 6px;
    color: #fff;
    background-color: #fe9900;
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
