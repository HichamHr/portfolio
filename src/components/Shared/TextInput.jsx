import React, {useState} from 'react';
import { IconContext } from "react-icons";


const TextInput = (
    {
        field,
        label,
        name,
        id,
        value,
        form: { touched, errors },
        ...props
    }
) => {

    return (
        <React.Fragment>
            <div className="relative mb-3">
                {label && (
                    <label className="block text-lg text-primary-dark dark:text-primary-light mb-2" htmlFor={name}>
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    type="text"
                    {...field}
                    {...props}
                    className={`form-input ${(touched[field.name] && errors[field.name]) ? 'border-red-400 focus:border-red-700 focus:ring-red-400 ' : 'border-gray-300 dark:border-primary-dark border-opacity-50 '}` +
                        "border w-full px-5 py-2 text-primary-dark" +
                        " dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-b-md shadow-sm text-md"}
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
export default TextInput;