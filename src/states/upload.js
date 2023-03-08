
import {atom} from "recoil";


const filesState = atom({
    key: 'files',
    default: [],
});
const filesPreviewState = atom({
    key: 'filesPreview',
    default: [],
});


const uploadFilesProgressState = atom({
    key: 'uploadFilesProgressList',
    default: [],
});
const uploadedFilesState = atom({
    key: 'uploadedFilesListState',
    default: [],
});

export {filesState,filesPreviewState,uploadFilesProgressState}