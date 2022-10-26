import React , {useState , useEffect} from 'react';
import "~/assets/style/theme.scss";
import DoneIcon from '@material-ui/icons/Done';
import { Button, CircularProgress } from '@material-ui/core';
import { listTheme } from "-cc/data";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
import { getCookie } from "-cc/cookie";
import { getUser, actGetTheme, saveTheme } from "~/redux/actions";
import { useDispatch, useSelector } from 'react-redux';


function Theme() {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const {dataUser} = useSelector((state) => state.users);

  const getUserInfo = (email) => {
    dispatch(getUser({email}));
  }
  const handleClickConscious = (value) => {
    let newData = dataUser;
    if(newData['theme'].length < 3 && !newData['theme'].includes(value)){
        newData['theme'].push(value);
        // setDataNew(listTheme);
    } else {
        newData['theme'] =  newData['theme'].filter(item => item !== value);
    }
    dispatch(actGetTheme(newData))
  }
  const handleClickNext = async () => {
    let params = {
        themeNew : dataUser['theme'],
        email : dataUser['email'],
        name: dataUser['name']
    }
    const result = await saveTheme(params);
    if(result)  navigate("/");
    
  }
  useEffect(() => {
    const auth = getCookie("CD_token");
    if(!auth) { 
        navigate("/login");
    } else {
        const email = getCookie("CD_email");
        getUserInfo(email);
    }
  },[]);

  return (
    <>
    { dataUser && dataUser?.theme ? 
        <div className="theme">
            <div className='theme-background'></div>
            <div container="true" spacing={2} className="theme-layout">
                <div className="theme-content">
                    <div className="theme-content-layout">
                        <h4 className='title-theme'>Chọn 3 địa điểm mà bạn quan tâm</h4>
                        <div className="theme-content-item">
                            {listTheme.map((conscious, index) => {

                                return (
                                    <p key={index} onClick={() => handleClickConscious(conscious.key)} style={{backgroundColor:`${conscious.color}`}}>
                                        {conscious.name} {' '} {dataUser.theme?.includes(conscious.key) && <DoneIcon />}
                                    </p>
                                )
                            })}
                            <Button variant="contained" 
                            className="theme-content-item-button" 
                            color="primary" 
                            endIcon={<ArrowRightAltIcon />} 
                            disableElevation
                            onClick = {() => handleClickNext()}
                            >
                                Tiếp tục
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div> :
      <CircularProgress  /> 
    }
    </>
  )
}

Theme.propTypes = {}

export default Theme
