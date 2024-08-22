import { FcSafe } from "react-icons/fc";

const NavLoading = () => {
    return (
        <div className="bg-white w-full drop-shadow-sm">
            <div className='flex justify-between items-center pr-10'>
                <div className='flex items-center'>
                    <div className='bg-red-500 text-white rounded-r-lg px-[15px] flex justify-center items-center text-[20px] font-primaryMedium gap-x-2 h-full'>
                        <div className='text-[40px]'>
                            <FcSafe />
                        </div>
                        <span className="py-4">Chookiat Warehouse</span>
                    </div>
                </div>
                <div>
                    <div className='flex gap-x-3 items-center'>
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-[10px] bg-red-400 h-[40px] w-[40px]"></div>
                        </div>
                        <div className="animate-pulse flex space-x-4">
                            <div className=" bg-red-400 h-[20px] rounded-md w-[150px]"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-dashed border mt-[1px]'></div>
            <div className='px-2'>
                <div className='mx-2 flex items-center h-full py-2 gap-x-2 snap-x overflow-x-auto'>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[150px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavLoading;