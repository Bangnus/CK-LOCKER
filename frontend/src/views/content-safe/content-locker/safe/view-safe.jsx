import { useContext, useEffect, useState } from 'react';
import { LockerContext } from "../../view-safe";
import CardLoading from "../../../../components/content-loading/card-loading";
import { CiBookmark } from "react-icons/ci";
import lockerGif from '../../../../assets/image/img/locker-room.gif';
import dateFormat from "dateformat";
import { useDispatch, useSelector } from 'react-redux';
import { bookMark } from '../../../../actions/lockerAction';
import { useNavigate } from 'react-router-dom';
import LockerNotfound from '../../../../components/content-notfound/locker-notfound';

const SafeComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Locker = useContext(LockerContext);
    const user = useSelector((state) => state.auth.curentUser);
    const [isShow, setIsShow] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const handleBookmark = async (lockerId) => {
        try {
            const data = {
                userId: user.body[0].id,
                lockerId: lockerId,
                bookActive: "no",
            }
            const response = await dispatch(bookMark(data));
            if (response.status === true) {
                setBookmarks([...bookmarks, {
                    lockerId: lockerId,
                }]);
                console.log(bookmarks);
            }
        } catch (error) {
            return console.error(error);
        }
    }

    const handleRedirect = async (lockerId) => {
        try {
            await navigate(`/view-floors/${lockerId}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (Locker.body !== undefined) {
            // console.log(Locker.body);
            setIsShow(false);
        }

        if (user !== null) {
            setCurrentUser(user.bookmarks);
        }
    }, [Locker, user, currentUser]);

    return(
        <div className="w-full flex justify-center">
            {
                isShow ?
                <CardLoading />
                :
                <div className='w-full'>
                    {
                        Locker.body.length === 0 ?
                        <LockerNotfound />
                        :
                        <div className="grid w-full justify-center grid-cols-3 xl:grid-cols-2 md:block gap-5 px-5">
                        {
                            Locker.body.map((locker, index) => (
                                <div key={index} className="bg-white border border-gray-300 px-1 py-1 w-full rounded-2xl hover:drop-shadow-md hover:scale-105 duration-100 ease-in-out" onClick={() => handleRedirect(locker.id)}>
                                    <div style={ locker.LockerColorCode !== null ? {background: `${locker.LockerColorCode}`} : {background: '#A5D6A7'}}  className={`w-full rounded-xl px-2 py-2`}>
                                        <div className="flex justify-between px-2 py-2">
                                            <div className="bg-white px-4 py-1 rounded-full">
                                                <span>{dateFormat(locker.createAt, "fullDate")}</span>
                                            </div>
                                            <button className="bookmark bg-white h-[2rem] w-[2rem] rounded-full flex justify-center items-center" onClick={() => handleBookmark(locker.id)}>
                                                <CiBookmark />
                                            </button>
                                        </div>
                                        <div className="my-5 px-2 flex justify-between items-center">
                                            <div className="font-primaryMedium text-[20px]">
                                                <span>
                                                    {locker.LockerName}
                                                </span>
                                            </div>
                                            <div className='w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center'>
                                                <img src={lockerGif} className='w-[40px] rounded-full' alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default SafeComponent;