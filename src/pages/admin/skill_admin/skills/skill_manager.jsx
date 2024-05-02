import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_SKILL } from "../../../../access/queries/get_skill"
import { BackButton, SearchBarLg, SkillCardMd } from "../../../../components/custom.library"
import { Button, ScrollLoader } from "../../../../components/prebuilt.library"
import SkillCreator from "./skill_creator"
import SkillEditor from "./skill_editor"



export const SkillManager = () => {
    const [modal,setModal] = useState(false)
    const { data, loading, error } = useQuery(GET_SKILL)

    return (
        loading?(
            <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                <ScrollLoader />
            </div>
        ):(
            <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                {modal==="create"?(
                    <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4  group-hover:block">
                        <BackButton 
                            onClick={() => {
                                setModal(false)
                            }}
                        />
                        <SkillCreator />
                    </div>
                ):(<></>)}
                {modal&&modal!=="create"?(
                    <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4 group-hover:block">
                        <BackButton 
                            onClick={() => {
                                setModal(false)
                            }}
                        />
                        <SkillEditor key={modal.title} skill_title={modal.title} />

                    </div>
                ):(<></>)}
                {!modal?(
                    <>
                        <SearchBarLg
                            placeholder={`search skills.. `}
                        >
                            <Button
                                onClick={() => {
                                    setModal("create")
                                }}
                            >
                                add new
                            </Button>
                        </SearchBarLg>
                                
                        <div className="md:flex flex-wrap">
                            {data?.skills.map((skill,index) => {
                                return (
                                    <SkillCardMd 
                                        key={`${skill.title}-${index}`} 
                                        skill={skill} 
                                        onClick={() => {
                                            modal ? setModal(false) : setModal(skill)
                                        }}        
                                    />
                                )
                            })}
                        </div>
                    </>
                ):(<></>)}
            </div>
        )
    )
}