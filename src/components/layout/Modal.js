/* eslint-disable no-undef */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Fade,
  Tooltip,
  Modal,
  Backdrop,
  Grid,
  TextField,
  TextareaAutosize,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import ModalSweet from "./ModalSweet";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useSelector,useDispatch } from "react-redux";
import { UpdateUserById } from "~/redux/actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "50vw",
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

const dataDefault = {
  name: "",
  phone: "",
  email: "",
  password: "",
  sex: "",
};

const Modals = ({ isShowModal, title, handleShowModal, type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [clickSaveLink, setClickSaveLink] = useState(false);
  const [dataRegister, setDataRegister] = useState(dataDefault);
  const { userInfo, dataUser } = useSelector((state) => state.users);

  //function render
  const renderShareLink = () => {
    return (
      <div className={classes.content}>
        <p className={classes.link}>http://localhost:3000/</p>
        <Tooltip title="Lấy link" placement="top">
          <FileCopy
            onClick={() => handleClickCoppyLink()}
            color={`${clickSaveLink ? "primary" : "disabled"}`}
            className={classes.iconSave}
            fontSize="large"
            style={{ marginLeft: "8px" }}
          />
        </Tooltip>
      </div>
    );
  };

  const renderUpdateInfo = () => {
    return (
      <Grid
        container
        spacing={3}
        style={{ marginTop: "8px", maxWidth: "36vw" }}
      >
        <Grid item xs={6}>
          <TextField
            required
            id="filled-helperText"
            variant="filled"
            label="Họ và tên"
            defaultValue={userInfo.name}
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataRegister("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="filled-helperText"
            variant="filled"
            label="Email"
            defaultValue={userInfo.email}
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataRegister("email", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl} style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              value={userInfo.sex}
              onChange={(e) => handleChangeDataRegister("sex", e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="female">Nữ</MenuItem>
              <MenuItem value="male">Nam</MenuItem>
              <MenuItem value="other">Khác</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="filled-helperText"
            variant="filled"
            label="Mật khẩu"
            defaultValue={userInfo.password}
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataRegister("password", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="filled-helperText"
            variant="filled"
            label="Số điện thoại"
            defaultValue={userInfo.phone}
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataRegister("place", e.target.value)}
          />
        </Grid>
        <div className="btn-register-trip">
          <Button
            variant="contained"
            color="primary"
            href="#contained-buttons"
            onClick={() => handleClickRegister()}
          >
            Lưu thông tin
          </Button>
        </div>
      </Grid>
    );
  };

  const renderRegister = () => {
    return (
      <Grid container spacing={3} style={{ marginTop: "8px" }}>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label="Điểm lên xe"
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataRegister("place", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label="Số điện thoại"
            style={{ width: "100%" }}
            onChange={(e) =>
              handleChangeDataRegister("phone_number", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={11}
            maxRows={11}
            className="introduction require_create"
            aria-label="maximum height"
            placeholder="Giới thiệu bản thân"
            defaultValue=""
            onChange={(e) =>
              handleChangeDataRegister("introduce", e.target.value)
            }
          />
        </Grid>
        <div className="btn-register-trip">
          <Button
            variant="contained"
            color="primary"
            href="#contained-buttons"
            onClick={() => handleClickRegister()}
          >
            Đăng ký
          </Button>
        </div>
      </Grid>
    );
  };

  //function click
  const handleClickCoppyLink = () => {
    setClickSaveLink(true);
    navigator.clipboard.writeText(`http://localhost:3000/${test}`);
  };

  const handleChangeDataRegister = (field, value) => {
    const newData = { ...userInfo };
    newData[`${field}`] = value;
    setDataRegister(newData);
  };
  const handleClickRegister = () => {
    const params = {
      dataRegister,
    }
    dispatch(UpdateUserById(params));
    // if (resultCheck) {
    //   ModalSweet("error", "Lỗi", "Yêu cầu bạn điền đầy đủ thông tin");
    // } else {
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Đăng ký thành công , vui lòng chờ phản hồi từ người tạo",
    //     showConfirmButton: false,
    //     timer: 2000,
    //   });
    // }
    handleShowModal(false);
  };

  const checkFieldRequied = () => {
    const filedRequire = ["place", "phone_number", "introduce"];
    let checkField = false;
    for (const [key, value] of Object.entries(filedRequire)) {
      if (!dataRegister[value]) {
        checkField = true;
        break;
      }
    }
    return checkField;
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
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className={classes.title}>
              {title}
            </h2>
            {type === "get_link" && renderShareLink()}
            {type === "register_trip" && renderRegister()}
            {type === "profile" && renderUpdateInfo()}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Modals;
