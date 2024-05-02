import { useRecoilState } from "recoil";
import { explorePageItem, explorePageSection } from "../../atoms";
import { IconButton } from "../../components/custom.library";
import { PageHeader } from "../../components/prebuilt.library";
import Profile from "../profile/profile";
import ExploreProjects, { ExploreProject } from "./explore_projects";
import ExploreSkills, { ExploreCategory, ExploreSkill } from "./explore_skills";
import ExploreUsers from "./explore_users";
import {explorePageTabs} from '../../manifest.jsx'
import { GET_USER } from "../../access/queries/get_user";
import { useQuery } from "@apollo/client";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ExploreClients, { ExploreCLient } from "./explore_clients";


const RenderExploreContent = () =>{
    const [section,setSection] = useRecoilState(explorePageSection)
    const [item,setItem] = useRecoilState(explorePageItem)
    const auth = getAuth()
    const [user] = useAuthState(auth);
    const {data} = useQuery(GET_USER,{
		variables:{
			where:{
				email:user?.email
			}
		}
	})

    return(
        <div className="py-6 flex h-full overflow-y-hidden">
            <div className="w-1/6 min-w-[160px] ml-1">
                {explorePageTabs.map(tab => {
                    if(data?.users[0].roles.filter(role => {
                        return(
                            role.permissions.filter(permission => {
                                return (permission.resource === tab.name && permission.access.includes("R"))
                            }).length > 0
                        )
                    }).length > 0){
                        return (
                            <IconButton
                                className={`hover:bg-gray-400 transition-all ${(tab.name===section?' bg-gray-900 ':'')}`}
                                icon={tab.icon}
                                onClick={() => {
                                    setSection(tab.name)
                                    setItem()
                                }}
                            >
                                {tab.name}
                            </IconButton>
                        )
                    }
                })}
            </div>

            <div className="w-2/6 h-full pb-24 px-4 overflow-y-scroll">
                <RenderExploreSection section={section}/>
            </div>
            <div className="w-1/2 h-full pb-24 overflow-y-scroll">
                {section && item && <RenderExploreItem section={section} item={item} />}
            </div>
        </div>
    )
}


const RenderExploreSection = ({section})  => {
    if(section === "users"){
        return (
            <ExploreUsers />
        )
    }
    else if(section === "skills"){
        return (
            <ExploreSkills />
        )
    }
    else if(section === "clients"){
        return (
            <ExploreClients />
        )
    }
    else if(section === "projects"){
        return (
            <ExploreProjects />
        )
    }

}

const RenderExploreItem = ({section, item}) => {

    if(section === "users"){
        return (
            <Profile user_email={item.email}/>
        )
    }
    else if(section === "skills"){
        if(item.category){
            return (
                <ExploreCategory />
            )
        }
        return (
            <ExploreSkill />
        )
    }
    else if(section === "clients"){
        return (
            <ExploreCLient />
        )
    }
    else if(section === "projects"){
        return (
            <ExploreProject />
        )
    }
}

const Explore = () => {
    return (
        <div className="h-full overflow-hidden">
            <PageHeader>
                Explore
            </PageHeader>
            <RenderExploreContent />
        </div>
    )
}
export default Explore;