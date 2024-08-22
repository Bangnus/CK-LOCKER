import FullCard from "../../../components/content-card/section-cardfull";
import DocGif from "../../../assets/image/gif/folder.gif";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthAllTypedoc } from "../../../actions/lockerAction";
import TypeTakeModal from "./typetake-modal";

const ViewTypedocAuthorize = () => {

    const dispatch = useDispatch();
    const typeDocs = useSelector((state) => state.locker.typeDocs);
    const [rows, setRows] = useState(null);
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
        const fecthAllType = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                await dispatch(fecthAllTypedoc());
                isFatching.current = false;
            } catch (error) {
                return console.error(error);
            }
        };

        if (typeDocs.length === 0 || typeDocs === undefined) {
            fecthAllType();
        }

        if (typeDocs.length !== 0) {
            let data = typeDocs.body === undefined? typeDocs : typeDocs.body;
            setRows(
                data.map((item, key) => ({
                    id: key + 1,
                    dataId: item.id,
                    col1: item.name_th,
                    col2: item.name_eng,
                }))
            );
        }

    }, [dispatch, typeDocs]);

    return(
        <FullCard>
            <div className="w-full">
                <div className="bg-white-0 h-[10px] w-[1000vh]"></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3 font-primaryMedium text-[20px] mb-5">
                    <img src={DocGif} className="w-[65px]" alt="" />
                    <span>จัดการประเภทการเบิกสาร</span>
                </div>
                <div>
                    <TypeTakeModal />
                </div>
            </div>
            <div style={{ height: '500px', width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </FullCard>
    );
};

export default ViewTypedocAuthorize;