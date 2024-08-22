import { Progress } from "@material-tailwind/react";

const CardprogressLoading = () => {
    return(
        <div className="my-5 grid grid-cols-3 gap-3">
            <div className="px-2 py-2 w-full border-2 border-gray-300 rounded-xl">
                <div className="h-[60px] w-[60px] px-1 py-1 rounded-xl bg-red-300 animate-pulse animate-infinite animate-duration-[1500ms] animate-ease-in-out">
                    
                </div>
                <div className="my-[20px]">
                    <div className="font-primaryMedium h-[24px] my-1 w-[150px] rounded-md bg-red-300 animate-pulse animate-infinite animate-duration-[1500ms] animate-ease-in-out"></div>
                    <div className="w-full flex justify-between">
                        <div className="h-[17px] mb-1 w-[80px] rounded-md bg-red-300 animate-pulse animate-infinite animate-duration-[1500ms] animate-ease-in-out"></div>
                        <div className="h-[17px] mb-1 w-[80px] rounded-md bg-red-300 animate-pulse animate-infinite animate-duration-[1500ms] animate-ease-in-out"></div>
                    </div>
                    <Progress value={100} className="rounded-md bg-red-300 animate-pulse animate-infinite animate-duration-[1500ms] animate-ease-in-out" color="red" />
                </div>
            </div>
        </div>
    );
};

export default CardprogressLoading;