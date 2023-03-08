import {db} from "../../firebase";
import {isEmpty} from "lodash";
import {getDocs, limit, orderBy, collection, query, startAfter, where, endBefore, doc} from "firebase/firestore";
import {getByQuery, getOne} from "../../services/Projects/DatabaseService";


const getAll = async ({deleted_at}) => {
    const projectsDocRef = collection(db, "projects")
    let dataQuery = query(projectsDocRef, where("deleted_at", "==", deleted_at))
    return getByQuery(dataQuery)
}
const getProjectById = ({id, deleted_at = false}) => {
    return getOne(doc(db, "projects",id))
}
const getProjectDetailsById = ({id, deleted_at = false}) => {
    return  getOne(doc(db, "projects_details",id))
}

const getFirstPage = async ({perPage, deleted_at}) => {

    const projectsDocRef = collection(db, "projects")

    let dataQuery = query(projectsDocRef,
        where("deleted_at", "==", deleted_at),
        limit(perPage)
    )
    return getByQuery(dataQuery)
}

const getNextPage = async ({perPage, lastItem, deleted_at}) => {

    const projectsDocRef = collection(db, "projects")

    let dataQuery = query(projectsDocRef,
        where("deleted_at", "==", deleted_at),
        startAfter(lastItem),
        limit(perPage)
    )
    return getByQuery(dataQuery)
}

const getPrevPage = async ({perPage, lastItem, deleted_at}) => {

    const projectsDocRef = collection(db, "projects")
    let dataQuery = query(projectsDocRef,
        where("deleted_at", "==", deleted_at),
        endBefore(lastItem),
        limit(perPage)
    )
    return getByQuery(dataQuery)
}


export {getAll, getProjectById,getProjectDetailsById, getFirstPage, getNextPage, getPrevPage}
