import React from 'react';
import './TeamModal.css'; // Make sure to create a Modal.css file for styling

function Modal({ show, children, onClose }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}

export default Modal;
