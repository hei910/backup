import GameSuppliers from '@constants/gameSuppliers'
import React from 'react'

import { useParams } from 'react-router-dom'
import GameDetail from './GameDetail'
import GamePreview from './GamePreview'

const SlotMachine = () => {
    const { supplier } = useParams<{supplier?: GameSuppliers}>()

    if (supplier) {
        return <GameDetail />
    }

    return <GamePreview />
}

export default SlotMachine
