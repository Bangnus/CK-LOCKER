import { InputMd } from "../../../components/content-input/input";
import { useState, useEffect, useRef } from 'react';
import ButtonMd from "../../../components/content-button/button-md";
import ErrorSnackbar from "../../../components/content-alert/notfy/err-alert";
import { useDispatch, useSelector } from 'react-redux';
import { createLocker } from '../../../actions/lockerAction';
import Snackbar from "../../../components/content-alert/notfy/alert";
import { Modal } from "../../../components/content-modal/modal";
import confetti from 'canvas-confetti';
import { fecthAllColors } from "../../../actions/systemAction";
import Select from 'react-select';
import ColorPicker from "../../../components/content-input/color-picker";
import { CiBookmark } from "react-icons/ci";
import dateFormat from "dateformat";
import lockerGif from '../../../assets/image/img/locker-room.gif';
import PreviewGif from '../../../assets/image/gif/website-builder.gif';
import FolderGif from '../../../assets/image/gif/folder-web.gif';
import { fecthAllproducts } from "../../../actions/systemAction";
import QuetityInput from "./quetity";

const LockerFrom = () => {

    const dispatch = useDispatch();
    const colors = useSelector((state) => state.system.colors);
    const user = useSelector((state) => state.auth.curentUser);
    const protypes = useSelector((state) => state.system.protype);
    const [LockerName, setLockerName] = useState('');
    const [FloorQutity, setFloorQutity] = useState('');
    const [LimitDoc, setLimitDoc] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [setSelectedColor] = useState(null);
    const [colorsOtions, setColorsOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFatchingColors = useRef(false);
    const isFatchingProtype = useRef(false);
    const [lockerColorCode, setLockerColorCode] = useState(null);
    const [protypeOption, setprotypeOption] = useState(null);
    const [protypeSelect, setProtypeSelect] = useState(null);
    const [singleQuetity, setSingleQuantity] = useState(true);
    const [customFloor, setCustomFloor] = useState(false);
    const date = new Date();

    const inputOption = [
        {
            label: 'ชื่อ Locker',
            value: LockerName,
            type: 'text',
            onChange: setLockerName,
        },
        {
            label: 'จำนวนชั้นของ Locker',
            value: FloorQutity,
            type: 'text',
            onChange: setFloorQutity,
        },
        {
            label: 'จำนวนเอกสารที่ใส่ในแต่ล่ะชั้น',
            value: LimitDoc,
            type: 'text',
            onChange: setLimitDoc,
        },
    ];

    const fire = (radio, otp) => {
        const colors = ['#bb0000', '#ffffff'];
        confetti(
            Object.assign({}, otp, {
                particleCount: Math.floor(200 * radio),
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            })
        );
        confetti(
            Object.assign({}, otp, {
                particleCount:  Math.floor(200 * radio),
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            })
        );
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            let colorCode = lockerColorCode === null ? '#A5D6A7' : lockerColorCode;

            if (!LockerName ||!FloorQutity ||!LimitDoc) {
                throw "Please fill all fields.";
            }

            const data = {
                LockerName,
                floorQutity: Number(FloorQutity),
                limitdoc: Number(LimitDoc),
                // colors: selectedColor?.value,
                colors: colorCode,
                userZone: currentUser?.body[0].user_zone,
                proType: protypeSelect?.value,
            };

            const response = await dispatch(createLocker(data));
            if (response.status) {
                setLockerName('');
                setFloorQutity('');
                setLimitDoc('');
                console.log('Locker created successfully.');
                setIsLoading(false);
                setTimeout(() => {
                    Snackbar({message: 'Locker created successfully.'});
                    fire(3, {
                        spread: 30,
                        startVelocity: 60,
                    });
                }, 500);
                // setCloseModal(false);
            } else {
                throw response.message;
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            ErrorSnackbar({message: error});
        }
    };

    const handleChangeColor = (color) => {
        setLockerColorCode(color.hex);
    }

    const handleShowCustom = (e) => {
        e.preventDefault();
        setCustomFloor(true);
        setSingleQuantity(false);
    };

    const handleShowsingle = (e) => {
        e.preventDefault();
        setCustomFloor(false);
        setSingleQuantity(true);
    };

    useEffect(() => {

        if (user !== null) {
            setCurrentUser(user);
        }

        const fecthColors = async () => {
            try {
                if (isFatchingColors.current) return;
                isFatchingColors.current = true;
                await dispatch(fecthAllColors());
                isFatchingColors.current = false;
            } catch (error) {
                isFatchingColors.current = false;
                return console.log(error);
            }
        }

        if (colors.length === 0 || colors.length === undefined) {
            fecthColors();
        }

        if (colors.length !== 0 && colors.length !== undefined) {
            setColorsOptions(
                colors.map((color) => ({ value: color.id, label: color.name_th }))
            )
        }
    }, [dispatch, colors, user, currentUser]);

    useEffect(() => {
        const fecthProtype = async () => {
            try {
                if (isFatchingProtype.current) return;
                isFatchingProtype.current = true;
                await dispatch(fecthAllproducts());
                isFatchingProtype.current = false;
            } catch (error) {
                return console.log(error);
            }
        }

        if (protypes.length === 0) {
            fecthProtype();
        }

        if (protypes.length !== 0) {
            setprotypeOption(
                protypes.map((item) => ({ value: item.id, label: item.Name_TH }))
            )
        }
    }, [dispatch, protypes]);

    return(
        <Modal title="Create Locker" defaultBtn={false} closeModal={isLoading} headerIcon={FolderGif}>
            <form className="animate-fade-up animate-once animate-duration-1000 animate-delay-[50ms] animate-ease-in-out md:block">
                <div className="w-full py-4 grid grid-cols-2 gap-3 lg:grid-cols-2">
                        {inputOption.map((item, key) => (
                            <div key={key} className="md:py-2">
                                <InputMd id={key} lable={item.label} type={item.type} value={item.value} color="blue" OnChange={item.onChange} />
                            </div>
                        ))}
                        <Select
                            name="colors"
                            options={colorsOtions}
                            className="basic-multi-select hidden"
                            classNamePrefix="กรุณาเลือกผลิตภัณฑ์"
                            onChange={(selectedOption) => setSelectedColor(selectedOption)}
                        />
                </div>
                <div className="w-full flex gap-x-2 px-1 py-1 bg-gray-100 rounded-md">
                    <button className={`w-full flex justify-center items-center ${singleQuetity ? 'bg-red-500 text-white' : ''} rounded-md px-2 py-1 duration-100 ease-in-out`} onClick={handleShowsingle}> 
                        <span>กำหนดเหมือนกันทุกชั้น</span>
                    </button>
                    <button className={`w-full flex justify-center items-center ${customFloor ? 'bg-red-500 text-white' : ''} rounded-md px-2 py-1 duration-100 ease-in-out`} onClick={handleShowCustom}>
                        <span>กำหนดเอง</span>
                    </button>
                </div>
                <div className="w-full my-3">
                    <QuetityInput custom={customFloor} single={singleQuetity} />
                </div>
                <div className="mb-3">
                    <Select
                        name="colors"
                        options={protypeOption}
                        className="basic-multi-select"
                        classNamePrefix="กรุณาเลือกผลิตภัณฑ์"
                        onChange={(selectedOption) => setProtypeSelect(selectedOption)}
                    />
                </div>
                <div className="w-full mb-3">
                    <div className="text-[18px] font-primaryMedium flex gap-x-3 items-center">
                        <img src={PreviewGif} className="w-[50px]" alt="" />
                        <span>Preview Locker</span>
                    </div>
                    <div className="w-full border-2 px-1 py-1 rounded-lg">
                        <ColorPicker data={handleChangeColor} />
                        <div className="flex justify-center items-center my-5 text-black">
                            <div className="bg-white border border-gray-300 px-1 py-1 w-[500px] rounded-2xl">
                                <div style={{background: `${lockerColorCode}`}} className={`${lockerColorCode === null ? 'bg-green-200' : null } w-full rounded-xl px-2 py-2`}>
                                    <div className="flex justify-between px-2 py-2">
                                        <div className="bg-white px-4 py-1 rounded-full">
                                            <span>{dateFormat(date, "fullDate")}</span>
                                        </div>
                                        <button className="bookmark bg-white h-[2rem] w-[2rem] rounded-full flex justify-center items-center">
                                            <CiBookmark />
                                        </button>
                                    </div>
                                    <div className="my-5 px-2 flex justify-between items-center">
                                        <div className="font-primaryMedium text-[20px] text-black">
                                            <span>
                                                {LockerName === '' ? 'Locker Name' : LockerName}
                                            </span>
                                        </div>
                                        <div className='w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center'>
                                            <img src={lockerGif} className='w-[40px] rounded-full' alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="w-full flex justify-end animate-fade-up animate-once animate-duration-1500 animate-delay-[120ms] animate-ease-in-out">
                    <ButtonMd title="Create Locker Now." handleClick={handleSubmit} btnColor='bg-red-500 focus:outline-red-400' isLoading={isLoading} />
                </div>
            </form>
        </Modal>
    );
};


export default LockerFrom;