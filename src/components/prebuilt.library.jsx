/** Prebuilt Component library
 * 
 * 
 */

import { Icon } from "@iconify/react";



/** Header of a Page
 * @returns the standard page header
 */
 export const PageHeader = ({ children }) => {
    return (
        <div className="bg-gray-900 rounded w-full shadow-gray-800 shadow-lg p-4 my-4">
            <p className="text-gray-200 text-4xl">
                {children}
            </p>
        </div>
    );
}


export const Input = ({className,...rest}) => {

    return (
        <input
            className={``}
            {...rest}
        />

    )
}

export const Label = ({children,className,...rest}) => {
    return (
        <label 
            className={`text-gray-600 dark:text-gray-200 text-lg uppercase ${className}`}
            {...rest}    
        >{children}</label>
    )
}

export const LabeledInput = ({children,className,...rest}) => {

    return (
        <div className={`flex flex-col p-2 rounded ${className}`}>
            <label className={`text-gray-600 dark:text-gray-200 text-lg uppercase`}>{children}</label>
            <input
                className={`border-none bg-transparent dark:text-gray-200 focus:outline-none focus:ring focus:ring-transparent`}
                {...rest}
            />
        </div>

    )
}

export const Button = ({children,className,...rest}) => {
    return (
        <button
            className={`my-auto mx-2 px-2 rounded-lg dark:bg-gray-500 hover:bg-blue-400 text-gray-200 ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export const ConfirmButton = ({children,className,...rest}) => {
    return (
        <button
            className={`my-auto mx-2 px-2 rounded-lg dark:bg-gray-500 bg-gray-400 text-gray-200 ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export const RadioButton = ({children,className,state,...rest}) => {
    return (
        <button
            className={`my-auto mx-2 px-2 rounded-lg text-sm text-gray-200 transition-all ${className} ${state?'dark:bg-gray-400 bg-gray-300 text-gray-600 outline-none ring ring-violet-300':'dark:bg-gray-500 bg-gray-500'}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export const Select = ({className,options,...rest}) => {

    return (
        <select  
            className={`p-2 ${className}`}
            {...rest}
        >
            <option value={""}></option>
            {
                options.map((option,index) => {
                    return <option key={`${option}-${index}`} value={option}>{option}</option>
                })    
            }
        </select>
    )
}

export const LabeledTextArea = ({children,className,...rest}) => {

    return (
        <div className={`flex flex-col p-2 rounded ${className}`}>
            <label className={`text-gray-600 dark:text-gray-200 text-lg uppercase`}>{children}</label>
            <textarea
                className={`border-none bg-transparent dark:text-gray-200 focus:outline-none focus:ring focus:ring-transparent`}
                {...rest}
            >
            </textarea>
        </div>

    )
}

export const Title = ({children,className,...rest}) => {
    return(
        <p
            className={`text-6xl text-gray-600 ${className}`}
            {...rest}
        >
            {children}
        </p>
    )
}

export const TitleSm = ({children,className,...rest}) => {
    return(
        <p
            className={` text-gray-300 ${className}`}
            {...rest}
        >
            {children}
        </p>
    )
}


export const TitleMd = ({children,className,...rest}) => {
    return(
        <p
            className={`text-2xl text-gray-300 ${className}`}
            {...rest}
        >
            {children}
        </p>
    )
}

export const TitleLg = ({children,className,...rest}) => {
    return(
        <p
            className={`text-4xl font-light dark:text-gray-300 ${className}`}
            {...rest}
        >
            {children}
        </p>
    )
}

export const TitleXl = ({children,className,...rest}) => {
    return(
        <p
            className={`text-4xl md:text-6xl font-light dark:text-gray-300 ${className}`}
            {...rest}
        >
            {children}
        </p>
    )
}

export const SubTitle = ({children,className,...rest}) => {
    return (
        <p 
            className={`p-2 text-lg font-light text-gray-600 ${className}`}
            {...rest}
        >
            {children}
        </p>
    )
}

export const SubText = ({children,className,...rest}) => {
    return (
        <p 
            className={`px-2 text-sm font-light text-gray-600 ${className}`}
            {...rest}
        >
            {children}
        </p>
    )
}


export const ScrollLoader = () => {
    return <Icon icon="eos-icons:loading" className='text-gray-100 my-auto' width="40" />
}

export const Wrapper = ({children,className,...rest}) => {


    return (
        <div className={`${className} bg-cover rounded-lg shadow-gray-700 shadow`}>
            {children}
        </div>
    )
}