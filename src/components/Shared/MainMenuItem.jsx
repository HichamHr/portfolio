import React from 'react';
import classNames from 'classnames';
import Icon from "./Icon";
import {Link, useLocation} from "react-router-dom";

export default function MainMenuItem({icon,link, text,badge=<></>}) {
    const location = useLocation();
    const isActive =  location.pathname.includes(link);

    const itemClasses = classNames('relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6', {
        'bg-blue-800 dark:bg-gray-600 border-blue-500 dark:border-gray-800': isActive,
        // 'text-indigo-400 group-hover:text-white fill-current': !isActive
        '': !isActive
    });

    return (
        <li>
            <Link to={link}
                  className={itemClasses}>
                <span className="inline-flex justify-center items-center ml-4">
                  {icon}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate" >{text}</span>
                {badge}
            </Link>
        </li>

    );
};