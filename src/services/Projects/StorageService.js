import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {getRecoil, setRecoil} from 'recoil-nexus'
import {storage} from "src/firebase";
import {uploadFilesProgressState} from "src/states/upload";
import {currentProjectState} from "src/states/Projects";

const getImageURL = async (path) => {
    return getDownloadURL(ref(storage, path))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            return url;
        })
        .catch((error) => {
            return {
                'code': error.code,
                'message': error.message,
            }
        });
}

const uploadFile = async (folder, e, name, i = -1) => {
    const file = e
    // :todo image has dots in name


   // let ext = file.name.split(".").pop();

    if (!file) return;
    const storageRef = ref(storage, `${folder}/${name}`);
    const metadata = {
        contentType: "image/jpeg"
    };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // await uploadTask;
    let imageUrl

    await uploadTask.on("state_changed",
        (snapshot) => {
            const progressData = getRecoil(uploadFilesProgressState)

            let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setRecoil(uploadFilesProgressState, progressData.map((p, index) => {
                if (index === i)
                    return progress
                else
                    return p
            }))
        },
        (error) => {
            return error;
        },
        async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                let project =  getRecoil(currentProjectState)
                // let images = [...lp.images];
                console.log(project)

                setRecoil(currentProjectState,{
                    challenge: 'project.challenge',
                    toolsTechnologies: project.toolsTechnologies,
                    objective: project.objective,
                    client:project.client,
                    images:[...project.images,downloadURL]
                })
                console.log("currentProject")
                console.log(getRecoil(currentProjectState))

                imageUrl = downloadURL
            });
        }
    );
}

const listFiles = async (folder) => {
    // const listRef = storageRef.child(folder)
    // const res = await listRef.listAll()
    // const list = res.items.map((itemRef) => itemRef._delegate._location.path_)
    // return list
}


const StorageService = {
    getImageURL,
    listFiles,
    uploadFile
}

export default StorageService
