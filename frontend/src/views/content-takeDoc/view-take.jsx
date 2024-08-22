import MasterLayout from "../layout/master";
import FullCard from "../../components/content-card/section-cardfull";
import DocGif from '../../assets/image/gif/document.gif';
import TakeDocForm from "./form/view-form";

const ViewTakeDoc = () => {

    const path = [
      {
        label: 'Home',
        active: false,
      },    
      {
        label: 'Take Document',
        active: true,
      },    
    ];

    return(
        <MasterLayout breadcrumbsPath={path} titleName="ขอเบิกเอกสาร (Take Document)">
            <FullCard>
                <div className="flex justify-between">
                    <div className="flex gap-x-3 items-center font-primaryMedium text-[20px]">
                      <img src={DocGif} className="w-[65px]" alt="" />
                      <span>ขอเบิกเอกสาร</span>
                    </div>
                </div>
                <div className="w-full">
                  <TakeDocForm />
                </div>
            </FullCard>
        </MasterLayout>
    );
}

export default ViewTakeDoc;