export interface BaseModalProps {
    id: string
    isOpen: boolean
    className?: string
    closeModal: () => void
    overflowVisible?: boolean
}

export interface HeaderProps {
    className?: string
}
