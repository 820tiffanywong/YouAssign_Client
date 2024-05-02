import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { DISCONNECT_USER_FROM_PROJECT } from "../../../access/mutations/disconnect_user_from_project"
import { UPDATE_PROJECT } from "../../../access/mutations/update_project"
import { GET_PROJECTS } from "../../../access/queries/get_projects"
import { GET_SKILL } from "../../../access/queries/get_skill"
import { GET_USER } from "../../../access/queries/get_user"

import { SearchBarMd, SkillCardMd, SkillCardSm, UserCardXs } from "../../../components/custom.library"
import { Label, LabeledInput, ScrollLoader, LabeledTextArea } from '../../../components/prebuilt.library'

const ProjectEditor = ({projectData}) => {
    const [title, setTitle] = useState(projectData?.title) 
    const [description, setDescription] = useState(projectData?.description) 

    const [searchUsers,setSearchUsers] = useState("")
    const [searchClients,setSearchClients] = useState("")
    const [searchSkills,setSearchSkills] = useState("")
    
    const [employees,setEmployees] = useState([])
    const [clients,setClients] = useState([])
    const [skills,setSkills] = useState([])

    const {data:userData,loading:userLoading,error:userError} = useQuery(GET_USER)
    const {data:skillData,loading:skillLoading,error:skillError} = useQuery(GET_SKILL)
    const [updateProject,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(UPDATE_PROJECT)
    const [disconnectUser,{ data:disconnectData, loading:disconnectLoading, error:disconnectError } ]= useMutation(DISCONNECT_USER_FROM_PROJECT)

    const onUpdate = async () => {
        const result = await updateProject({
            variables:{
                where: {
                    id: projectData.id
                },
                update: {
                    title: title,
                    description: description,
                    skills_required: [{
                        connect: [{
                            where: {
                                node: {
                                    title_IN: skills.map(skill => {return skill.title})
                                }
                            }
                        }]
                    }],
                    clients: [{
                        connect: [{
                            where: {
                                node: {
                                    email_IN: clients.map(client => {return client.email})
                                }
                            }
                        }]
                    }],
                    employees: [{
                        connect: [{
                            where: {
                                node: {
                                    email_IN: employees.map(employee => {return employee.email})
                                }
                            },
                            edge: {
                                date_assigned: (new Date()).toISOString(),
                                role: ""
                            }
                        }]
                    }]
                }
            },
            refetchQueries:[GET_PROJECTS]
        })
    }
    const onDisconnectEmployee = async (userEmail) => {
        await disconnectUser({
            variables:{
                where: {
                    id: projectData.id
                },
                disconnect: {
                    employees: [{
                        where: {
                            node: {
                                email: userEmail
                            }
                        }
                    }]
                }
              }
        })
    }

    const onDisconnectClient = async (userEmail) => {
        await disconnectUser({
            variables:{
                where: {
                    id: projectData.id
                },
                disconnect: {
                    clients: [{
                        where: {
                            node: {
                                email: userEmail
                            }
                        }
                    }]
                }
              }
        })
    }

    const onDisconnectSkill = async (skill) => {
        await updateProject({
            variables:{
                where: {
                    id: projectData.id
                },
                disconnect: {
                    skills_required: [{
                        where: {
                            node: {
                                title: skill
                            }
                        }
                    }]
                }
              }
        })
    }

    useEffect(() => {
        const selectedEmployees = []
        projectData?.employees.forEach(user => {
            selectedEmployees.push(user)
        })
        setEmployees(selectedEmployees)

        const selectedClients = []
        projectData?.clients.forEach(user => {
            selectedClients.push(user)
        })
        setClients(selectedClients)

        const selectedSkills = []
        projectData?.skills_required.forEach(skill => {
            selectedSkills.push(skill)
        })
        setSkills(selectedSkills)
    },[])

    return (
        userLoading||skillLoading||updateLoading?(
            <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                <ScrollLoader />
            </div>
        ):( 
            <div className='w-full m-0 pb-4'>
                <div className='md:flex no-wrap'>
                    <div className='p-2 md:w-4/5 [&>*]:my-2'>
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
                            <br/>
                            <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                                {clients.map((user,index) => {
                                    return (
                                        <UserCardXs
                                            className={`mx-2 w-fit outline-none ring ring-violet-300`}
                                            key={`${index}-minicard-${user.first}`}
                                            user={user}
                                            onClick={()=>{
                                                setClients(clients.filter(item => {
                                                    return item.email!==user.email
                                                }))
                                                onDisconnectEmployee(user.email)
                                            }} 
                                        />
                                    )
                                })}
                            </div>
                            <SearchBarMd placeholder={"Search users.."} value={searchClients} onChange={(event)=>setSearchClients(event.target.value)}/>
                            <div className="flex max-w-full overflow-x-scroll pb-4">
                                {userData?.users
                                .filter(user => {
                                    return !(clients.filter(item => {return item.email===user.email}).length > 0)
                                })
                                .filter(user => {
                                    return user.first.toLowerCase().includes(searchClients.toLowerCase()) || user.last.toLowerCase().includes(searchClients.toLowerCase()) 
                                })
                                .map((user,index) => {
                                    return (    
                                        <UserCardXs
                                            className={`mx-2 w-fit`}
                                            key={`${index}-minicard-${user.first}`}
                                            user={user}
                                            onClick={()=>{
                                                setClients([...clients,user])
                                            }} 
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className={`rounded dark:bg-gray-900 bg-gray-400 p-2`}>
                            <Label>require skills</Label>
                            <br/>
                            <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                                {skills.map((skill,index) => {
                                    return (
                                        <SkillCardSm
                                            className={`mx-4 min-w-1/4 outline-none ring ring-violet-300`}
                                            key={`${index}-minicard-${skill.title}`}
                                            skill={skill}
                                            onClick={()=>{
                                                setSkills(skills.filter(item => {
                                                    return item.title!==skill.title
                                                }))
                                                onDisconnectSkill(skill.title)
                                            }} 
                                        />
                                    )
                                })}
                            </div>


                            <SearchBarMd placeholder={"Search skills.."} value={searchSkills} onChange={(event)=>setSearchSkills(event.target.value)}/>
                            <div className="flex max-w-full overflow-x-scroll pb-4">
                                {skillData?.skills
                                .filter(skill => {
                                    return !(skills.filter(item => {return item.title===skill.title}).length > 0)
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
                                                setSkills([...skills,skill])
                                            }} 
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className={`rounded dark:bg-gray-900 bg-gray-400 p-2`}>
                            <Label>attach employees</Label>
                            <br/>
                            <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                                {employees.map((user,index) => {
                                    return (
                                        <UserCardXs
                                            className={`mx-2 w-fit outline-none ring ring-violet-300`}
                                            key={`${index}-minicard-${user.first}`}
                                            user={user}
                                            onClick={()=>{
                                                setEmployees(employees.filter(item => {
                                                    return item.email!==user.email
                                                }))
                                                onDisconnectClient(user.email)
                                            }} 
                                        />
                                    )
                                })}
                            </div>

                            <SearchBarMd placeholder={"Search users.."} value={searchUsers} onChange={(event)=>setSearchUsers(event.target.value)}/>
                            <Label>Employees with Skills Required</Label>
                            <br/>
                            <br/>
                            <Label>Employees with Transferrable Skills</Label>
                            <br/>
                            <br/>
                            <div className="flex max-w-full overflow-x-scroll pb-4">
                                {userData?.users
                                .filter(user => {
                                    return !(employees.filter(item => {return item.email===user.email}).length > 0)
                                })
                                .filter(user => {
                                    return user.first.toLowerCase().includes(searchUsers.toLowerCase()) || user.last.toLowerCase().includes(searchUsers.toLowerCase()) 
                                })
                                .map((user,index) => {
                                    return (    
                                        <UserCardXs
                                            className={`mx-2 w-fit`}
                                            key={`${index}-minicard-${user.first}`}
                                            user={user}
                                            onClick={()=>{
                                                setEmployees([...employees,user])
                                            }} 
                                        />
                                    )
                                })}
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
export default ProjectEditor;