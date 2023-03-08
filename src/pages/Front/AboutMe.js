import AboutMeBio from '../../components/about/AboutMeBio';
import AboutCounter from '../../components/about/AboutCounter';
import {motion} from 'framer-motion';
import {useEffect, useState} from "react";
import {AboutMeService} from "../../services/DatabaseService";

const About = () => {
    const [loading, setLoading] = useState(true);

    const [initialState, setInitialState] = useState(
        {id: '', avatar: '', content: '', experience: 0, positive_feedback: 0, project_completed: 0}
    );

    useEffect(() => {
        AboutMeService.getAll().then((data) => {
            if (data.length > 0) {
                setInitialState(data[0])
                setLoading(false)
            }
        })
    },[])


    return (
            <>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1, delay: 1}}
                    exit={{opacity: 0}}
                    className="container mx-auto"
                >
                    <AboutMeBio
                        loading={loading}
                        content={initialState.content}
                        avatar={initialState.avatar}
                    />
                </motion.div>

                {
                    initialState.experience!==0 && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1, delay: 1}}
                            exit={{opacity: 0}}
                        >
                            <AboutCounter
                                experienceCounter={initialState.experience}
                                feedbackCounter={initialState.positive_feedback}
                                projectsCounter={initialState.project_completed}
                            />
                        </motion.div>
                    )
                }
            </>
    );
};

export default About;
