import {atom} from "recoil";

const aboutMeState = atom({
    key: 'about_me',
    default: {
        id: '', content: '', experience: '', positive_feedback: '', project_completed: '',
        avatar:''
    },
})


export {aboutMeState}
