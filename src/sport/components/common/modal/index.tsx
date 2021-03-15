import React, { createContext } from 'react';
import Modal from './modal';
import useModal from './useModal';

const ModalContext = createContext<any>({});
const { Provider } = ModalContext;

interface IModalProvider {
    children: any;
}

const ModalProvider: React.FC<IModalProvider> = ({ children }) => {
    const { modal, handleModal, modalContent } = useModal();
    return (
        <Provider value={{ modal, handleModal, modalContent }}>
            <Modal />
            {children}
        </Provider>
    );
};

export { ModalContext, ModalProvider };
