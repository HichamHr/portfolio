import {useContext, useState} from 'react';
import {motion} from "framer-motion";

const SplitText = ({copy, role}) => {

    return (
        <span aria-label={copy} role={role}>
          {copy.split("").map(function (char, index) {
              let style = {animationDelay: (0.1 + index / 100) + "s"}
              return <span
                  aria-hidden="true"
                  key={index}
                  style={style}>
              {char}
            </span>;
          })}
        </span>
    );

}
const AboutMeBio = ({content, avatar,loading}) => {

    const [imageLoading, setImageLoading] = useState(true);
    const [pulsing, setPulsing] = useState(true);

    const imageLoaded = () => {
        setImageLoading(false);
        setTimeout(() => setPulsing(false), 1000);
    };

    return (
        <>
            {
                loading ?
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-10 mt-10 sm:mt-20">
                        <div className="animate-pulse mb-7 sm:mb-0">
                            <div style={{width:"100%",height:"14rem"}}  className="bg-slate-700"/>
                        </div>
                        <div className="font-general-regular space-y-5 font-general-regular sm:col-span-3 text-left">
                            <div className="h-4 bg-slate-700 w-1/4 rounded"/>
                            <div className="h-2 bg-slate-700 rounded"/>
                            <div className="h-2 bg-slate-700 rounded"/>
                            <div className="h-2 bg-slate-700 rounded"/>
                            <div className="h-2 bg-slate-700 rounded"/>
                            <div className="h-2 bg-slate-700 rounded"/>
                            <div className="h-2 bg-slate-700 rounded"/>
                            <div className="h-2 bg-slate-700 rounded"/>
                        </div>
                    </div>
                :<div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-10 mt-10 sm:mt-20">
                    <div className=" mb-7 sm:mb-0">
                        <div
                            className={`${pulsing ? "pulse" : ""} loadable  bg-slate-700`}
                            >
                            <motion.img
                                initial={{height: "14rem", opacity: 0}}
                                // style={{ height: imageLoading ? "6rem" : "auto" }}
                                animate={{
                                    height: imageLoading ? "14rem" : "auto",
                                    opacity: imageLoading ? 0 : 1
                                }}
                                transition={
                                    {height: {delay: 0, duration: 0.4},opacity: {delay: 0.5, duration: 0.4}}
                                }
                                onLoad={imageLoaded}
                                width="100%"
                                src={avatar}
                            />
                        </div>
                    </div>
                    <div  className="font-general-regular md:col-span-3 text-left">
                        <h1 className="text-4xl mb-4 text-ternary-dark dark:text-ternary-light font-bold">Summary</h1>
                        <p
                            className="mb-4 text-ternary-dark dark:text-ternary-light text-lg">
                            <SplitText copy={content} role="heading"/>
                        </p>
                    </div>
                </div>
            }
        </>

    );
};

export default AboutMeBio;
