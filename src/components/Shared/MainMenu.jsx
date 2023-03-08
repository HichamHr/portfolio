import React from 'react';
import MainMenuItem from "./MainMenuItem";
import {FaAddressBook, FaBusinessTime, FaHome, FaInbox, FaUser} from 'react-icons/fa'
import {FcBusiness} from "react-icons/fc";


 const MainMenu =  () => {
  return (
        <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Main
                    </div>
                </div>
            </li>
            <MainMenuItem text="Dashboard" link="/admin/dashboard" icon={<FaHome/>}/>
            <MainMenuItem text="Projects" link="/admin/projects" icon={<FcBusiness/>}/>
             <MainMenuItem text="Messages" link="/admin/messages/inbox" icon={<FaInbox/>}
                           badge={<span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">New</span>}/>
             <MainMenuItem text="Projects request" link="/admin/projects/request" icon={<FaBusinessTime/>} />
             <MainMenuItem text="About Me Page" link="/admin/about-me" icon={<FaUser/>} />
            <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center mt-5 h-8">
                    <div
                        className="text-sm font-light tracking-wide text-gray-400 uppercase">Settings
                    </div>
                </div>
            </li>

            <MainMenuItem text="Profile" link="/admin/test" icon={<FaUser/>}/>
            <MainMenuItem text="Settings" link="/admin/test" icon={<FaAddressBook/>}/>
        </ul>
  );
};
export default MainMenu;