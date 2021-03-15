import React from 'react'
import CSearchBar, { ICustomSearchBar } from '@components/common/searchBar'
import useTranslation from '@hooks/useTranslation'

const CustomSearchBar: React.FC<ICustomSearchBar> = ({ value = '', placeholder, onChange, onSubmit }) => {
    const t = useTranslation()
    return (
        <CSearchBar onSubmit={(e) => onSubmit && onSubmit(e)}>
            <CSearchBar.Icon />
            <CSearchBar.Input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <CSearchBar.Button>{t('slotMachine.searchBar.search')}</CSearchBar.Button>
        </CSearchBar>
    )
}

export default CustomSearchBar
