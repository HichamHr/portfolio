import React, {useState, useEffect} from 'react'
import {
    Link,
} from 'react-router-dom'
import {ProjectDetailsService, ProjectsService} from "../../../services/DatabaseService";
import {array, number, object, string} from "yup";
import {Field, FieldArray, Formik} from "formik";
import NotifMessages from "../../../components/Shared/NotifMessages";
import TextInput from "../../../components/Shared/TextInput";
import LoadingButton from "../../../components/Shared/LoadingButton";
import {motion} from "framer-motion";
import {Helmet} from "react-helmet";
import {BsSave} from "react-icons/bs";
import TextArea from "../../../components/Shared/TextArea";
import FileInput from "../../../components/Shared/FileInput";
import CircleProgressBar from "../../../components/Shared/CircleProgressBar";
import ProjectImagesUploadProgress from "../../../components/projects/ProjectImagesUploadProgress";
import {useRecoilState} from "recoil";
import {filesPreviewState, uploadFilesProgressState} from "../../../states/upload";
import {useParams} from 'react-router-dom';
import {currentProjectState} from "../../../states/Projects";


function ProjectDetails() {
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imagesFiles, setImagesFiles] = useState([]);
    const [filesPreview, setFilesPreview] = useRecoilState(filesPreviewState);
    let {id} = useParams();
    const [currentProject, setCurrentProject] = useRecoilState(currentProjectState);
    const [initialState, setInitialState] = useState({
        challenge: '',
        toolsTechnologies: [],
        objective: '',
        client: {
            name: '',
            services: '',
            phone: '+212666255166',
            website: '#'
        },
        images: []
    });
    const [progress, setProgress] = useRecoilState(uploadFilesProgressState)

    const [showNotification, setShowNotification] = useState(false);
    useEffect(() => {
        ProjectDetailsService.getOne(id).then((data) => {
            if (data !== undefined) {
                setInitialState(data)
                setCurrentProject(data)
            }
            setLoading(false)
        }).catch(() => {
        });
    },[])

    const submit = async (values) => {
        setProcessing(true);
        let images = currentProject.images
        console.log("images")
        console.log(images)
        ProjectDetailsService.create({
            challenge: values.challenge,
            toolsTechnologies: values.toolsTechnologies,
            objective: values.objective,
            client: values.client,
            images: images
        }, id).then(() => {
            setProcessing(false)
            setShowNotification(true)
        }).catch(() => {
        });
    }


    const ProjectFormSchema = object().shape({
        // title: string().required('Project Title Required'),
        // category: string().required('Project Category Required'),
        // status: string().required('Project status Required'),
        // description: string().required('Projects Description Required'),
        // budget: number().min(0, "You can't leave this blank.").required('Projects Budget Required'),
        // progress: number().required('Projects progress Required'),
        // tags: array().min(1)
    });


    return (
        <>
            <Helmet title="HichamHr | Project Create"/>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    to="/admin/projects"
                    className="text-indigo-600 hover:text-indigo-700">
                    Projects
                </Link>
                / <span>Create</span>
            </h1>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    delay: 0.1,
                }}
                className="container mx-auto flex flex-col-reverse lg:flex-row">

                <div className="w-full">
                    {
                        loading && (
                            <div className="leading-loose">
                                <div className="animate-pulse space-y-4" >
                                    <div className="grid sm:grid-cols-3 gap-5">
                                        <div className="col-span-1 space-y-3">

                                            <div className="h-2 bg-slate-700 rounded"/>
                                            <div className="bg-slate-700 h-40 rounded"/>
                                        </div>
                                        <div className="col-span-2 space-y-3">

                                            <div className="h-2 bg-slate-700 w-full rounded"/>
                                            <div className="bg-slate-700 h-40 w-full rounded"/>
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div className="space-y-3">

                                            <div className="h-2 bg-slate-700 rounded"/>
                                            <div className="bg-slate-700 h-40 rounded"/>
                                        </div>
                                        <div className=" space-y-3">

                                            <div className="h-2 bg-slate-700 w-full rounded"/>
                                            <div className="bg-slate-700 h-40 w-full rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        !loading && (
                            <div className="leading-loose">
                                <Formik
                                    initialValues={
                                        initialState
                                    }
                                    enableReinitialize={true}
                                    onSubmit={(values, {setSubmitting}) => {
                                        setSubmitting(false);
                                        submit(values).then()
                                    }}
                                    validationSchema={ProjectFormSchema}
                                >
                                    {props => {
                                        const {
                                            values,
                                            dirty,
                                            isSubmitting,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            handleReset,
                                            touched, errors
                                        } = props;
                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <NotifMessages
                                                    message="Project Details has been Saved"
                                                    show={showNotification}
                                                    onClick={() => {
                                                        setShowNotification(false)
                                                    }}
                                                />
                                                <div className="grid sm:grid-cols-3 gap-5">
                                                    <div>
                                                        <Field
                                                            label="Images"
                                                            id="images"
                                                            name="images"
                                                            accept="image/*"
                                                            multiple
                                                            component={FileInput}
                                                            value={filesPreview}
                                                            onChange={e => setFilesPreview(e)}/>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <ProjectImagesUploadProgress images={values.images}/>
                                                    </div>
                                                </div>

                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    <div>


                                                        <div className="relative">
                                                            <label
                                                                className="block text-lg text-primary-dark dark:text-primary-light mb-2"
                                                                htmlFor="toolsTechnologies">
                                                                Tools & Technologies
                                                            </label>
                                                            <FieldArray
                                                                name="toolsTechnologies"
                                                                render={arrayHelpers => (
                                                                    <div
                                                                        className="border w-full px-1 py-2 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-b-md shadow-sm text-md">

                                                                        <div
                                                                            className="">
                                                                            {values.toolsTechnologies.map((tag, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    className="inline-block text-xs bg-green-400 text-white py-1 px-2 mr-1 rounded">
                                                                              <span>
                                                                                  {tag}  </span>
                                                                          <a href="#"
                                                                             className="text-white hover:text-white"
                                                                             onClick={() => {
                                                                                 arrayHelpers.remove(index)

                                                                             }}
                                                                          >&times;</a>
                                                                        </span>
                                                                            ))}
                                                                            <div
                                                                                className="inline-block h-8 text-sm focus:outline-none flex"
                                                                                contentEditable={true}
                                                                                suppressContentEditableWarning={true}
                                                                                onFocus={(event) => {
                                                                                    if (event.currentTarget.textContent.trim() === 'Add Technologies')
                                                                                        event.currentTarget.textContent = ""
                                                                                }}
                                                                                onBlur={(event) => {
                                                                                    if (event.currentTarget.textContent.trim() === '')
                                                                                        event.currentTarget.textContent = "Add Technologies"
                                                                                }}
                                                                                onKeyPress={(event) => {

                                                                                    if (event.key === 'Enter' && event.currentTarget.textContent.trim() !== '' && !values.toolsTechnologies.includes(event.currentTarget.textContent.trim())) {
                                                                                        arrayHelpers.push(event.currentTarget.textContent.trim())
                                                                                        event.currentTarget.textContent = ""
                                                                                    }
                                                                                    event.currentTarget.textContent = event.currentTarget.textContent.trim()
                                                                                    return event.which !== 13;

                                                                                }}

                                                                            >Add Technologies
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )}
                                                            />
                                                            {touched.name && errors.name && (
                                                                <div className="text-red-600">
                                                                    {errors.name}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div
                                                            className="font-general-medium w-full py-3 text-white text-center font-medium whitespace-nowrap tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
                                                            <LoadingButton
                                                                type="submit"
                                                                className="w-full px-6"
                                                                loading={processing}>
                                                                Save Data <BsSave className='ml-2'/>
                                                            </LoadingButton>
                                                        </div>
                                                    </div>
                                                    <div>

                                                        <Field
                                                            label="Challenge"
                                                            id="challenge"
                                                            name="challenge"
                                                            component={TextArea}
                                                            value={values.challenge}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}/>

                                                    </div>
                                                </div>

                                            </form>
                                        );
                                    }}
                                </Formik>


                            </div>
                        )
                    }

                </div>


            </motion.div>
        </>
    )

}

export default ProjectDetails
