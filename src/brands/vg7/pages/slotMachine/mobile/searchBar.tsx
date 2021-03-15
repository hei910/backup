import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'

const SCSearchBar = styled(CSearchBar)`
    height: 40px;
    border: solid 1px #e3e3e3;
    border-radius: 3px 3px 9px 9px;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 16px;
`

const SIcon = styled(CSearchBar.Icon)`
    width: 20px;
    height: 20px;
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    return (
        <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
            <SInput
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <SIcon />
        </SCSearchBar>
    )
}

export default CustomSearchBar
