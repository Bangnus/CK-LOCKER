import FullCard from "../../../components/content-card/section-cardfull";
import ApiGif from "../../../assets/image/gif/api.gif";
import { IoIosCopy } from "react-icons/io";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fecthApikeys } from "../../../actions/systemAction";
import ButtonMd from "../../../components/content-button/button-md";
import { createApiKey } from "../../../actions/systemAction";
import Toastify from "../../../components/content-alert/toastify/toast";
import ToastifyError from "../../../components/content-alert/toastify/toastError";

const ViewApikeyManagement = () => {

    const isFatching = useRef(false);
    const apiKeys = useSelector((state) => state.system.apikeys);
    const dispatch = useDispatch();

    const handlecreateNewapikey = async () => {
        try {
            const response = await dispatch(createApiKey());
            if (response.status === true) {
                Toastify({message: 'Create API key success.'});
            } else {
                ToastifyError({message: 'Create API key failed.'});
            }
        } catch (error) {
            ToastifyError({message: error});
            return console.log(error);
        }
    }

    useEffect(() => {
        const handleFecthApiKey = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                await dispatch(fecthApikeys());
                isFatching.current = false;
            } catch (error) {
                return console.log(error);
            }
        }

        if (apiKeys.length === 0) handleFecthApiKey();
    });

    return(
        <FullCard>
            <div className="w-full">
                <div className="bg-white-0 h-[10px] w-[1000vh]"></div>
                <div className="flex gap-x-3 items-center">
                    <div>
                        <img src={ApiGif} className="w-[65px]" alt="" />
                    </div>
                    <div className="font-primaryMedium text-[20px]">
                        <span>Api Key Management.</span>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        apiKeys.map((items, key) => (
                            <div key={key} className="px-4 py-4 w-full gap-x-3 bg-gray-100 rounded-md my-3 flex justify-between">
                                <div className="overflow-auto">
                                    <span>{items.ApiKey}</span>
                                </div>
                                <div>
                                    <button className="w-[25px] h-[25px] rounded-sm hover:bg-white flex justify-center items-center duration-100 ease-in-out">
                                        <IoIosCopy />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-end">
                    <ButtonMd title="Add New Api key." btnColor="bg-red-500" handleClick={handlecreateNewapikey} />
                </div>
            </div>
        </FullCard>
    );
};

export default ViewApikeyManagement;