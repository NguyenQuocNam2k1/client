import React, { useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Avatar,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { LockOutlined, CloudUpload } from "@material-ui/icons";
import "~/assets/style/formUser.scss";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveImage, register, logIn } from "~/redux/actions";
import Notification from "-cl/Notification";
import setCookie from "-cc/cookie";

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

const dataDefault = {
  name: "",
  password: "",
  phone: "",
  avatar: "",
  sex: "",
};

const dataLoginDefault = {
  name: "",
  password:"",
}

const FormUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [checkTab, setCheckTab] = useState(1);
  const [dataRegister, setDatRegister] = useState(dataDefault);
  const [dataLogin, setDataLogin] = useState(dataLoginDefault)
  const [showAlert, setShowAlert] = useState(0);
  const classes = useStyles();
  const [sex, setSex] = useState("");
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const renderLayoutLogin = () => {
    return (
      <React.Fragment>
        <TextField
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          fullWidth
          required
          onChange={(e) => handleLogin(e.target.value, "name")}
          className="form-user_input"
        />
        <TextField
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          type="password"
          fullWidth
          onChange={(e) => handleLogin(e.target.value, "password")}
          required
          className="form-user_input"
        />
      </React.Fragment>
    );
  };

  const renderLayoutRegiter = () => {
    return (
      <Grid container className="layout_register">
        <TextField
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          fullWidth
          required
          className="form-user_input"
          onChange={(e) => handleEnterInfo(e.target.value, "name")}
        />
        <TextField
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          type="password"
          fullWidth
          required
          onChange={(e) => handleEnterInfo(e.target.value, "password")}
          className="form-user_input"
        />
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sex}
              onChange={(e) => handleEnterInfo(e.target.value, "sex")}
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
        <Grid item xs={6}>
          <TextField
            label="Nhập SĐT"
            placeholder="Nhập SĐT"
            type="text"
            fullWidth
            required
            onChange={(e) => handleEnterInfo(e.target.value, "phone")}
            className="form-user_input"
          />
        </Grid>
        {/* upload image */}

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
        </Button>
        <div className="avatar-upload">
          <img src="http://localhost/chuyen-de/backend/upload//avatar.jpg-1666717445771.jpg" alt="avatar"/>
        </div>
      </Grid>
    );
  };

  const handleClickLogin = async () => {
    setIsLoading(true);
    if(checkTab){
      const result = await register(dataRegister);
      setShowAlert(result ? 1 : 2);
      setTimeout(() => {
        setShowAlert(0);
        if(result) setCheckTab(0);
      }, 2000)
    } else {
      const result = await logIn(dataLogin);
      if(result){
        setCookie();// name,data , number, 
        // setTimeout(() => {
        //   navigate("/theme");
        // }, 500);
      }

    }
    setIsLoading(false);
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
        newData['avatar'] = result;
        setDatRegister(newData);
      }
      //fix bugs upload 1 file with onchange twice
      e.target.value = null;
    }
  };
  const handleEnterInfo = (value, field) =>{
    const newData = dataRegister;
    newData[field] = value;
    if(field === "sex") setSex(value)
    
    setDatRegister(newData);
  }
  const handleLogin = (value, field) => {
    const infoUser = dataLogin;
    infoUser[field] = value;
    setDataLogin(infoUser);
  }


  return (
    <Grid className="form-user" style={{ position: "relative" }}>
      <div className="form-user_background"></div>
      <Paper elevation={10} style={paperStyle} className="form-user_content">
        <Grid align="">
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>{!checkTab ? "Đăng nhập" : "Đăng ký"}</h2>
        </Grid>
        {!checkTab ? renderLayoutLogin() : renderLayoutRegiter()}
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
            {!checkTab ? "Đăng nhập" : "Đăng ký"}
          </Button>
        )}
        {!checkTab ? (
          <Typography className="form-user_register">
            {" "}
            Bạn chưa có tài khoản ?{" "}
            <Link onClick={(e) => handleSelectTab(e, 1)}>ĐĂNG KÝ</Link>
          </Typography>
        ) : (
          <Typography className="form-user_register">
            {" "}
            Bạn đã có tài khoản ?{" "}
            <Link onClick={(e) => handleSelectTab(e, 0)}>ĐĂNG NHẬP</Link>
          </Typography>
        )}
      </Paper>
      <div className="alert-register">
        {/* 0 là ẩn đi , 1 là thành công , 2 là thất bại */}
        {showAlert === 1 && <Notification  className="position-relative" severity="success" title="Đăng ký thành công" classAnimation="notification-rl"/>}
        {showAlert === 2 && <Notification  className="position-relative" severity="eroe" title="Đăng ký không thành công" classAnimation="notification-rl"/>}
      </div>
    </Grid>
  );
};

export default FormUser;
