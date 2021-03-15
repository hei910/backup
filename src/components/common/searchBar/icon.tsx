import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import SearchIcon from '@brand/assets/images/searchBar/icon_search.png'

const Icon = styled.div`
    margin: auto 3px;
    width: 15px;
    height: 15px;
    ${bgImg(SearchIcon)}
`
export default Icon
