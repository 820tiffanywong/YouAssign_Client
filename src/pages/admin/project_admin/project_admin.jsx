import { useQuery } from "@apollo/client"
import { useState } from "react"
import { Button, ScrollLoader } from "../../../components/prebuilt.library"
import { BackButton, ProjectCardMd, SearchBarLg } from "../../../components/custom.library"
import ProjectCreator from "./project_creator"
import { GET_PROJECTS } from "../../../access/queries/get_projects"
import ProjectEditor from "./project_editor"

const ProjectAdmin = () => {
    const { data, loading, error } = useQuery(GET_PROJECTS)
    const [search,setSearch] = useState("")
    const [modal,setModal] = useState()

    if(error)
        console.log(error)

    return (
        loading?(
            <div className="w-full relative">
                <div className='absolute h-screen w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                    <ScrollLoader />
                </div>
            </div>
        ):(
            <div className="w-full relative">
                {modal==="create"?(
                    <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4  group-hover:block">
                        <BackButton 
                            onClick={() => {
                                setModal(false)
                            }}
                        />
                        <ProjectCreator />
                    </div>
                ):(<></>)}
                {modal&&modal!=="create"?(
                    <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4 group-hover:block">
                        <BackButton 
                            onClick={() => {
                                setModal(false)
                            }}
                        />
                        <ProjectEditor projectData={modal} />
                    </div>
                ):(<></>)}
                {!modal?(
                    <>
                        <SearchBarLg
                            placeholder={`search projects.. `}
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
                            {data?.projects.map((project,index) => {
                                return (
                                    <ProjectCardMd key={`project-${index}`} project={project} onClick={()=>setModal(project)} />
                                )
                            })}
                        </div>
                    </>
                ):(<></>)}
            </div>
        )

    )
}
export default ProjectAdmin