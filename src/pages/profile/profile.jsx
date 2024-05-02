import {  useQuery } from "@apollo/client";
import { GET_USER } from "../../access/queries/get_user";
import { profilePageState } from "../../atoms"
import { useRecoilState } from "recoil"
import ProfileSkills from "./profile_skills";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import classNames from "classnames";
import { Label, PageHeader, Title, TitleLg, TitleMd, TitleSm, TitleXl, Wrapper } from "../../components/prebuilt.library";
import { ProjectCardLg, ProjectCardMd } from "../../components/custom.library";


const ProfileContent = ({user}) => {
    const [pageState,setPageState] = useRecoilState(profilePageState)
    const {data} = useQuery(GET_USER,{
        variables:{
            where:{
                email:user   
            }
        }
    })

    if(pageState === "skills"){
        return (
            <ProfileSkills data={data}/>
        )
    }
    else if(pageState === "projects"){
        return (
            <div>
                {data?.users[0].projects.length ? (
                    data?.users[0].projects.map((project,index) => {
                        return (
                            <ProjectCardLg
                                key={`${index}-project`}
                                project={project}
                            />
                        )
                    })
                ):(
                    <p className="mb-10 italic text-gray-500 text-center text-xl">user has no listed projects</p>
                )}
            </div>
        )
    }
    else{
        return (
            <div>
                stats
            </div>
        )
    }
}


const Profile = ({user_email}) => {
    const auth = getAuth()
    const [user] = useAuthState(auth);
    const { data, loading, error } = useQuery(GET_USER,{
        variables: {
            "where":{
                "email": user_email?user_email:user?.email
            }
        }
    });

    const [pageState,setPageState] = useRecoilState(profilePageState)
    const tabs = ['skills','projects','stats']

    return (
        <>
            <PageHeader>
                {data?(
                    <>
                        {data?.users[0].first} {data?.users[0].last}'s Profile
                    </>
                ):(<></>)}
            </PageHeader>

            <Wrapper className="bg-graph">
                <div className="w-full mt-10">
                    <div className="w-full pt-8">
                        <div className="dark:bg-gray-800 bg-gray-400 p-4 ">
                            <div className="-mt-12 flex">
                                <img 
                                    src={data?.users[0].img ? data?.users[0].img : "https://via.placeholder.com/50x50"} 
                                    alt="user profile pic" 
                                    className="rounded-full md:w-1/12 mr-2"    
                                />
                                <TitleXl>{data?.users[0].first} {data?.users[0].last}</TitleXl>
                            </div>
                            <div className="p-4">
                                <div className="md:flex justify-between p-2 border rounded-t">
                                    <Label>Company</Label>
                                    <TitleSm>{data?.users[0].companies[0] ? (data?.users[0].companies[0]?.name) : ("null")}</TitleSm>
                                </div>
                                <div className="md:flex justify-between p-2 border rounded-b">
                                    <Label>Position</Label>
                                    <TitleSm>{data?.users[0].position ? (data?.users[0].position) : ("null")}</TitleSm>
                                </div>
                            </div>
                        </div>
                        <div className="dark:bg-gray-800 bg-gray-400 mt-8 p-4 rounded-b-lg">
                            <TitleLg>Bio</TitleLg>
                            <p className="dark:text-gray-300 font-bold pt-4 text-lg">{data?.users[0].bio}</p>
                        </div>
                    </div>
                </div>
            </Wrapper>

            <Wrapper className="bg-graph mt-10">
                <Wrapper className="bg-gray-400 dark:bg-gray-800 mb-4 -mt-8 w-[90%] mx-auto p-2">
                    <TitleLg>Showcased Skills</TitleLg>
                    <div className="w-full flex flex-wrap">
                        {data?.users[0].skillsConnection.edges.map((skill,index) => {
                            if(skill.isShowcased){
                                return (
                                    <div key={`showcase-${skill.node.title,index}`} className="flex flex-row shadow-gray-900 shadow-lg rounded mx-auto  p-2 my-2">
                                        <img src={skill.node.img_src} className="w-10 block mr-4"/>
                                        <div>
                                            <p className="text-white font-light">{skill.node.title}</p>
                                            <div className="flex">
                                                <p className="my-auto pr-1 italic text-gray-500">rating: </p>
                                                <div className={`my-auto h-3 w-3 md:w-8 rounded mr-2 transition-all ${classNames((skill.rating>0)?"bg-blue-500":"bg-blue-100")} `}></div>
                                                <div className={`my-auto h-3 w-3 md:w-8 rounded mr-2 transition-all ${classNames((skill.rating>1)?"bg-blue-500":"bg-blue-100")} `}></div>
                                                <div className={`my-auto h-3 w-3 md:w-8 rounded mr-2 transition-all ${classNames((skill.rating>2)?"bg-blue-500":"bg-blue-100")} `}></div>
                                                <div className={`my-auto h-3 w-3 md:w-8 rounded mr-2 transition-all ${classNames((skill.rating>3)?"bg-blue-500":"bg-blue-100")} `}></div>
                                                <div className={`my-auto h-3 w-3 md:w-8 rounded mr-2 transition-all ${classNames((skill.rating>4)?"bg-blue-500":"bg-blue-100")} `}></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </Wrapper>
            </Wrapper>

            

            <br/>
            <div className="dark:bg-gray-800 bg-gray-400 w-full rounded-lg cursor-pointer shadow-gray-800 shadow-lg">
                <div className="flex no-wrap w-full">
                    {tabs.map((tab,index) => {
                        return (
                            <p 
                                key={`tab-${index}`}
                                className={`rounded-lg font-bold uppercase dark:text-gray-300 w-1/3 p-4 text-center ${classNames({"dark:bg-gray-500 bg-gray-300" : (pageState === tab)})}`}
                                onClick={() => {
                                    setPageState(tab)
                                }}
                            >{tab}</p>
                        )
                    })}
                </div>
            </div>
            <br/>
            <ProfileContent user={user_email?user_email:user?.email}/>
        </>
    )
}


export default Profile;
