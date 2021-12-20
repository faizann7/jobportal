import React from "react";

const Dialog = ({ show }) => {
  if (!show) {
    return <></>;
  }
  return (
    <div>
      <button> DELETE </button>
    </div>
  );
};

export default Dialog;
