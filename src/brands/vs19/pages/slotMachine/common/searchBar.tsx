import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import styled from 'styled-components/macro'

const STempLayout = styled.div`
    padding: 16px 0;
`

const SCSearchBar = styled(CSearchBar)`
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 5px;
    padding: 0;
`

const SIconLayout = styled.div`
    background: linear-gradient(135deg, #1e1e1e 50%, #292929 50%);
    padding: 8px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`

const SIcon = styled(CSearchBar.Icon)`
    margin: 0;
    width: 20px;
    height: 20px;
`

const SInput = styled(CSearchBar.Input)`
    font-size: 17px;
    color: #fff;

    ::placeholder {
        color: #fff;
    }

    :-ms-input-placeholder {
        color: #fff;
    }
`

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    return (
        <STempLayout>
            <SCSearchBar onSubmit={(e) => onSubmit && onSubmit()}>
                <SIconLayout>
                    <SIcon />
                </SIconLayout>
                <SInput
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            </SCSearchBar>
        </STempLayout>
    )
}

export default CustomSearchBar
