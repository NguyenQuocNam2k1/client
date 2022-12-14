import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Avatar,
  TextField,
  Typography,
  Link,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { LockOutlined, CloudUpload, Clear } from "@material-ui/icons";
import "~/assets/style/formUser.scss";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveImage, register, logIn, deleteImage,actFetchDataRegister } from "~/redux/actions";
import Notification from "-cl/Notification";
import ModalSweet from "~/components/layout/ModalSweet";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    textAlign: "start",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const dataLoginDefault = {
  name: "",
  password:"",
  email:"",
}

const dataRegisterDefault = {
  name: "",
  password:"",
  email:"",
  avatar:{
    urlFile:"",
    urlImage: "",
  },
  sex:"female",
}

const FormUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [checkTab, setCheckTab] = useState(1);
  const [dataLogin, setDataLogin] = useState(dataLoginDefault);
  const [showAlert, setShowAlert] = useState(0);
  const classes = useStyles();
  const [sex, setSex] = useState("");

  const {dataUser, token, dataRegister} = useSelector((state) => state.users);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "22px 0 12px 0" };

  const checkFieldUser = (type="login") => {
    let filedRequire = ["name", "password", "email"];

    let checkField = false;
    for (const [key, value] of Object.entries(filedRequire)) {
      if(!dataLogin[value] && type === "login"){
        checkField = true;
        break;
      } 
      if(!dataRegister[value] && type === "register" && !dataRegister["avatar"]){
        checkField = true;
        break;
      }
    }
    return checkField;
  } 

  const handleClickLogin = async () => {
    if(checkTab){
      const checkFieldRequired = checkFieldUser("register");
      if(checkFieldRequired){
        ModalSweet("error","L???i","Y??u c???u b???n ??i???n ?????y ????? th??ng tin ????ng k??");
        return;
      }
      setIsLoading(true);
      const result = await register(dataRegister);
      setShowAlert(result ? 1 : 2);
      setTimeout(() => {
        setShowAlert(0);
        if(result) {
         dispatch(actFetchDataRegister(dataRegisterDefault));
          setCheckTab(0);
        };
      }, 2000)
    } else {
      const checkFieldRequired = checkFieldUser("login");
      if(checkFieldRequired){
        ModalSweet("error","L???i","Y??u c???u b???n ??i???n ?????y ????? th??ng tin ????ng nh???p");
        return;
      }
      setIsLoading(true);
      const result = dispatch(logIn(dataLogin));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  };

  const handleSelectTab = (e, type) => {
    e.preventDefault();
    setCheckTab(type);
  };

  //Handle update image
  const handleUpdateImage = async (e) => {
    const tempFile = Array.from(e.target.files);
    if (tempFile[0] && tempFile[0]?.size < 5000000) {
      const params = {
        file: tempFile[0],
        fileName: tempFile[0].name,
      };
      const result = await saveImage(params);
      if(result){
        const newData = dataRegister;
        newData['avatar'] = result.data;
        dispatch(actFetchDataRegister(newData))

      }
      //fix bugs upload 1 file with onchange twice
      e.target.value = null;
    }
  };

  const handleEnterInfo = (value, field) =>{
    const newData = dataRegister;
    newData[field] = value;
    if(field === "sex") setSex(value)
    
    dispatch(actFetchDataRegister(newData))
  }

  const handleLogin = (value, field) => {
    const infoUser = dataLogin;
    infoUser[field] = value;
    setDataLogin(infoUser);
  }

  const handleDeleteAvatar = async () => {
    const newData = dataRegister;
    const urlFile = dataRegister.avatar.urlFile;
    newData['avatar'] = {
      urlFile:"",
      urlImage: "",
    };
    await deleteImage({urlFile});
    dispatch(actFetchDataRegister(newData));
  }


  //function render
  const renderLayoutLogin = () => {
    return (
      <React.Fragment>
        <TextField
          label="Email"
          placeholder="Nh???p email"
          fullWidth
          required
          onChange={(e) => handleLogin(e.target.value, "email")}
          className="form-user_input"
        />
        <TextField
          label="H??? v?? t??n"
          placeholder="Nh???p h??? v?? t??n"
          fullWidth
          required
          onChange={(e) => handleLogin(e.target.value, "name")}
          className="form-user_input"
        />
        <TextField
          label="M???t kh???u"
          placeholder="Nh???p m???t kh???u"
          type="password"
          fullWidth
          onChange={(e) => handleLogin(e.target.value, "password")}
          required
          className="form-user_input"
        />
      </React.Fragment>
    );
  };

  const renderLayoutRegister = () => {
    return (
      <Grid container className="layout_register" style={{paddingRight:"8px"}}>
        <Grid item xs={6}>
          <TextField
            label="H??? v?? t??n"
            placeholder="Nh???p h??? v?? t??n"
            fullWidth
            required
            className="form-user_input"
            onChange={(e) => handleEnterInfo(e.target.value, "name")}
          />
        </Grid>
        <Grid item xs={6} style={{paddingLeft:"8px"}}>
          <TextField
            label="Email"
            placeholder="Nh???p email"
            fullWidth
            required
            className="form-user_input"
            onChange={(e) => handleEnterInfo(e.target.value, "email")}
          />
        </Grid>
        <TextField
          label="M???t kh???u"
          placeholder="Nh???p m???t kh???u"
          type="password"
          fullWidth
          required
          onChange={(e) => handleEnterInfo(e.target.value, "password")}
          className="form-user_input"
        />
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Gi???i t??nh</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sex}
              onChange={(e) => handleEnterInfo(e.target.value, "sex")}
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
        <Grid item xs={6}>
          <TextField
            label="Nh???p S??T"
            placeholder="Nh???p S??T"
            type="text"
            fullWidth
            required
            onChange={(e) => handleEnterInfo(e.target.value, "phone")}
            className="form-user_input"
          />
        </Grid>
        {/* upload image */}
        {!dataRegister.avatar?.urlImage ? 
          <Button
            variant="contained"
            color="default"
            className="button-upload"
            component="label"
            startIcon={<CloudUpload />}
          >
            <input
              hidden
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              onChange={handleUpdateImage}
              name="myImage"
            />
            Upload
          </Button> :
          <div className="avatar-upload">
            <Clear className="avatar-upload-icon" onClick={() => handleDeleteAvatar()}/>
            <img src={dataRegister.avatar.urlImage} alt="avatar"/>
          </div>
        }
      </Grid>
    );
  };


  //useEffect
  useEffect(() => {
    if(dataUser && token){
      if(dataUser.theme.length > 0){
        navigate("/");
      } else {
        navigate("/theme");
      }
    }
  },[dataUser, navigate, token])


  return (
    <Grid className="form-user" style={{ position: "relative" }}>
      <div className="form-user_background"></div>
      <Paper elevation={10} style={paperStyle} className="form-user_content">
        <Grid align="">
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>{!checkTab ? "????ng nh???p" : "????ng k??"}</h2>
        </Grid>
        {!checkTab ? renderLayoutLogin() : renderLayoutRegister()}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={() => handleClickLogin(checkTab)}
          >
            {!checkTab ? "????ng nh???p" : "????ng k??"}
          </Button>
        )}
        {!checkTab ? (
          <Typography className="form-user_register">
            {" "}
            B???n ch??a c?? t??i kho???n ?{" "}
            <Link onClick={(e) => handleSelectTab(e, 1)} style={{margin: "0 !important"}}>????NG K??</Link>
          </Typography>
        ) : (
          <Typography className="form-user_register">
            {" "}
            B???n ???? c?? t??i kho???n ?{" "}
            <Link onClick={(e) => handleSelectTab(e, 0)} style={{margin: "0 !important"}}>????NG NH???P</Link>
          </Typography>
        )}
      </Paper>
      <div className="alert-register">
        {/* 0 l?? ???n ??i , 1 l?? th??nh c??ng , 2 l?? th???t b???i */}
        {showAlert === 1 && <Notification  className="position-relative" severity="success" title="????ng k?? th??nh c??ng" classAnimation="notification-rl"/>}
        {showAlert === 2 && <Notification  className="position-relative" severity="error" title="????ng k?? kh??ng th??nh c??ng" classAnimation="notification-rl"/>}
      </div>
    </Grid>
  );
};

export default FormUser;
