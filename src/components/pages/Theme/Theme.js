import React , {useState , useEffect} from 'react';
import "~/assets/style/theme.scss";
import DoneIcon from '@material-ui/icons/Done';
import { Button } from '@material-ui/core';
import { listTheme } from "-cc/data";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
import { getCookie } from "-cc/cookie";
import { getUser, actGetTheme, saveTheme } from "~/redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "-cl/Loading";

function Theme() {;
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const {dataUser} = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false)

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
    setLoading(true);
    let params = {
        themeNew : dataUser['theme'],
        email : dataUser['email'],
        name: dataUser['name']
    }
    const result = await saveTheme(params);
    if(result) {
        return setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 1000);
    };
    setLoading(false)
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
                        <h4 className='title-theme'>Ch???n 3 ?????a ??i???m m?? b???n quan t??m</h4>
                        <div className="theme-content-item">
                            {listTheme.map((conscious, index) => {

                                return (
                                    <p key={index} onClick={() => handleClickConscious(conscious.key)} style={{backgroundColor:`${conscious.color}`}}>
                                        {conscious.name} {' '} {dataUser.theme?.includes(conscious.key) && <DoneIcon />}
                                    </p>
                                )
                            })}
                            {
                             loading ? <Loading  /> :
                            <Button variant="contained" 
                            className="theme-content-item-button" 
                            color="primary" 
                            endIcon={<ArrowRightAltIcon />} 
                            disableElevation
                            onClick = {() => handleClickNext()}
                            >
                                Ti???p t???c
                            </Button>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div> :
      <Loading /> 
    }
    </>
  )
}

Theme.propTypes = {}

export default Theme
