import DocMockup from '../../../../assets/image/svg/reviewed.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fecthTypedocument } from '../../../../actions/takedocAction';
import Select from 'react-select';
import { Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const TakeDocSec = ({ data }) => {

    const dispatch = useDispatch();
    const typeDocs = useSelector((state) => state.takedoc.typetakes);
    const isFatching = useRef(false);
    const [selectedType, setSelectedType] = useState(null);
    const [Option, setOptions] = useState(null);
    const [desciption, setDescription] = useState('');
    const isClearable = true;
    const isSearchable = true;

    const handleTake = (e) => {
        setDescription(e.target.value);
        data({
            Option,
            desciption
        });
    }

    useEffect(() => {
        const fecthTypesdocs = async () => {
            try {
                if (isFatching.current) return;
                isFatching.current = true;
                const response = await dispatch(fecthTypedocument());
                if (response.status === true) {
                    isFatching.current = false;
                }
            } catch (error) {
                isFatching.current = false;
                console.error(error);
            }
        } 

        if (typeDocs.length === 0 || typeDocs === undefined) {
            fecthTypesdocs();
        }

        if (typeDocs.length !== 0 && typeDocs !== undefined) {
            console.log(typeDocs);
            const types = typeDocs.map((typeDoc) => ({ value: typeDoc.id, label: typeDoc.name_th }));
            setSelectedType(types);
        }
    }, [dispatch, typeDocs]);

    return(
        <div className="w-full flex gap-x-5 mt-5">
            <div className="w-[30%] animate-fade-right animate-once animate-duration-500 animate-ease-in-out">
                <div className='bg-green-100 px-2 py-2 rounded-md'>
                    <img src={DocMockup} alt="" />
                </div>
            </div>
            <div className="w-[70%] animate-fade-left animate-once animate-duration-500 animate-ease-in-out">
                <div className='text-[20px] font-primaryMedium'>
                    <span>ขอเบิกเอกสาร</span>
                </div>
                <div className='my-2'>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        name="color"
                        options={selectedType}
                        onChange={(selected) => setOptions(selected)}
                    />
                </div>
                <div className='my-5'>
                    <Textarea size="nd" label="หมายเหตุ" color="red" value={desciption} onChange={handleTake} className="w-full" />
                </div>
            </div>
        </div>
    );
};

TakeDocSec.propTypes = {
    data: PropTypes.any,
};

export default TakeDocSec;