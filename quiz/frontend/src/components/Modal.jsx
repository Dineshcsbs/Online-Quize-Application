import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";


const Modal = ({ isOpen, onClose, onSave, title, children,buttonName }) => {
  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className=" btn  mb-2 border-0"
              onClick={onClose}
              aria-label="Close"
            >
              <Icon icon="eva:close-outline" width="24" height="24" />
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer align-center">
            {/* <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button> */}
            <button type="button" className="btn btn-primary" onClick={onSave}>
              {buttonName}
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};
export default Modal;
