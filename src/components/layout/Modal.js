import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, Tooltip, Modal, Backdrop } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "36vw",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #e4e4e4",
    borderRadius: "16px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    fontSize: "16px !important",
    color: "#201ea3 !important",
  },
  description: {},
  link: {
    border: "1px solid #aeaeae",
    padding: "4px 0 4px 4px",
    overflowX: "auto",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  content: {
    fontSize: "14px",
    fontWeight: "500",
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconSave: {},
}));

const Modals = ({ isShowModal, title , handleShowModal }) => {
  const classes = useStyles();
  const [clickSaveLink, setClickSaveLink] = useState(false);

  //function render
  const renderShareLink = () => {
    return (
      <div className={classes.paper}>
        <h2 id="transition-modal-title" className={classes.title}>
          {title}
        </h2>
        <div className={classes.content}>
          <p className={classes.link}>http://localhost:3000/</p>
          <Tooltip title="Lấy link" placement="top">
            <FileCopy
              onClick = {() => handleClickCoppyLink()}
              color={`${clickSaveLink ? "primary" : "disabled"}`}
              className={classes.iconSave}
              fontSize="large"
              style={{ marginLeft: "8px" }}
            />
          </Tooltip>
        </div>
      </div>
    );
  };

  //function click
  const handleClickCoppyLink = () => {
    const test = "123";
    setClickSaveLink(true);
    navigator.clipboard.writeText(`http://localhost:3000/${test}`);
  };

  return (
    <div>
      <Modal
        aria-labelledby={`"transition-modal-title" ${classes.title}`}
        aria-describedby={`"transition-modal-description" ${classes.description}`}
        className={classes.modal}
        open={isShowModal}
        onClose={() => handleShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isShowModal}>
          {renderShareLink()}
        </Fade>
      </Modal>
    </div>
  );
};

export default Modals;
