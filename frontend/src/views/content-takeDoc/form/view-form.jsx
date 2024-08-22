import React from "react";
import { Stepper, Step } from "@material-tailwind/react";
import VerifySection from "./section/verify/verify-section";
import TakeDocSec from "./section/takedoc-section";
import TakeSuccess from "./section/success-section";
import ButtonIcon from "../../../components/content-button/button-icon";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { FaUsersRectangle } from "react-icons/fa6";


const TakeDocForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [activeSteps, setactiveSteps] = React.useState(false);
  const [verifyData, setVerifyData] = React.useState('');
  const [takeData, setTakedata] = React.useState('');

  const handleVerifyCall = (data) => {
    setactiveSteps(data.activeStep);
    setVerifyData(data.InputData, data.currentCont);
  };

  const handleSendtakedoc = (data) => {
    setTakedata(data);
    console.log(takeData);
    console.log(verifyData);
  }

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        className="animate-fade-down animate-once animate-duration-500 animate-ease-in-out animate-delay-300"
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step>
          <FaUsersRectangle className="h-5 w-5" />
        </Step>
        <Step>
          <IoDocumentText className="h-5 w-5" />
        </Step>
        <Step>
          <RiVerifiedBadgeFill className="h-5 w-5" />
        </Step>
      </Stepper>
      <div>
        {activeStep === 0 && <VerifySection data={handleVerifyCall} />}
        {activeStep === 1 && <TakeDocSec data={handleSendtakedoc} />}
        {activeStep === 2 && <TakeSuccess />}
      </div>
      <div className="mt-3 flex justify-between animate-fade-up animate-once animate-duration-500 animate-delay-300 animate-ease-in-out">
        <ButtonIcon
          icon={<IoIosArrowBack />}
          color="red"
          event={handlePrev}
          CusStyle="text-[20px]"
          disable={isFirstStep}
        />
        <ButtonIcon
          icon={<IoIosArrowForward />}
          color="red"
          event={handleNext}
          CusStyle="text-[20px]"
          disable={isLastStep || activeSteps}
        />
      </div>
    </div>
  );
};

export default TakeDocForm;
