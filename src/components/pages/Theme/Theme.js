import React , {useState} from 'react';
import "~/assets/style/theme.scss";
import { Grid, Stack, Chip, Button} from '@material-ui/core';
import { listTheme } from "-cc/data";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';

function Theme() {
  const navigate = useNavigate();  
  const [listConscious , setListConscious] = useState([]);

  const handleClickConscious = (value) => {
    if(listConscious.includes(value)) return;
    setListConscious([...listConscious , value]);
  }
  const handleClickNext = () => {
     navigate("/");
  }
  return (
    <div className="theme">
        <div className='theme-background'></div>
        <div container spacing={2} className="theme-layout">
            <div className="theme-content">
                <div className="theme-content-item">
                    {listTheme.map((conscious, index) => {
                        return (
                            <p key={index} onClick={() => handleClickConscious()}>Hà Nam</p>
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
  )
}

Theme.propTypes = {}

export default Theme
