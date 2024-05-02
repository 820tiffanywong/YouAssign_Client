
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TIMESTAMP } from '../../access/queries/get_timestamps.mjs';
import { CREATE_TIMESTAMP } from '../../access/mutations/create_timestamp.mjs';
import { GET_USER } from '../../access/queries/get_user';
import { ProjectCardSm } from '../../components/custom.library';
import { UPDATE_TIMESTAMP } from '../../access/mutations/update_timestamp.mjs';
import { Button, Label, PageHeader, ScrollLoader, SubTitle, TitleMd } from '../../components/prebuilt.library.jsx';
import { useState } from 'react';


const TimeEntry = ({timestamp}) => { 
    const [hours,setHours] = useState(timestamp.hours_logged)
    const [description,setDescription] = useState(timestamp.description)

    const [update,{loading,error}] = useMutation(UPDATE_TIMESTAMP)

    const onUpdate = async () => {
        const out = await update({
            variables:{
                where: {
                    id: timestamp.id
                },
                update: {
                    hours_logged: parseFloat(hours),
                    description: description
                }
            },
            refetchQueries:[GET_TIMESTAMP]
        })
    }

    const updates = (description!==timestamp.description) || (timestamp.hours_logged!==hours)
    
    return (
        <div className='rounded bg-gray-300 w-full p-2 my-4 relative'>
            {loading?(
                <div className='bg-gray-300 w-full h-full absolute top-0 right-0'>
                    <div className="my-8">
                        <ScrollLoader  />
                    </div>
                </div>
            ):(<></>)}
            <p className='text-xl'>{timestamp.project.title}</p>
            <div className="flex">
                <p className='my-auto'>Hours Logged:</p>
                <input className='ml-2 w-min rounded outline-none p-1 text-center [&>*]:opacity-100' type="number" defaultValue="0" max="10" min="0" value={hours} onChange={(e)=>setHours(e.target.value)}/>
            </div>
            <textarea 
                className='w-full shadow rounded bg-transparent text-gray-500'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />
            <div className={`transition-all overflow-hidden ${updates?"h-10":"h-0"}`}>
                <button onClick={onUpdate} className="bg-gray-500 text-white rounded mx-auto block p-1 hover:bg-gray-600 transition-all my-auto">update</button>
            </div>
        </div>
    )
}


const HourLogger = () => {
    const auth = getAuth()
    const [authUser] = useAuthState(auth);

    const [modal,setModal] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [description,setDescription] = useState()
    const [hours,setHours] = useState(0)
    const [selectedProject,setProject] = useState()


    const dateParts = selectedDate.toISOString().split('T')[0].split('-')
    const currentDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;

    const {data:timestampData,loading:timestampsLoading} = useQuery(GET_TIMESTAMP,{
        variables:{
            where: {
                user: {
                  email: authUser?.email
                },
                date: currentDate
            }
        }
    })

    const {data,loading} = useQuery(GET_USER,{
        variables:{
            where: {
                email: authUser?.email
            }
        }
    })

    const [addTimestamp,{loading:addLoading}] = useMutation(CREATE_TIMESTAMP)

    const onAdd = async () => {   
        await addTimestamp({
            variables:{
                input: [
                  {
                    date: currentDate,
                    hours_logged: parseFloat(hours),
                    description: description,
                    user: {
                      connect: {
                        where: {
                          node: {
                            email: authUser?.email
                          }
                        }
                      }
                    },
                    project: {
                      connect: {
                        where: {
                          node: {
                            id: selectedProject
                          }
                        }
                      }
                    }
                  }
                ]
              },
              refetchQueries:[GET_TIMESTAMP]
        })
        setModal()
    }   

    let totalHours = 0;

    timestampData?.timestamps.map(time => totalHours+=parseFloat(time.hours_logged))


    return(
        <div className='bg-gray-800 rounded p-4 flex justify-between relative'>
            {modal?(
                <div className='z-50 rounded w-full h-fit absolute bg-gray-800 top-0 left-0 p-8'>
                    <TitleMd>Enter a Timestamp</TitleMd>
                    <SubTitle>Record a timestamp relative to work completed on a project</SubTitle>
                    <br/>

                    <Label>Select a project</Label>
                    <div className='flex'>
                        {data?.users[0].projects.map((project,index) => {
                            return( 
                                <ProjectCardSm 
                                    project={project}  
                                    className={`${((project.id===selectedProject)?"border-2 border-blue-600":"")}`}
                                    onClick={()=>setProject(project.id)}
                                />
                            )
                        })}
                    </div>
                    <br/>

                    <div>
                        <Label>Hours Worked</Label>
                        <input className='ml-2 w-min rounded outline-none p-1 text-center [&>*]:opacity-100' type="number" max="10" min="0" value={hours} onChange={(e)=>setHours(e.target.value)}/>
                    </div>
                    <br/>


                    <div className='flex flex-col'>
                        <Label>Description</Label>

                        <textarea className='w-1/2 rounded outline-none p-1 [&>*]:opacity-100' placeholder='Description of work completed' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>

                    <Button className="my-8 mx-auto block hover:dark:bg-gray-600 transition-all p-3" onClick={onAdd}>Confirm Entry</Button>

                </div>
            ):(<></>)}
            <div className='bg-white rounded-xl h-min'>
                <div>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        footer={<></>}
                    />
                </div>
            </div>
            <div className='px-4 max-h-96 overflow-y-scroll'>
                <TitleMd className="whitespace-nowrap">Hours logged for {currentDate}</TitleMd>
                <button 
                    className='w-full mt-1 bg-gray-300 hover:border-blue-400 rounded border-2 border-transparent '
                    onClick={()=>{setModal(true)}}
                >Add Time Entry</button>
                {timestampData?.timestamps.map((timestamp,index) => {
                    return (
                        <TimeEntry
                            timestamp={timestamp}
                            project={timestamp.project}
                            hours_worked={timestamp.hours_logged}
                            init_description={timestamp.description}
                        />
                    )
                })}
            </div>

            <div className='px-4 border-l'>
                <TitleMd>Workload Statistics</TitleMd>

                <p className='text-white font-bold my-2'>hours worked: {totalHours}</p>
                <p className='text-white font-bold my-2'>number of projects: 1</p>
            </div>
        </div>
    )
}


const Payroll = () => {
    return (
    <div>
        <PageHeader>
            Payroll
        </PageHeader>

        <HourLogger />
        <br/>
    </div>
    )
}
export default Payroll