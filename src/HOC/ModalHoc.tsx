import React from "react";
import Modal from "react-modal";
import { DispatchType, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../redux/modalReducer";
import { GrClose } from "react-icons/gr";

const ModalHoc = () => {
  const { component, modalIsOpen } = useSelector(
    (state: RootState) => state.modalReducer
  );

  const dispatch: DispatchType = useDispatch();

  function afterOpenModal() {}

  return (
    <div className="modal-hoc">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => dispatch(setIsOpen(false))}
        ariaHideApp={false}
        contentLabel="Example Modal"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(34, 34, 34, 0.4)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",

            backgroundColor: "white",
          },
        }}
      >
        <span
          className="modal-close"
          onClick={() => dispatch(setIsOpen(false))}
        >
          <GrClose className="modal-close-icon" />
        </span>
        {component}
      </Modal>
    </div>
  );
};

export default ModalHoc;
