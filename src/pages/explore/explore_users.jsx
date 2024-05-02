import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { GET_USER } from "../../access/queries/get_user"
import { explorePageItem, explorePageSection } from "../../atoms"
import { SearchBarLg, SearchBarSm, UserCardMd } from "../../components/custom.library"
import Profile from "../profile/profile"





const ExploreUsers = () => {
    const {data,error,loading} = useQuery(GET_USER)

    const [item,setItem] = useRecoilState(explorePageItem)
    const [search,setSearch] = useState("")

    return (
        <div className="px-2">
            <SearchBarSm
                placeholder="Search users..."
                className={`w-full [&>*]:w-full bg-gray-900`}
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
            ></SearchBarSm>

            <div className="">
                {
                    data?.users.filter(user => {
                        return user.first.toLowerCase().includes(search.toLowerCase()) || user.last.toLowerCase().includes(search.toLowerCase())
                    }).map((user,index) => {
                        return (
                            <UserCardMd 
                                key={'user-card-'+index+user.slug} 
                                user={user} 
                                className='mx-auto w-full'
                                onClick={() => {
                                    setItem(user)
                                }}  
                            />
                        )
                    })
                }    
            </div>     
        </div>
    )
}

export default ExploreUsers