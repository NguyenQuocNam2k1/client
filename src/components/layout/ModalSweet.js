import Swal from "sweetalert2/dist/sweetalert2.js";
import React from "react";
import "sweetalert2/src/sweetalert2.scss";

const ModalSweet = (
  icon,
  title,
  text,
  showCancelButton,
  confirmButtonText
) => {
  return (
    <>
      {Swal.fire({
        icon,
        title,
        text,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        // showCancelButton: true,
        // confirmButtonText: confirmButtonText ? "Lưu" : "",
      })}
    </>
  );
};

export default ModalSweet;
