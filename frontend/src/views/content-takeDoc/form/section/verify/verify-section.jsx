import { InputMd } from "../../../../../components/content-input/input";
import HpGif from "../../../../../assets/image/gif/hired.gif";
import PslGif from "../../../../../assets/image/gif/alms.gif";
import DocMockUp from "../../../../../assets/image/svg/document.svg";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import ButtonIcon from "../../../../../components/content-button/button-icon";
import HistoryPng from "../../../../../assets/image/img/history.png";
import TakeHistory from "./table";
import ContDetail from "./contractDetail";
import * as ReactDOM from 'react-dom';
import { IoSearch } from "react-icons/io5";
import { reCheckTakeDoc } from "../../../../../actions/takedocAction";
import { useDispatch, useSelector } from "react-redux";
import ToastifyWarning from "../../../../../components/content-alert/toastify/toastWarning";
import ToastifyError from "../../../../../components/content-alert/toastify/toastError";
import { useParams } from "react-router-dom";

const VerifySection = ({ data }) => {

    const dispatch = useDispatch();
    const { contNos, typeLoan } = useParams();
    const currentCont = useSelector((state) => state.takedoc.currentCont);
    const [ContType, setContType] = useState("PSL");
    const [contNo, setContno] = useState('');
    const [activeStep, setActiveStep] = useState(true);
    const isFatching = useRef(false);    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const renderContDetail = async () => {
        try {
            let InputData = {
                contType: ContType,
                contNo: contNo,
            }

            if (InputData.contType === "" || InputData.contNo === "") {
                throw { 
                    type: 'warn',
                    message: 'กรุณากรอกข้อมูลให้ครบถ้วน.'
                };
            }

            const response = await dispatch(reCheckTakeDoc(InputData));
            if (response.status === true) {
                console.log(currentCont);
                if (currentCont !== null) {
                    setActiveStep(false);
                    data({
                        activeStep
                    });
                    data({
                      InputData,
                      currentCont
                    })
                    // eslint-disable-next-line react/no-deprecated
                    await ReactDOM.render(<ContDetail contData={currentCont} />, document.getElementById('ContTail'));
                } else {
                    throw { 
                        type: 'warn',
                        message: 'ไม่มีเลขสัญญานี้ กรุณาเพิ่มสัญญาเข้าระบบ.'
                    };
                }
            } else {
               throw 'ไม่มีเลขสัญญานี้ กรุณาเพิ่มสัญญาเข้าระบบ.';
            }
        } catch (error) {
            if (error.type === 'warn') {
                ToastifyWarning({message: error.message});
            } else {
                ToastifyError({ message: error });
            }
            return console.log(error);
        }
    };

    useEffect(() => {
        data({
            activeStep
        });
    }, [data, activeStep]);

    useEffect(() => {
      const FecthContDetails = async () => {
        try {
            let InputData = {
                contType: ContType,
                contNo: contNo,
            }

            if (InputData.contType === "" || InputData.contNo === "") {
                throw { 
                    type: 'warn',
                    message: 'กรุณากรอกข้อมูลให้ครบถ้วน.'
                };
            }

            const response = await dispatch(reCheckTakeDoc(InputData));
            if (response.status === true) {
                console.log(currentCont);
                if (currentCont !== null) {
                    setActiveStep(false);
                    data({
                        activeStep
                    });
                    data({
                      InputData,
                      currentCont
                    });
                } else {
                    throw { 
                        type: 'warn',
                        message: 'ไม่มีเลขสัญญานี้ กรุณาเพิ่มสัญญาเข้าระบบ.'
                    };
                }
            } else {
               throw 'ไม่มีเลขสัญญานี้ กรุณาเพิ่มสัญญาเข้าระบบ.';
            }
        } catch (error) {
            return console.log(error);
        }
    };

      if (contNos && typeLoan) {
        setContno(contNos);
        setContType(typeLoan);
        if (currentCont === null) {
          if (isFatching.current) return;
          isFatching.current = true;
          FecthContDetails();
          isFatching.current = false;
        }

        if (currentCont!== null) {
          setActiveStep(false);
          data({
              activeStep
          });
           // eslint-disable-next-line react/no-deprecated
          ReactDOM.render(<ContDetail contData={currentCont} />, document.getElementById('ContTail'));
        }
      }
    }, [contNos, typeLoan, dispatch,ContType, activeStep,data, contNo, currentCont]);

  return (
    <div>
      <div className="w-full flex lg:block gap-x-5 mt-5">
        <div className="w-[30%] lg:w-full animate-fade-right animate-once animate-duration-500 animate-ease-in-out">
          <div className="bg-green-100 rounded-md flex justify-center items-center px-2 py-2">
            <img src={DocMockUp} className="lg:w-[300px]" alt="" />
          </div>
        </div>
        <div className="gap-3 w-[70%] lg:w-full animate-fade-left animate-once animate-duration-500 animate-ease-in-out">
          <div className="text-[20px] lg:mt-5 font-primaryMedium">
            <span>ตรวจสอบเลขสัญญาที่ขอเบิก</span>
          </div>
          <div className="flex md:block gap-3 justify-between">
            <div className="relative w-full my-2">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                value={ContType === "PSL"}
                onChange={() => setContType("PSL")}
              />
              <label
                className="flex cursor-pointer flex-col rounded-md border-2 border-gray-300 px-4 py-3 peer-checked:border-2 peer-checked:border-red-500 duration-100 ease-in-out"
                htmlFor="radio_1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-x-[20px]">
                    <div>
                      <img src={PslGif} className="w-[50px]" alt="" />
                    </div>
                    <div>
                      <span className="text-xl font-primaryMedium block">
                        เช้าซื้อ
                      </span>
                      <span className="text-xl font-primaryMedium">PSL</span>
                    </div>
                  </div>
                  <div
                    className="invisible peer-checked:visible"
                    htmlFor="radio_1"
                  >
                    <RiVerifiedBadgeFill className="h-7 w-7 text-red-500" />
                  </div>
                </div>
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                value={ContType === "HP"}
                onChange={() => setContType("HP")}
              />
              <label
                className="flex cursor-pointer flex-col rounded-md border-2 border-gray-300 px-4 py-3 peer-checked:border-2 peer-checked:border-red-500 duration-100 ease-in-out"
                htmlFor="radio_2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-x-[20px]">
                    <div>
                      <img src={HpGif} className="w-[50px]" alt="" />
                    </div>
                    <div>
                      <span className="text-xl font-primaryMedium block">
                        เงินกู้
                      </span>
                      <span className="text-xl font-primaryMedium">HP</span>
                    </div>
                  </div>
                  <div
                    className="invisible peer-checked:visible"
                    htmlFor="radio_2"
                  >
                    <RiVerifiedBadgeFill className="h-7 w-7 text-red-500" />
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="mt-[10px] flex gap-x-1">
            <InputMd color="red" type="text" lable="เลขสัญญา" OnChange={setContno} value={contNo} />
            <ButtonIcon color="red" icon={<IoSearch className="text-[20px]" />} event={renderContDetail} />
          </div>
          <div id="ContTail" className="w-full"></div>
        </div>
      </div>
      <div className="w-full mt-5">
        <div className="text-[18px] font-primaryMedium flex gap-x-2 items-center">
          <img src={HistoryPng} className="w-[40px]" alt="" />
          <span>Take a Document History</span>
        </div>
        <div className="mt-3">
            <TakeHistory />
        </div>
      </div>
    </div>
  );
};

VerifySection.propTypes = {
  data: PropTypes.object,
};

export default VerifySection;
