
import {BsStack} from "react-icons/bs";
import {MdAndroid} from "react-icons/md";
import {DiDatabase} from "react-icons/di";

const Skills = () => {
    return (
        <div className="container">
            <h1 className="font-general-medium text-2xl mb-6 text-center sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">HERE'S WHAT I'M GOOD AT </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div
                    className="text-center bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 hover:-translate-y-2 transform transition rounded-sm p-5">
                    <div className="text-gray-800 mx-auto w-6 p-5 h-6 mb-20 ">
                        <BsStack
                            className="p-4 rounded-full"
                            name="Code Icon"
                            size="80"
                            style={{
                                backgroundColor: "#F2F2F2",
                            }}
                        />
                    </div>
                    <h1 className="font-bold text-lg text-gray-600 dark:text-gray-200 mb-1">Web Developer</h1>
                    <p className="text-md text-gray-600 dark:text-gray-300">
                        I like to code things from scratch, and enjoy bringing ideas to life in the browser, focusing on backend.
                    </p>
                    <p className="font-bold text-indigo-700">Languages I Speak : </p>
                    <ul className="text-md font-semibold text-gray-600 dark:text-gray-300">
                        <li>JAVASCRIPT</li>
                        <li>PHP</li>
                    </ul>
                    <div className="mt-5">
                        <p className="font-bold text-indigo-700">FrameWorks & Libraries : </p>
                        <ul className="text-md font-semibold text-gray-600 dark:text-gray-300">
                            <li>TailWind</li>
                            <li>Laravel</li>
                            <li>TailWind</li>
                        </ul>
                    </div>
                </div>

                <div
                    className="text-center bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 hover:-translate-y-2 transform transition rounded-sm p-5">
                    <div className="text-gray-800 mx-auto w-6 p-5 h-6 mb-20 ">
                        <MdAndroid
                            className="p-4 rounded-full"
                            name="Code Icon"
                            size="80"
                            style={{
                                backgroundColor: "#F2F2F2",
                            }}
                        />
                    </div>
                    <h1 className="font-bold text-lg text-gray-600 dark:text-gray-200 mb-1">Mobile Developer</h1>
                    <p className="text-md text-gray-600 dark:text-gray-300">
                        I enjoy turning ideas to live Application.
                    </p>
                    <p className="font-bold text-indigo-700">Languages I Speak : </p>
                    <ul className="text-md font-semibold text-gray-600 dark:text-gray-300">
                        <li>Java</li>
                        <li>Dart</li>
                    </ul>
                    <div className="mt-5">
                        <p className="font-bold text-indigo-700">FrameWorks & Tools : </p>
                        <ul className="text-md font-semibold text-gray-600 dark:text-gray-300">
                            <li>Android Native</li>
                            <li>Flutter</li>
                            <li>Ionic</li>
                        </ul>
                    </div>
                </div>

                <div
                    className="text-center bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 hover:-translate-y-2 transform transition rounded-sm p-5">
                    <div className="text-gray-800 mx-auto w-6 p-5 h-6 mb-20 ">
                        <DiDatabase
                            className="p-4 rounded-full"
                            name="Code Icon"
                            size="80"
                            style={{
                                backgroundColor: "#F2F2F2",
                            }}
                        />
                    </div>
                    <h1 className="font-bold text-lg text-gray-600 dark:text-gray-200 mb-1">Database Developer</h1>
                    <p className="text-md text-gray-600 dark:text-gray-300">
                        building good applications started from good database structures .
                    </p>
                    <p className="font-bold text-indigo-700">Languages I Speak : </p>
                    <ul className="text-md font-semibold text-gray-600 dark:text-gray-300">
                        <li>SQL</li>
                        <li>NoSQL</li>
                    </ul>
                    <div className="mt-5">
                        <p className="font-bold text-indigo-700">Tools & Technologies : </p>
                        <ul className="text-md font-semibold text-gray-600 dark:text-gray-300">
                            <li>MySQL</li>
                            <li>FireBase</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Skills;
