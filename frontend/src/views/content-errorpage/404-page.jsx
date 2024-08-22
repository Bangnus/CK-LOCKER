import { Button, Result } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from'react-router-dom';

const PageNotfound = () => {

    const navigate = useNavigate();
    const Locat = Cookies.get('lastPath');

    const handleTopage = async () => {
        navigate(Locat);
    }

    return (
        <>
            <div className='h-screen flex justify-center items-center'>
                <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={handleTopage}>Back Home</Button>}
                />
            </div>
        </>
    );
}

export default PageNotfound;