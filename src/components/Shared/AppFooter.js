import {FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiFacebook} from 'react-icons/fi';
import AppFooterCopyright from './AppFooterCopyright';

const AppFooter = () => {

    const socialLinks = [
        {
            id: 1,
            icon:
                <div className=" dark:text-gray-300 text-center ">
                    <FiGithub/>
                </div>,
            url: 'https://github.com/HichamHr',
        },
        {
            id: 2,
            icon: <FiLinkedin/>,
            url: 'https://www.linkedin.com/in/HichamHr/',
        },
        {
            id: 3,
            icon: <FiTwitter/>,
            url: 'https://twitter.com/HichamHr06',
        },

        {
            id: 4,
            icon: <FiFacebook/>,
            url: 'https://facebook.com/HichamHr06/',
        },
        {
            id: 5,
            icon: <FiInstagram/>,
            url: 'https://instagram.com/HichamHr06',
        },
    ];
    return (
        <div className="container mx-auto">
            <div className="pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
                <div className="font-general-regular flex flex-col justify-center items-center mb-12 sm:mb-28">
                    <p className="text-3xl sm:text-4xl text-primary-dark dark:text-primary-light mb-5">
                        Follow me
                    </p>
                    <ul className="flex gap-4 sm:gap-8">
                        {socialLinks.map((link) => (
                            <a
                                href={link.url}
                                target="__blank"
                                key={link.id}
                                className="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
                            >
                                <i className="text-xl sm:text-2xl md:text-3xl">
                                    {link.icon}
                                </i>
                            </a>
                        ))}
                    </ul>
                </div>
                <AppFooterCopyright/>
            </div>
        </div>
    );
};

export default AppFooter;
