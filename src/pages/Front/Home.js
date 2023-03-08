import { Link } from 'react-router-dom';
import AppBanner from '../../components/Shared/AppBanner';
import ProjectsGrid from '../../components/projects/ProjectsGrid';
import {useRecoilState} from "recoil";
import {projectsList} from "../../states/Projects";
import {useEffect, useState} from "react";
import {getAll} from "../../Repositories/Admin/ProjectRepository";

const Home = () => {
	const [projects,setProjects] = useRecoilState(projectsList)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(()=>{
		// getFirstPage({perPage:perPage,deleted_at:false})
		getAll({deleted_at:false})
			.then(({data,lastKey})=>{
				setProjects(data)
				setIsLoading(false)
			})
	},[])
	return (
		<div className="container mx-auto">
			<AppBanner/>
				<ProjectsGrid projects={projects}/>
			<div className="mt-8 sm:mt-10 flex justify-center">
				<Link
					to="/projects"
					className="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
					aria-label="More Projects"
				>
					More Projects
				</Link>
			</div>
		</div>
	);
};

export default Home;
