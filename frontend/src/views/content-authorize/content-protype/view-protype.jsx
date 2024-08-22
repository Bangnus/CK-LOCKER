import FullCard from "../../../components/content-card/section-cardfull";
import MoneyGif from '../../../assets/image/gif/money.gif';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fecthAllproducts } from "../../../actions/systemAction";
import ProtypeModal from "./modal-protype";

const ViewProducttype = () => {

    const [rows, setRows] = useState(null);
    const dispatch = useDispatch();
    const producttypes = useSelector((state) => state.system.protype);
    const isFatching = useRef(false);

    const columns = [
        { field: 'col1', headerName: 'Name TH', flex: 1 },
        { 
            field: 'col2',
            headerName: 'Name ENG', 
            flex: 1,
            options: {
                customBodyRender: (value) => <p className="px-10 py-10 rounded-full bg-black">{value}</p>,
            }
        },
        { 
            field: 'col3', 
            headerName: 'Zone Active', 
            flex: 1,
            options: {
                customBodyRender: (value) => <p className="px-10 py-10 rounded-full bg-black">{value}</p>,
            }
        },
    ];

    useEffect(() => {
        const fecthProtypes = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                await dispatch(fecthAllproducts());
                isFatching.current = false;
            } catch (error) {
                return console.error(error);
            }
        };

        if (producttypes.length === 0) {
            fecthProtypes();
        }

        if (producttypes.length !== 0) {
            setRows(
                producttypes.map((items, key) => ({
                    id: key + 1,
                    col1: items.Name_TH,
                    col2: items.Name_EN,
                    col3: items.ZoneActive,
                }))
            );
        }
    }, [dispatch, producttypes]);

    return(
        <FullCard>
            <div className="w-full">
                <div className="bg-white-0 h-[10px] w-[1000vh]"></div>
            </div>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-x-2 mb-5">
                    <div>
                        <img src={MoneyGif} className="w-[65px]" alt="" />
                    </div>
                    <div className="text-[20px] font-primaryMedium">
                        <span>Product type management</span>
                    </div>
                </div>
                <div>
                    <ProtypeModal />
                </div>
            </div>
            <div style={{ height: '500px', width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </FullCard>
    );
};

export default ViewProducttype;