import React from 'react';
import './Modal.css'

function Modal({ isOpen, onConfirm, onCancel }) {
    return (
        isOpen && (
            <div className="modal-container">
                <div className="modal-content">
                    <h2>Are you sure you want to delete this property?</h2>
                    <div className="modal-buttons">
                        <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                        <button className="modal-button confirm" onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    );
}



export default Modal;
