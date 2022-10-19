import React, {useState} from 'react';
import { TextField, Grid, Select, MenuItem, InputLabel, FormControl, Button} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons/';


function StepOne() {
    const [openCarType, setOpenCarType] = useState(false);
    const [car, setCar] = React.useState(0);
    
    // xu ly render
  const renderSelect = () => {
    return (
        <FormControl className="w-30">
            <InputLabel htmlFor="grouped-native-select">Loại xe</InputLabel>
            <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openCarType}
            onClose={handleClose}
            onOpen={handleOpen}
            value={car}
            onChange={handleChange}
            >
                <MenuItem value={0}>Xe máy</MenuItem>
                <MenuItem value={1}>Ô tô</MenuItem>
            </Select>
        </FormControl>
    )
  }  

  //xu ly logic
  const handleChange = (event) => {
    setCar(event.target.value);
  };

  const handleClose = () => {
    setOpenCarType(false);
  };

  const handleOpen = () => {
    setOpenCarType(true);
  };

  return (
    <div className='step-one'>
        <Grid container spacing={3}>
            <Grid item xs={4} className="upload-image">
                <div className="upload-image-content">
                    <Button
                        variant="contained"
                        color="default"
                        className="button-upload"
                        startIcon={<CloudUpload />}
                    >
                        Tải ảnh
                    </Button>
                </div>
            </Grid>
            <Grid item xs={8}>
                <TextField required id="standard-required" label="Tiêu đề" className="w-50" />
                <TextField required id="standard-required" label="Hashtags" className="w-50" />
                {renderSelect()}
                <TextField required id="standard-required" label="Hãng xe" className="w-30" />
                <TextField required id="standard-required" label="Số người đi" className="w-30" />
                <TextField required id="standard-required" label="Số điện thoại" className="w-40" />
                <TextField required id="standard-required" label="Chi phí / 1 người" className="w-40" />
                <form className='w-50' noValidate>
                  <TextField
                    id="datetime-local"
                    label="Thời gian đi"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
            </Grid>
        </Grid>
    </div>
  )
}

export default StepOne;
