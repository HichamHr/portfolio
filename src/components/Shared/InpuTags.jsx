import React, {useState} from 'react';
import { IconContext } from "react-icons";
import {Field, FieldArray} from "formik";
import {RiDeleteBack2Line} from "react-icons/ri";


const InputTags = (
    {
        field,
        label,
        options,
        name,
        id,
        value,
        form: { touched, errors },
        ...props
    }
) => {


    return (
        <React.Fragment>
            <div className="relative">
                {label && (
                    <label className="block text-lg text-primary-dark dark:text-primary-light mb-2" htmlFor={name}>
                        {label}
                    </label>
                )}

                <FieldArray
                    name={name}
                    render={options => (
                        <div className="flex inline-flex">
                            {options.map((friend, index) => (

                                <div >
                                                                        <span
                                                                            className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                                                                            {friend}
                                                                            <span onClick={() => options.remove(index)}><RiDeleteBack2Line color={'red'}/></span>
                                                                        </span>
                                </div >

                            ))}
                            <input

                                className={`form-input ${(touched[field.name] && errors[field.name]) ? 'border-red-400 focus:border-red-700 focus:ring-red-400 ' : 'border-gray-300 dark:border-primary-dark border-opacity-50 '}` +
                                    "border w-full px-5 py-2 text-primary-dark" +
                                    " dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-b-md shadow-sm text-md"}

                                   onKeyPress={(event)=>{
                                if(event.key === 'Enter'){
                                    options.push(event.target.value)
                                    event.target.value=""
                                }
                            } } />

                        </div>
                    )}
                />
                {touched[field.name] && errors[field.name] && (
                    <div className="text-red-600">
                        <IconContext.Provider value={{ color: "#ffdd55" }}>
                        </IconContext.Provider>
                        {errors[field.name]}
                    </div>
                )}
            </div>


        </React.Fragment>
    );

};
export default InputTags;