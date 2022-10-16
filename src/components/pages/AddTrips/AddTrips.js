import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper,  Step, StepLabel, Button} from '@material-ui/core';
import "~/assets/style/addTrip.scss";
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
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
  return ['Điền thông tin', 'Chọn địa điểm', 'Xác nhận thông tin'];
}

function AddTrips() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <div className='add-trip'>
        <h4>TẠO CHUYẾN ĐI</h4>
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel style={{marginBottom:"40px"}}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel className='label-step'>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
            {activeStep === 2 && <StepThree />}
            <div className='add-trip-button'>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                >
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
            {/* )} */}
        </div>
    </div>
  )
}

export default AddTrips;
