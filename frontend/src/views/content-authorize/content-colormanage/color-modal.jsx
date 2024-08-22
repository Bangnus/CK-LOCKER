import { Modal } from "../../../components/content-modal/modal";
import colorMackup from "../../../assets/image/svg/mockup-color.svg";
import { InputMd } from "../../../components/content-input/input";
import ButtonMd from "../../../components/content-button/button-md";
import { useState } from 'react';
import Toastify from "../../../components/content-alert/toastify/toast";
import ToastifyError from "../../../components/content-alert/toastify/toastError";
import { useDispatch } from "react-redux";
import { createColor } from "../../../actions/systemAction";

const ColorManangeModal = () => {

    const dispatch = useDispatch();
    const [nameTH, setNameTH] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const InputData = [
        {
            label: "Name TH",
            value: nameTH,
            onChange: setNameTH,
        },
        {
            label: "Name EN",
            value: nameEN,
            onChange: setNameEN,
        },
    ];

    const handleCreateColor = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const data = { nameTH, nameEN };

            if (!nameTH ||!nameEN) {
                throw "Please fill all fields.";
            }

            const response = await dispatch(createColor(data));
            if (response.status === true) {
                setIsLoading(false);
                setNameEN('');
                setNameTH('');
                setTimeout(() => {
                    Toastify({ message: "Create color successfully!" });
                }, 500);
            } else {
                throw "Create color failed!";
            }
        } catch (error) {
            setIsLoading(false);
            setTimeout(() => {
                ToastifyError({ message: `${error}` });
            }, 500);
            console.log(error);
        }
    }

    return (
        <Modal title="Create Color" closeModal={isLoading}>
            <form>
                <div className="w-full flex gap-x-3">
                    <div className="w-[30%]">
                        <img src={colorMackup} className="bg-gray-100 px-2 py-2 h-[150px] w-full rounded-md object-fill" alt="" />
                    </div>
                    <div className="w-[70%]">
                        <div className="grid grid-cols-2 gap-3">
                            {
                                InputData.map((item, index) => (
                                    <InputMd key={index} lable={item.label} color="red" value={item.value} OnChange={item.onChange} />
                                ))
                            }
                        </div>
                        <div className="w-full flex justify-end mt-10">
                            <ButtonMd title="Create new color" btnColor="bg-red-500" handleClick={handleCreateColor} />
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default ColorManangeModal;