import { useState } from "react"

import { useMutation } from "@apollo/client"
import { GET_SKILL } from "../../../../access/queries/get_skill"
import { CREATE_SKILL } from "../../../../access/mutations/create_skill"
import { Label, LabeledInput, LabeledTextArea, ScrollLoader } from "../../../../components/prebuilt.library"

const SkillCreator = () => {
    const [title, setTitle] = useState("") 
    const [img, setImg] = useState("") 
    const [description, setDescription] = useState("") 
    
    const [createSkill,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(CREATE_SKILL)

    const onCreate = async () => {
        const result = await createSkill({
            variables:{
                input: {
                    title: title,
                    img_src: img,
                    description: description
                }
            },
            refetchQueries:[GET_SKILL]
        })
    }

    return (
        updateLoading?(
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
                            skill title
                        </LabeledInput>
                        <LabeledInput
                            className="dark:bg-gray-900"
                            value={img}
                            onChange={(event) => setImg(event.target.value)}
                        >
                            IMG url
                        </LabeledInput>
                        <LabeledTextArea
                            className={`dark:bg-gray-900`}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)} 
                        >
                            Description
                        </LabeledTextArea>
                    </div>

                    <div className='p-2 text '>
                        <div className="dark:bg-gray-900 my-2 p-2 rounded">
                            <Label>Photo upload</Label>
                            <div className='p-2 rounded border-2 border-gray-500 flex'>

                                <div className='w-fit group cursor-pointer m-2'>
                                    <img  
                                        src={"https://via.placeholder.com/50x50"} 
                                        alt="skill pic" 
                                        className="w-20 rounded"
            
                                    />
                                </div>
                                <input type="file" className="my-auto text-gray-300 border-dashed border-2" />
                            </div>
                        </div>
                    </div>
                </div>
                <button 
                    className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                    onClick={onCreate}  
                >confirm changes</button>
            </div>
        )
    )
}
export default SkillCreator;