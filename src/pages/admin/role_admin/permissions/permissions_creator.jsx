import { useMutation } from "@apollo/client"
import { useState } from "react"
import { CREATE_PERMISSION } from "../../../../access/mutations/create_permission"
import { GET_PERMISSIONS } from "../../../../access/queries/get_permissions"
import { Label, LabeledInput, RadioButton, ScrollLoader, Select } from "../../../../components/prebuilt.library"


export const PermissionCreator = () => {
    const [name, setName] = useState("") 
    const [_read,setRead] = useState()
    const [_write,setWrite] = useState()
    const [_delete,setDelete] = useState()
    const [resource, setResource] = useState("") 

    
    const [createPermission,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(CREATE_PERMISSION)

    const onCreate = async () => {
        await createPermission({
            variables:{
                input: [{
                    name: name,
                    access: (_read?'R':'')+(_write?'W':'')+(_delete?'D':''),
                    resource: resource
                }]
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
                <button 
                    className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                    onClick={onCreate}  
                >confirm changes</button>
            </div>
        )
    )
}