import { Modal } from "../../../components/content-modal/modal";
import { InputMd } from "../../../components/content-input/input";
import { useState, useEffect, useRef } from 'react';
import bgImg from "../../../assets/image/svg/user-manage.svg";
import makeAnimated from 'react-select/animated';
import ButtonMd from "../../../components/content-button/button-md";
import { useDispatch, useSelector } from 'react-redux';
import { fectchBranchActive, fecthBranchs } from "../../../actions/systemAction";
import { fecthAllRole } from "../../../actions/roleAction";
import Select from 'react-select';
import { createUser } from "../../../actions/authAction";
import Toastify from "../../../components/content-alert/toastify/toast";
import ToastifyError from "../../../components/content-alert/toastify/toastError";

const UserModal = () => {

    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();
    const roles = useSelector((state) => state.userRole.allRole);
    const zoneList = useSelector((state) => state.system.zones);
    const branchList = useSelector((state) => state.system.branchFZ)
    const [Name, setName] = useState(null);
    const [userName, setUsersName] = useState(null);
    const [Password, setPassword] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Zone, setZone] = useState(null);
    const [Role, setRole] = useState(null);
    const [Branch, setBranch] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);
    // const [Branch, setBranch] = useState(null);
    const isFatchingZone = useRef(false);
    const isFatchingRoles = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [branchOptoin, setBranchOptions] = useState([]);


    const InputData = [
        {
            lable: "Name",
            type: "text",
            value: Name,
            OnChange: setName,
        },
        {
            lable: "Username",
            type: "text",
            value: userName,
            OnChange: setUsersName,
        },
        {
            lable: "Password",
            type: "password",
            value: Password,
            OnChange: setPassword,
        },
        {
            lable: "Email",
            type: "text",
            value: Email,
            OnChange: setEmail,
        },
    ];

    const handleCreateUser = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();

            if (!Name ||!userName ||!Password ||!Email ||!Zone || !Branch || !currentRole) {
                throw "กรุณากรอกข้อมูลให้ครบถ้วน";
            }

            let data = {
                Name,
                userName,
                Password,
                Email,
                Zone: Zone.value,
                Role: currentRole.value,
                Branch: Branch.value,
            }

            const response = await dispatch(createUser(data));
            if (response.status === true) {
                Toastify({ message: "Creating user successfully" })
            }
        } catch (error) {
            ToastifyError({message: error});
            return console.log(error);
        }
    };

    useEffect(() => {
        const fecthZones = async () => {
            try {
                if (isFatchingZone.current) return;
                isFatchingZone.current = true;
                const response = await dispatch(fecthBranchs());
                if (response.state === true) {
                    isFatchingZone.current = false;
                } else {
                    throw "เกิดข้อผิดดพลาดกรุณาติดต่อโปรแกรมเมอร์";
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (zoneList.length === 0 || zoneList.length === undefined) {
            fecthZones();
        }

        if (zoneList.length !== 0 && zoneList !== undefined) {
            setZone(
                zoneList.body.map((item) => ({ value: item.Zone, label: item.zonename }))
            )
        }
    }, [dispatch, zoneList]);

    const handlerFecthBranches = async (zone) => {
        try {
            setZone(zone)
            const responst = await dispatch(fectchBranchActive(zone.value));

            if (responst.status === true) {
                setBranchOptions(
                    branchList.map((items) => ({ value: items.id, label: items.NameBranch }))
                )
            }
        } catch (error) {
            return console.log(error);
        }
    };

    useEffect(() => {
        const fecthRoles = async () => {
            try {
                if (isFatchingRoles.current) return;
                isFatchingRoles.current = true;
                const response = await dispatch(fecthAllRole());
                if (response.state === true) {
                    isFatchingRoles.current = false;
                } else {
                    throw "เกิดข้อผิดดพลาดกรุณาติดต่อโปรแกรมเมอร์";
                }
            } catch (error) {
                isFatchingRoles.current = false;
                console.log(error);
            }
        }

        if (roles.length === 0 || roles === undefined) {
            fecthRoles();
        }

        if (roles.length !== 0 && roles !== undefined) {
            setRole(
                roles.body.map((item) => ({ value: item.id, label: item.name_th }))
            );
        }
    }, [dispatch, roles]);

    return (
        <Modal title="Create User" closeModal={isLoading}>
            <form>
                <div className="flex gap-x-[20px]">
                    <div className="w-1/6">
                        <img src={bgImg} className="bg-gray-100 px-10 py-[50px] rounded-md object-cover" alt="" />
                    </div>
                    <div className="w-5/6">
                        <div className="grid grid-cols-2 gap-3">
                            {
                                InputData.map((item, key) => (
                                    <InputMd key={key} lable={item.lable} color="blue" type={item.type} value={item.value} OnChange={item.OnChange} />
                                ))
                            }
                             <Select
                                name="colors"
                                options={Zone}
                                components={animatedComponents}
                                className="basic-multi-select"
                                classNamePrefix="กรุณาเลือกโซน"
                                onChange={(selectedOption) => handlerFecthBranches(selectedOption)}
                            />
                             <Select
                                name="colors"
                                options={branchOptoin}
                                components={animatedComponents}
                                className="basic-multi-select"
                                classNamePrefix="กรุณาเลือกโซน"
                                onChange={(selectedOption) => setBranch(selectedOption)}
                            />
                             <Select
                                name="colors"
                                options={Role}
                                components={animatedComponents}
                                className="basic-multi-select"
                                classNamePrefix="กรุณาเลือกสถานะผู้ใช้"
                                onChange={(selectedOption) => setCurrentRole(selectedOption)}
                            />
                            {/* <InputSelector lable="Branch"  values={Branch} OnChanges={setBranch} /> */}
                            {/* <InputSelector lable="Role" values={Role} OnChanges={setRole} /> */}
                        </div>
                        <div className="flex w-full justify-end mt-[20px]">
                            <ButtonMd title="Create New User" handleClick={handleCreateUser} />
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default UserModal;