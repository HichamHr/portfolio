import {atom} from "recoil";

const currentProjectState = atom({
    key: 'currentProjectState',
    default: {
        challenge: '',
        toolsTechnologies: [],
        objective: '',
        client:{
            name:'',
            services:'',
            phone:'+212666255166',
            website:'#'
        },
        images:[]
    },
});

const projectsList = atom({
    key: 'projectsList',
    default: [],
});




export {currentProjectState,projectsList}
