import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

const SCSearchBar = styled(CSearchBar)`
    border-radius: 25px;
    border: solid 2px #fff;
    background-color: rgba(0, 9, 38, 0.5);
    padding: 2px 4px;
`

const SIcon = styled(CSearchBar.Icon)`
    width: 24px;
    height: 24px;
    margin: 8px;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 20px;
    color: #e6e6e6;

    ::placeholder {
        color: #fff;
    }
`

const SButton = styled(CSearchBar.Button)`
    font-size: 20px;
    border-radius: 20px;
    background-color: #ff9900;
    color: #fff;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    const t = useTranslation()
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <SIcon />
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
