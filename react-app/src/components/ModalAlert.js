import Modal from "@material-ui/core/Modal";
import {Button} from "@material-ui/core";
import React from "react";


const ModalAlert = ({open,handleClose,titleAlert,infoAlert}) => {
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">

            <div className="modal_style">
                <h2 id="simple-modal-title">{titleAlert}</h2>
                <p id="simple-modal-description">
                    {infoAlert}
                </p>

                <div className="button_exit_container">
                    <Button variant="contained" color="secondary" onClick={handleClose}>Zamknij</Button>

                </div>

            </div>
        </Modal>
    );
}

export default ModalAlert;