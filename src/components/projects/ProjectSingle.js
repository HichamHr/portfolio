import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {FaFolder} from "react-icons/fa";

const ProjectSingle = ({id,title, category, tags}, key) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, delay: 1}}
            transition={{
                ease: 'easeInOut',
                duration: 0.7,
                delay: 0.15,
            }}>
            <Link key={key}
                  to={"/projects/"+id} aria-label="Single Project">
                <div
                    className="flex rounded-sm shadow-lg hover:shadow-xl cursor-pointer  mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
                    <div className="w-1/12 text-4xl text-ternary-dark dark:text-white ml-4 mt-4">
                        <FaFolder/>
                    </div>
                    <div className="w-11/12 pl-6 text py-6">
                        <p className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">
                            {title}
                        </p>
                        <span className="text-lg text-ternary-dark dark:text-ternary-light">
							{category}
						</span>
                        <div className="mt-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-semibold inline-block py-1 px-4 uppercase rounded-md text-ternary-dark dark:text-ternary-light bg-gray-300 dark:bg-secondary-dark uppercase last:mr-0 mr-2 mb-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectSingle;
