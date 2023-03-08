import MessagesList from "../../../components/inbox/MessagesList";
import React from "react";
import {Outlet} from 'react-router-dom';

const Marked = () => {
    return (
        <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-1000">
            <div className="col-span-4">
                <MessagesList
                    saved={true}
                    basePath="/admin/messages/saved"
                />
            </div>
            <div className="col-span-8">
                <Outlet/>
            </div>
        </div>
    )
}
export default Marked