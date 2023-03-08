import React, {useState, useEffect} from 'react'
import {
    Link,
} from 'react-router-dom'

import {Helmet} from "react-helmet";
import {useRecoilState} from "recoil";
import {projectsList} from "../../../states/Projects";
import {AiFillEye} from "react-icons/ai";
import Pagination from "../../../components/Shared/Pagination";
import {getAll, getFirstPage, getNextPage, getPrevPage} from "../../../Repositories/Admin/ProjectRepository";


function ProjectsIndex() {
    const perPage = 50
    const [projects,setProjects] = useRecoilState(projectsList)
    const [lastKey, setLastKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    // const [index,setIndex] = useState([0,perPage-1])
    const [index,setIndex] = useState([0,50])


    useEffect(()=>{
        // getFirstPage({perPage:perPage,deleted_at:false})
        getAll({deleted_at:false})
            .then(({data,lastKey})=>{
            setProjects(data)
            setLastKey(lastKey)
            setIsLoading(false)
        })
    },[])
    const nextPage = () => {
        if(lastKey!==undefined){
            getNextPage({perPage:perPage,lastItem:lastKey,deleted_at:false}).then(async ({data, lastKey}) => {
                setIndex([index[1] + 1, projects.length - 1])
                setProjects([...projects, ...data])
                setLastKey(lastKey)
                setIsLoading(false)
                console.log("size : " + projects.length)
                console.log("index before")
                console.log(index)
                console.log("index before")
                console.log(index)
            })
        }else{
            console.log("last Page")
        }
    }
    const PrevPage = () => {
        setIndex([index.last-1,index.last-perPage])
    }

    return (
        <>
            <Helmet title="HichamHr | Projects List"/>
            <h1 className="mb-8 text-xl font-bold">
                <span>Projects</span>
            </h1>
            <section className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Project name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Category
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Budget
                            </th>
                            <th scope="col" className="py-3 px-6">
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            projects.length>0 && !isLoading && (
                                projects.filter((project,i)=>{
                                    return i>=index[0] && i<=index[1]
                                }).map(({id,title,category,description,budget,progress,publishDate,status,tags})=>{
                                    return <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {title}
                                        </th>
                                        <td className="py-4 px-6">
                                            {category}
                                        </td>
                                        <td className="py-4 px-6">
                                            {status}
                                        </td>
                                        <td className="py-4 px-6">
                                            {budget}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Link to={id+"/details"} className="text-xl cursor-pointer"><AiFillEye/></Link>
                                        </td>
                                    </tr>
                                })
                            )
                        }
                        </tbody>
                    </table>
                <Pagination NexClick={()=>{nextPage()}} PrevClick={()=>{PrevPage()}} />
            </section>
        </>
    )

}

export default ProjectsIndex
