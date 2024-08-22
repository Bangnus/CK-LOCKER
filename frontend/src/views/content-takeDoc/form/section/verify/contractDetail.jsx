import Folder from '../../../../../assets/image/gif/openFolder.gif';
import { FaArrowCircleRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SingleLoading from '../../../../../components/content-loading/siggle-loading';

const ContDetail = ({ contData }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    

    useEffect(() => {
        setIsLoaded(true);
        if (contData !== null) {
            setIsLoaded(false);
            console.log(contData);
        }
        console.log(contData);
    }, [contData]); 

    return(
        <div className="w-full mt-3 flex px-1 py-1 gap-x-3 rounded-lg border-2 border-gray-200 animate-fade-down animate-once animate-duration-1000 animate-ease-in-out">
            <div className='bg-gray-100 flex justify-center rounded-md items-center'>
                <img src={Folder} className='w-[65px]' alt="" />
            </div>
            <div className='w-full flex gap-x-3 items-center justify-between'>
                <div>
                    <span className='font-primaryMedium text-[16px] text-primarySafe'>Locker Name</span>
                    {isLoaded ? <SingleLoading /> : <span className='block'>{ contData[0].LockerName }</span>}
                </div>
                <div className='border rounded-full h-full'></div>
                <div>
                    <span className='font-primaryMedium text-[16px] text-primarySafe'>Locker Floors</span>
                    {isLoaded ? <SingleLoading /> : <span className='block'>{ contData[0].FloorNo }</span>}
                </div>
                <div className='border rounded-full h-full'></div>
                <div className='h-full'>
                    <a href={`/view-contract/${contData[0].LockerNo}/${contData[0].FloorNo}`} className='h-full'>
                        <button disabled={ isLoaded } className='bg-primarySafe text-white h-full px-2 rounded-md flex justify-center items-center gap-x-2 hover:bg-red-500 duration-100 ease-in-out'>
                            <span>
                                Go to Locker
                            </span>
                            <FaArrowCircleRight className='text-[18px]' />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

ContDetail.propTypes = {
    contData: PropTypes.any,
};

export default ContDetail;