import MasterLayout from "../layout/master";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import AuthorizeUser from "./content-users/authorize-user";
import ManageLockers from "./content-lockers/manage-lockers";
import ViewUserRole from "./content-userRoles/view-userRoles";
import ViewTypedocAuthorize from "./content-typetakedoc/view-typetakedoc";
import ViewColormanagement from "./content-colormanage/Viewcolormanage";
import ViewProducttype from "./content-protype/view-protype";
import ViewApikeyManagement from "./content-apikey/view-apikey";

  
const ViewAuthorize = () => {
    
    const Path = [
        {
            label: 'Home',
            active: false,
        },
        {
            label: 'Authorization',
            active: true,
        },
    ];

    const data = [
        {
            label: "จัดการข้อมูลผู้ใช้งาน",
            value: "AuthorizeUser",
            desc: <AuthorizeUser />,
        },
        {
            label: "จัดการข้อมูล Locker",
            value: "AuthorizeLocker",
            desc: <ManageLockers />,
        },
        {
            label: "จัดการสถานะผู้ใช้งาน",
            value: "AuthorizeUserRole",
            desc: <ViewUserRole />,
        },
        {
            label: "จัดการประเภทการเบิกสาร",
            value: "AuthorizeTypedoc",
            desc: <ViewTypedocAuthorize />,
        },
        {
            label: "Color Management",
            value: "AuthorizeColor",
            desc: <ViewColormanagement />,
        },
        {
            label: "Product type Management",
            value: "AuthorizeProducttype",
            desc: <ViewProducttype />,
        },
        {
            label: "Api Key Management",
            value: "AuthorizeApikey",
            desc: <ViewApikeyManagement />,
        },
    ];

    return(
        <MasterLayout titleName="จัดการข้อมูลระบบ (system manage)" breadcrumbsPath={Path}>
            <div className="w-full flex justify-between gap-x-4">
                <Tabs value="AuthorizeUser" orientation="vertical">
                    <TabsHeader className="w-72 font-primaryMedium">
                        {data.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                            {label}
                        </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody className="w-full">
                        {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value} className="py-0">
                            {desc}
                        </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
        </MasterLayout>
    );
}

export default ViewAuthorize;