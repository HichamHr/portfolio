function AppFooterCopyright() {
    return (
        <div className="font-general-regular flex justify-center items-center text-center">
            <div className="text-lg text-ternary-dark dark:text-ternary-light">
                &copy; {new Date().getFullYear()}
                <span
                    className=" hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500">
                    Personal Portfolio
                </span>
                .
            </div>
            <div className="text-lg text-ternary-dark dark:text-ternary-light">
                Powered By
                <a
                    href="https://reactjs.org/"
                    target="__blank"
                    className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500 no-underline"
                >
                    ReactJs
                </a>
                <span> & </span>
                <a
                    href="https://tailwindcss.com/"
                    target="__blank"
                    className="text-secondary-dark dark:text-secondary-light font-medium uppercase hover:underline hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500"
                >
                    TailwindCss
                </a>
            </div>
        </div>
    );
}

export default AppFooterCopyright;
