import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import './Assets/css/App.css';
import About from './pages/Front/AboutMe';
import Contact from './pages/Front/Contact';
import Home from './pages/Front/Home';
import Projects from './pages/Front/Projects';
import ProjectSingle from './pages/Front/ProjectSingle';
import Skills from "./pages/Front/Skills";
import React from "react";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import PageMessagesIndex from "./pages/Admin/messages/Index";
import Show from "./pages/Admin/messages/Show";
import AboutMePage from "./pages/Admin/about_me/AboutMePage";
import Trash from "./pages/Admin/messages/Trash";
import Inbox from "./pages/Admin/messages/Inbox";
import Marked from "./pages/Admin/messages/Marked";
import AdminLayout from "./components/Shared/AdminLayout";
import UserLayout from "./components/Shared/UserLayout";
import ProjectsIndex from "./pages/Admin/projects";
import ProjectCreate from "./pages/Admin/projects/Create";
import ProjectDetails from "./pages/Admin/projects/ProjectDetails";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="admin" element={<AdminLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="auth/login" element={<Login/>}/>
                    <Route path="projects">
                        <Route index element={<ProjectsIndex/>}/>
                        <Route path="create" element={<ProjectCreate/>}/>
                        <Route path=":id/details" element={<ProjectDetails/>}/>
                    </Route>
                    <Route path="messages" element={<PageMessagesIndex/>}>
                        <Route path="inbox" element={<Inbox/>}>
                            <Route path=":id" element={<Show/>}/>
                        </Route>
                        <Route path="saved" element={<Marked/>}>
                            <Route path=":id" element={<Show/>}/>
                        </Route>
                        <Route path="trash" element={<Trash/>}>
                            <Route path=":id" element={<Show/>}/>
                        </Route>
                        <Route path="marked" element={<Marked/>}/>
                    </Route>
                    <Route path="about-me" element={<AboutMePage/>}/>
                </Route>
                <Route path="/" element={<UserLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="projects" element={<Projects/>}/>
                    <Route path="projects/:id" element={<ProjectSingle/>}/>
                    <Route path="projects/single-project" element={<ProjectSingle/>}/>
                    <Route path="skills" element={<Skills/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="contact" element={<Contact/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
