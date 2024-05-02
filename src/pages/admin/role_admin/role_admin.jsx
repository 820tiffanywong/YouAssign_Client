import { useQuery, useMutation } from "@apollo/client"
import { GET_USER } from "../../../access/queries/get_user"
import { useState } from "react"
import { BackButton, PermissionCardMd, RoleCardMd, SearchBarLg, TabToggleBarLg, UserCardMd } from "../../../components/custom.library"
import { Button, ScrollLoader } from "../../../components/prebuilt.library"
import { Icon } from "@iconify/react"
import { rolePageState } from "../../../atoms"
import { GET_PERMISSIONS } from "../../../access/queries/get_permissions"
import { GET_ROLES } from "../../../access/queries/get_roles"
import { useRecoilState } from "recoil"
import { PermissionCreator } from "./permissions/permissions_creator"
import { PermissionEditor } from "./permissions/permission_editor"
import { RoleCreator } from "./roles/role_creator"
import { RoleEditor } from "./roles/role_editor"



const RoleAdmin = () => {
    const { data:permissionData, loading:permissionsLoading, error:permissionsError } = useQuery(GET_PERMISSIONS)
    const { data:roleData, loading:rolesLoading, error:rolesError } = useQuery(GET_ROLES)
    const [search,setSearch] = useState("")
    const [modal,setModal] = useState()

    const [tab,setTab] = useRecoilState(rolePageState)

    return (
        <div className="w-full relative">
            {permissionsLoading||rolesLoading?(
                <div className='absolute h-screen w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                    <ScrollLoader />
                </div>
            ):(
                <>
                    {modal==="create-permissions"?(
                        <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4  group-hover:block">
                            <BackButton 
                                onClick={() => {
                                    setModal(false)
                                }}
                            />  
                            <PermissionCreator />
                        </div>  
                    ):(<></>)}
                    {modal==="create-roles"?(
                        <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4  group-hover:block">
                            <BackButton 
                                onClick={() => {
                                    setModal(false)
                                }}
                            />  
                            <RoleCreator />
                        </div>  
                    ):(<></>)}
                    {modal&&modal!=="create-roles"&&modal!=="create-permissions"?(
                        <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4 group-hover:block">
                            <BackButton 
                                onClick={() => {
                                    setModal(false)
                                }}
                            />
                            {
                                modal.type==="permission"?(
                                    <PermissionEditor permission={modal.data} />
                                ):(
                                    <RoleEditor role={modal.data} />                                    
                                )
                            }
                        </div>
                    ):(<></>)}
                    {!modal ?(
                        <>
                            <TabToggleBarLg
                                tabs={['roles','permissions']}
                                tabState={rolePageState}
                            />
                            <SearchBarLg
                                placeholder={`search ${tab}..`}
                                onChange={(event) => setSearch(event.target.value)}
                            >
                                <Button
                                    onClick={()=>{
                                        setModal(`create-${tab}`)
                                    }}
                                >
                                    add new
                                </Button>
                            </SearchBarLg>
        
                            <div className="md:flex flex-wrap">
                                {tab==='permissions'?(
                                    permissionData?.permissions.filter(permission => {
                                        return permission.name.includes(search) 
                                    }).map((permission,index) => {
                                        return (
                                            <PermissionCardMd 
                                                key={`${permission.name}-${index}`}
                                                className={``}
                                                permission={permission}
                                                onClick={() => {
                                                    setModal({
                                                        type:'permission',
                                                        data:permission
                                                    })
                                                }}
                                            />
                                        )
                                    })
                                ):(
                                    roleData?.roles.filter(role => {
                                        return role.title.includes(search) 
                                    }).map((role,index) => {
                                        return (
                                            <RoleCardMd 
                                                key={`role-${index}`}
                                                role={role}
                                                onClick={() => {
                                                    setModal({
                                                        type:'role',
                                                        data:role
                                                    })
                                                }}
                                            />
                                        )
                                    })
                                )}
                            </div>
                        </>
                    ):(<></>)}
                </>
            )}
        </div>
    )
}
export default RoleAdmin