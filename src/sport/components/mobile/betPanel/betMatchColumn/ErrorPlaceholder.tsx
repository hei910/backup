import { ApiStatus } from '@services/sportData/types'
import { updateApiStatus } from '@services/sportData/actions'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import styled from 'styled-components/macro'

// const EmptyBlock = styled.div`
//     margin-bottom: 1px;
//     padding: 14px;
//     color: red;
// `;

const ErrorPlaceholder: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateApiStatus(ApiStatus.Loading))
    }, [dispatch])

    // don't display error message when problem occur
    // return <EmptyBlock>获取盘口资料发生问题。</EmptyBlock>;
    return <div></div>
}

export default ErrorPlaceholder
