import { useState, useEfect} from 'react';
import { getAuth } from 'firebase/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../../access/queries/get_user';
import { UPDATE_USER } from '../../access/mutations/update_user';
import { LabeledInput, LabeledTextArea } from '../../components/prebuilt.library';
import { Icon } from '@iconify/react';

/** Profile settings section
 * @returns 
 */
const ProfileSettings = () => {
    const auth = getAuth()
    const [updateUser,{ data : updateData, loading : updateLoading, error: updateError } ]= useMutation(UPDATE_USER)
    const { data, loading : queryLoading, error : errorLoading } = useQuery(GET_USER,{
        variables: {
            "where":{
              "email": auth.currentUser.email
            }
        }
    });

    const [first, setFirst] = useState(data?.users[0].first)
    const [last, setLast] = useState(data?.users[0].last)
    const [slug, setSlug] = useState(data?.users[0].slug) 
    const [bio, setBio] = useState(data?.users[0].bio) 

    return (
        <div className='relative rounded dark:bg-gray-800 bg-gray-300 w-full m-0'>
            {(updateLoading)?
                <div className='absolute h-full w-full dark:bg-gray-800 bg-gray-300 flex flex-col items-center'>
                    <Icon icon="eos-icons:loading" className='text-gray-100 mx-auto my-auto' width="40" />
                </div>
                :<></>}

            <div className='md:flex '>
                <div className='p-4 md:w-2/5 [&>*]:my-2'>
                    <LabeledInput
                        value={first}
                        onChange={(event) => setFirst(event.target.value)}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                    >
                        First Name
                    </LabeledInput>
                    <LabeledInput
                        value={last}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                        onChange={(event) => setLast(event.target.value)}
                    >
                        Last Name
                    </LabeledInput>

                    <LabeledInput
                        value={slug}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                        onChange={(event) => setSlug(event.target.value)}
                    >
                        Username
                    </LabeledInput>

                    <LabeledInput
                        value={data?.users[0].email}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-600 [&>*]:cursor-not-allowed"
                        disabled
                    >
                        Email
                    </LabeledInput>
                </div>
                <div className='p-4 w-full'>
                    <p className='uppercase dark:text-gray-400'>Photo</p>
                    <div className='p-2 rounded border-2 border-gray-500 flex mb-2'>

                        <div className='w-fit group cursor-pointer m-2'>
                            <img  
                                src={'https://via.placeholder.com/50x50'} 
                                alt="profile pic" 
                                className='rounded-full'
                            />
                        </div>
                        <div className='m-2'>
                            <p className='dark:text-gray-200 text-sm'>Select from a default photo or add a photo from your device.</p>
                        </div>
                    </div>

                    <LabeledTextArea
                        value={bio}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-600"
                        onChange={(event) => setBio(event.target.value)}
                    >
                        Bio
                    </LabeledTextArea>
                </div>
            </div>
            <button 
                className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                onClick={async ()=> {
                    let first_name = (first ? first : data.users[0].first)
                    let last_name = (last ? last : data.users[0].last)
                    let slug_input = (slug ? slug : data.users[0].slug)
                    let bio_input = (bio ? bio : data.users[0].bio)

                    const result = await updateUser(
                        {
                            variables:{
                                where: {
                                    email: auth.currentUser.email
                                },
                                update: {
                                    first: first_name,
                                    last: last_name,
                                    slug: slug_input,
                                    bio: bio_input
                                }
                            },
                            refetchQueries:[GET_USER]
                        }
                    )
                }}  
            >confirm changes</button>
        </div>
    )
}




export default ProfileSettings