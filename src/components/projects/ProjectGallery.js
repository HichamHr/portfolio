import { useContext } from 'react';
import {motion} from "framer-motion";
import {useState} from "react";

const ProjectGallery = ({images}) => {
	const [imageLoading, setImageLoading] = useState(true);
	const [pulsing, setPulsing] = useState(true);

	const imageLoaded = () => {
		setImageLoading(false);
		setTimeout(() => setPulsing(false), 1000);
	}

	return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-10 mt-12">
				{images?.map((image,index) => {
					return (
						<div className="mb-10 sm:mb-0" key={index}>

							<motion.img
								initial={{height: "16rem", opacity: 0}}
								className="rounded-xl cursor-pointer shadow-lg sm:shadow-none img-container"
								animate={{
									height: imageLoading ? "16rem" : "auto",
									opacity: imageLoading ? 0 : 1
								}}
								transition={
									{height: {delay: 0, duration: 0.4},opacity: {delay: 0.5, duration: 0.4}}
								}
								onLoad={imageLoaded}
								width="100%"
								alt={index}
								src={image}
							/>

						</div>
					);
				})}
			</div>
	)
};

export default ProjectGallery;
