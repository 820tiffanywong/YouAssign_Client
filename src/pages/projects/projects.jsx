import { useQuery } from "@apollo/client"
import { useState } from "react"
import { DRAFT_USERS } from "../../access/queries/draft_users.mjs"
import { GET_SKILL } from "../../access/queries/get_skill.js"
import { SearchBarMd, SkillCardSm, SkillCardXs } from "../../components/custom.library.jsx"
import { Button, Label, PageHeader, TitleMd } from "../../components/prebuilt.library"



const Projects = () => {
    const [selected,setSelected] = useState([])

    const [searchSkills,setSearchSkills] = useState("")

    const {data} = useQuery(DRAFT_USERS,{
        variables:{
            skillList: selected.map(skill => skill.title),
            min:0,
            topK:10
        }
    })

    const {data:skillData} = useQuery(GET_SKILL)

    return (
        <div>
            <PageHeader>Project Portal</PageHeader>

            <br/>


            <Label>require skills</Label>
            <br/>
            <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                {selected.map((skill,index) => {
                    return (
                        <SkillCardSm
                            className={`mx-4 min-w-1/4 outline-none ring ring-violet-300`}
                            key={`${index}-minicard-${skill.title}`}
                            skill={skill}
                            onClick={()=>{
                                setSelected(selected.filter(item => {
                                    return item.title!==skill.title
                                }))
                            }} 
                        />
                    )
                })}
            </div>


            <SearchBarMd placeholder={"Search skills.."} value={searchSkills} onChange={(event)=>setSearchSkills(event.target.value)}/>
            <div className="flex max-w-full overflow-x-scroll pb-4">
                {skillData?.skills
                .filter(skill => {
                    return !(selected.filter(item => {return item.title===skill.title}).length > 0)
                })
                .filter(skill => {
                    return skill.title.toLowerCase().includes(searchSkills.toLowerCase())
                })
                .map((skill,index) => {
                    return (   
                        <SkillCardSm
                            className={`mx-4 min-w-1/4`}
                            key={`${index}-minicard-${skill.title}`}
                            skill={skill}
                            onClick={()=>{
                                setSelected([...selected,skill])
                            }} 
                        />
                    )
                })}
            </div>

            <Label>Drafted users</Label>
            <div className="rounded-xl overflow-hidden border border-borders">
                <div className="flex w-full border p-4 border-borders justify-between bg-gray-200 font-bold">
                    <p className="w-1/3 ">User</p>
                    <p className="w-1/3 text-center">Transferrables</p>
                    <p className="w-1/3 text-right">Ranking</p>
                </div>
                {data?.getUsersWithSkills.map((user,key) => {

                    return (
                        <div 
                            key={key} 
                            className="flex w-full border p-4 border-borders justify-between transition-all hover:bg-blue-100 cursor-pointer bg-gray-100" 
                        >
                            <p className="w-1/3 font-light text-xl">{user.name}</p>
                            <div className="flex flex-wrap w-1/3 border-r-2 border-l-2">
                                {user.skills.map(skill => {
                                    return <p className="border border-borders p-1 rounded mx-auto">{skill}</p>
                                })}
                            </div>
                            <p className={`w-1/3 text-right `}>{Math.floor(user.percentKnown*100)}% Qualified</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Projects