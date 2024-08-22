import FullCard from "../../../components/content-card/section-cardfull"
import ColorGif from "../../../assets/image/gif/color-swatches.gif";
import ColorManangeModal from "./color-modal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fecthAllColors } from "../../../actions/systemAction";
import { DataGrid } from '@mui/x-data-grid';

const ViewColormanagement = () => {

    const dispatch = useDispatch();
    const colors = useSelector((state) => state.system.colors);
    const [rows, setRows] = useState(null);
    const isFatching = useRef(false);


    const columns = [
        { field: 'col1', headerName: 'Name TH', flex: 1 },
        { field: 'col2', headerName: 'Name ENG', flex: 1 },
        { field: 'col3', headerName: 'Active', flex: 1 },
    ];

    useEffect(() => {
        const fecthColors = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                const response = await dispatch(fecthAllColors());
                if (response.status === true) {
                    isFatching.current = false;
                }
            } catch (error) {
                return console.log(error);
            }
        }

        if (colors.length === 0 || colors === undefined) {
            fecthColors();
        }

        if (colors.length!== 0 && colors!== undefined) {
            setRows(
                colors.map((item, key) => (
                    {
                        id: key + 1,
                        col1: item.name_th,
                        col2: item.name_eng,
                        col3: item.active? 'Yes' : 'No',
                    }
                ))
            );  
        }
    }, [dispatch, colors]);

    return(
        <FullCard>
            <div className="w-full">
                <div className="bg-white-0 h-[10px] w-[1000vh]"></div>
                <div className="flex justify-between items-center gap-x-3 font-primaryMedium text-[20px] mb-5">
                    <div className="flex gap-x-3 items-center">
                        <img src={ColorGif} className="w-[65px]" alt="" />
                        <span>Color Management</span>
                    </div>
                    <div>
                        <ColorManangeModal />
                    </div>
                </div>
                <div className="w-full">
                    <div style={{ height: '500px', width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                </div>
            </div>
        </FullCard>
    );
};

export default ViewColormanagement;