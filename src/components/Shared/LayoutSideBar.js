import React, {useState} from 'react';
import Logo from "./Logo";
import MainMenu from "./MainMenu";

const LayoutSideBar = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    return (
        <div
            className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-indigo-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                <MainMenu/>
                <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2022</p>
            </div>
        </div>
    );
};
export default LayoutSideBar;