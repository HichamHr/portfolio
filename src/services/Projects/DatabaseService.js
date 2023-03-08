import {db} from '../../firebase'
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
    endBefore,
    query
} from 'firebase/firestore'
import {isEmpty} from "lodash";



  const getAll = async () => {
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

const  getByQuery = async (dataQuery) => {
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

const getOne = async (docRef) => {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return null
        }
    }

const  create = async (data, id = null) => {
        return (id == null) ?
            await addDoc(collection(db, this.collection), data) :
            await setDoc(doc(db, this.collection, id), data)
    }

const  update = (id, values) => {
        return updateDoc(doc(db, this.collection, id), values)
    }

 const remove = async (id) => {
        return deleteDoc(doc(db, this.collection, id))
    }

    export  {getByQuery,getAll,getOne,create,remove,update}

