import MasterLayout from "../../../layout/master";
import { useParams, useNavigate } from 'react-router-dom';
import FullCard from "../../../../components/content-card/section-cardfull";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState, createContext } from 'react';
import { fecthFloorcontract } from "../../../../actions/lockerAction";
import ContGif from '../../../../assets/image/gif/files.gif';
import RenderContract from "./contract-render";
import CardLoading from '../../../../components/content-loading/card-loading';
import { IoIosArrowBack } from "react-icons/io";
import SecEmpty from "../../../../components/content-empty/sec-empty";

export const ViewLockerContractContext = createContext({
    contract: null,
});

const ViewLockerContract = () => {

    const { lockerId, floorsId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contract = useSelector((state) => state.locker.currentFloorContract);
    const isFatching = useRef(false);
    const [loading, setLoading] = useState(false);
    const [isShow, setIsShow] = useState(true);

    const path = [
        {
            label: 'Home',
            active: false,
        },
        {
            label: 'Lockers',
            active: false,
        },
        {
            label: 'Locker Floors',
            active: false,
        },
        {
            label: 'Locker Contract',
            active: true,
        },
    ];

    const handlerPrevPage = () => {
        navigate(-1);
    }

    useEffect(() => {
        setLoading(true);
        setIsShow(false);
        const fectchContract = async () => {
            try {
                const data = {
                    lockerId,
                    floorsId,
                }
                if (isFatching.current) return;
                isFatching.current = true;
                await dispatch(fecthFloorcontract(data));
                isFatching.current = false;
            } catch (error) {
                return console.log(error);
            }
        };

        fectchContract();

        if (contract.length === 0) {
            setLoading(false);
            setIsShow(true);
        }

        if (contract.length !== 0) {
            setLoading(false);
        }
    }, [dispatch, lockerId, floorsId, contract, loading, isShow]);

    return(
        <MasterLayout titleName="Locker Contract" breadcrumbsPath={path}>
            <ViewLockerContractContext.Provider value={{ contract }}>
                <FullCard>
                    <div className="w-full">
                        <div className="flex gap-x-2 items-center text-[18px] font-primaryMedium">
                            <button className="bg-red-500 h-[45px] w-[45px] rounded-lg flex justify-center items-center hover:bg-red-400 hover:drop-shadow-md duration-100 ease-in-out" onClick={handlerPrevPage}>
                                <IoIosArrowBack className="text-[35px] text-white" />
                            </button>
                            <img src={ContGif} className="w-[65px]" alt="" />
                            <div>
                                <span>Contracts in locker</span>
                            </div>
                        </div>
                        <div className="w-full">
                            {
                                loading ?
                                <CardLoading />
                                :
                                <div className="w-full">
                                    {
                                        isShow ?
                                        <SecEmpty />
                                        :
                                        <RenderContract />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </FullCard>
            </ViewLockerContractContext.Provider>
        </MasterLayout>
    );
};

export default ViewLockerContract;