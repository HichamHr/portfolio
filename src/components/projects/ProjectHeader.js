import { useContext } from 'react';
import { FiClock, FiTag } from 'react-icons/fi';

const ProjectSingleHeader = ({project}) => {

	return (
		<div>
			<p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
				{project?.title}
			</p>
			<div className="flex">
				<div className="flex items-center mr-10">
					<FiClock className="text-lg text-ternary-dark dark:text-ternary-light" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{
							new Date(project?.publishDate.toDate()).toDateString()
						}
					</span>
				</div>
				<div className="flex items-center">
					<FiTag className="text-lg text-ternary-dark dark:text-ternary-light" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{project?.tags.map((tag,index)=>{
							return <span key={index}> {tag + (index<project.tags.length-1? ' /':'')} </span>
						})}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProjectSingleHeader;
