import React, { useState } from 'react'
import { Grid,Paper, Button, Avatar, TextField, Typography,Link, FormControlLabel, Checkbox, Box, CircularProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import "~/assets/style/formUser.scss";
import { useNavigate  } from 'react-router-dom';

const FormUser=()=>{
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);
    const [checkTab, setCheckTab] = useState(0);
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};

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
    }
    return(
        <Grid className="form-user" style={{position: "relative"}}>
            <div className='form-user_background'></div>
            <Paper elevation={10} style={paperStyle} className="form-user_content">
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>{!checkTab ? "Đăng nhập" : "Đăng ký" }</h2>
                </Grid>
                <TextField label='Họ và tên' placeholder='Nhập họ và tên' fullWidth required className="form-user_input"/>
                <TextField label='Mật khẩu' placeholder='Nhập mật khẩu' type='password' fullWidth required className="form-user_input"/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
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