import Proptypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../../components/content-nav/Nav';
// import SildeBar from '../../components/content-slidebar/slidebar';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { fecthUser } from '../../actions/authAction';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from '../../components/breadcrumbs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ButtonCanvs from '../../components/content-canvas/button-canvas';

const MasterLayout = ({children, titleName, breadcrumbsPath}) => {

    const navigate = useNavigate();
    const locatpage = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth.curentUser);
    const [user, setUser] = useState(null);
    const [Avatar, setAvatar] = useState(null);
    const drawer = false;
    const isFectching = useRef(false);

    useEffect(() => {
        document.title = `Warehouse | ${titleName}`;
        const authToken = Cookies.get('authToken');
        Cookies.set('lastPath', locatpage.pathname);
        AOS.init();
        // checkToeknExpiration();
        
        if (!authToken) {
            navigate('/');
        }

        // funct checkToeknExpiration
        const checkToeknExpiration = async () => {
            try {
                const decodedToken = jwtDecode(authToken);
                const currentTime = new Date().getTime() / 1000;
                setIsAuthenticated(decodedToken.exp <= currentTime);
                if (isAuthenticated) {
                    console.log('✨ Unauthorized to access this page. Please signin again. Redirecting to signin page...');
                    Cookies.remove('authToken');
                    navigate('/');
                }
            } catch (error) {
                console.log('✨ Unauthorized to access this page. Please signin again. Redirecting to signin page...');
                setIsAuthenticated(false);
                navigate('/');
            }
        };

        checkToeknExpiration();

    }, [navigate, titleName, isAuthenticated, locatpage]);

    useEffect(() => {

        const fecthUsers = async () => {
            try {
                if (isFectching.current) return;
                isFectching.current = true;
                await dispatch(fecthUser());
                isFectching.current = false;
            } catch (error) {
                return console.error('Error fetching user:', error);
            }
        };

        if (!authState) {
          fecthUsers();
        }

        setUser(authState);
  
        if (!Avatar && user) {
          Cookies.set('userId', user.body[0].id);
          const usersplit = user.body[0].name.split(' ');
          if (usersplit.length > 1) {
              const first = usersplit[0].substring(0, 1).toLocaleUpperCase();
              const last = usersplit[1].substring(0, 1).toLocaleUpperCase();
              setAvatar(`${first}${last}`);
          } 
          
          if (usersplit.length === 1 ) {
              const first = usersplit[0].substring(0, 1).toLocaleUpperCase();
              setAvatar(first);
          }
        }
        
      }, [authState, user, Avatar, dispatch]);

    return(
        <>
            <div className='flex max-w-full font-primaryRegular'>
                {/* <div>
                    <SildeBar />
                </div> */}
                <div className='w-full'>
                    <div className='relative'>
                        <Nav user={user} Avatar={Avatar} />
                        <div className='mx-10'>
                            <Breadcrumb breadcrumbsPath={breadcrumbsPath} title={titleName} />
                            <div>
                                {children}  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <ButtonCanvs setOpen={drawer} />
        </>
    );
}

MasterLayout.propTypes = {
    children: Proptypes.node.isRequired,
    titleName: Proptypes.string,
    breadcrumbsPath: Proptypes.arrayOf(Proptypes.shape({
        label: Proptypes.string,
        active: Proptypes.bool,
    })),
}

export default MasterLayout;