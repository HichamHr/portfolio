import MessagesList from "../../../components/inbox/MessagesList";
import { Outlet} from 'react-router-dom';

const Trash = () => {
    return (
        <div className="grid grid-cols-12 ">
            <div className="col-span-4">
                <MessagesList
                    basePath="/admin/messages/trash"
                    deleted_at={true} />
            </div>
            <div className="col-span-8">
                <Outlet/>
            </div>
        </div>
    )
}
export default Trash