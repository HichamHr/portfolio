import { useContext } from 'react';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";

const ProjectInfo = ({toolsTechnologies,challenge,objective,client}) => {

	return (
		<div className="block sm:flex gap-0 sm:gap-10 mt-14">
			<div className="w-full sm:w-1/3 text-left">
				{/* Single project client details */}
				<div className="mb-7">
					<p className="font-general-regular text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-2">
						About Client
					</p>
					<ul className="leading-loose">
						<li className="font-general-regular text-ternary-dark dark:text-ternary-light">
							<span>Name: </span>
							<a  href="#"
								aria-label="Project Website and Phone">
								{client?.name}
							</a>
						</li>
						<li className="font-general-regular text-ternary-dark dark:text-ternary-light">
							<span>Phone: </span>
							<a  href="#"
								className="hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300"
								aria-label="Project Website and Phone">
								{client?.phone}
							</a>
						</li>
						<li className="font-general-regular text-ternary-dark dark:text-ternary-light">
							<span>Services: </span>
							<a  href="#"
								aria-label="Project Website and Phone">
								{client?.services}
							</a>
						</li>
						<li className="font-general-regular text-ternary-dark dark:text-ternary-light">
							<span>Website: </span>
							<a  href="#"
								className="hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300"
								aria-label="Project Website and Phone">
								{client?.website}
							</a>
						</li>

					</ul>
				</div>

				{/* Single project objectives */}
				<div className="mb-7">
					<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
						Objective
					</p>
					<p className="font-general-regular text-primary-dark dark:text-ternary-light">
						{objective}
					</p>
				</div>

				{/* Single project technologies */}
				<div className="mb-7">
					<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
						Tools & Technologies
					</p>
					<p className="font-general-regular text-primary-dark dark:text-ternary-light">
						{toolsTechnologies?.join(
							', '
						)}
					</p>
				</div>

				{/* Single project social sharing */}
				<div>
					<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
						ShareThis
					</p>
					<div className="flex items-center gap-3 mt-5">
						{[{id:"1",url:"",icon:<FaFacebook/>},
							{id:"2",url:"",icon:<FaLinkedin/>},
							{id:"3",url:"",icon:<FaTwitter/>},
							{id:"4",url:"",icon:<FaInstagram/>}].map(
							(social) => {
								return (
									<a
										key={social.id}
										href={social.url}
										target="__blank"
										aria-label="Share Project"
										className="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
									>
										<span className="text-lg lg:text-2xl">
											{social.icon}
										</span>
									</a>
								);
							}
						)}
					</div>
				</div>
			</div>

			{/*  Single project right section */}
			<div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
				<p className="font-general-regular text-primary-dark dark:text-primary-light text-2xl font-bold mb-7">
					Challenge
				</p>

						<p
							className="font-general-regular mb-5 text-lg text-ternary-dark dark:text-ternary-light"
						>
							{challenge}
						</p>
			</div>
		</div>
	);
};

export default ProjectInfo;
