import FullCard from "../../../components/content-card/section-cardfull";
import LockerGif from "../../../assets/image/img/locker-room.gif";
import { useSelector, useDispatch } from 'react-redux';
import { fecthLockers } from "../../../actions/lockerAction";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const ManageLockers = () => {

    const dispatch = useDispatch();
    const lockers = useSelector((state) => state.locker.lockers);
    const [isLoadpage, setIsLoadpage] = useState(false);
    const [rows, setRows] = useState(null);

    const columns = [
        { field: 'col1', headerName: 'ชื่อล็อคเกอร์', flex: 1, editable: true },
        { field: 'col2', headerName: 'ชั้นของล็อกเกอร์', flex: 1 },
        { field: 'col3', headerName: 'ความจุต่อชั้น', flex: 1 },
        { field: 'col4', headerName: 'สถานะล็อกเกอร์', flex: 1 },
    ];

    useEffect(() => {
        setIsLoadpage(false)
        if (lockers.length === 0 || lockers === undefined) {
            dispatch(fecthLockers());
        }

        if (lockers !== undefined && lockers.length !== 0) {
            console.log(lockers.body);
            setIsLoadpage(true)
            if (rows === null) {
                setRows(
                    lockers.body.map((item, key) => ({
                        id: key + 1,
                        col1: item.LockerName,
                        col2: item.FloorQutity,
                        col3: item.LimitDoc,
                        col4: item.LocFloorActive === 'yes' ? 'ใช้งาน' : 'ไม่ใช้งาน',
                    }))
                );
            }
        }
    }, [dispatch, lockers, rows]);

    return (
        <FullCard>
            <div className="w-full">
                <div className="bg-white-0 h-[10px] w-[1000vh]"></div>
                <div className="flex items-center gap-x-3 font-primaryMedium text-[20px] mb-5">
                    <img src={LockerGif} className="w-[65px]" alt="" />
                    <span>จัดการข้อมูล Locker</span>
                </div>
                {
                    isLoadpage ?
                    <div style={{ height: '500px', width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                    :
                    <div>loading</div>
                }
            </div>
        </FullCard>
    );
}

export default ManageLockers;