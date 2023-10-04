import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {getRecoil, setRecoil} from 'recoil-nexus'
import {storage} from "src/firebase";
import {uploadFilesProgressState} from "src/states/upload";
import {aboutMeState} from "../../states/AboutMe";

const getImageURL = async (path) => {
    return getDownloadURL(ref(storage, path))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
             //   const blob = xhr.response;
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
    console.log(name)
    console.log(e.name)
  //  let ext = file.name.split(".").pop();
  //  console.log(ext)

    if (!file) return;
    const storageRef = ref(storage, `${folder}/${name}.jpg`);
    const metadata = {
        contentType: "image/jpeg"
    };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // await uploadTask;
  //  let imageUrl

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
        console.log("error")
        console.log(error)
            return error;
        },
        async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                let aboutMe =  getRecoil(aboutMeState)
                setRecoil(aboutMeState,{
                    id: aboutMe.id,
                    content: aboutMe.content,
                    experience: aboutMe.experience,
                    positive_feedback: aboutMe.positive_feedback,
                    project_completed: aboutMe.project_completed,
                    avatar:downloadURL
                })
                console.log("getRecoil(aboutMeState)")
                console.log(getRecoil(aboutMeState))
           //     imageUrl = downloadURL
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
