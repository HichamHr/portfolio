import React from 'react'
import AdminLayout from "../../../components/Shared/AdminLayout";
import {Link, Outlet, useLocation} from 'react-router-dom';
import {motion} from "framer-motion";
import {FaInbox} from "react-icons/fa";
import {BsFillBookmarkFill} from "react-icons/bs";
import {HiOutlineTrash} from "react-icons/hi";
import {Helmet} from "react-helmet";


function PageMessagesIndex() {
    const location = useLocation();
    const getClasses = (route) => {
        return  (location.pathname === route) ?
              'relative w-16 p-4 rounded-2xl mb-4 bg-purple-100 text-purple-900 '
            : 'relative w-16 p-4 rounded-2xl mb-4 border text-gray-700 '
    }
    return (
        <div className=" h-fit overflow-hidden">
            <Helmet title="HichamHr | Inbox"/>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    delay: 0.1,
                }}
                className="">
                <div className=" grid m-3 rounded-xl grid-cols-12 bg-gray-50 dark:bg-gray-1000 overflow-hidden ">
                    <div className="col-span-2 flex pt-20 flex-col">
                            <nav className="relative flex flex-col  mt-12 p-4 items-center">
                                <Link className={getClasses("/admin/messages/inbox")} to="inbox">
                                    <FaInbox className="text-3xl text-gray-500" />
                                    <span
                                        className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 p-2 flex justify-center items-center text-white rounded-full">3</span>
                                </Link>
                                <Link  className={getClasses("/admin/messages/saved")} to="saved">
                                    <BsFillBookmarkFill className="text-3xl text-gray-500"/>
                                </Link>
                                <Link className={getClasses("/admin/messages/trash")} to="trash">
                                    <HiOutlineTrash className="text-3xl text-gray-500" />
                                </Link>
                            </nav>
                    </div>
                    <div className="col-span-10 ">
                        <Outlet/>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default PageMessagesIndex
