import { Button, Dropdown } from 'antd'
import { IoIosMore } from "react-icons/io";
import { Empty } from 'antd';
import PropTypes from 'prop-types';

const IconDropdown = ({lists}) => {

    const items = lists === undefined ? [
        {
            key: '1',
            label: (
                <Empty className='w-[150px]' description={false} />
            ),        
        },
    ] : lists;

    return(
        <Dropdown
            menu={{
            items,
            }}
            placement="bottomRight"
        >
            <Button>
                <IoIosMore />
            </Button>
        </Dropdown>
    );
}

IconDropdown.propTypes = {
    lists: PropTypes.any,
}

export default IconDropdown;