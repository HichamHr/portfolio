import './Assets/css/App.css';
import {AnimatePresence} from 'framer-motion';
import React from "react";
import RecoilNexus from 'recoil-nexus'

import {
    RecoilRoot,
} from 'recoil';
import AppRoutes from "./routes";

function App() {
    return (
        <RecoilRoot>
            <RecoilNexus/>
            <AnimatePresence>
                <div className="overflow-y-hidden bg-secondary-light dark:bg-primary-dark transition duration-300">
                    <h1>Test</h1>
                </div>
            </AnimatePresence>
        </RecoilRoot>
    );
}

export default App;
