import FullCard from "../../components/content-card/section-cardfull";
import FloorGif from "../../assets/image/gif/floor.gif";

const ViewRecentsection = () => {
    return(
        <FullCard>
             <div className="w-full mt-3">
                <div className="text-[18px] font-primaryMedium flex gap-x-2 items-center animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
                    <img src={FloorGif} className="w-[60px]" alt="" />
                    <span>Recent Contract</span>
                </div>
            </div>
            <div>
                
            </div>
        </FullCard>
    );
};

export default ViewRecentsection;