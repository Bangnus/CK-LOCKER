import FullCard from "../content-card/section-cardfull";
import { useRef, useEffect } from 'react';
import safe from '../../assets/image/img/safe.png'
import Typed from 'typed.js';

const PageLoading = () => {

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Chookiat Warehouse'],
            typeSpeed: 60,
            backSpeed: 20,
            backDelay: 1000,
            loop: true,
            showCursor: false,
          });

          return () => {
            typed.destroy();
          };
    }, []);

    return(
        <FullCard>
            <div className="h-[450px] flex justify-center items-center">
                <div className="bg-sec px-2 py-2 rounded-lg flex items-center justify-center gap-x-2 animate-ease-out animate-bounce animate-infinite">
                 <img src={safe} className="h-[50px] animate-pulse animate-infinite animate-ease-out" alt="" />
                 <span className="text-[28px] font-primaryMedium text-red-500" ref={el}></span>
                </div>
            </div>
        </FullCard>
    );
}

export default PageLoading;