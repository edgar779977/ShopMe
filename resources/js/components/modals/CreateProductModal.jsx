import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "bootstrap";

const CreateProductModal = ({ show, handleClose, handleSave }) => {
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const modalRef = useRef(null);
    const modalInstanceRef = useRef(null);

    const handleSubmit = () => {
        const newProduct = {
            name,
            parent_id: parentId,
            // Add other fields as needed
        };
        handleSave(newProduct);
        handleClose(); // Close the modal after saving
    };

    useEffect(() => {
        if (modalRef.current) {
            const modalInstance = new Modal(modalRef.current, {
                backdrop: 'static',
                keyboard: false,
            });

            modalInstanceRef.current = modalInstance;

            return () => {
                if (modalInstanceRef.current) {
                    modalInstanceRef.current.dispose();
                }
            };
        }
    }, []);

    useEffect(() => {
        const modal = modalInstanceRef.current;

        if (modal) {
            if (show) {
                modal.show();
            } else {
                modal.hide();
            }
        }
    }, [show]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            const handleCloseEvent = () => handleClose();
            modalElement.addEventListener('hidden.bs.modal', handleCloseEvent);

            return () => {
                if (modalElement) {
                    modalElement.removeEventListener('hidden.bs.modal', handleCloseEvent);
                }
            };
        }
    }, [handleClose]);

    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="createUserModalLabel" aria-hidden={!show}>
        <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New Product</h5>
                        <button type="button" className="close" onClick={handleClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input
                                type="text"
                                id="productName"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="parentId">Parent Category ID</label>
                            <input
                                type="text"
                                id="parentId"
                                className="form-control"
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProductModal;
