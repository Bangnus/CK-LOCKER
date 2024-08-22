import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fecthtakeWait } from "../../actions/takedocAction";
import TableLoading from "../../components/content-loading/table-loading";

const TableDocwait = () => {

    const dispatch = useDispatch();
    const docwait = useSelector((state) => state.takedoc.docwait);
    const [isLoading, setIsLoading] = useState(false);
    const isFatching = useRef(false);

    useEffect(() => {
        setIsLoading(true);
        const fecthDocwait = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                await dispatch(fecthtakeWait());
                isFatching.current = false;
            } catch (error) {
                return console.error(error);
            }
        };

        fecthDocwait();

        if (docwait.length !== 0) {
            setIsLoading(false);
            console.log(docwait);
        }
    }, [dispatch, docwait]);

    return(
        <div className="flex gap-x-4">
            <div className="w-full px-2 py-2 rounded-md bg-gray-100">
                <table className="w-full border-collapse border-2">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>เลขที่สัญญา</th>
                            <th>เอกสารที่ขอเบิก</th>
                            <th>เอกสารที่ขอเบิก</th>
                        </tr>
                    </thead>
                    {
                        isLoading ?
                        <TableLoading columns={4} rows={10} />
                        :
                        <tbody className="text-center">
                            {
                                docwait.map((items, key) => (
                                    <tr key={key}>
                                        <td>{key+1}</td>
                                        <td>{items.CONTNO}</td>
                                        <td>Document 2</td>
                                        <td>Document 3</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    }
                </table>
            </div>
            <div className="w-[100px] px-1 py-1 rounded-md bg-gray-100"> </div>
            <div className="w-full px-2 py-2 rounded-md bg-gray-100">
                <table className="w-full border-collapse border-2">
                    <thead>
                        <tr>
                            <th>เอกสารที่ขอเบิก</th>
                            <th>เอกสารที่ขอเบิก</th>
                            <th>เอกสารที่ขอเบิก</th>
                            <th>เอกสารที่ขอเบิก</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td>001</td>
                            <td>Document 1</td>
                            <td>Document 2</td>
                            <td>Document 3</td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Document 4</td>
                            <td>Document 5</td>
                            <td>Document 6</td>
                        </tr>
                        <tr>
                            <td>003</td>
                            <td>Document 7</td>
                            <td>Document 8</td>
                            <td>Document 9</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableDocwait;