import React, {useState} from 'react';
import Icon from "./Icon";

 const Notifications = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // setNotifications([]);

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer select-none group"
        onClick={() => setMenuOpened(true)}>
        <Icon
          className="w-6 h-6 text-gray-800 mr-2 fill-current group-hover:text-indigo-600 focus:text-indigo-600"
          name="network"/>
      </div>
      <div className={menuOpened ? '' : 'hidden'}>
        <div
          className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
          {notifications.map(
            ({title, url}) => {
              return (
                <a
                  as="button"
                  href={url}
                  className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
                  method="post">
                  {title}
                </a>
              )
            }
          )}

        </div>

        <div
          onClick={() => {
            setMenuOpened(false);
          }}
          className="fixed inset-0 z-10 bg-black opacity-25"
        ></div>
      </div>
    </div>

  );
};
export default Notifications;