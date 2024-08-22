import { useContext, useState } from 'react';
import { ViewLockerContractContext } from './view-lockercontract';
import ContDetailImg from '../../../../assets/image/img/folder.png';
import { useDispatch, useSelector } from 'react-redux';
import { fecthCont } from '../../../../actions/contractAction';
import SingleLoading from '../../../../components/content-loading/siggle-loading';
import { Drawer, Badge, Descriptions } from 'antd';
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const RenderContract = () => {

    const contract = useContext(ViewLockerContractContext);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const contractState = useSelector((state) => state.contract.currentCont);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const itemsss = [
        {
          key: '1',
          label: 'Product',
          children: 'Cloud Database',
        },
        {
          key: '2',
          label: 'Billing Mode',
          children: 'Prepaid',
        },
        {
          key: '3',
          label: 'Automatic Renewal',
          children: 'YES',
        },
        {
          key: '4',
          label: 'Order time',
          children: '2018-04-24 18:00:00',
        },
        {
          key: '5',
          label: 'Usage Time',
          children: '2019-04-24 18:00:00',
          span: 2,
        },
        {
          key: '6',
          label: 'Status',
          children: <Badge status="processing" text="Running" />,
          span: 3,
        },
        {
          key: '7',
          label: 'Negotiated Amount',
          children: '$80.00',
        },
        {
          key: '8',
          label: 'Discount',
          children: '$20.00',
        },
        {
          key: '9',
          label: 'Official Receipts',
          children: '$60.00',
        },
        {
          key: '10',
          label: 'Config Info',
          children: (
            <>
              Data disk type: MongoDB
              <br />
              Database version: 3.4
              <br />
              Package: dds.mongo.mid
              <br />
              Storage space: 10 GB
              <br />
              Replication factor: 3
              <br />
              Region: East China 1
              <br />
            </>
          ),
        },
    ];
    

    const onClose = async () => {
        setOpen(false);
    };

    const handleShowContDetail = async (CONTNO) => {
        try {
            setSize('large');
            setOpen(true);
            setIsLoading(true);
            const data = {
                contNo: CONTNO
            };
            const response = await dispatch(fecthCont(data));
            if (response.status === true) {
                setIsLoading(false);
                console.log(response);
            }
        } catch (error) {
            return console.log(error);
        }
    };

    return(
        <div className="w-full">
            <div className="grid grid-cols-3 gap-3 my-5">
                {
                    contract.contract.map((items, key) => (
                        <div key={key}>
                            <button onClick={() => handleShowContDetail(items.CONTNO)} className='w-full'>
                                <div className='px-2 py-2 border-2 rounded-md w-full'>
                                    <span>{items.CONTNO}</span>
                                </div>
                            </button>
                            <Drawer
                                title={`Contract Detail`}
                                placement="right"
                                size={size}
                                onClose={onClose}
                                open={open}
                                className='rounded-l-xl'
                            >
                                <div className='flex items-center border-primarySafe border-2 px-1 py-1 rounded-lg gap-x-3'>
                                    <div className='h-[60px] w-[60px] flex justify-center items-center bg-red-300 rounded-md'>
                                        <img src={ContDetailImg} className='w-[40px]' alt="" />
                                    </div>
                                    <div className='flex h-full w-full justify-between'>
                                        <div>
                                            <span>{items.CONTNO}</span>
                                            <span className='block'>{isLoading ? <SingleLoading /> :  <span>{ contractState === null ? 'data not found' :  contractState[0].cusnameen }</span> }</span>
                                        </div>
                                        <div className='border-2 h-[45px] rounded-md border-primarySafe'></div>
                                        <div>
                                            <span>{isLoading ? <SingleLoading /> : contractState[0].CardId }</span>
                                            <span className='block'>{isLoading ? <SingleLoading /> : contractState[0].Phone_Cus }</span>
                                        </div>
                                        <Link to={`${isLoading ? null : `/view-takedoc/${items.CONTNO}/${contractState[0].NameLoan}`}`}>
                                            <button className='bg-primarySafe text-white h-full px-2 rounded-md flex justify-center items-center gap-x-2 hover:bg-red-500 duration-100 ease-in-out'>
                                                <span>
                                                    Go to Take Document
                                                </span>
                                                <FaArrowCircleRight className='text-[18px]' />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className='my-3'>
                                    <span className='font-primaryMedium text-[16px] text-primarySafe mt-3'>Details</span>
                                    <Descriptions bordered size='small' items={itemsss} />
                                </div>
                            </Drawer>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default RenderContract;