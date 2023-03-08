import { useCountUp } from 'react-countup';


const AboutCounter = ({experienceCounter = 0,feedbackCounter = 0,projectsCounter = 0}) => {


	useCountUp({ ref: 'experienceCounter', end: experienceCounter, duration: 2 });
	useCountUp({ ref: 'feedbackCounter', end: feedbackCounter, duration: 2 });
	useCountUp({ ref: 'projectsCounter', end: projectsCounter, duration: 2 });

	return (
		<div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
			<div className="font-general-medium container mx-auto py-20 block sm:flex sm:justify-between items-center">
				<div className="mb-20 sm:mb-0">
					<h2 className="text-4xl text-center text-secondary-dark dark:text-secondary-light mb-2">
						{
							experienceCounter ===0 ?'0':<span id="experienceCounter" />
						}
					</h2>
					<span className="font-general-regular block text-md text-center text-ternary-dark dark:text-ternary-light">
						Years of experience
					</span>
				</div>

				<div className="mb-20 sm:mb-0">
					<h2 className="text-4xl text-center text-secondary-dark dark:text-secondary-light mb-2">
						<span id="feedbackCounter" /> %
					</h2>
					<span className="font-general-regular block text-md text-center text-ternary-dark dark:text-ternary-light">
						Positive feedback
					</span>
				</div>

				<div className="mb-20 sm:mb-0">
					<h2 className="text-4xl text-center text-secondary-dark dark:text-secondary-light mb-2">
						<span id="projectsCounter" />
					</h2>
					<span className="font-general-regular block text-md text-center text-ternary-dark dark:text-ternary-light">
						Projects completed
					</span>
				</div>
			</div>
		</div>
	);
};

export default AboutCounter;
