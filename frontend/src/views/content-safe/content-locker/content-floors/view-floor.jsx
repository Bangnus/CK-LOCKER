import MasterLayout from "../../../layout/master";
import FullCard from "../../../../components/content-card/section-cardfull";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, createContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fecthFloors } from "../../../../actions/lockerAction";
import filesGif from '../../../../assets/image/gif/files.gif';
import { Progress } from "@material-tailwind/react";
import CardprogressLoading from "../../../../components/content-loading/cardprogress-loading";
import PerforLockerGif from "../../../../assets/image/gif/performanceLocker.gif";
import { IoIosArrowBack } from "react-icons/io";

export const LockerFloorsContext = createContext({
    floors: [],
    currentFloor: null,
});

const ViewFloors = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const floors = useSelector((state) => state.locker.floors);
    const currentLocker = useSelector((state) => state.locker.currentLocker);
    const progress = useSelector((state) => state.progress.progress);
    const [loading, setLoading] = useState(false);
    const isFatching = useRef(false);

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
            active: true,
        },
    ];

    const handlerTocontrctpage = (lockerId ,floorsId) => {
        try {
            navigate(`/view-contract/${floorsId}/${lockerId}`);
        } catch (error) {
            return console.error(error);
        }
    };

    const handlerPrevPage = () => {
        if (location.pathname === '/view-floors/:id') {
            navigate('/view-safe');
        } else {
            navigate(-1);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fecthFloor = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                await dispatch(fecthFloors(id));
                isFatching.current = false;
            } catch (error) {
                isFatching.current = false;
                return console.error(error);
            }
        }
        
        fecthFloor();

        if (floors.length !== 0 && floors !== undefined) {
            setLoading(false);
        }
    }, [dispatch, id, floors, progress, currentLocker]);

    return(
        <MasterLayout titleName="Locker Floors" breadcrumbsPath={path}>
            <FullCard>
                <LockerFloorsContext.Provider value={{floors, currentLocker}}>
                    <div className="w-full px-4 py-4">
                        <div className="flex animate-fade-down animate-once animate-duration-1000 animate-ease-in-out">
                            <div className="text-[18px] font-primaryMedium flex gap-x-2 items-center">
                                <button className="bg-red-500 h-[45px] w-[45px] rounded-lg flex justify-center items-center hover:bg-red-400 hover:drop-shadow-md duration-100 ease-in-out" onClick={handlerPrevPage}>
                                    <IoIosArrowBack className="text-[35px] text-white" />
                                </button>
                                <img className="w-[60px]" src={PerforLockerGif} alt="" />
                                <div>
                                    <span>Locker floors</span>
                                </div>
                            </div>
                        </div>
                        {
                            loading ?
                            <CardprogressLoading />
                        :
                            <div className="my-5 grid grid-cols-3 gap-3 animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
                                {
                                    floors.map((items, key) => (
                                        <div key={key} className="px-2 py-2 w-full border-2 border-gray-300 rounded-xl hover:border-red-400 duration-100 ease-in-out" onClick={() => handlerTocontrctpage(items.id, currentLocker[0].id)}>
                                            <div className="h-[60px] w-[60px] px-1 py-1 rounded-xl bg-gray-100">
                                                <img src={filesGif} alt="" />
                                            </div>
                                            <div className="my-[20px]">
                                                <div className="text-[25px] font-primaryMedium">
                                                    <span>Floor {items.FloorNo}</span>
                                                </div>
                                                <div className="w-full flex justify-between">
                                                    <div>
                                                        <span>500</span>
                                                    </div>
                                                    <div>
                                                        <span>{currentLocker[0].LimitDoc}</span>
                                                    </div>
                                                </div>
                                                <Progress value={50} color="red" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </LockerFloorsContext.Provider>
            </FullCard>
        </MasterLayout>
    );
}

export default ViewFloors;