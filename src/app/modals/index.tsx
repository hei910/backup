import RequireLoginModal from './requireLoginModal'
import TransferFailModal from './transferFailModal'
import TransferSuccessModal from './transferSuccessModal'
import AppComingSoonModal from './appComingSoonModal'

export default () => {
    return (
        <>
            <RequireLoginModal />
            <TransferFailModal />
            <TransferSuccessModal />
            <AppComingSoonModal />
        </>
    )
}
