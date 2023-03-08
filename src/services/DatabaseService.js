import {db} from '../firebase'
import {
    addDoc,
    setDoc,
    collection,
    startAfter,
    where,
    limit,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    orderBy
} from 'firebase/firestore'
import {isEmpty} from "lodash";

class DatabaseService {
    collection

    constructor(collectionName) {
        this.collection = collectionName
    }

    getAll = async () => {
        const docRef = collection(db, this.collection)
        const docSnap = await getDocs(docRef)
        let data = [];
        docSnap.forEach(doc => {
            data.push({
                id: doc.id,
                ...doc.data()
            })
        })

        return data
    }

    getByQuery = async (lastItem = {},deleted_at=false,saved=false) => {
        const docRef = collection(db, this.collection)
        let dataQuery = isEmpty(lastItem) ? query(docRef, orderBy('created_at', "desc"),
            where("deleted_at", "==", deleted_at),
            where("saved", "in", saved?[true]:[true,false]),
            limit(5)
        ) : query(docRef, orderBy('created_at', "desc"),
            where("deleted_at", "==", deleted_at),
            where("saved", "in", saved?[true]:[true,false]),
            startAfter(lastItem),
            limit(5)
        )

        const docSnap = await getDocs(
           dataQuery
        )
        const lastKey = docSnap.docs[docSnap.docs.length - 1];

        let data = [];
        docSnap.forEach(doc => {
            data.push({
                id: doc.id,
                ...doc.data()
            })
        })


        return {data, lastKey}
    }

    getOne = async (id) => {
        const docRef = doc(db, this.collection, id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
        }
    }

    create = async (data, id = null) => {
        return (id == null) ?
            await addDoc(collection(db, this.collection), data) :
            await setDoc(doc(db, this.collection, id), data)
    }

    update = (id, values) => {
        return updateDoc(doc(db, this.collection, id), values)
    }

    remove = async (id) => {
        return deleteDoc(doc(db, this.collection, id))
    }
}

export const ProjectsService = new DatabaseService('projects')
export const ProjectDetailsService = new DatabaseService('projects_details')
export const MessagesService = new DatabaseService('messages')
export const ProjectsRequest = new DatabaseService('projects_request')
export const AboutMeService = new DatabaseService('about_me')

export const UsersService = new DatabaseService('users')
