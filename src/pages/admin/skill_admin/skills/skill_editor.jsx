import { useQuery, useMutation } from "@apollo/client"
import { GET_SKILL } from "../../../../access/queries/get_skill"
import { UPDATE_SKILL } from "../../../../access/mutations/update_skill"
import { useEffect, useState } from "react"
import { Label, LabeledInput, LabeledTextArea, ScrollLoader } from "../../../../components/prebuilt.library"

const SkillEditor = ({ skill_title }) => {
    const [title, setTitle] = useState("") 
    const [img, setImg] = useState("") 
    const [description, setDescription] = useState("") 
    
    const [updateSkill,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(UPDATE_SKILL)
    const { data, loading:queryLoading, error:queryError } = useQuery(GET_SKILL,{
        variables:{
            where: {
                title: skill_title
            }
        }
    });

    useEffect(() => {
        if(data?.skills){
            setTitle(data?.skills[0].title)
            setImg(data?.skills[0].img_src)
            setDescription(data?.skills[0].description)
        }
    },[data])

    const onUpdate = async() => {
        await updateSkill({
            variables:{
                where: {
                    title: title
                },
                update: {
                    title: title,
                    img_src: img,
                    description: description
                }
            },
            refetchQueries:[GET_SKILL]
        })
    }

    return (
        queryLoading||updateLoading||!data?(
            <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                <ScrollLoader />
            </div>
        ):(
            <div className='w-full m-0'>
                <div className='md:flex no-wrap'>
                    <div className='p-2 md:w-1/2 [&>*]:my-2'>
                        <LabeledInput
                            className={`dark:bg-gray-900`}
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
                                        src={data.skills[0].img_src} 
                                        alt="skill pic" 
                                        className="w-10 h-10"
            
                                    />
                                </div>
                                <input type="file" className="my-auto text-gray-300 border-dashed border-2" />
                            </div>
                        </div>
                    </div>
                </div>
                <button 
                    className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                    onClick={onUpdate}  
                >confirm changes</button>
            </div>
        )
    )
}
export default SkillEditor;