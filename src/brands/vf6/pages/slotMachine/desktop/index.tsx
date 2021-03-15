import GameSuppliers from '@constants/gameSuppliers'
import React from 'react'
import { useParams } from 'react-router-dom'
import GameDetail from './GameDetail'
import GamePreview from './GamePreview'

const SlotMachine: React.FC = () => {
    const { supplier } = useParams<{ supplier?: GameSuppliers }>()

    return supplier ? <GameDetail /> : <GamePreview />
}

export default SlotMachine
