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
import { UpdateUserById, actFetchUserInfo } from "~/redux/actions";

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
  modal_info_register: {
    width: "700px",
  },
}));

const dataRegisterDefault = {
  "place_start": "",
  "place_end": "",
  "phone_number": "",
  "introduce": "",
}

const Modals = ({ isShowModal, title, handleShowModal, type , data = "", socket = ""}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [clickSaveLink, setClickSaveLink] = useState(false);
  const [dataRegister, setDataRegister] = useState(dataRegisterDefault);
  const { userInfo, dataUser } = useSelector((state) => state.users);
  const [dataUpdate, setDataUpdate] = useState(userInfo);

  //function render
  const renderShareLink = () => {
    return (
      <div className={classes.content}>
        <p className={classes.link}>http://localhost:3000/trips/id={data}</p>
        <Tooltip title="L???y link" placement="top">
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
            label="H??? v?? t??n"
            defaultValue={userInfo.name}
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataUpdate("name", e.target.value)}
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
            onChange={(e) => handleChangeDataUpdate("email", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl} style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Gi???i t??nh</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              value={userInfo.sex}
              onChange={(e) => handleChangeDataUpdate("sex", e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="female">N???</MenuItem>
              <MenuItem value="male">Nam</MenuItem>
              <MenuItem value="other">Kh??c</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="filled-helperText"
            variant="filled"
            label="M???t kh???u"
            defaultValue={userInfo.password}
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataUpdate("password", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="filled-helperText"
            variant="filled"
            label="S??? ??i???n tho???i"
            defaultValue={userInfo.phone}
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataUpdate("phone", e.target.value)}
          />
        </Grid>
        <div className="btn-register-trip">
          <Button
            variant="contained"
            color="primary"
            href="#contained-buttons"
            onClick={() => handleClickUpdateInfo()}
          >
            L??u th??ng tin
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
            label="??i???m l??n xe"
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataRegister("place_start", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label="??i???m xu???ng xe"
            style={{ width: "100%" }}
            onChange={(e) => handleChangeDataRegister("place_end", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label="S??? ??i???n tho???i"
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
            placeholder="Gi???i thi???u b???n th??n"
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
            ????ng k??
          </Button>
        </div>
      </Grid>
    );
  };

  const renderModalInfoRegister = () => {
    const info = data.introduce;
    let sex = data.info_user.sex;
    if(sex === "male") sex = "Nam";
    if(sex === "female") sex = "N???";
    if(sex === "other") sex = "Kh??ng x??c ?????nh";
    return(
    <Grid container spacing={3} style={{ marginTop: "8px" }}>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-helperText"
            variant="outlined"
            label="??i???m l??n xe"
            style={{ width: "100%", color:"black" , fontSize:"14px", fontWeight:"400" }}
            defaultValue={info.place_start}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-helperText"
            variant="outlined"
            label="??i???m xu???ng xe"
            style={{ width: "100%", color:"black" , fontSize:"14px", fontWeight:"400" }}
            defaultValue={info.place_end}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-helperText"
            variant="outlined"
            label="S??? ??i???n tho???i li??n h???"
            style={{ width: "100%", color:"black" , fontSize:"14px", fontWeight:"400" }}
            defaultValue={info.phone_number}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-helperText"
            variant="outlined"
            label="S??? ??i???n tho???i li??n h???"
            style={{ width: "100%", color:"black" , fontSize:"14px", fontWeight:"400" }}
            defaultValue={data.info_user.sex}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={11}
            maxRows={11}
            className="introduction require_create"
            aria-label="maximum height"
            placeholder="Gi???i thi???u b???n th??n"
            defaultValue={info.introduce}
            disabled
          />
        </Grid>
    </Grid>
    )
  }

  //function click
  const handleClickCoppyLink = () => {
    setClickSaveLink(true);
    navigator.clipboard.writeText(`http://localhost:3000/trips/id=${data}`);
  };

  const handleChangeDataUpdate = (field, value) => {
    const newData = { ...dataUpdate };
    newData[`${field}`] = value;
    setDataUpdate(newData);
  };

  const handleClickRegister = () => {
    handleShowModal(false);
    const image = JSON.parse(data.url_image).urlImage;
    const checkField = checkFieldRequired();
    if(checkField){
      ModalSweet("error","L???i","Y??u c???u b???n ??i???n ?????y ????? th??ng tin");
      return;
    };
    const dataInfo = {
      userInfo: dataUser,
      dataRegister,
      id_author: JSON.parse(data.author_info).id_author, 
      idTrip: data._id,
      info_trip: {
        imageTrip:image, 
        nameTrip:data.title, 
        member_number: data.number_member, 
      },
      status: 0,
    }
    socket.emit("send_data_register", dataInfo);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '????ng k?? chuy???n ??i th??nh c??ng. Vui l??ng ch??? ph???n h???i t??? ng?????i t???o',
      showConfirmButton: false,
      timer: 2000
    });
  };

  const checkFieldRequired = () => {
    let flag = false;
    const listFiled = ["place_start", "place_end" , "phone_number", "introduce"];
    listFiled.map((filed) => {
      if(!dataRegister[filed]){
        flag = true;
      };
    });
    return flag;
  }

  const handleClickUpdateInfo = () => {
    const params = {
      dataRegister: dataUpdate
    }
    dispatch(UpdateUserById(params));
    handleShowModal(false);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'C???p nh???p th??ng tin th??nh c??ng',
      showConfirmButton: false,
      timer: 2000
    });
  }

  const handleChangeDataRegister = (field, value) => {
    const newData = {...dataRegister};
    newData[field] = value;
    setDataRegister(newData);
  }

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
          <div className={`${classes.paper} ${type === "infoRegister" ? classes.modal_info_register: ""}`}>
            <h2 id="transition-modal-title" className={classes.title}>
              {title}
            </h2>
            {type === "get_link" && renderShareLink()}
            {type === "register_trip" && renderRegister()}
            {type === "profile" && renderUpdateInfo()}
            {type === "infoRegister" && renderModalInfoRegister()}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Modals;
