import OutStock from '../../assets/image/img/out-of-stock.png';

const LockerNotfound = () => {
    return (
        <div className='w-full my-[50px]'>
            <div className='w-full flex justify-center'>
                <img src={OutStock} className='w-[100px] animate-bounce animate-infinite animate-duration-[1500ms] animate-ease-in-out' alt="" />
            </div>
            <div className='w-full flex justify-center font-primaryMedium mt-5'>
                <span>ยังไม่มี Locker อยู่ในระบบกรุณาเพิ่มข้อมูลในระบบ</span>
            </div>
        </div>
    );
};

export default LockerNotfound;