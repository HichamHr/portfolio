import logo from '../../Assets/img/logo.svg';
import {useState} from "react";


const Notification = ({message,show=false,onClick}) => {

  return<> {
    show &&
          <div
              className='w-full mb-4 z-10 right-0 h-full overflow-x-hidden shadow-md transform translate-x-0 transition ease-in-out duration-700'
              id="notification">
            <div className="w-full p-3 mt-4 text-gray-500 bg-white rounded flex flex-shrink-0">
              <div className="w-8 h-8 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center">
                <img
                    src={logo}
                    alt="Dark Logo"
                />
              </div>
              <div className="pl-3 w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm ">
                    <span className="text-indigo-700 font-semibold">hichamHr : </span>
                    {message}
                  </p>
                  <div onClick={onClick} className="cursor-pointer">
                    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 3.5L3.5 10.5" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.5 3.5L10.5 10.5" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
  }
  </>;
};
export default Notification;
