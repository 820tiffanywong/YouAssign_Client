import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { CREATE_PERMISSION } from "../../../../access/mutations/create_permission"
import { CREATE_ROLE } from "../../../../access/mutations/create_role"
import { DISCONNECT_PERMISSION } from "../../../../access/mutations/disconnect_permission_from_role"
import { DISCONNECT_ROLE } from "../../../../access/mutations/disconnect_user_from_role"
import { UPDATE_ROLE } from "../../../../access/mutations/update_role"
import { GET_PERMISSIONS } from "../../../../access/queries/get_permissions"
import { GET_ROLES } from "../../../../access/queries/get_roles"
import { GET_SKILL } from "../../../../access/queries/get_skill"
import { GET_USER } from "../../../../access/queries/get_user"
import { SearchBarMd, UserCardXs } from "../../../../components/custom.library"
import { Label, LabeledInput, RadioButton, ScrollLoader, Select, SubText } from "../../../../components/prebuilt.library"


export const RoleEditor = ({role}) => {
    const [name, setName] = useState(role.title) 
    const [permissions,setPermissions] = useState([])
    const [users,setUsers] = useState([])
    
    const [searchUsers,setSearchUsers] = useState("")
    const [searchPermissions,setSearchPermissions] = useState("")
    
    const {data:queryData,loading:queryLoading,error:queryError} = useQuery(GET_PERMISSIONS)
    const {data:userData,loading:userLoading,error:userError} = useQuery(GET_USER)
    const [updateRole,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(UPDATE_ROLE)
    const [disconnectPermission,{ data:disconnectPermissionData, loading:disconnectPermissionLoading, error:disconnectPermissionError } ]= useMutation(DISCONNECT_PERMISSION)
    const [disconnectUser,{ data:disconnectData, loading:disconnectLoading, error:disconnectError } ]= useMutation(DISCONNECT_ROLE)

    const onDisconnect = async (user) => {
        await disconnectUser({
            variables:{
                disconnect: {
                    roles: [{
                        where: {
                            node: {
                                title: name
                            }
                        }
                    }]
                },
                where: {
                  email: user
                }
            },
            refetchQueries:[GET_USER,GET_ROLES]
        })
    }

    const onDisconnectPermission = async (permission) => {
        await disconnectPermission({
            variables:{
                where: {
                    title: name
                },
                disconnect: {
                    permissions: [
                        {
                            where: {
                                node: {
                                    id: permission
                                }
                            }
                        }
                    ]
                }
            },
            refetchQueries:[GET_USER,GET_ROLES]
        })
    }

    const onUpdate = async () => {
        await updateRole({
            variables:{
                where: {
                  title: name
                },
                update: {
                    title: name,
                    permissions: [{
                        connect: [{
                            where: {
                                node: {
                                    name_IN: permissions
                                }
                            }
                        }]
                    }],
                    users: [{
                      connect: [
                        {
                          where: {
                            node: {
                              email_IN: users.map(user => {return user.email})
                            }
                          }
                        }
                      ]
                    }]
                }
            },
            refetchQueries:[GET_ROLES]
        })
    }

    useEffect(() => {
        const selectedPermissions = []
        role?.permissions.forEach(permission => {
            selectedPermissions.push(permission.name)
        })
        setPermissions(selectedPermissions)

        const selectedUsers = []
        role?.users.forEach(user => {
            selectedUsers.push(user)
        })
        setUsers(selectedUsers)
    },[])



    return (
        updateLoading||userLoading?(
            <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                <ScrollLoader />
            </div>
        ):( 
            <div className='w-full m-0'>
                <div className='md:flex no-wrap'>
                    <div className='p-2 [&>*]:my-2 w-full'>
                        <LabeledInput
                            className={`dark:bg-gray-900 bg-gray-400`}
                            value={name}
                            onChange={(event)=>setName(event.target.value)}
                        >
                            Role name
                        </LabeledInput>
                        <div className={`rounded dark:bg-gray-900 bg-gray-400 p-2  flex flex-col`}>
                            <Label>attach permissions</Label>
                            <SubText>click a permission to add</SubText>
                            <br/>

                            <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                                {permissions.map((permission,index) => {
                                    return (
                                        <RadioButton 
                                            key={`${permission}-${index}`} 
                                            state={true} 
                                            className="w-min"
                                            onClick={() => {
                                                setPermissions(permissions.filter(item => {return !(item === permission)}))
                                                onDisconnectPermission(permission.id)
                                            }}
                                        >
                                            {permission}
                                        </RadioButton>
                                    )
                                })}
                            </div>

                            <SearchBarMd placeholder={"Search permissions.."} value={searchPermissions} onChange={(event)=>setSearchPermissions(event.target.value)}/>
                            
                            <div className="flex max-w-full overflow-x-scroll pb-4">
                                {queryData?.permissions.filter(permission => {
                                    return !permissions.includes(permission.name)
                                })
                                .filter(permission => {
                                    return permission.name.toLowerCase().includes(searchPermissions.toLowerCase())
                                })
                                .map((permission,index) => {
                                    return (
                                        <RadioButton 
                                            key={`${index}-${permission.name}`} 
                                            state={!permissions.indexOf(permission.name)} 
                                            onClick={()=>{
                                                setPermissions([...permissions,permission.name])
                                            }} 
                                            className="w-min"
                                        >
                                            {permission.name}
                                        </RadioButton>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={`rounded dark:bg-gray-900 bg-gray-400 p-2  flex flex-col`}>
                            <Label>attach users</Label>
                            <br/>
                            <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                                {users.map((user,index) => {
                                    return (
                                        <UserCardXs
                                            className={`mx-2 w-fit outline-none ring ring-violet-300`}
                                            key={`${index}-minicard-${user.first}`}
                                            user={user}
                                            onClick={()=>{
                                                setUsers(users.filter(item => {
                                                    return item.email!==user.email
                                                }))
                                                onDisconnect(user.email)
                                            }} 
                                        />
                                    )
                                })}
                            </div>

                            <SearchBarMd placeholder={"Search users.."} value={searchUsers} onChange={(event)=>setSearchUsers(event.target.value)}/>
                            
                            <div className="flex max-w-full overflow-x-scroll pb-4">
                                {userData?.users
                                .filter(user => {
                                    return !(users.filter(item => {return item.email===user.email}).length > 0)
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
                                                setUsers([...users,user])
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