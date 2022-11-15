import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import { CloudUpload, ClearOutlined } from "@material-ui/icons/";
import { useDispatch, useSelector } from "react-redux";
import { saveImage, actFetchNewTrip, deleteImage } from "~/redux/actions";
import moment from "moment";

const StepOne = ({dataTrip, handleEnterData}) => {
  const [openCarType, setOpenCarType] = useState(false);
  const { newTrip } = useSelector((state) => state.pages);
  const dispatch = useDispatch();

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
          value={dataTrip.xe_di}
          onChange={e => handleEnterData("xe_di", e.target.value)}
        >
          <MenuItem value={"o_to_6"}>Ô tô 6 chỗ</MenuItem>
          <MenuItem value={"o_to_9"}>Ô tô 9 chỗ</MenuItem>
        </Select>
      </FormControl>
    );
  };

  //xu ly logic
  const handleClose = () => {
    setOpenCarType(false);
  };

  const handleOpen = () => {
    setOpenCarType(true);
  };

  //Handle update image
  const handleUpdateImage = async (e) => {
    const tempFile = Array.from(e.target.files);
    if (tempFile[0] && tempFile[0]?.size < 5000000) {
      const dataTrip = {...newTrip};
      let params = {
        file: tempFile[0],
        fileName: tempFile[0].name,
      };
      const result = await saveImage(params);
      dataTrip['url_image'] = JSON.stringify(result.data);
      params = {
        data: dataTrip,
      }
      dispatch(actFetchNewTrip(params));
      
      //fix bugs upload 1 file with onchange twice
      e.target.value = null;
    }
  };

  const handleDeleteImage = async () => {
    const urlFile = JSON.parse(newTrip.url_image)?.urlFile;
    await deleteImage({urlFile});

    const dataTrip = {...newTrip};
    dataTrip['url_image'] = '';
    const params = {
      data: dataTrip,
    }
    dispatch(actFetchNewTrip(params));
  }

  return (
    <div className="step-one">
      <Grid container spacing={3}>
        <Grid item xs={4} className="upload-image">
          <div className="upload-image-content">
            {!newTrip.url_image ? 
              <Button
                variant="contained"
                color="default"
                className="button-upload"
                startIcon={<CloudUpload />}
              >
                <label>
                  <input
                    hidden
                    accept="image/png, image/jpeg, image/jpg image/webp"
                    type="file"
                    onChange={handleUpdateImage}
                    name="myImage"
                  />
                  Tải ảnh
                </label>
              </Button>:
            <div className="layout_img_trip">
              <img src={JSON.parse(newTrip.url_image).urlImage} alt="anh_chuyen_di"/>
              <ClearOutlined className="icon_delete_image" onClick={() => handleDeleteImage()}/>
            </div> 
          }
          </div>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="standard-required"
            label="Tiêu đề"
            className="w-50"
            onChange={e => handleEnterData("title", e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            label="Hashtags"
            className="w-50"
            onChange={e => handleEnterData("hashtags", e.target.value)}
          />
          {renderSelect()}
          <TextField
            required
            id="standard-required"
            label="Hãng xe"
            className="w-30"
            onChange={e => handleEnterData("loai_xe", e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            label="Số người đi"
            className="w-30"
            onChange={e => handleEnterData("number_member", e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            label="Số điện thoại"
            className="w-40"
            onChange={e => handleEnterData("phone_number", e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            label="Chi phí / 1 người"
            className="w-40"
            onChange={e => handleEnterData("cost", e.target.value)}
          />
          <form className="w-50" noValidate>
            <TextField
              id="datetime-local"
              label="Thời gian đi"
              type="datetime-local"
              defaultValue={moment(new Date()).format("YYYY-MM-DDTHH:mm")}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {(e) => handleEnterData("start_at",e.target.value)}
            />
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default StepOne;
