import React from 'react'
import Icon from '../icon/icon';
import { createPortal } from 'react-dom';

interface ModalProps {
    children: React.ReactNode;
    onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <React.Fragment>
            {createPortal(
                <div className='corleon-modal-container'>
                    <div className='corleon-modal'>
                        <div className='toolbar'>
                            {(onClose !== undefined) &&
                                <button onClick={onClose} className='btn-close'>
                                    <Icon style={{ color: "inherit" }} name='close-circle' />
                                </button>
                            }
                        </div>
                        <div className='body'>
                            {children}
                        </div>
                    </div>
                </div>, document.body)}
        </React.Fragment>
    )
}

export default Modal