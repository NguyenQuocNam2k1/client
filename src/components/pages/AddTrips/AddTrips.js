import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@material-ui/core";
import "~/assets/style/addTrip.scss";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalSweet from "~/components/layout/ModalSweet";
import { actFetchNewTrip } from "~/redux/actions";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Điền thông tin", "Chọn địa điểm", "Xác nhận thông tin"];
}

function AddTrips() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  // const [dataTrip, setDataTrip] = useState(dataDefault);
  const dataTrip = useSelector((state) => state.pages.newTrip);

  const { dataUser } = useSelector((state) => state.users);
  const steps = getSteps();

  //function logic
  const handleNext = () => {
    const resultCheck = checkFieldRequied();
    if(resultCheck) {
      ModalSweet("error","Lỗi","Yêu cầu bạn điền đầy đủ thông tin");
      return;
    };

    if (activeStep === 2) {
      navigate("/");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleEnterData = (field, value) => {
    const newTrip = {...dataTrip};
    newTrip[field] = value;
    const params = {
      data: newTrip,
    }
    dispatch(actFetchNewTrip(params));

    // setDataTrip(newTrip);
  };

  const checkFieldRequied = () => {
    const filedRequire = [
      "title",
      "hashtags",
      "xe_di",
      "loai_xe",
      "number_member",
      "phone_number",
      "cost",
      "start_place",
      "end_place",
      "rules",
      "start_at",
      "url_image",
    ];
    let checkField = false;
    for (const [key, value] of Object.entries(filedRequire)) {
      if(!dataTrip[value]){
        checkField = true;
        break;
      }
    }
    return checkField;
  };

  //useEffect
  useEffect(() => {
    if (dataUser && dataTrip) {
      const newTrip = dataTrip;
      const authInfo = {
        email: dataUser.email,
        name: dataUser.name,
        avatar: dataUser.avatar,
      };
      newTrip["author_info"] = JSON.stringify(authInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);
  
  return (
    <div className="add-trip">
      <h4>TẠO CHUYẾN ĐI</h4>
      <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          style={{ marginBottom: "40px" }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel className="label-step">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <StepOne handleEnterData={handleEnterData} dataTrip={dataTrip} />
        )}
        {activeStep === 1 && <StepTwo />}
        {activeStep === 2 && <StepThree />}
        <div className="add-trip-button">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddTrips;
