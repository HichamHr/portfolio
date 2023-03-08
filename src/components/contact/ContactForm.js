import {useState} from "react";
import {MessagesService} from "../../services/DatabaseService";
import LoadingButton from "../Shared/LoadingButton";
import TextInput from "../Shared/TextInput";
import {Formik, Field} from 'formik';
import {object, string} from 'yup'
import TextArea from "../Shared/TextArea";
import NotifMessages from "../Shared/NotifMessages";
import {serverTimestamp} from "firebase/firestore"

const ContactForm = () => {

    const initialState = {email: '', full_name: '', subject: '', message: ''};

    const [processing, setProcessing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);


    const submit = async (values) => {
        setProcessing(true);
        try {
            await MessagesService.create({
                ...values,
                deleted_at: false,
                is_read:false,
                saved:false,
                created_at: serverTimestamp()
            }).then(() => {
                window.scrollTo(0, 0);
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
        subject: string().required('Subject Required'),
        message: string().required('Message Required'),
    });


    return (
        <div className="w-full lg:w-1/2">
            <div className="leading-loose">

                <Formik
                    initialValues={
                        initialState
                    }
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(false);
                        submit(values).then()
                    }}
                    validationSchema={ContactFormSchema}
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
                                    message="thank you for contacting us, we'll contact you us soon as possible"
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
                                    label="Subject"
                                    id="subject"
                                    name="subject"
                                    component={TextInput}
                                    value={values.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <Field
                                    label="Message"
                                    id="message"
                                    name="message"
                                    component={TextArea}
                                    rows="6"
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <div
                                    className="font-general-medium w-40 px-6 py-3 text-white text-center font-medium whitespace-nowrap tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
                                    <LoadingButton
                                        type="submit"
                                        loading={processing}
                                    >
                                        Send Message
                                    </LoadingButton>
                                </div>

                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default ContactForm;
