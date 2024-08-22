const CardLoading = () => {
    return(
        <div className="w-full grid grid-cols-3 justify-between gap-[30px] ">
            <div className="bg-white w-full py-2 px-2 border-2 rounded-md border-red-400">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-red-500 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-[20px] bg-red-500 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-[10px] bg-red-500 rounded col-span-2"></div>
                            <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                        </div>
                        <div className="h-[10px] bg-red-500 rounded"></div>
                        <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                        <div className="grid grid-cols-3 gap-x-3">
                            <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                            <div className="h-[10px] bg-red-500 rounded col-span-2"></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="bg-white w-full py-2 px-2 border-2 rounded-md border-red-400">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-red-500 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-[20px] bg-red-500 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-[10px] bg-red-500 rounded col-span-2"></div>
                            <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                        </div>
                        <div className="h-[10px] bg-red-500 rounded"></div>
                        <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                        <div className="grid grid-cols-3 gap-x-3">
                            <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                            <div className="h-[10px] bg-red-500 rounded col-span-2"></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="bg-white w-full py-2 px-2 border-2 rounded-md border-red-400">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-red-500 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-[20px] bg-red-500 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-[10px] bg-red-500 rounded col-span-2"></div>
                            <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                        </div>
                        <div className="h-[10px] bg-red-500 rounded"></div>
                        <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                        <div className="grid grid-cols-3 gap-x-3">
                            <div className="h-[10px] bg-red-500 rounded col-span-1"></div>
                            <div className="h-[10px] bg-red-500 rounded col-span-2"></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardLoading;