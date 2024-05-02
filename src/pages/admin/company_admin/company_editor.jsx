// import { useQuery, useMutation } from "@apollo/client"
// import { GET_USER } from "../../../access/queries/get_user"
// import { UPDATE_USER } from "../../../access/mutations/update_user"

// import { useEffect, useState } from "react"
// import { Input, LabeledInput, LabeledTextArea, ScrollLoader } from "../../../components/prebuilt.library"

// export const UserEditor = ({ user_email }) => {

//     //queries and mutations
//     const [updateUser,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(UPDATE_USER)
//     const { data, loading:queryloading, error } = useQuery(GET_USER,{
//         variables: {
//             where:{
//               email: user_email
//             }
//         }
//     });

//     //input state variables
//     const [first, setFirst] = useState(data?.users[0].first) 
//     const [last, setLast] = useState(data?.users[0].last) 
//     const [slug, setSlug] = useState(data?.users[0].slug) 
//     const [bio, setBio] = useState(data?.users[0].bio) 
//     const [img, setImg] = useState(data?.users[0].img) 

//     //fetch data when it arrives
//     useEffect(() => {
//         if(data?.users){
//             setFirst(data?.users[0].first)
//             setLast(data?.users[0].last)
//             setSlug(data?.users[0].slug)
//             setBio(data?.users[0].bio)
//             setImg(data?.users[0].img)
//         }
//     },[data])

//     //component actions
//     const onUpdate = async() => {
//         await updateUser(
//             {
//                 variables:{
//                     where: {
//                         "email": user_email
//                     },
//                     update: {
//                         "first": first,
//                         "last": last,
//                         "slug": slug,
//                         "bio": bio,
//                         "img": img
//                     }
//                 },
//                 refetchQueries:[GET_USER]
//             }
//         )
//     }
import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { Label, LabeledInput, ScrollLoader } from "../../../components/prebuilt.library"
import { CREATE_COMPANY } from "../../../access/mutations/create_company"
import { GET_COMPANY } from "../../../access/queries/get_company"
import { UPDATE_COMPANY } from "../../../access/mutations/update_company"
import { GET_USER } from "../../../access/queries/get_user"
import { SearchBarMd, UserCardXs } from "../../../components/custom.library"

export const CompanyEditor = ({company_id}) => {

    //queries and mutations
    const [updateCompany,{ data:updateData, loading:updateLoading, error:updateError } ]= useMutation(UPDATE_COMPANY)
    const {data} = useQuery(GET_COMPANY,{
        variables:{
            where:{
                id:company_id
            }
        }
    })
    const{data:userData,loading:userLoading} = useQuery(GET_USER)

    //input state variables
    const [name, setName] = useState("")
    const [logo, setLogo] = useState("")
    const [background, setBackground] = useState("")
    const [description, setDescription] = useState("")
    const [employees, setEmployees] = useState([])

    //search input variables
    const [searchUsers,setSearchUsers] = useState("")

    //component actions
    const onUpdate = async() => {
        await updateCompany({
            variables:{
                where: {
                  id: company_id
                },
                update: {
                  name: name,
                  logo: logo,
                  backgroundImage: background,
                  description: description,
                  employees: [
                    {
                      connect: [
                        {
                          where: {
                            node: {
                              email_IN: employees.map(user => user.email)
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
            },
            refetchQueries:[GET_COMPANY]
        })
    }

    const onDisconnectEmployee = async (userEmail) => {
        await updateCompany({
            variables:{
                where: {
                    id: company_id
                },
                disconnect: {
                    employees: [{
                        where: {
                            node: {
                                email: userEmail
                            }
                        }
                    }]
                }
            },
            refetchQueries:[GET_COMPANY]
        })
    }

    //fetch data when it arrives
    useEffect(() => {
        if(data?.companies){
            setName(data?.companies[0].name)
            setDescription(data?.companies[0].description)
            setLogo(data?.companies[0].logo)
            setBackground(data?.companies[0].backgroundImage)
            setEmployees(data?.companies[0].employees)
        }
    },[data])

    return (
        <div className='w-full h-fit py-4'>
            {(updateLoading||userLoading)?(
                <div className='absolute h-full min-h-[500px] w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                    <ScrollLoader />
                </div>
            ):(<>
                <div className='no-wrap'>
                    <div className='p-2 [&>*]:my-2'>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        >
                            Company Name
                        </LabeledInput>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={logo}
                            onChange={(event) => setLogo(event.target.value)}
                        >
                            Logo
                        </LabeledInput>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={background}
                            onChange={(event) => setBackground(event.target.value)}
                        >
                            Background Image
                        </LabeledInput>
                        <LabeledInput
                            className={`bg-gray-800`}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        >
                            Description
                        </LabeledInput>
                        <div className={`dark:bg-gray-900 p-2 rounded`}>
                            <Label>Employees</Label>
                            <br/>
                            <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                                {employees.map((user,index) => {
                                    return (
                                        <UserCardXs
                                            className={`mx-2 w-fit outline-none ring ring-violet-300`}
                                            key={`${index}-minicard-${user.first}`}
                                            user={user}
                                            onClick={()=>{
                                                setEmployees(employees.filter(item => {
                                                    return item.email!==user.email
                                                }))
                                                onDisconnectEmployee(user.email)
                                            }} 
                                        />
                                    )
                                })}
                            </div>
                            <SearchBarMd placeholder={"Search users.."} value={searchUsers} onChange={(event)=>setSearchUsers(event.target.value)}/>
                            <div className="flex max-w-full overflow-x-scroll pb-4">
                                {userData?.users
                                .filter(user => {
                                    return !(employees.filter(item => {return item.email===user.email}).length > 0)
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
                                                setEmployees([...employees,user])
                                            }} 
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button 
                        className='my-2 p-2 block mx-auto bg-gray-400 rounded-lg'
                        onClick={onUpdate}  
                    >
                        confirm changes
                    </button>
                </div>
            </>)}
        </div>
    )
}
