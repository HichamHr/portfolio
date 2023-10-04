import ProjectGallery from '../../components/projects/ProjectGallery';
import ProjectHeader from '../../components/projects/ProjectHeader';
import ProjectInfo from '../../components/projects/ProjectInfo';
import { motion } from 'framer-motion';
import {useEffect, useState} from "react";
import {getProjectById,getProjectDetailsById} from "../../Repositories/Admin/ProjectRepository";
import {useParams} from "react-router-dom";

const ProjectSingle = () => {
	const [project, setProject] = useState(null);
	const [projectDetails, setProjectDetails] = useState(null);
	let {id} = useParams();

	useEffect(()=>{
		getProjectById({id: id}).then((project)=> setProject(project))
		getProjectDetailsById({id: id}).then((projectDetails)=> setProjectDetails(projectDetails))
	},[id])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.6,
				delay: 0.15,
			}}
			className="container mx-auto mt-5 sm:mt-10"
		>
				<ProjectHeader project={project} />
				<ProjectGallery  images={projectDetails?.images} />
				<ProjectInfo
					toolsTechnologies={projectDetails?.toolsTechnologies}
					challenge={projectDetails?.challenge}
					client={projectDetails?.client}
					objective={projectDetails?.objective}
				/>
		</motion.div>
	);
};

export default ProjectSingle;
