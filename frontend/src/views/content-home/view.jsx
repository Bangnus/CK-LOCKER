import MasterLayout from "../layout/master";
import homeImg from '../../assets/image/3d/home.png';

const Home = () => {

    const Path = [
        {
            label: 'Home',
            active: true,
        },
      ]

    return(
        <MasterLayout titleName="Home" breadcrumbsPath={Path}>
            <div className="w-full bg-white px-4 py-20 rounded-xl flex justify-center items-center">
                <div>
                    <img src={homeImg} alt="" className="w-[400px]" />
                    <div className="flex justify-center my-5 text-[20px] font-medium">
                        <span>Welcome to <span className="text-red-600">Chookaat Locker</span></span>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default Home;