import FullCard from "../../../components/content-card/section-cardfull";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from'react-redux';
import { fecthUsers } from "../../../actions/authAction";
import ErrorSnackbar from "../../../components/content-alert/notfy/err-alert";
import PageLoading from "../../../components/content-loading/page-loading";
import userGif from '../../../assets/image/gif/user.gif';
import UserModal from "./modal-users";

const AuthorizeUser = () => {

    const dispatch = useDispatch();
    const AllUser = useSelector((state) => state.auth.users);
    const [users, setUsers] = useState(null);
    const [isLoadPage, setLoadPage] = useState(true);
    const [rows, setRows] = useState(null);
    const isFatching = useRef(false);

    const columns = [
        { field: 'col1', headerName: 'Name', flex: 1 },
        { field: 'col2', headerName: 'Role', flex: 1 },
        { field: 'col3', headerName: 'Username', flex: 1 },
        { field: 'col4', headerName: 'password', flex: 1 },
    ];   

    useEffect(() => {
        setLoadPage(true);
        const fecthAllUser = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                const response = await dispatch(fecthUsers());
                if (response.status === true) {
                    setUsers(response.data.body);
                    isFatching.current = false;
                } else {
                    throw "เกิดข้อผิดพลาดกรุณาติดต่อโปรแกรมเมอร์";
                }
            } catch (error) {
                ErrorSnackbar({message: `${error}`});
                console.log(error);
            }
        }

        if (AllUser.length === 0 || users === null) {
            fecthAllUser();
        }

        if (users !== null) {
            if (rows === null) {
                setRows(
                    users.map((item , key) => ({
                        id: key + 1,
                        col1: item.name,
                        col2: item.user_role,
                        col3: item.username,
                        col4: item.passwordToken,
                    }))
                );
            }
           setLoadPage(false);
        }
    }, [AllUser, users, rows, dispatch]);

    return(
        <FullCard>
            {
                isLoadPage ? 
                <PageLoading />
                :
                <div className="w-full">
                    <div className="bg-white-0 h-[10px] w-[1000vh]"></div>
                    <div className="flex justify-between mb-[20px] items-center">
                        <div className="font-primaryMedium flex gap-x-3 text-[20px] items-center">
                            <img src={userGif} className="w-[65px]" alt="" />
                            <span>จัดการข้อมูลผู้ใช้งาน</span>
                        </div>
                        <div>
                            <UserModal />
                        </div>
                    </div>
                    <div style={{ height: '500px', width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                </div>
            }
        </FullCard>
    );
}

export default AuthorizeUser;