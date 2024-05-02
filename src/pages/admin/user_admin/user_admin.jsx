import { useQuery, useMutation } from "@apollo/client"
import { GET_USER } from "../../../access/queries/get_user"
import { UPDATE_USER } from "../../../access/mutations/update_user"
import { useState } from "react"
import UserCard, { UserEditor } from "./user_editor"
import { SearchBarLg, UserCardMd } from "../../../components/custom.library"
import { ScrollLoader } from "../../../components/prebuilt.library"
import { Icon } from "@iconify/react"

/**
 * @returns 
 * @depracated no longer in use - switched to scroll loader temporarily
 */
const LoadingUserCard = () => {
    return (
        <div 
            className="group rounded dark:bg-gray-800 bg-gray-300 p-2 w-2/5 hover:w-5/12 mx-auto my-2 flex cursor-pointer transition-all"
        >
            <div 
                className="mr-3 h-12 w-12 rounded-full bg-cover bg-center bg-gray-300 animate-pulse"
            >
            </div>
            <div className="ml-1">
                <div className="dark:bg-gray-300 font-normal group-hover:font-extrabold group-hover:text-gray-600 transition-all w-36 rounded h-4 animate-pulse"></div>
                <div className="dark:bg-gray-300 group-hover:font-bold transition-all w-20 mt-2 rounded h-4 animate-pulse"></div>
            </div>
        </div>
    )
}


const UserAdmin = () => {
    const { data, loading, error } = useQuery(GET_USER)
    const [search,setSearch] = useState("")
    const [modal,setModal] = useState()

    return (
        <div className="w-full relative">
            {loading?(
                <div className='absolute h-screen w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                    <ScrollLoader />
                </div>
            ):(
                modal ?(
                    <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 z-50'>
                        <button
                            className="group w-min dark:text-gray-100 flex"
                            onClick={() => {
                                setModal(false)
                            }}
                        >
                            <Icon icon="carbon:drill-back" width="30" />
                            <p className={`group-hover:w-14 w-0 overflow-hidden transition-all whitespace-nowrap`}>go back</p>
                        </button>
                        <UserEditor user_email={modal} />
                    </div>
                ):(
                    <>
                        <SearchBarLg
                            placeholder={"search users.."}
                            onChange={(event) => setSearch(event.target.value)}
                        >
                        </SearchBarLg>
    
                        <div className=" md:flex flex-wrap">
                            {
                                data?.users.filter(user => {
                                    return user.first.includes(search) || user.last.includes(search)
                                }).map((user,index) => {
                                    return (
                                        <UserCardMd 
                                            key={user.slug + "-" + index} 
                                            user={user} 
                                            className='md:w-2/5 mx-auto'
                                            onClick={()=>{
                                                setModal(user.email)
                                            }}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                )
            )}
        </div>
    )
}
export default UserAdmin