import ProjectsGrid from '../../components/projects/ProjectsGrid';
import {useRecoilState} from "recoil";
import {projectsList} from "../../states/Projects";
import {useEffect} from "react";
import {getAll} from "../../Repositories/Admin/ProjectRepository";
import {useState} from "react";

const Projects = () => {
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
				<ProjectsGrid projects={projects}  />
			</div>
	);
};

export default Projects;
