import {atom} from "recoil";

const currentMessageState = atom({
    key: 'currentMessage',
    default: {},
});

const messagesList = atom({
    key: 'messagesList',
    default: [],
});

export {currentMessageState,messagesList}
