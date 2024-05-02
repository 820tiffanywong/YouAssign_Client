import { useMutation } from "@apollo/client"
import { useState } from "react"
import { UPDATE_PERMISSION } from "../../../../access/mutations/update_permissions"
import { GET_PERMISSIONS } from "../../../../access/queries/get_permissions"
import { Label, LabeledInput, RadioButton, ScrollLoader, Select } from "../../../../components/prebuilt.library"

export const PermissionEditor = ({permission}) => {
    const [name, setName] = useState(permission.name) 
    const [_read,setRead] = useState(permission.access.includes('R'))
    const [_write,setWrite] = useState(permission.access.includes('W'))
    const [_delete,setDelete] = useState(permission.access.includes('D'))
    const [resource, setResource] = useState(permission.resource) 

    const [updatePermission,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(UPDATE_PERMISSION)

    const onUpdate = async () => {
        await updatePermission({
            variables:{
                where: {
                    id: permission.id
                },
                update: {
                    name: name,
                    access: (_read?'R':'')+(_write?'W':'')+(_delete?'D':''),
                    resource: resource
                }
            },
            refetchQueries:[GET_PERMISSIONS]
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
                            Permission name
                        </LabeledInput>
                        <div
                            className={`rounded dark:bg-gray-900 bg-gray-400 p-2 `}
                        >
                            <Label>Access Allowance</Label>
                            <div className="flex [&>*]:mx-auto my-2">
                                <RadioButton
                                    state={_read}
                                    onClick={()=>_read?setRead(false):setRead(true)}
                                >
                                    read
                                </RadioButton>
                                <RadioButton
                                    state={_write}
                                    onClick={()=>_write?setWrite(false):setWrite(true)}
                                >
                                    write
                                </RadioButton>
                                <RadioButton
                                    state={_delete}
                                    onClick={()=>_delete?setDelete(false):setDelete(true)}
                                >
                                    delete
                                </RadioButton>
                            </div>
                        </div>
                        <div className={`rounded dark:bg-gray-900 bg-gray-400 p-2  flex flex-col`}>
                            <Label>Resource</Label>

                            <Select
                                className={`bg-transparent dark:text-white border rounded h-fit md:w-1/2`}
                                options={['projects','clients','skills','companies','users','roles','payroll']}
                                value={resource}
                                onChange = {(event) => {
                                    setResource(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex [&>*]:mx-auto">
                    <button 
                        className='my-4 p-2 block mx-auto bg-blue-300 border-blue-500 hover:scale-105 transition-all focus:outline-none focus:ring focus:ring-violet-300 transform border-4 text-gray-600 rounded-lg'
                        onClick={onUpdate}  
                    >confirm changes</button>
                    <button 
                        className='my-4 p-2 block mx-auto bg-red-300 border-red-500 hover:scale-105 transition-all transform border-4 text-gray-600 focus:outline-none focus:ring focus:ring-red-700 rounded-lg'
                        onClick={()=>{}}  
                    >delete permission</button>
                </div>
            </div>
        )
    )
}