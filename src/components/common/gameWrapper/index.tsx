// import { useState, useCallback, useEffect, ReactNode } from 'react'
// import styled from 'styled-components/macro'
// import AppBar from '@components/mobile/appbar'
import BalanceReminderModal from './balanceReminderModal'
import ContactCsModal from './contactCsModal'
import GameTrialModal from './gameTrialModal'
import BalanceTransferModal from './balanceTransferModal'
import IPLockModal from './ipLockModal'
import GameContainer from '@components/common/gameWrapper/gameContainer'
import GameTransferSuccessModal from './gameTransferSuccessModal'
// import FloatingIcon from '@images/games/common/floating-btn-inactive.svg'
// import ActiveFloatingIcon from '@images/games/common/floating-btn-active.svg'

const GameWrapper: React.FC<{}> = ({ children }) => (
    <>
        {children}
        <BalanceReminderModal />
        <ContactCsModal />
        <GameTrialModal />
        <IPLockModal />
        <BalanceTransferModal />
        <GameTransferSuccessModal />
        <GameContainer />
    </>
)

export default GameWrapper
