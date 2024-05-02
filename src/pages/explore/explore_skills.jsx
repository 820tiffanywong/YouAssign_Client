import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { CONNECT_USER_TO_SKILL } from "../../access/mutations/connect_user_to_skill";
import { CREATE_EVENT } from "../../access/mutations/create_event.mjs";
import { GET_CATEGORY } from "../../access/queries/get_category";
import { GET_SKILL } from "../../access/queries/get_skill";
import { GET_USER } from "../../access/queries/get_user";
import { explorePageItem, ExplorePageSkillNav } from "../../atoms";
import { SkillCardMd } from "../../components/custom.library";
import { ScrollLoader } from "../../components/prebuilt.library";
import ActivityGraph from "./graphs/activity_line_graph.component";
import PopularityChart from "./graphs/popularity_pie_chart.component";

import RatingsBarGraph from "./graphs/ratings_bar_graph.component";



const RenderVisual = ({visual}) => {

    if(visual === "ratings"){
        return <RatingsBarGraph />
    }
    else if(visual === "popularity"){
        return <PopularityChart />
    }
    else if(visual === "activity"){
        return <ActivityGraph />
    }
}

export const ExploreSkill = () => {
    const auth = getAuth()
    const [user, load_, err_] =  useAuthState(auth);

    const {data:userData} = useQuery(GET_USER,{
        variables:{
            where:{
                email:user?.email
            }
        }
    })

    const [item,setItem] = useRecoilState(explorePageItem)
    const {data,loading,error} = useQuery(GET_SKILL,
        {
            variables:{
                where:{
                    title:item.title
                }
            }
        }
    )

    const [addEvent] = useMutation(CREATE_EVENT)

    const [visual,setVisual] = useState('popularity')
    const [modal,setModal] = useState()
    const [modalLoad,setModalLoad] = useState()

    const [currentRating,setCurrentRating] = useState(0)
    const ratings = ['want to learn','beginner','intermediate','advanced','mastery/teacher']
    const [showcase,setShowcase] = useState()
    const [description,setDescription] = useState()

    const [connect,load,err] = useMutation(CONNECT_USER_TO_SKILL)

    return (
        loading||(!data?.skills)?(
            <div className='absolute h-screen w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                <ScrollLoader />
            </div>
        ):(
            <div className="relative">
                <div className="">
                    <div className="my-4 bg-gray-300 dark:bg-gray-500 rounded p-4">
                        <div className="flex">
                            <div>
                                <img 
                                    src={item.img_src} alt={item.title+' logo'}
                                    className='shadow bg-gray-900 p-4 rounded w-32 block'
                                />
                            </div>
                            <div className="pl-2 w-3/5">
                                <div>
                                    <p className="text-5xl font-light rounded dark:text-white">{data?.skills[0].title}</p>
                                    <p className="text-2xl rounded  text-gray-300 italic mt-4">{data?.skills[0].users.length} users with this skill</p>
                                </div>
                                    
                            </div>
                        </div>
                        <button 
                            className="rounded py-1 text-white bg-gray-400 font-bold border w-4/5 mx-auto block my-2"
                            onClick={() => {
                                setModal(true)
                            }}
                        >add skill to your profile</button>
                    </div>
                    <div className="mt-4 bg-gray-300 dark:bg-gray-500 rounded p-4 ">
                        <p className="font-light text-4xl dark:text-white">Description</p>
                        <p className="text-2xl text-gray-300 italic">{data?.skills[0].description}</p>
                    </div>
                </div>

                <div className="my-4 bg-gray-300 dark:bg-gray-500 rounded p-4 w-full">
                    <p className="font-light text-4xl dark:text-white mb-8">Users with this skill</p>
                    <div className="flex [&>*]:mx-2">
                        {data?.skills[0].users.map(user => {
                            return (
                                <div className="bg-gray-400 p-3 w-min rounded">
                                    <img src={user.img} className='w-16 rounded h-16 overflow-clip shrink-0 mx-auto' />
                                    <p className="text-white font-light whitespace-nowrap text-center">{user.first} {user.last}</p>
                                    <p className="text-white font-light whitespace-nowrap text-center">{user.slug}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="my-4 bg-gray-300 dark:bg-gray-500 rounded p-4 w-full md:mt-8">
                    <p className="font-light text-4xl dark:text-white">Skill Statistics</p>
                    <div className="flex bg-gray-600 my-2 rounded overflow-hidden">
                        <p 
                            className={"w-1/3 text-center uppercase dark:text-gray-200 cursor-pointer p-2 " + (visual==="popularity"?"bg-gray-300 text-gray-800 dark:text-gray-700":"")}
                            onClick={()=>{
                                setVisual("popularity")
                            }}
                        >
                            popularity
                        </p>
                        <p 
                            className={"w-1/3 text-center uppercase dark:text-gray-200 cursor-pointer p-2 " + (visual==="ratings"?"bg-gray-300 text-gray-800 dark:text-gray-700":"")}
                            onClick={()=>{
                                setVisual("ratings")
                            }}
                        >
                            ratings
                        </p>
                        <p 
                            className={"w-1/3 text-center uppercase dark:text-gray-200 cursor-pointer p-2 " + (visual==="activity"?"bg-gray-300 text-gray-800 dark:text-gray-700":"")}
                            onClick={()=>{
                                setVisual("activity")
                            }}
                        >
                            activity
                        </p>
                    </div>
                    {
                        <RenderVisual visual={visual}/>
                    }
                </div>
                {
                    modal?(
                        <div className="absolute top-2  bg-gray-900 w-full shadow-lg rounded p-8" >
                            <button
                                className="absolute top-2 right-2 rounded-full w-6 text-white border text-center hover:bg-gray-700"
                                onClick={()=>setModal(false)}
                            >
                                X
                            </button>
                            <p className="dark:text-white text-4xl font-light">Add {data?.skills[0].title} to your profile</p>
                            <p className="dark:text-gray-400 text-xl font-light italic">Rank yourself, Describe your Skill, and Add it to your profile</p>

                            <div className="mt-8">
                                <p className="dark:text-white text-3xl font-light">Rank your ability</p>≈
                                <div className="flex">
                                    <div 
                                        className={"cursor-pointer h-3 w-8 rounded mr-2 hover:bg-blue-300 transition-all "+(currentRating>0?"bg-blue-500":"bg-blue-100")}
                                        onClick={() => {
                                            setCurrentRating(1)
                                        }}
                                    ></div>
                                    <div 
                                        className={"cursor-pointer h-3 w-8 rounded mr-2 hover:bg-blue-300 transition-all "+(currentRating>1?"bg-blue-500":"bg-blue-100")}
                                        onClick={() => {
                                            setCurrentRating(2)
                                        }}
                                    ></div>
                                    <div 
                                        className={"cursor-pointer h-3 w-8 rounded mr-2 hover:bg-blue-300 transition-all "+(currentRating>2?"bg-blue-500":"bg-blue-100")}
                                        onClick={() => {
                                            setCurrentRating(3)
                                        }}
                                    ></div>
                                    <div 
                                        className={"cursor-pointer h-3 w-8 rounded mr-2 hover:bg-blue-300 transition-all "+(currentRating>3?"bg-blue-500":"bg-blue-100")}
                                        onClick={() => {
                                            setCurrentRating(4)
                                        }}
                                    ></div>
                                    <div 
                                        className={"cursor-pointer h-3 w-8 rounded mr-2 hover:bg-blue-300 transition-all "+(currentRating>4?"bg-blue-500":"bg-blue-100")}
                                        onClick={() => {
                                            setCurrentRating(5)
                                        }}
                                    ></div>
                                </div>
                                <p className="text-white italic my-auto">{ratings[currentRating-1]}</p>
                            </div>

                            <div className="mt-8">
                                <p className="dark:text-white text-3xl font-light">Describe your ability</p>
                                <textarea 
                                    className="w-full border bg-transparent p-2 text-lg font-light rounded text-white"
                                    placeholder="Describe your past work..."
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                            </div>

                            <div className="mt-8 flex ">
                                <p className="dark:text-white text-3xl font-light">Showcase this skill?</p>
                                <div className="flex rounded ml-2 overflow-hidden cursor-pointer">
                                    <p 
                                        className={"text-white p-2 "+(showcase?"bg-gray-500":"bg-gray-400 text-gray-500")}
                                        onClick={()=>setShowcase(true)}
                                    >yes</p>
                                    <p 
                                        className={"text-white p-2 "+(showcase?"bg-gray-400 text-gray-500":"bg-gray-500")}
                                        onClick={()=>setShowcase(false)}
                                    >no</p>
                                </div>
                            </div>
                            <p className="dark:text-gray-400 text-xl font-light italic">Showcasing a skill lets others know its one of your top abilities</p>

                            <button 
                                className="mt-8 text-white float-right bg-gray-600 p-3 rounded hover:bg-gray-500"
                                onClick={async () => {

                                    await connect(
                                        {
                                            variables:{
                                                where: {
                                                    email: user?.email
                                                },
                                                connect: {
                                                    skills: [
                                                    {
                                                        where: {
                                                            node: {
                                                                title: item.title
                                                            }
                                                        },
                                                        edge: {
                                                            rating: currentRating,
                                                            description: description,
                                                            isShowcased: showcase
                                                    }
                                                    }
                                                ]
                                                }
                                            },
                                            refetchQueries:[GET_SKILL]
                                        }
                                    )

                                    await addEvent({
                                        variables:{
                                            input: [
                                                {
                                                    date: (new Date()).toDateString(),
                                                    topic: "aquired_skill",
                                                    description: `${userData?.users[0].first} ${userData?.users[0].last} expanded their skills! They added the skill ${item.title} to their profile.`
                                                } 
                                            ]
                                          }
                                    })
                                    setModal(false)
                                }}
                            >Add to Profile</button>
                        </div>
                    ):(
                        <></>
                    )
                }
            </div>
        )
    )
}


export const ExploreCategory = () => {
    const [item,setItem] = useRecoilState(explorePageItem)
    const users = {}

    return (
        <>
            <div className="md:flex my-4">
                <div className={"my-4 rounded p-4 md:w-1/2 " + item.data.color}>
                        <p className="text-4xl font-light rounded p-1 text-white whitespace-nowrap flex justify-between">{item.data.title} Skills</p>
                        <p className="text-xl rounded p-1 text-gray-300 my-2 whitespace-nowrap flex justify-between italic">{item.data.skills.length} skills in this category</p>
                </div>
                <div className="my-4 bg-gray-500 rounded p-4 md:w-1/2 md:ml-8">
                    <p className="font-light text-4xl text-white">Description</p>
                    <p className="text-2xl text-gray-300 italic">{item.description}</p>
                </div>
            </div>

            <div className="my-4 bg-gray-500 rounded p-4 w-full mt-8">
                <p className="font-light text-4xl text-white">Skills in this category</p>
                <div className="md:flex flex-wrap py-4">
                    {   
                        item.data.skills.map(skill => {
                            skill.users.forEach(user => {
                                users[user.email] = user
                            })

                            return (
                                <div className="rounded bg-gray-700 flex flex-col justify-between p-3 mr-4 min-w-1/6">
                                    <img
                                        className="w-12 mx-auto" 
                                        src={skill.img_src} alt={skill.title}
                                    />
                                    <p className="font-bold text-white text-center">{skill.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="my-4 bg-gray-500 rounded p-4 w-full mt-8">
                <p className="font-light text-4xl text-white">Users with skills in {item.data.title}</p>
                <div className="md:flex flex-wrap py-4">
                    {
                        Object.entries(users).map(user => {
                            return (
                                <div className="bg-gray-400 p-3 w-min rounded">
                                    <img src={user[1].img} className='w-16 rounded h-16 overflow-clip shrink-0 mx-auto' />
                                    <p className="text-white font-light whitespace-nowrap text-center">{user[1].first} {user[1].last}</p>
                                    <p className="text-white font-light whitespace-nowrap text-center">{user[1].slug}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}





const SkillCard = ({ skill }) => {
    const [item,setItem] = useRecoilState(explorePageItem)

    return (
        <>
            <div 
                className="group rounded dark:bg-gray-800 bg-gray-300 p-2 w-4/5 md:w-2/5 hover:scale-105 transform mx-auto my-2 flex cursor-pointer transition-all min-w-[300px]"
                onClick={() => {
                    setItem(skill)
                }}
            >
                <img 
                    src={(skill.img_src ? skill.img_src : "https://via.placeholder.com/50x50")} 
                    className="shrink-0 w-10 transform group-hover:scale-110"
                />
                <div className="ml-2">
                    <p className="dark:text-gray-300 text-xl  group-hover:text-blue-400 transform transition-all">{skill.title}</p>
                    <p className="dark:text-gray-300 group-hover:font-bold transition-all"></p>
                </div>
            </div>
        </>
    )
}

const CategoryCard = ({ category }) => {
    const [item,setItem] = useRecoilState(explorePageItem)

    return (
        <>
            <div 
                className={"group rounded p-2 w-4/5 transform md:w-2/5 hover:scale-105 mx-auto my-2 cursor-pointer transition-all " + category.color}
                onClick={() => {
                    setItem({
                        category:true,
                        data:category
                    
                    })
                }}
            >
                <div className="ml-2">
                    <p className="text-gray-300 font-normal font-bold group-hover:text-gray-400 transition-all text-xl ">{category.title}</p>
                    <p className="text-gray-300 group-hover:font-bold transition-all">{category.skillsAggregate.count} skills in this category</p>
                </div>
            </div>
        </>
    )
}


const SkillList = ({search_key}) => {
    const {data,loading,error} = useQuery(GET_SKILL)
    const [search,setSearch] = useState("")
    const [item,setItem] = useRecoilState(explorePageItem)

    return (
        <>
            <div className="my-4 p-3 text-2xl w-full rounded-lg dark:bg-gray-800 bg-gray-200">
                <input 
                    className="dark:text-white text-black w-3/5 p-1 border-2 shadow dark:border-gray-500 rounded bg-transparent" 
                    placeholder="Search skills..."
                    onChange={(event) => setSearch(event.target.value)}    
                />
            </div>
            <div className="flex flex-wrap flex-row">
                {
                    data?.skills.filter(skill =>{
                        return skill.title.toLowerCase().includes(search)
                    }).map((skill,index) => {
                        return(
                            <SkillCardMd 
                                key={'skill-'+skill.title+'-'+index}
                                skill={skill} 
                                onClick={() => {
                                    setItem(skill)
                                }}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

const CetegoryList = ({search_key}) => {
    const {data,loading,error} = useQuery(GET_CATEGORY)
    const [search,setSearch] = useState("")
    return (
        <>
            <div className="my-4 p-3 text-2xl w-full rounded-lg dark:bg-gray-800 bg-gray-200">
                <input 
                    className="dark:text-white text-black w-3/5 p-1 border-2 shadow dark:border-gray-500 rounded bg-transparent" 
                    placeholder="Search categories..."
                    onChange={(event) => setSearch(event.target.value)}    
                />
            </div>
            <div className="flex flex-wrap">
                {
                    data?.categories.filter(category => {
                        return category.title.toLowerCase().includes(search.toLowerCase())
                    }).map((category,index) => {
                        return(
                            <CategoryCard category={category} key={'category-'+category.title+'-'+index} />
                        )
                    })
                }
            </div>
        </>
    )
}

const ExploreSkills = () => {
    const [pageState,setPageState] = useRecoilState(ExplorePageSkillNav)

    return(
        <div>
            <div className="dark:bg-gray-800 bg-gray-300 rounded w-full rounded-lg overflow-hidden cursor-pointer my-4">
                <div className="flex no-wrap w-full">
                    <p 
                        className={"font-bold uppercase dark:text-gray-300 w-1/2 p-4 text-center transition-all " + (pageState === "skills" ? "dark:bg-gray-500 bg-gray-200" : "text-gray-400")}
                        onClick={() => {
                            setPageState("skills")
                        }}
                    >
                        skills
                    </p>
                    <p 
                        className={"font-bold uppercase dark:text-gray-300 w-1/2 p-4 text-center transition-all " + (pageState === "categories" ?  "dark:bg-gray-500 bg-gray-200" : "text-gray-400")}
                        onClick={() => {
                            setPageState("categories")
                        }}
                    >
                        categories
                    </p>
                </div>
            </div>
            {
                pageState==="skills"?
                (
                    <SkillList />
                ):
                (
                    <CetegoryList />
                )
            }
        </div>
    )
}

export default ExploreSkills