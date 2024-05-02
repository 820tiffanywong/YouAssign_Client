import { useEffect, useState } from "react"

import { useQuery, useMutation } from "@apollo/client"
import { UPDATE_CATEGORY } from "../../../../access/mutations/update_category"
import { GET_CATEGORY } from "../../../../access/queries/get_category"

import ColorSelector from "../../../../components/color_selector"
import  SkillSelector  from "../skills/skill_selector"
import { CONNECT_CATEGORY_TO_SKILL } from "../../../../access/mutations/connect_category_to_skill"
import { DISCONNECT_CATEGORY_FROM_SKILL } from "../../../../access/mutations/disconnect_category_from_skill"
import { Label, LabeledInput, ScrollLoader } from "../../../../components/prebuilt.library"
import { Icon } from "@iconify/react"
import { GET_SKILL } from "../../../../access/queries/get_skill"

export const CategoryEditor = ({ category_title }) => {

    //input state variables
    const [title, setTitle] = useState("") 
    const [color, setColor] = useState("") 
    
    //component state variables
    const [colorSelector,setColorSelector] = useState(false)
    const [deleteSkillModal,setDeleteSkillModal] = useState("")
    const [connectSkill,setConnectSkill] = useState(false)
    const selected = []

    //queries and mutations
    const [updateCategory,{ data:updateData, loading:updateLoading, error:updateError }] = useMutation(UPDATE_CATEGORY)
    const [connectCategory,{ data:connectData, loading:connectLoading, error:connectError }] = useMutation(CONNECT_CATEGORY_TO_SKILL)
    const [disconnectCategory,{ loading:disconnectLoading, error:disconnectError }] = useMutation(DISCONNECT_CATEGORY_FROM_SKILL)
    const { data, loading:queryLoading, error:queryError } = useQuery(GET_CATEGORY,{
        variables:{
            where: {
                title: category_title
            }
        }
    });

    useEffect(() => {
        setTitle(data?.categories[0].title)
        setColor(data?.categories[0].color)
    },[data])

    return (
        updateLoading||connectLoading||disconnectLoading||queryLoading?(
            <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                <ScrollLoader />
            </div>
        ):(  
            <div className='w-full mx-auto relative'>
                {deleteSkillModal ? (
                    <div className="absolute w-full">
                        <div className="bg-gray-500 w-fit p-4 rounded mx-auto relative">
                            <button
                                className="absolute top-1 right-1"
                                onClick={() => {
                                    setDeleteSkillModal(false)
                                }}
                            >
                                <Icon icon="material-symbols:cancel-outline-rounded" />
                            </button>
                            <p>remove this skill?</p>
                            <button
                                onClick={async () => {
                                    const result = await disconnectCategory({
                                        variables :{
                                            disconnect: {
                                                skills: [
                                                    {
                                                        where: {
                                                            node: {
                                                                title: skill.title
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            where: {
                                                title: data?.categories[0].title
                                            },
                                            refetchQueries:[GET_CATEGORY]
                                        }
                                    }) 
                                }}
                            >
                                remove
                            </button>
                        </div>
                    </div>
                ):(<></>)}
                <div className='flex no-wrap'>
                    <div className='p-2 w-1/2 [&>*]:my-2'>
                        <LabeledInput
                            className={`bg-gray-900`}
                            value={title}
                            onChange={(event)=>setTitle(event.target.value)}
                        >
                            category title
                        </LabeledInput>


                        <div className="p-2 bg-gray-900">
                            <Label>
                                color
                            </Label>

                            <div className={"h-6 w-6 " + (color)}>

                            </div>
                            <p 
                                className='cursor-pointer dark:text-blue-400 ml-2'
                                onClick={() => {
                                    colorSelector ? setColorSelector(false) : setColorSelector(true)
                                }}
                            >{colorSelector ? "(confirm)" : "(select new)"}</p>
                        </div>
                        <div className="p-3 w-1/2">
                            {colorSelector ? (
                                <ColorSelector setColor={setColor}/>
                            ):(<></>)}
                        </div>
                    </div>
                    <div className='p-2 w-full my-4 bg-gray-900'>
                        <Label>
                            skills in this category
                        </Label>

                        <div className="flex py-2">
                            {connectSkill? (
                                <div className="absolute bg-gray-500 w-4/5 rounded z-50 top-15 right-10">
                                    <div className="w-full flex justify-between">
                                        <p className="p-2 font-bold text-gray-300">Select skills to connect</p>
                                        <button
                                            className="text-gray-300 bg-gray-800 rounded m-2 w-4 font-bold"
                                            onClick={() => {
                                                setConnectSkill(false)
                                            }}  
                                        >
                                            X
                                        </button>
                                    </div>
                                    <div className="h-40 overflow-y-scroll">
                                        <SkillSelector selected={selected} />
                                    </div>
                                    <button
                                        className="m-auto block my-2 p-2 bg-gray-800 text-gray-300 rounded"
                                        onClick={() => {
                                            selected.map(async(skill) => {
                                                await connectCategory({
                                                    variables:{
                                                        where: {
                                                            title: data?.categories[0].title
                                                        },
                                                        connect: {
                                                            skills: [
                                                                {
                                                                    where: {
                                                                        node: {
                                                                            title: skill
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        refetchQueries:[GET_CATEGORY,GET_SKILL]
                                                    }
                                                })
                                            })
                                        }}
                                    >
                                        confirm
                                    </button>
                                </div>
                            ):(<></>)}
                            <div 
                                className="cursor-pointer relative w-max group"
                                onClick={() => {
                                    setConnectSkill(true)
                                }}    
                            >
                                <div className=" font-bold border-2 text-gray-300 rounded text-center p-1">
                                    <Icon 
                                        icon="bx:add-to-queue" 
                                        className=""
                                        width="30"
                                    />
                                </div>
                                <p className="text-gray-300 bg-gray-500 rounded group-hover:p-1 p-0 absolute left-10 top-1 transition-all duration-200 whitespace-nowrap group-hover:w-24 w-0 overflow-hidden">add new skill</p>
                            </div>
                            <div className="flex">
                                {data?.categories[0].skills.map(skill => {
                                    return(
                                        <div 
                                            className="cursor-pointer rounded w-10 m-2  my-auto mx-2"
                                            onClick={() => setDeleteSkillModal(true)}
                                        >
                                            <img src={skill.img_src}  className="w-8 m-auto"/>
                                        </div>
                                    )})}
                            </div>
                        </div>
                    </div>
                </div>
                <button 
                    className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                    onClick={async ()=> {
                        let title_input = (title ? title : data?.categories[0].title)
                        let color_select = (color ? color : data?.categories[0].color)
                        await updateCategory(
                            {
                                variables:{
                                    where: {
                                        title: category_title
                                    },
                                    update: {
                                        title: title_input,
                                        color: color_select
                                    }
                                },
                                refetchQueries:[GET_CATEGORY]
                            }
                        )
                    }}  
                >confirm changes</button>
            </div>
        )
    )
}
export default CategoryEditor