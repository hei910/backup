import React from 'react'
import styled from 'styled-components/macro'

interface IProps {
    className?: string
}

const SSlotMachineContainerTemp = styled.div`
    min-width: 100%;
    min-height: 100%;
`

const SSlotMachineContainer: React.FC<IProps> = ({ children, className = '' }) => {
    return <SSlotMachineContainerTemp className={className}>{children}</SSlotMachineContainerTemp>
}

export default SSlotMachineContainer
