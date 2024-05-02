import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { CREATE_PERMISSION } from "../../../../access/mutations/create_permission"
import { CREATE_ROLE } from "../../../../access/mutations/create_role"
import { GET_PERMISSIONS } from "../../../../access/queries/get_permissions"
import { GET_ROLES } from "../../../../access/queries/get_roles"
import { SearchBarMd } from "../../../../components/custom.library"
import { Label, LabeledInput, RadioButton, ScrollLoader, Select, SubText } from "../../../../components/prebuilt.library"


export const RoleCreator = () => {
    const [name, setName] = useState("") 
    const [permissions,setPermissions] = useState([])

    const {data:queryData,loading:queryLoading,error:queryError} = useQuery(GET_PERMISSIONS)
    const [createRole,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(CREATE_ROLE)

    const onCreate = async () => {
        await createRole({
            variables:{
                input: [
                  {
                    title: name,
                    permissions: {
                      connect: [
                        {
                          where: {
                            node: {
                              name_IN: permissions
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              },
            refetchQueries:[GET_ROLES]
        })
    }

    return (
        updateLoading?(
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
                                            }}
                                        >
                                            {permission}
                                        </RadioButton>
                                    )
                                })}
                            </div>

                            <SearchBarMd placeholder={"Search permissions.."}/>
                            
                            <div className="flex max-w-full overflow-x-scroll pb-4">
                                {queryData?.permissions.filter(permission => {
                                    return !permissions.includes(permission.name)
                                }).map((permission,index) => {
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
                    </div>
                </div>
                <button 
                    className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                    onClick={onCreate}  
                >confirm changes</button>
            </div>
        )
    )
}