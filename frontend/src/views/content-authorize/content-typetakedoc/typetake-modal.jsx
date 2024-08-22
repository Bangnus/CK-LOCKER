import { Modal } from "../../../components/content-modal/modal";
import { InputMd } from "../../../components/content-input/input";
import CreateDoc from "../../../assets/image/svg/create-document.svg";
import ButtonMd from "../../../components/content-button/button-md";
import Select from 'react-select';
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fecthBranchs } from "../../../actions/systemAction";
import { createTypeDoc } from "../../../actions/lockerAction";
import Snackbar from "../../../components/content-alert/notfy/alert";
import ErrorSnackbar from "../../../components/content-alert/notfy/err-alert";

const TypeTakeModal = () => {

    const dispatch = useDispatch();
    const fecthZone = useSelector((state) => state.system.zones);
    const [isLoading, setIsLoading] = useState(false);
    const [nameTH, setNameTH] = useState('');
    const [nameENG, setNameENG] = useState('');
    const [SelectedData, setSelected] = useState(null);
    const [Zone, setZone] = useState([]);
    const isFatching = useRef(false);

    const InputData = [
        {
            label: 'Name TH',
            value: nameTH,
            onChange: setNameTH,
        },
        {
            label: 'Name ENG',
            value: nameENG,
            onChange: setNameENG,
        },
    ];

    const handleCreateTypeTakeDoc = async () => {
        try {
            setIsLoading(true);
            let selectOptions = [];
            SelectedData.map((item, key) => (
                selectOptions[key] = item.value
            ));

            const data = {
                nameTH,
                nameENG,
                selectOptions,
            }

            const response = await dispatch(createTypeDoc(data));

            if (response.status === true) {
                setNameTH('');
                setNameENG('');
                setIsLoading(false);
                Snackbar({message: 'สร้างประเภทการเบิกเอกสารใหม่เสร็จสิ้น.'});
                console.log(response);
            } else {
                throw "Create Type Take Document Error";
            }

        } catch (error) {
            setIsLoading(false);
            ErrorSnackbar({message: error});
            console.log(error);
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
        <Modal title="สร้างประเภทการเบิกเอกสาร" closeModal={isLoading}>
            <div className="w-full flex gap-x-3">
                <div className="w-[30%]">
                    <div className="px-4 py-4 rounded-md bg-primarySafe flex justify-center items-center">
                        <img src={CreateDoc} className="object-cover h-[120px]" alt="" />
                    </div>
                </div>
                <div className="w-[70%]">
                    <div className="grid gap-3 grid-cols-2">
                        {
                            InputData.map((item, key) => (
                                <InputMd key={key} lable={item.label} value={item.value} OnChange={item.onChange} color="red" />
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
                    <div className="flex justify-end mt-5">
                        <ButtonMd title="สร้างประเภทการเบิกเอกสาร" btnColor="bg-red-500" isLoading={isLoading} handleClick={handleCreateTypeTakeDoc} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TypeTakeModal;