import {MessagesService} from "../../services/DatabaseService";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import {motion} from "framer-motion";


import {currentMessageState, messagesList} from "../../states/Inbox";
import {isEmpty} from "lodash";
import LoadingButton from "../Shared/LoadingButton";
import {Link} from "react-router-dom";

const MessagesList = ({basePath, deleted_at = false,saved=false}) => {

    const [currentMessage, setCurrentMessage] = useRecoilState(currentMessageState);
    const [messagesListData, setMessagesListData] = useRecoilState(messagesList);
    const [lastKey, setLastKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const getCurrentMessage = (id) => {
        setCurrentMessage(messagesListData.find((element) => {
            return element.id === id;
        }))
    }


    useEffect(() => {
        setMessagesListData([])
        MessagesService.getByQuery({}, deleted_at,saved)
            .then((messages) => {
            setMessagesListData(messages.data)
            setCurrentMessage(messagesListData[0])
            setLastKey(messages.lastKey)
            setIsLoading(false)
        })

    }, [])

    const loadMore = () => {
        setIsLoading(true)
        MessagesService.getByQuery(lastKey, deleted_at).then((messages) => {
            setMessagesListData([...messagesListData, ...messages.data])
            setLastKey(messages.lastKey)
            setIsLoading(false)
        })
    }


    return (
        <section className="flex flex-col  px-3 py-2  ">
            <label className="px-3">
                <input
                    className="rounded-sm p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
                    placeholder="Search..."/>
            </label>

            <ul className="mt-6 flex-grow overflow-y-auto">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1 }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.5,
                        delay: 0.1,
                    }}
                >
                    {messagesListData.map(({id, full_name, email, subject, created_at, deleted_at, is_read}) => {
                        return (

                            <li key={id} onClick={() => getCurrentMessage(id)}

                                className={`
                                ${(!isEmpty(currentMessage) && currentMessage.id === id) ?
                                    "py-5 border-b px-3 bg-indigo-100 text-black" :
                                    "py-5 border-b px-3 transition hover:bg-indigo-100"}
                                ${is_read ? "bg-gray-300" : ""}`
                                }
                            >
                                <Link to={basePath + '/' + id}>
                                <span className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{full_name}</h3>
                                <p className="text-md ">
                                    {
                                        created_at && (
                                            Date.parse(created_at.toDate()).toString()
                                        )
                                    }
                                </p>
                            </span>
                                    <div className=" italic dark:text-gray-300">{subject}</div>
                                </Link>
                            </li>
                        )
                    })}
                    {
                        !isLoading && messagesListData.length > 0 && (
                            <li>
                                <LoadingButton
                                    type="button"
                                    className="font-general-medium w-40 px-6 py-3 text-white text-center font-medium whitespace-nowrap tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500"
                                    loading={isLoading}
                                    onClick={loadMore}>
                                    Load More
                                </LoadingButton>
                            </li>
                        )
                    }
                </motion.div>
                {
                    isLoading && (
                        <div role="status" className="items-center content-center text-center">
                            <svg aria-hidden="true"
                                 className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )
                }
                {messagesListData.length === 0 && !isLoading && (
                    <li className="py-5 text-center text-2xl px-3 transition ">
                        No Message found.
                    </li>
                )}
            </ul>

        </section>
    )
}

export default MessagesList