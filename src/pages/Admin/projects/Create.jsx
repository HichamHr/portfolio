import React, {useState, useEffect} from 'react'
import {
    Link,
} from 'react-router-dom'
import {ProjectsService} from "../../../services/DatabaseService";
import {array, number, object, string} from "yup";
import {Field, FieldArray, Formik} from "formik";
import NotifMessages from "../../../components/Shared/NotifMessages";
import TextInput from "../../../components/Shared/TextInput";
import LoadingButton from "../../../components/Shared/LoadingButton";
import {motion} from "framer-motion";
import FileInput from "../../../components/Shared/FileInput";
import StorageService from "../../../services/StorageService";
import {Helmet} from "react-helmet";
import {serverTimestamp} from "firebase/firestore"
import SelectInput from "../../../components/Shared/SelectInput";
import {BsArrowRight} from "react-icons/bs";
import TextArea from "../../../components/Shared/TextArea";
import { useNavigate } from "react-router-dom";


function ProjectCreate() {
    const [processing, setProcessing] = useState(false);
    const [initialState, setInitialState] = useState(
        {
            title: '',
            category: '',
            description: '',
            budget: 0,
            progress: 0,
            publishDate: serverTimestamp(),
            status: 'Draft',// Draft Archived Published
            tags: [],
            deleted_at:false
        }
    );
    let navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState('');
    useEffect(() => {

    })


    const submit = async (values) => {
        setProcessing(true);
        ProjectsService.create(values).then((project)=>{
            return navigate("/admin/projects/"+project.id+"/details");
        }).catch(()=>{
            setProcessing(false)
        });
    }


    const ProjectFormSchema = object().shape({
        title: string().required('Project Title Required'),
        category: string().required('Project Category Required'),
        status: string().required('Project status Required'),
        description: string().required('Projects Description Required'),
        budget: number().min(0, "You can't leave this blank.").required('Projects Budget Required'),
        progress: number().required('Projects progress Required'),
        tags: array().min(1)
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
                className="container mx-auto flex flex-col-reverse lg:flex-row"
            >
                <div className="w-full ">
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
                                            message="About Me Page Has Been Updated"
                                            show={showNotification}
                                            onClick={() => {
                                                setShowNotification(false)
                                            }}
                                        />
                                        <Field
                                            label="Title"
                                            id="title"
                                            name="title"
                                            component={TextInput}
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            label="Short Description"
                                            id="description"
                                            name="description"
                                            component={TextArea}
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}/>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div >
                                                <Field
                                                    label="Category"
                                                    id="category"
                                                    name="category"
                                                    component={SelectInput}
                                                    options={['Mobile Application', 'Web Application']}
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}/>
                                                <div className="relative">
                                                    <label
                                                        className="block text-lg text-primary-dark dark:text-primary-light mb-2"
                                                        htmlFor="tags">
                                                        Tags
                                                    </label>
                                                    <FieldArray
                                                        name="tags"
                                                        render={arrayHelpers => (
                                                            <div
                                                                className="border w-full px-1 py-2 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-b-md shadow-sm text-md">

                                                                <div
                                                                    className="">
                                                                    {values.tags.map((tag, index) => (
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
                                                                            if (event.currentTarget.textContent.trim() === 'Add tags')
                                                                                event.currentTarget.textContent = ""
                                                                        }}
                                                                        onBlur={(event) => {
                                                                            if (event.currentTarget.textContent.trim() === '')
                                                                                event.currentTarget.textContent = "Add tags"
                                                                        }}
                                                                        onKeyPress={(event) => {

                                                                            if (event.key === 'Enter' && event.currentTarget.textContent.trim() !== '' && !values.tags.includes(event.currentTarget.textContent.trim())) {
                                                                                arrayHelpers.push(event.currentTarget.textContent.trim())
                                                                                event.currentTarget.textContent = ""
                                                                            }
                                                                            event.currentTarget.textContent = event.currentTarget.textContent.trim()
                                                                            return event.which !== 13;

                                                                        }}

                                                                    >Add tags
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
                                                    className="font-general-medium w-full px-6 py-3 text-white text-center font-medium whitespace-nowrap tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
                                                    <LoadingButton
                                                        type="submit"
                                                        loading={processing}>
                                                        Next <BsArrowRight className='ml-2'/>
                                                    </LoadingButton>
                                                </div>
                                            </div>
                                            <div>
                                                <Field
                                                    label="Status"
                                                    id="status"
                                                    name="status"
                                                    component={SelectInput}
                                                    options={['Draft', 'Archived', 'Published']}
                                                    value={values.status}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}/>
                                                <Field
                                                    label="Budget"
                                                    id="budget"
                                                    name="budget"
                                                    type="number"
                                                    component={TextInput}
                                                    value={values.Budget}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}/>

                                            </div>
                                        </div>

                                    </form>
                                );
                            }}
                        </Formik>


                    </div>
                </div>

            </motion.div>
        </>
    )

}

export default ProjectCreate
