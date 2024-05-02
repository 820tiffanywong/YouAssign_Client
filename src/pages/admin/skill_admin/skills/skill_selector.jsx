import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_SKILL } from "../../../../access/queries/get_skill"

const MiniSkillCard = ({ skill, selected_list }) => {
    const [selected,setSelected] = useState(false)
    return (
        <div 
            className={"cursor-pointer bg-gray-700 p-2 rounded m-2 w-1/4 " + (selected ? 'border-2' : '')}
            onClick={() => {
                if(selected) {
                    selected_list.splice(selected_list.indexOf(skill.title))
                    setSelected(false)
                }
                else{
                    selected_list.push(skill.title)
                    setSelected(true)
                }
            }}
        >
            <img 
                src={skill.img_src}
                alt="" 
                className="h-8 mx-auto"
            />
            <p className="text-center text-gray-300 font-bold">{skill.title}</p>
        </div>
    )
}

const SkillSelector = ({selected}) => {
    const { data, loading, error } = useQuery(GET_SKILL);

    if(data){
        return (
            <div className="flex flex-wrap">
                {
                    data.skills.map((skill,index) => {

                        return (
                            <MiniSkillCard key={skill.title + "-" + index} skill={skill} selected_list={selected} />
                        )
                    })
                }
            </div>
        )
    }
    else{
        return (
            <p>load</p>
        )
    }
}
export default SkillSelector;