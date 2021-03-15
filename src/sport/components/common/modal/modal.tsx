import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro';
import { ModalContext } from '.';

const ModalContainer = styled.div`
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    width: 100%;
    left: 0;
    top: 0;
    position: fixed;
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 1;
`;

const Modal = () => {
    const { modalContent, handleModal, modal } = useContext(ModalContext);
    const el = useRef(document.getElementById('#modal-root') || document.createElement('div'));

    const [dynamic] = useState(!el.current.parentElement);

    useEffect(() => {
        if (dynamic) {
            el.current.id = '#modal-root';
            document.body.appendChild(el.current);
        }
        return () => {
            if (dynamic && el.current.parentElement) {
                el.current.parentElement.removeChild(el.current);
            }
        };
    }, [dynamic]);

    if (modal) {
        return ReactDOM.createPortal(<ModalContainer>{modalContent}</ModalContainer>, el.current);
    } else return null;
};

export default Modal;
