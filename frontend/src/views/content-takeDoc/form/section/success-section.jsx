import Veriified from '../../../../assets/image/gif/double-check.gif';
import { useEffect } from 'react';

const TakeSuccess = () => {

    useEffect(() => {

    }, []);

    return(
        <div className='w-full'>
            <div className="w-full flex justify-center mt-[70px]">
                <div className='bg-gray-100 px-2 py-2 rounded-full animate-bounce animate-infinite animate-duration-[1300ms] animate-ease-in'>
                    <img src={Veriified} className='w-[200px]' alt="" />
                </div>
            </div>
            <div className='mt-5 flex justify-center text-[18px]'>
                <span>คุณได้ทำการเบิกเอกสารเรียบร้อยแล้ว ระบบจะพาคุณไปยังหน้ารายการเบิกเอกสาร</span>
            </div>
        </div>
    );
};

export default TakeSuccess;