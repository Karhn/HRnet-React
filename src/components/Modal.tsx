import type { ReactNode } from "react";

type ModalProps = { 
    isOpen: boolean;
    onClose: () => void;
    children : ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps ) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay" role="presentation">
            <div className="modal-content" role="dialog">
                <button type="button" className="modal-close-button" onClick={onClose}>  × </button>

                <div className="modal-body">
                    { children }
                </div>

            </div>
        </div>
    )
}

export default Modal