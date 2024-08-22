import FullCard from "../../../components/content-card/section-cardfull";
import roleGif from '../../../assets/image/gif/role.gif';
import RoleModal from "./role-modal";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fecthAllRole, deleteRole } from "../../../actions/roleAction";
import { MdDelete } from "react-icons/md";
import ModalSm from "../../../components/content-modal/modal-sm";
import { IoClose } from "react-icons/io5";
import TranGif from '../../../assets/image/gif/trash-bin.gif';
import { MdModeEdit } from "react-icons/md";
import ButtonMd from "../../../components/content-button/button-md";
import RoleEditModal from "./editModal";

const ViewUserRole = () => {

    const dispatch = useDispatch();
    const roles = useSelector((state) => state.userRole.allRole);
    const [rows, setRows] = useState(null);
    const isFatching = useRef(false);
    const [ModalDelete, setModalDelete] = useState(false);
    const [ModalEdit, setModalEdit] = useState(false);
    const [rowId, setRowId] = useState(null);

    const columns = [
        { field: 'col1', headerName: 'Name TH', flex: 1 },
        { field: 'col2', headerName: 'Name ENG', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params , key) => [
              <GridActionsCellItem
                key={key}
                icon={<MdDelete />}
                label="Delete"
                onClick={() => handleEditClick(params.row)}
                showInMenu
              />,
              <GridActionsCellItem
                key={key}
                icon={<MdModeEdit />}
                label="Edit"
                onClick={() => handleDeleteClick(params.row)}
                showInMenu
              />,
            ],
          },
    ];

    const handleEditClick = (row) => {
        setRowId(row.dataId);
        setModalDelete(true);
    }

    const handleDeleteClick = (row) => {
        setRowId(row.dataId);
        setModalEdit(true);
    };

    const handledeleteRole = async () => {
        try {
            const response = await dispatch(deleteRole(rowId));
            setModalDelete(false);
            console.log(response);
        } catch (error) {
            setModalDelete(false);
            return console.log(error);
        }
    }

    useEffect(() => {
        const fetchAllRoles = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                const response = await dispatch(fecthAllRole());
                if(response.status === true) {
                    isFatching.current = false;
                } else {
                    throw "เกิดข้อผิดดพลาดกรุณาติดต่อโปรแกรมเมอร์";
                }
            } catch (error) {
                return console.log(error);
            }
        }

        if (roles.length === 0 || roles === undefined) {
            fetchAllRoles();
        }

        if (roles.length !== 0 && roles !== undefined) {
            let data = roles.body === undefined? roles : roles.body;
            setRows(
                data.map((item, key) => ({
                    id: key + 1,
                    dataId: item.id,
                    col1: item.name_th,
                    col2: item.name_eng,
                }))
            );
        }
    }, [rows, dispatch, roles]);
    
    return(
        <FullCard>
            <div className="w-full">
                <div className="bg-white-0 h-[10px] w-[1000vh]"></div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-3 font-primaryMedium text-[20px] mb-5">
                        <img src={roleGif} className="w-[65px]" alt="" />
                        <span>จัดการสถานะผู้ใช้งาน</span>
                    </div>
                    <div>
                        <RoleModal />
                    </div>
                </div>
                <div>
                <ModalSm isOpen={ModalDelete}>
                    <div className="flex w-full justify-end items-center">
                        <button onClick={() => setModalDelete(false)} className="mr-4 bg-gray-100 h-[30px] w-[30px] flex justify-center items-center rounded-full hover:bg-gray-400 hover:text-black duration-150 ease-in-out">
                            <IoClose />
                        </button>
                    </div>
                    <div className="font-primaryRegular">
                        <div className="flex justify-center">
                            <img src={TranGif} className="w-[200px]" alt="" />
                        </div>
                        <div className="flex justify-center">
                            <p>ยืนยันแน่ใจใช้หรือว่าจะลบรายการนี้</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5 gap-x-3">
                        <ButtonMd btnColor="bg-gray-400" title="Cancel" handleClick={() => setModalDelete(false)}/>
                        <ButtonMd btnColor="bg-red-500" title="Delete Now!" handleClick={handledeleteRole} />
                    </div>
                </ModalSm>
                <RoleEditModal isOpen={ModalEdit} />
                </div>
                <div style={{ height: '500px', width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
            </div>
        </FullCard>
    );
};

export default ViewUserRole;