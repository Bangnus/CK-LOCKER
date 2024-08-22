import SplitPane from 'react-split-pane'
import PropTypes from 'prop-types';
import './canvas.css';

const ButtonCanvs = ({children, setOpen}) => {

    return(
        <div>
            {
            setOpen ? 
            <SplitPane 
            split='horizontal' 
            minSize={50} 
            style={{background: 'rgba(0,0, 0, 0.25)' }}
            defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
            onChange={(size) => localStorage.setItem('splitPos', size)}
         >
            <div className='w-full'>

            </div>
            <div className='w-full h-full' style={{background: 'rgba(0,0, 0, 0)' }}> 
                <div className='mb-1 flex justify-center'>
                    <div className='bg-white w-[40px] h-[8px] rounded-full'></div>
                </div>
                <div className='bg-white w-full h-full rounded-t-[25px]'>
                    {children}
                </div>
            </div>
        </SplitPane> : 
        <div></div>
        }
        </div>
    )
}

ButtonCanvs.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.any,
}

export default ButtonCanvs;