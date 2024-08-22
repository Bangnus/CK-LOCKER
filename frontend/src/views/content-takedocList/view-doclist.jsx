import MasterLayout from "../layout/master";
import FullCard from "../../components/content-card/section-cardfull";
import ListPng from  '../../assets/image/gif/tasks.gif';
import TableDocwait from "./table";

const ViewDoclist = () => {

    const path = [
        {
          label: 'Home',
          active: false,
        },    
        {
          label: 'Document List',
          active: true,
        },    
    ];

    return(
        <MasterLayout titleName="รายการขอเบิกเอกสาร (Document List)" breadcrumbsPath={path}>
            <div className="w-full">
                <FullCard>
                    <div className="flex gap-x-2 items-center">
                        <img src={ListPng} className="w-[65px]" alt="" />
                        <span className="font-primaryMedium text-[20px]">รายการขอเบิกเอกสาร</span>
                    </div>
                    <TableDocwait />
                </FullCard>
            </div>
        </MasterLayout>
    );
};

export default ViewDoclist;