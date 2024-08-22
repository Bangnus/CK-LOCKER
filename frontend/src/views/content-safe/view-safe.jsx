import MasterLayout from "../layout/master";
import FullCard from "../../components/content-card/section-cardfull";
import SafeComponent from "./content-locker/safe/view-safe";
import SafeBax from "../../assets/image/gif/safe-box.gif";
import LockerFrom from "./from-create/from";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fecthLockers } from "../../actions/lockerAction";
import { createContext } from 'react';
import PageLoading from "../../components/content-loading/page-loading";
import ViewRecentsection from "./recent";

export const LockerContext = createContext();

const ViewSafe = () => {
    const Path = [
        {
            label: 'Home',
            active: false,
        },
        {
            label: 'Lockers',
            active: true,
        },
      ];

    const dispatch = useDispatch();
    const lockers = useSelector((state) => state.locker.lockers);

    const [Locker, setLocker] = useState(null);
    const [isLoadpage, setIsLoadpage] = useState(false);
    // const [progress, setProgress] = useState(0);
    const isFatching = useRef(false);

      useEffect(() => {
        setIsLoadpage(true);
        const fecthLocs = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                await dispatch(fecthLockers());
                isFatching.current = false;
            } catch (error) {
                console.error(error);
            }
        }

        if (lockers.length === 0 || Locker === null) {
            fecthLocs();
        } 

        if (lockers !== undefined) {
            setLocker(lockers.body);
        }

        if (Locker !== null && Locker !== undefined) {
            setIsLoadpage(false);
        }
      }, [lockers, Locker, dispatch]);

    return(
        <MasterLayout titleName="รายการล็อคเกอร์ (Locker page)" breadcrumbsPath={Path}>
            { isLoadpage ?
            <PageLoading />
            :  <FullCard>
                    <div className="flex justify-between mb-4 items-center">
                        <div className="flex gap-x-3 items-center">
                            <img src={SafeBax} className="h-[50px]" alt="" />
                            <span className="text-[20px]">Locker List</span>
                        </div>
                        <div>
                            <LockerFrom />
                        </div>
                    </div>
                    <div className="flex justify-center gap-x-3 my-5">
                        <LockerContext.Provider value={lockers}>
                            <SafeComponent />
                        </ LockerContext.Provider>
                    </div>
                </FullCard>
            }
            <div className="w-full">
                <ViewRecentsection />
            </div>
        </MasterLayout>
    );
};

export default ViewSafe;