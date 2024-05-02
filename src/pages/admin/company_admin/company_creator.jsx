import { useMutation } from "@apollo/client"
import { useState } from "react"
import { LabeledInput, ScrollLoader } from "../../../components/prebuilt.library"
import { CREATE_COMPANY } from "../../../access/mutations/create_company"
import { GET_COMPANY } from "../../../access/queries/get_company"

export const CompanyCreator = () => {

    //queries and mutations
    const [createCompany,{ data:createData, loading:createLoading, error:createError } ]= useMutation(CREATE_COMPANY)

    //input state variables
    const [name, setName] = useState("")
    const [logo, setLogo] = useState("")
    const [background, setBackground] = useState("")
    const [description, setDescription] = useState("")

    //component actions
    const onCreate = async() => {
        await createCompany({
            variables:{
                input: [
                    {
                        name: name,
                        logo: logo,
                        backgroundImage: background,
                        description: description,
                        employees: {
                        connect: [
                                {
                                    where: {
                                        node: {
                                            email_IN: []
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            refetchQueries:[GET_COMPANY]
        })
    }

    return (
        <div className='w-full h-fit py-4'>
            {(createLoading)?(
                <div className='absolute h-full min-h-[500px] w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                    <ScrollLoader />
                </div>
            ):(<>
                <div className='no-wrap'>
                    <div className='p-2 [&>*]:my-2'>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        >
                            Company Name
                        </LabeledInput>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={logo}
                            onChange={(event) => setLogo(event.target.value)}
                        >
                            Logo
                        </LabeledInput>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={background}
                            onChange={(event) => setBackground(event.target.value)}
                        >
                            Background Image
                        </LabeledInput>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        >
                            Description
                        </LabeledInput>
                    </div>
                    <button 
                        className='my-2 p-2 block mx-auto bg-gray-400 rounded-lg'
                        onClick={onCreate}  
                    >
                        confirm changes
                    </button>
                </div>
            </>)}
        </div>
    )
}
