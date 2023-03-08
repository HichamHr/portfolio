import {motion} from 'framer-motion';
import {FiX} from 'react-icons/fi';
import {Field, Formik} from "formik";
import NotifMessages from "./Shared/NotifMessages";
import TextInput from "./Shared/TextInput";
import TextArea from "./Shared/TextArea";
import LoadingButton from "./Shared/LoadingButton";
import {useState} from "react";
import { ProjectsRequest} from "../services/DatabaseService";
import {object, string} from "yup";
import SelectInput from "./Shared/SelectInput";


const selectProjectTypeOptions = [
    'Web Application',
    'Mobile Application',
];
const selectBudgetOptions = [
    '< 500$',
    '500$ - 1000$',
    '1000$ - 5000$',
    '+5000$',
];

const HireMeModal = ({onClose, onRequest}) => {

    const initialState = {
        email: 'email',
        full_name: '',
        project_category: '',
        project_budget: '',
        message: ''};

    const [processing, setProcessing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);


    const submit = async (values) => {
        console.log(values)
        setProcessing(true);
        try {
            await ProjectsRequest.create({
                ...values,
                deleted_at: false
            }).then(() => {
                setShowNotification(true)
            })
            setProcessing(false)
        } catch (e) {
            setProcessing(false)
        }
    }

    const ContactFormSchema = object().shape({
        full_name: string().required('Full Name Required'),
        email: string().email('Invalid email').required('Email Required'),
        project_category: string().required('Project Category Required'),
        project_budget: string().required('Project Budget Required'),
        message: string().required('Message Required'),
    });


    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="font-general-medium fixed inset-0 z-30 transition-all duration-500">
            <div className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"/>
            <main className="flex flex-col items-center justify-center overflow-y-auto h-full w-full">
                <div className=" z-30">
                    <div
                        className="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark shadow-lg flex-row rounded-lg relative">
                        <div
                            className=" flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark">
                            <h5 className=" text-primary-dark dark:text-primary-light text-xl">
                                What project are you looking for?
                            </h5>
                            <button
                                onClick={onClose}
                                className="px-4 font-bold text-primary-dark dark:text-primary-light"
                            >
                                <FiX className="text-3xl"/>
                            </button>
                        </div>
                        <div className=" p-5 w-full h-full">

                            <Formik
                                initialValues={
                                    initialState
                                }
                                onSubmit={(values, {setSubmitting}) => {
                                    setSubmitting(false);
                                    submit(values).then()
                                }}
                                validationSchema={ContactFormSchema}>
                                {props => {
                                    const {
                                        values,
                                        dirty,
                                        isSubmitting,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        handleReset
                                    } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <NotifMessages
                                                    message="thank you for requesting a project, we'll contact you us soon as possible"
                                                    show={showNotification}
                                                    onClick={() => {
                                                        setShowNotification(false)
                                                    }}
                                                />
                                                <Field
                                                    label="Full Name"
                                                    id="full_name"
                                                    name="full_name"
                                                    component={TextInput}
                                                    value={values.full_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Field
                                                    label="Email"
                                                    id="email"
                                                    name="email"
                                                    component={TextInput}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Field
                                                    label="Project Category"
                                                    id="project_category"
                                                    name="project_category"
                                                    options={selectProjectTypeOptions}
                                                    component={SelectInput}
                                                    value={values.subject}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Field
                                                    label="Project Budget"
                                                    id="project_budget"
                                                    name="project_budget"
                                                    options={selectBudgetOptions}
                                                    component={SelectInput}
                                                    value={values.subject}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Field
                                                    label="Project Description"
                                                    id="message"
                                                    name="message"
                                                    component={TextArea}
                                                    rows="6"
                                                    placeholder="Project Description"
                                                    value={values.message}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <div
                                                    className="font-general-medium w-40 px-6 py-3 text-white text-center font-medium whitespace-nowrap tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
                                                    <LoadingButton
                                                        type="submit"
                                                        loading={processing} >
                                                        Send Request
                                                    </LoadingButton>
                                                </div>
                                            </div>

                                        </form>
                                    );
                                }}
                            </Formik>

                        </div>
                        {/*<div className="modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right">*/}
                        {/*    <button*/}
                        {/*        onClick={onClose}*/}
                        {/*        type="button"*/}
                        {/*        className="px-4*/}
						{/*			sm:px-6*/}
						{/*			py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light*/}
						{/*			rounded-md*/}
						{/*			focus:ring-1 focus:ring-indigo-900 duration-500"*/}
                        {/*        aria-label="Close Modal"*/}
                        {/*    >*/}
                        {/*        Close*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </main>
        </motion.div>
    )

};

export default HireMeModal;
