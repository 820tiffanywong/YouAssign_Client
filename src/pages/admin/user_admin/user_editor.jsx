import { useQuery, useMutation } from "@apollo/client"
import { GET_USER } from "../../../access/queries/get_user"
import { UPDATE_USER } from "../../../access/mutations/update_user"

import { useEffect, useState } from "react"
import { Input, LabeledInput, LabeledTextArea, ScrollLoader } from "../../../components/prebuilt.library"
import { deleteUser } from "firebase/auth"
import { DELETE_USER } from "../../../access/mutations/delete_user"

export const UserEditor = ({ user_email }) => {

    //queries and mutations
    const [updateUser,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(UPDATE_USER)
    const [deleteUser,{ data:deleteData, loading:deleteLoading, error:deleteError } ]= useMutation(DELETE_USER)
    const { data, loading:queryloading, error } = useQuery(GET_USER,{
        variables: {
            where:{
              email: user_email
            }
        }
    });

    //flag state variables
    const [confirmDelete,setConfirmDelete] = useState()

    //input state variables
    const [first, setFirst] = useState(data?.users[0]?.first) 
    const [last, setLast] = useState(data?.users[0]?.last) 
    const [slug, setSlug] = useState(data?.users[0]?.slug) 
    const [position, setPosition] = useState(data?.users[0]?.position) 
    const [bio, setBio] = useState(data?.users[0]?.bio) 
    const [img, setImg] = useState(data?.users[0]?.img) 

    //fetch data when it arrives
    useEffect(() => {
        if(data?.users){
            setFirst(data?.users[0]?.first)
            setLast(data?.users[0]?.last)
            setSlug(data?.users[0]?.slug)
            setPosition(data?.users[0]?.position)
            setBio(data?.users[0]?.bio)
            setImg(data?.users[0]?.img)
        }
    },[data])

    //component actions
    const onUpdate = async() => {
        await updateUser(
            {
                variables:{
                    where: {
                        email: user_email
                    },
                    update: {
                        first: first,
                        last: last,
                        slug: slug,
                        position: position,
                        bio: bio,
                        img: img
                    }
                },
                refetchQueries:[GET_USER]
            }
        )
    }
    

    const onDelete = async() => {
        await deleteUser(
            {
                variables:{
                    where: {
                        email: user_email
                    }
                },
                refetchQueries:[GET_USER]
            }
        )
        setConfirmDelete()
    }

    return (
        <div className='w-full h-fit py-4'>
            {(queryloading||updateLoading||!data||deleteLoading)?(
                <div className='absolute h-full min-h-[500px] w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                    <ScrollLoader />
                </div>
            ):(
                deleteData?(
                    <div className='absolute h-full min-h-[500px] w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                        <p className="text-center my-auto text-4xl text-white">User Deleted</p>
                    </div>
                ):(
                    <>
                        <div className='md:flex no-wrap'>
                            <div className='p-2 md:w-1/2 [&>*]:my-2'>
                                <LabeledInput
                                    className={`bg-gray-800`}
                                    value={first}
                                    onChange={(event) => setFirst(event.target.value)}
                                >
                                    first name
                                </LabeledInput>
                                <LabeledInput
                                    className={`bg-gray-800`}
                                    value={last}
                                    onChange={(event) => setLast(event.target.value)}
                                >
                                    last name
                                </LabeledInput>
                                <LabeledInput
                                    className={`bg-gray-800`}
                                    value={slug}
                                    onChange={(event) => setSlug(event.target.value)}
                                >
                                    username
                                </LabeledInput>
                                <LabeledInput
                                    className={`bg-gray-800`}
                                    value={position}
                                    onChange={(event) => setPosition(event.target.value)}
                                >
                                    position
                                </LabeledInput>
                                <LabeledInput
                                    className={`bg-gray-800 [&>*]:cursor-not-allowed`}
                                    value={user_email}
                                    onChange={()=>{}}
                                >
                                    email
                                </LabeledInput>
                            </div>

                            <div className='p-2 w-full [&>*]:my-2'>
                                <p className='uppercase dark:text-gray-400'>Photo</p>
                                <div className='p-2 rounded border-2 border-gray-500 flex'>
                                    <img  
                                        src={data?.users[0]?.img} 
                                        alt="profile pic" 
                                        className='rounded-full w-24'
                                    />
                                    <input type="file" className="my-auto text-gray-300" />
                                </div>

                                <LabeledTextArea
                                    className={`bg-gray-800`}
                                    value={img}
                                    onChange={(event) => setImg(event.target.value)}
                                >
                                    img url
                                </LabeledTextArea>

                                <LabeledTextArea
                                    className={`bg-gray-800`}
                                    value={bio}
                                    onChange={(event) => setBio(event.target.value)}
                                >
                                    bio
                                </LabeledTextArea>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button 
                                className='my-2 p-2 block mx-auto bg-gray-400 rounded-lg'
                                onClick={onUpdate}  
                            >
                                update user
                            </button>

                            {
                                confirmDelete?(
                                    <>
                                        <button 
                                            className='my-2 p-2 block mx-auto bg-red-400 rounded-lg'
                                            onClick={onDelete}  
                                        >
                                            confirm delete
                                        </button>
                                        <button 
                                            className='my-2 p-2 block mx-auto bg-white rounded-lg'
                                            onClick={() => setConfirmDelete()}  
                                        >
                                            cancel
                                        </button>
                                    </>
                                ):(
                                    <>
                                        <button 
                                            className='my-2 p-2 block mx-auto bg-red-400 rounded-lg'
                                            onClick={() => setConfirmDelete(true)}  
                                        >
                                            delete user
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </>
                )

            )}
        </div>
    )
}
