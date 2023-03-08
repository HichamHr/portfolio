import {useRecoilState} from "recoil";
import {currentMessageState, messagesList} from "../../states/Inbox";
import {isEmpty} from "lodash";
import {MessagesService} from "../../services/DatabaseService";
import { FaTrashAlt} from "react-icons/fa";
import {FiRotateCcw} from "react-icons/fi";
import {BsBookmark, BsBookmarkFill, BsPrinter, BsArrowLeft, BsArrowRight} from "react-icons/bs";

const Message = () => {
    const [currentMessage, setCurrentMessage] = useRecoilState(currentMessageState);
    const [messagesData, setMessagesData] = useRecoilState(messagesList);
    const messageIndex = () => messagesData.findIndex((message => message.id === currentMessage.id))
    const toggleDeleteMessage = () => {
        MessagesService.update(currentMessage.id, {
            deleted_at: !currentMessage.deleted_at
        }).then(() => {
            const index = messageIndex()
            if (index > -1) {
                let array = [...messagesData]
                array.splice(index, 1)
                setMessagesData(array)
                setCurrentMessage({})
            }
        })
    }
    const toggleSaveMessage = () => {
        MessagesService.update(currentMessage.id, {
            saved: !currentMessage.saved
        }).then(() => {
            let newMessage = {
                id:currentMessage.id,
                deleted_at: currentMessage.deleted_at,
                is_read: currentMessage.is_read,
                saved: !currentMessage.saved,
                created_at: currentMessage.created_at,
                email: currentMessage.email,
                full_name: currentMessage.full_name,
                subject: currentMessage.subject,
                message: currentMessage.message
            }
            setCurrentMessage(newMessage)
            setMessagesData(messagesData.filter((message) => {
                if (message.id === currentMessage.id)
                    return newMessage
                return message
            }))
        })
    }
    const sendEmail = ()=>{}

    return (
        <section className="px-4 flex flex-col  rounded-r-3xl">
            {!isEmpty(currentMessage) && (
                <>
                    <div className="flex justify-between items-center h-48 border-b-2 mb-8">
                        <div className="flex space-x-4 items-center">
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                                <img alt="avatar" src="https://bit.ly/2KfKgdy" loading="lazy"
                                     className="h-full w-full object-cover"/>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-lg">{currentMessage.full_name}</h3>
                                <p className="text-light text-gray-400">
                                    {currentMessage.email}
                                </p>
                            </div>
                        </div>
                        <div>
                            <ul className="flex text-gray-400 space-x-4 text-lg">
                                <li className="w-6 h-6 cursor-pointer">
                                    <BsArrowLeft/>
                                </li>
                                <li className="w-6 h-6 cursor-pointer">
                                    <BsArrowRight/>
                                </li>

                                <li className="w-6 h-6 cursor-pointer">
                                    <BsPrinter/>
                                </li>
                                <li onClick={toggleDeleteMessage} className="w-6 h-6 cursor-pointer">
                                    {!currentMessage.deleted_at && (<FaTrashAlt/>)}
                                    {currentMessage.deleted_at && (<FiRotateCcw/>)}
                                </li>
                                <li onClick={toggleSaveMessage} className="w-6 h-6 cursor-pointer">
                                    {!currentMessage.saved && (<BsBookmark/>)}
                                    {currentMessage.saved && (<BsBookmarkFill/>)}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <section>
                        <h1 className="font-bold text-2xl">{currentMessage.subject}</h1>
                        <article className="mt-8 text-gray-500 leading-7 tracking-wider">
                            <p>
                                {currentMessage.message}
                            </p>
                            <footer className="mt-12">
                                <p>Thanks & Regards,</p>
                                <p>Alexandar</p>
                            </footer>
                        </article>
                        <ul className="flex space-x-4 mt-12">
                            <li
                                className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-indigo-600 hover:bg-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                </svg>
                            </li>
                            <li
                                className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-blue-800 hover:bg-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
                                </svg>
                            </li>
                            <li
                                className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-pink-400 hover:bg-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
                                </svg>
                            </li>
                            <li
                                className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-yellow-500 hover:bg-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
                                </svg>
                            </li>
                        </ul>
                    </section>
                    <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
            <textarea className="w-full bg-gray-50 p-2 rounded-xl" placeholder="Type your reply here..."
                      rows="3"/>
                        <div className="flex items-center justify-between p-2">
                            <button className="h-6 w-6 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                                </svg>
                            </button>
                            <button onClick={sendEmail} className="bg-purple-600 text-white px-6 py-2 rounded-xl">Reply</button>
                        </div>
                    </section>
                </>
            )}

            {isEmpty(currentMessage) && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                          d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"/>
                </svg>
            )}

        </section>
    )
}
export default Message