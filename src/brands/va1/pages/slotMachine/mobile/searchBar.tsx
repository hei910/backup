import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'

const SCSearchBar = styled(CSearchBar)`
    border: solid 1px #e3e3e3;
    border-radius: 3px 3px 9px 9px;
    background-color: #f2f2f2;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 15px;
    color: #a6a6a6;
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
            <CSearchBar.Icon />
        </SCSearchBar>
    )
}

export default CustomSearchBar
