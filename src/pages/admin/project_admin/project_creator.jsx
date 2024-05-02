import { useMutation } from "@apollo/client"
import { useState } from "react"
import { CREATE_PROJECT } from "../../../access/mutations/create_project"
import { Label, LabeledInput, LabeledTextArea, ScrollLoader } from "../../../components/prebuilt.library"

const ProjectCreator = () => {
    const [title, setTitle] = useState("") 
    const [img, setImg] = useState("") 
    const [description, setDescription] = useState("") 
    
    const [createSkill,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(CREATE_PROJECT)
    const onCreate = async () => {
        // const result = await createSkill({
        //     variables:{
        //         input: {
        //             title: title,
        //             img_src: img,
        //             description: description
        //         }
        //     },
        //     refetchQueries:[GET_SKILL]
        // })
    }

    return (
        false?(
            <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                <ScrollLoader />
            </div>
        ):( 
            <div className='w-full m-0'>
                <div className='md:flex no-wrap'>
                    <div className='p-2 md:w-1/2 [&>*]:my-2'>
                        <LabeledInput
                            className={`bg-gray-900`}
                            value={title}
                            onChange={(event)=>setTitle(event.target.value)}
                        >
                            Project Name
                        </LabeledInput>
                        <LabeledTextArea
                            className={`dark:bg-gray-900`}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)} 
                        >
                            Description
                        </LabeledTextArea>
                        <div className={`dark:bg-gray-900 p-2 rounded`}>
                            <Label>Clients</Label>
                        </div>
                        <div className={`dark:bg-gray-900 p-2 rounded`}>
                            <Label>Users</Label>
                        </div>
                    </div>
                </div>
                <button 
                    className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                    onClick={async () => onCreate}  
                >confirm changes</button>
            </div>
        )
    )
}
export default ProjectCreator;