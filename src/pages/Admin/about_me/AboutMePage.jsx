import React, {useState, useEffect} from 'react'
import {
    Link,
} from 'react-router-dom'

import {AboutMeService, MessagesService} from "../../../services/DatabaseService";
import {number, object, string} from "yup";
import {Field, Formik} from "formik";
import NotifMessages from "../../../components/Shared/NotifMessages";
import TextInput from "../../../components/Shared/TextInput";
import TextArea from "../../../components/Shared/TextArea";
import LoadingButton from "../../../components/Shared/LoadingButton";
import {motion} from "framer-motion";
import FileInput from "../../../components/Shared/FileInput";
import StorageService from "../../../services/AboutMe/StorageService";
import {Helmet} from "react-helmet";
import {useRecoilState} from "recoil";
import {filesPreviewState} from "../../../states/upload";

function AboutMePage() {
    const [processing, setProcessing] = useState(false);
    const [initialState, setInitialState] = useState(
        {id: '', content: '', experience: '', positive_feedback: '', project_completed: ''}
    );
    const [showNotification, setShowNotification] = useState(false);
    const [avatarFile, setAvatarFile] = useState('');
    const [filesPreview, setFilesPreview] = useRecoilState(filesPreviewState);

    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        AboutMeService.getAll().then((data) => {
            if (data.length > 0) {
                setInitialState(data[0])
            }
        })
    })

    const submit = async (values) => {
        setProcessing(true);
        console.log("start uploading")
        let imageUrl = await StorageService.uploadFile('about_me', avatarFile, "avatar").then(async (
            avatar
        ) => {
            try {
                if (initialState.id === '') {
                    await AboutMeService.create({
                        ...values,
                        avatar
                    }).then(() => {
                        setShowNotification(true)
                    })
                } else {

                    await AboutMeService.update(initialState.id, {
                        ...values,
                        avatar
                    }).then(() => {
                        setShowNotification(true)
                    })
                }

                setProcessing(false)
            } catch (e) {
                setProcessing(false)
            }
        });

    }

    const AboutMeFormSchema = object().shape({
        content: string().required('Content Required'),
        experience: number('Experience must be a number').required('Experience Required'),
        positive_feedback: number('Positive feedback must be a number').required('Positive feedback Required'),
        project_completed: number('Projects completed must be a number').required('Projects completed Required'),
    });


    return (
        <>
            <Helmet title="HichamHr | About Me"/>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    to="/admin/dashboard"
                    className="text-indigo-600 hover:text-indigo-700">
                    Dashboard
                </Link>
                / <span>About Me</span>
            </h1>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    delay: 0.1,
                }}
                className="container mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-10"
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
                            validationSchema={AboutMeFormSchema}
                        >
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
                                        <NotifMessages
                                            message="About Me Page Has Been Updated"
                                            show={showNotification}
                                            onClick={() => {
                                                setShowNotification(false)
                                            }}
                                        />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <div>
                                                <FileInput
                                                    name="avatar"
                                                    label="Personal Photo S"
                                                    className="mt-10 w-full md:w-1/2"
                                                  //  value={avatar}
                                                    accept="image/*"
                                                    onChange={e => setAvatarFile(e)}
                                                />

                                                <Field
                                                    name="avatar"
                                                    label="Avatar"
                                                    className="mt-10 w-full md:w-1/2"
                                                    //  value={avatar}
                                                    accept="image/*"
                                                    id="avatar"
                                                    storageFolder="about_me"
                                                    component={FileInput}
                                                    //   value={filesPreview}
                                                    onChange={e => setAvatarFile(e)}/>

                                                <Field
                                                    label="Content"
                                                    id="content"
                                                    name="content"
                                                    component={TextArea}
                                                    rows="10"
                                                    value={values.content}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />


                                            </div>
                                            <div>
                                                <Field
                                                    label="Experience"
                                                    id="experience"
                                                    name="experience"
                                                    type="number"
                                                    component={TextInput}
                                                    value={values.experience}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Field
                                                    label="Positive Feedback"
                                                    id="positive_feedback"
                                                    name="positive_feedback"
                                                    type="number"
                                                    component={TextInput}
                                                    value={values.positive_feedback}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Field
                                                    label="Project Completed"
                                                    id="project_completed"
                                                    name="project_completed"
                                                    type="number"
                                                    component={TextInput}
                                                    value={values.project_completed}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <div
                                                    className="font-general-medium w-full px-6 py-3 text-white text-center font-medium whitespace-nowrap tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
                                                    <LoadingButton
                                                        type="submit"
                                                        loading={processing}
                                                    >
                                                        Save Data
                                                    </LoadingButton>
                                                </div>
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

export default AboutMePage
