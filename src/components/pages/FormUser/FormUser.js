import React, { useState } from 'react'
import { Grid,Paper, Button, Avatar, TextField, Typography,Link, FormControlLabel, Checkbox, Box, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { LockOutlined, CloudUpload } from '@material-ui/icons';
import "~/assets/style/formUser.scss";
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate  } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    textAlign:"start",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FormUser = () => {
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);
    const [checkTab, setCheckTab] = useState(0);
    const classes = useStyles();
    const [sex, setSex] = useState("")
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};

    const renderLayoutLogin = () => {
      return (
        <React.Fragment>
          <TextField label='Họ và tên' placeholder='Nhập họ và tên' fullWidth required className="form-user_input"/>
          <TextField label='Mật khẩu' placeholder='Nhập mật khẩu' type='password' fullWidth required className="form-user_input"/>
        </React.Fragment>
      )
    };

    const renderLayoutRegiter = () => {
      return (
        <Grid container className="layout_register">
          <TextField label='Họ và tên' placeholder='Nhập họ và tên' fullWidth required className="form-user_input"/>
          <TextField label='Mật khẩu' placeholder='Nhập mật khẩu' type='password' fullWidth required className="form-user_input"/>
          <TextField label='Nhập lại mật khẩu' placeholder='Nhập mật khẩu' type='password' fullWidth required className="form-user_input"/>
          <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
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
           <TextField label='Nhập SĐT' placeholder='Nhập SĐT' type='text' fullWidth required className="form-user_input"/>
          </Grid>
          {/* upload image */}
          <Button
            variant="contained"
            color="default"
            className="button-upload"
            startIcon={<CloudUpload />}
          >
            Upload
          </Button>
        </Grid>
      )
    }

    const handleClickLogin = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/theme");
      }, 500);
    };

    const handleClickRegister = (e, type) => {
      e.preventDefault();
      setCheckTab(type);
    };

    return(
        <Grid className="form-user" style={{position: "relative"}}>
            <div className='form-user_background'></div>
            <Paper elevation={10} style={paperStyle} className="form-user_content">
                <Grid align=''>
                    <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    <h2>{!checkTab ? "Đăng nhập" : "Đăng ký" }</h2>
                </Grid>
                {!checkTab ? renderLayoutLogin() : renderLayoutRegiter()}
                 {isLoading ? 
                    <Box sx={{ display: 'flex', justifyContent:"center" }}>
                    <CircularProgress />
                  </Box> :
                  <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick= {() => handleClickLogin()}>
                    {!checkTab ? "Đăng nhập" : "Đăng ký"}
                  </Button>
                }
                {
                  !checkTab ? 
                  <Typography className="form-user_register"> Bạn chưa có tài khoản ?{" "}
                      <Link  onClick={(e) => handleClickRegister(e, 1)}>
                          ĐĂNG KÝ
                      </Link>
                  </Typography> : 
                  <Typography className="form-user_register"> Bạn đã có tài khoản ?{" "}
                  <Link  onClick={(e) => handleClickRegister(e,0)}>
                      ĐĂNG NHẬP
                  </Link>
              </Typography>
                }
            </Paper>
        </Grid>
    )
}

export default FormUser