import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Breadcrumb = ({breadcrumbsPath, title}) => {

    const Path = breadcrumbsPath;
    
    return(
        <div className="flex justify-between items-center w-full my-3">
            <div className="bg-blue-gray-50 px-2 py-2 rounded-md">
                <span>{title}</span>
            </div>
            <Breadcrumbs>
                <Link className="opacity-60">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </Link>
                {
                    Path.map((item, key) => (
                        <Link key={key} className={`${item.active ? '' : 'opacity-60'}`}>
                            <span>{item.label}</span>
                        </Link>
                    ))
                }
            </Breadcrumbs>
        </div>
    );
}

Breadcrumbs.propTypes = {
    breadcrumbsPath: PropTypes.arrayOf(PropTypes.shape({
        lable: PropTypes.string,
        active: PropTypes.bool,
    })),
    title: PropTypes.string,
}

export default Breadcrumb;