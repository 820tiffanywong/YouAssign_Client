import { useQuery } from "@apollo/client"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { GET_USER } from "../../access/queries/get_user"

const ProfileSkills = ({data}) => {
    const [search,setSearch] = useState("")
    const [paginate,setPaginate] = useState(4)
    const [max,setMax] = useState()

    useEffect(() => {
        data?setMax(data?.users[0].skillsConnection.edges.length):null
    },[data])

    if(data?.users[0].skillsConnection.edges.length===0){
        return(
            <p className="mb-10 italic text-gray-500 text-center text-xl">user has no listed skills</p>
        )
    }

    return (
        <div>
            <div className="my-4 p-3 text-2xl w-full rounded-lg dark:bg-gray-800 bg-gray-200">
                <input 
                    className="dark:text-white w-3/5 p-1 border-2 border-gray-500 rounded bg-transparent" 
                    placeholder="Search skills..."
                    onChange={(event)=>{
                        setSearch(event.target.value.toLowerCase())
                    }}
                />
            </div>
            <div className="flex flex-wrap">
                {
                    data?.users[0].skillsConnection.edges.filter(skill => {
                        return skill.node.title.toLowerCase().includes(search)
                    }).map((skill,index) => {
                        if(index < paginate && index >= paginate-4){
                            return (
                                <div key={`skill-card-${skill.node.title,index}`} className="shadow-xl shadow-gray-800 rounded bg-gray-800 p-4 mx-auto md:w-5/12 block my-4 cursor-pointer">
                                    <div className="flex flex-nowrap">
                                        <img src={skill.node.img_src} className="w-16 block bg-gray-400 rounded p-2 mr-2"/>
                                        <div>
                                            <p className="text-white font-light text-3xl">{skill.node.title}</p>
                                            <div className="flex">
                                                {
                                                    skill.node.categories.map((catgeory,index) => {
                                                        return <p key={index+'-category-'+catgeory.title}className={"rounded px-2 text-gray-300 drop-shadow-xl m-2 text-xs " + catgeory.color}>{catgeory.title}</p>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="flex">
                                            <p className="my-auto pr-2 italic text-gray-500">rating: </p>
                                            <div className={`my-auto h-3 w-8 rounded mr-2 transition-all ${classNames((skill.rating>0)?"bg-blue-500":"bg-blue-100")} `}></div>
                                            <div className={`my-auto h-3 w-8 rounded mr-2 transition-all ${classNames((skill.rating>1)?"bg-blue-500":"bg-blue-100")} `}></div>
                                            <div className={`my-auto h-3 w-8 rounded mr-2 transition-all ${classNames((skill.rating>2)?"bg-blue-500":"bg-blue-100")} `}></div>
                                            <div className={`my-auto h-3 w-8 rounded mr-2 transition-all ${classNames((skill.rating>3)?"bg-blue-500":"bg-blue-100")} `}></div>
                                            <div className={`my-auto h-3 w-8 rounded mr-2 transition-all ${classNames((skill.rating>4)?"bg-blue-500":"bg-blue-100")} `}></div>
                                        </div>
                                        <p className="my-auto pr-2 italic text-gray-500">ranked since May, 2017 </p>
                                        <p className="my-auto pr-2 italic text-gray-500">used on 0 projects </p>

                                    </div>
                                </div>

                            )
                        }
                    }) 
                }
            </div>
            <div className="flex my-8 mx-auto w-min ">
                <button 
                    className={`rounded px-4 ${classNames((paginate===4)?'bg-gray-800 text-gray-700':'bg-gray-500')}`}
                    disabled={paginate===4}
                    onClick={()=>{
                        if(paginate-4 < 4)
                            setPaginate(4)
                        else
                            setPaginate(paginate-4)
                    }}
                >{'<'}</button>
                {

                }
                <button 
                    className={`rounded px-4 ${classNames((paginate===max+1)?'bg-gray-800':'bg-gray-500')}`}
                    disabled={paginate===max+1}
                    onClick={()=>{
                        if(paginate+4 > max)
                            setPaginate(max+1)
                        else
                            setPaginate(paginate+4)
                    }}
                >{'>'}</button>
            </div>
        </div>
    )
}


export default ProfileSkills