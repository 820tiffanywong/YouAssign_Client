import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { GET_PROJECTS } from "../../access/queries/get_projects";
import { explorePageItem, ExplorePageSkillNav } from "../../atoms";
import { ProjectCardMd, SkillCardSm, UserCardMd, UserCardXs } from "../../components/custom.library";
import { SubTitle, Title } from "../../components/prebuilt.library";

export const ExploreProject = () => {
    const [item] = useRecoilState(explorePageItem)
    
    return (
        <div className="bg-gray-800 rounded p-4">
            <p className="font-light text-4xl dark:text-white">{item.title}</p>
            <SubTitle>A project requested by CLIENT NAME</SubTitle>


            <p className="font-light text-2xl dark:text-white">Skills Requested</p>
            <div className="flex w-full overflow-x-scroll">
                {item.skills_required.map((skill,index) => {
                    return (
                        <SkillCardSm
                            className={`mx-4 w-1/4 outline-none ring ring-violet-300`}
                            key={`${index}-minicard-${skill.title}`}
                            skill={skill}
                        />
                    )
                })}
            </div>
            <br/>
            <p className="font-light text-2xl dark:text-white">Clients Associated</p>
            <div className="flex w-full overflow-x-scroll">
                {item.clients.map((user,index) => {
                    return (
                        <UserCardXs
                            className={`mx-2 w-fit outline-none ring ring-violet-300`}
                            key={`${index}-minicard-${user.first}`}
                            user={user}
                        />
                    )
                })}
            </div>
            <br/>
            <p className="font-light text-2xl dark:text-white">Employees Drafted</p>
            <div className="flex w-full overflow-x-scroll">
                {item.employees.map((user,index) => {
                    return (
                        <UserCardXs
                            className={`mx-2 w-fit outline-none ring ring-violet-300`}
                            key={`${index}-minicard-${user.first}`}
                            user={user}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const ProjectList = () => {
    const [,setItem] = useRecoilState(explorePageItem)

    const {data} = useQuery(GET_PROJECTS)

    return (
        <>
            {data?.projects.map((project,index) => {
                return <ProjectCardMd 
                            key={`project-${index}-list`}
                            project={project}
                            onClick={() => setItem(project)}
                        />
            })}
        </>
    )
}

const ExploreProjects = () => {
    const [pageState,setPageState] = useRecoilState(ExplorePageSkillNav)

    return(
        <div>
            <div className="my-4 p-3 text-2xl w-full rounded-lg dark:bg-gray-800 bg-gray-200">
                <input className="dark:text-white text-black w-full p-1 border-2 shadow dark:border-gray-500 rounded bg-transparent" placeholder="Search projects..."/>
            </div>
            <div>
                <ProjectList />
            </div>
        </div>
    )
}

export default ExploreProjects