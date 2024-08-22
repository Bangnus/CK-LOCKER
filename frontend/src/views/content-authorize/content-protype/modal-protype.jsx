import { Modal } from "../../../components/content-modal/modal";
import NewGif from '../../../assets/image/gif/add-file.gif';
import ProductMockup from '../../../assets/image/svg/product.svg';
import { InputMd } from "../../../components/content-input/input";
import ButtonMd from "../../../components/content-button/button-md";
import { useDispatch, useSelector } from 'react-redux';
import { createProducttpye } from "../../../actions/systemAction";
import { useState, useEffect, useRef } from 'react';
import Toastify from "../../../components/content-alert/toastify/toast";
import ToastifyError from "../../../components/content-alert/toastify/toastError";
import Select from 'react-select';
import { fecthBranchs } from "../../../actions/systemAction";

const ProtypeModal = () => {

    const dispatch = useDispatch();
    const fecthZone = useSelector((state) => state.system.zones);
    const [nameTH, setNameTH] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [SelectedData, setSelected] = useState(null);
    const [Zone, setZone] = useState([]);
    const isFatching = useRef(false);

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

    const handlerCreateProtype = async () => {
        try {
            setIsLoading(true);
            let selectOptions = [];
            SelectedData.map((item, key) => (
                selectOptions[key] = item.value
            ));
            
            let data = {
                nameTH,
                nameEN,
                selectOptions,
            }

            const response = await dispatch(createProducttpye(data));
            if (response.status === true) {
                setIsLoading(false);
                Toastify({message: "Create product type success!"});
            }
        } catch (error) {
            setIsLoading(false);
            ToastifyError({ message: error });
            return console.error(error);
        }
    };

    useEffect(() => {
        const fecthAllBranchs = async () => {
            try {
                if (isFatching.current) return;

                isFatching.current = true;
                const response = await dispatch(fecthBranchs());
                if (response.status === true) {
                    isFatching.current = false;
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (fecthZone.length === 0) {
            fecthAllBranchs();
        }

        if (fecthZone.length !== 0 && fecthZone !== undefined) {
            setZone(
                fecthZone.body.map((item) => ({ value: item.Zone, label: item.zonename }))
            );
        }
    }, [dispatch, fecthZone]);

    return(
        <Modal title="Create Product type" headerIcon={NewGif} closeModal={isLoading}>
            <div className="w-full flex gap-x-3">
                <div className="w-[30%] flex justify-center items-center">
                    <img src={ProductMockup} className="bg-gray-100 rounded-md px-2 py-2" alt="" />
                </div>
                <div className="w-[70%]">
                    <div className="grid grid-cols-2 gap-2">
                        {
                            InputData.map((items, key) => (
                                <InputMd key={key} lable={items.label} OnChange={items.onChange} color="blue" />
                            ))
                        }
                    </div>
                    <div className="mt-5">
                        <Select
                            isMulti
                            name="colors"
                            options={Zone}
                            className="basic-multi-select"
                            classNamePrefix="กรุณาเลือกสาขา"
                            onChange={(selectedOption) => setSelected(selectedOption)}
                        />
                    </div>
                    <div className="flex w-full justify-end mt-5">
                        <ButtonMd title="Create new product type" handleClick={handlerCreateProtype} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProtypeModal;