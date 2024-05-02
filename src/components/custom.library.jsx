import { Icon } from "@iconify/react"
import { useRecoilState } from "recoil"
import { Label, RadioButton } from "./prebuilt.library"


/*************************************
    Search Bars
*/
export const SearchBarLg = ({children,className,...rest}) => {

    return (
        <div className="flex my-4 p-3 text-2xl w-full rounded-lg dark:bg-gray-800 bg-gray-300 shadow-xl">
            <input 
                className="dark:text-white w-3/5 p-1 border-2 border-gray-800 dark:border-gray-500 rounded bg-transparent" 
                {...rest}
            />
            {children}
        </div>
    )
}

export const SearchBarMd = ({children,className,...rest}) => {

    return (
        <div className={`flex my-4 p-3 text-2xl rounded-lg dark:border-white border-gray-800 ${className}`}>
            <input 
                className="dark:text-white w-3/5 p-1 border-2 border-gray-800 dark:border-gray-500 rounded bg-transparent" 
                {...rest}
            />
            {children}
        </div>
    )
}

export const SearchBarSm = ({children,className,...rest}) => {

    return (
        <div className={`flex p-2 text-xl rounded-lg dark:border-white border-gray-800 ${className}`}>
            <input 
                className="dark:text-white w-3/5 p-1 border-2 border-gray-800 dark:border-gray-500 rounded bg-transparent" 
                {...rest}
            />
            {children}
        </div>
    )
}

/*************************************
 * Navigation
 */

/**
 * @param {Atom} tabState references a recoil atom created in atoms.js - make sure to set an inital value 
 * @returns 
 */
export const TabToggleBarLg = ({tabs,tabState,...rest}) =>{
    const [pageState,setPageState] = useRecoilState(tabState)

    return (
        <div className="bg-gray-400 dark:bg-gray-800 rounded w-full rounded-lg overflow-hidden cursor-pointer my-4">
            <div className="flex no-wrap w-full">
                {tabs.map((tab,index) => {
                    return (
                        <p 
                            key={`tab-${tab}-${index}`}
                            className={`font-bold uppercase dark:text-gray-300 w-1/2 p-4 text-center ${(pageState === tab ?  "dark:bg-gray-500" : "")}`}
                            onClick={() => {
                                setPageState(tab)
                            }}
                        >{tab}</p>
                    )
                })}
            </div>
        </div>
    );
}

/*************************************
 * Buttons
 */

export const BackButton = ({className,...rest}) => {

    return (
        <button
            className={`group w-min dark:text-gray-100 flex ${className}`}
            {...rest}
        >
            <Icon icon="carbon:drill-back" width="30" />
            <p className={`group-hover:w-14 w-0 overflow-hidden transition-all whitespace-nowrap`}>go back</p>
        </button>
    )
}


/*************************************
    User Cards
*/

export const UserCardXs = ({user,className,...rest}) => {
    return(
        <div 
            className={`group rounded-lg dark:bg-gray-800 bg-gray-300 shadow dark:shadow-gray-800 shadow-gray-400 p-2 hover:scale-105 transform my-2 cursor-pointer transition-all flex flex-col ${className}`}
            {...rest}  
        >
            <div className="block rounded-lg w-16 h-16 overflow-clip mx-auto">
                <img src={`${user.img}`} alt={``} className="w-full h-full" />
            </div>
            <p className="dark:text-gray-300 font-light text-sm group-hover:font-normal duration-100 transition-all whitespace-nowrap text-center">{user.first} {user.last}</p>
        </div>
    )
}

export const UserCardMd = ({user,className,...rest}) => {
    return(
        <div 
            className={`group rounded-lg dark:bg-gray-800 bg-gray-300 shadow dark:shadow-gray-800 shadow-gray-400 p-2 hover:scale-100 scale-95 transform my-2 md:flex cursor-pointer transition-all ${className}`}
            {...rest}  
        >
            <img src={`${user.img}`} alt={``} className="w-24 h-24 overflow-y-hidden rounded-lg md:mx-0 mx-auto" />
            <div className="ml-3">
                <p className="dark:text-gray-300 font-light text-xl md:text-3xl md:text-left text-center group-hover:font-normal duration-100 transition-all">{user.first} {user.last}</p>
                <p className="dark:text-gray-400 transition-all text-2xl font-light md:block hidden">{user.slug}</p>
                <p className="dark:text-gray-400 transition-all text-lg font-light md:block hidden">{user.projects.length} projects</p>
                <p className="dark:text-gray-400 transition-all text-lg font-light md:block hidden">{user.skillsConnection.edges.length} skill connections</p>
            </div>
        </div>
    )
}

/*************************************
    Skill Cards
*/

export const SkillCardMd = ({skill,className,...rest}) => {
    return (
        <>
            <div 
                className="group rounded dark:bg-gray-800 bg-gray-300 p-2 w-4/5 md:w-2/5 hover:scale-105 transform mx-auto my-2 flex cursor-pointer transition-all min-w-[300px]"
                {...rest}
            >
                <img 
                    src={(skill.img_src ? skill.img_src : "https://via.placeholder.com/50x50")} 
                    className="shrink-0 w-10 transform group-hover:scale-110"
                />
                <div className="ml-2">
                    <p className="dark:text-gray-300 text-xl  group-hover:text-blue-400 transform transition-all">{skill.title}</p>
                    <p className="dark:text-gray-300 group-hover:font-bold transition-all"></p>
                </div>
            </div>
        </>
    )
}

export const SkillCardSm = ({skill,className,...rest}) => {
    return (
        <>
            <div 
                className={`group rounded dark:bg-gray-800 bg-gray-300 p-2  hover:scale-105 transform mx-auto my-2 cursor-pointer transition-all ${className}`}
                {...rest}
            >
                <img 
                    src={(skill.img_src ? skill.img_src : "https://via.placeholder.com/50x50")} 
                    className="shrink-0 w-8 h-8 transform group-hover:scale-105 transition-all mx-auto"
                />
                <p className="dark:text-gray-300 text-lg  group-hover:text-blue-400 transform transition-all text-center whitespace-nowrap">{skill.title}</p>
            </div>
        </>
    )
}

export const SkillCardXs = ({skill,className,...rest}) => {
    return (
        <>
            <div 
                className={`group rounded dark:bg-gray-800 bg-gray-300 p-2  hover:scale-105 transform my-2 cursor-pointer transition-all ${className}`}
                {...rest}
            >
                <img 
                    src={(skill.img_src ? skill.img_src : "https://via.placeholder.com/50x50")} 
                    className="shrink-0 w-6 h-6 transform group-hover:scale-105 transition-all mx-auto"
                />
                <p className="dark:text-gray-300 text-xs  group-hover:text-blue-400 transform transition-all text-center whitespace-nowrap">{skill.title}</p>
            </div>
        </>
    )
}

export const SkillCardNoBgXs = ({skill,className,...rest}) => {
    return (
        <>
            <div 
                className={`group rounded p-2  hover:scale-105 transform mx-auto my-2 cursor-pointer transition-all ${className}`}
                {...rest}
            >
                <img 
                    src={(skill.img_src ? skill.img_src : "https://via.placeholder.com/50x50")} 
                    className="shrink-0 w-6 h-6 transform group-hover:scale-105 transition-all mx-auto"
                />
                <p className="dark:text-gray-300 text-xs  group-hover:text-blue-400 transform transition-all text-center whitespace-nowrap">{skill.title}</p>
            </div>
        </>
    )
}

/*************************************
    Category Cards
*/
export const CategoryCardMd = ({ category,className,...rest }) => {

    return (
        <div 
            className={`group rounded p-2 md:w-2/5 hover:scale-105 mx-auto my-2 cursor-pointer transition-all shadow ${category.color} ${className}`}
            {...rest}
        >
            <div className="ml-2">
                <p className="dark:text-gray-300 font-normal font-bold group-hover:text-gray-600 transition-all text-xl ">{category.title}</p>
                <p className="dark:text-gray-300 group-hover:font-bold transition-all">{category.skillsAggregate.count} skills in this category</p>
            </div>
        </div>
    )
}
const LoadingCategoryCard = ({color}) => {
    return (
        <div 
            className={"group rounded p-2 w-2/5 hover:scale-105 transform mx-auto my-2 cursor-pointer transition-all " + color}
        >
            <div className="">
                <div className="dark:bg-gray-300 font-normal group-hover:font-extrabold group-hover:text-gray-600 transition-all w-36 rounded h-4 animate-pulse"></div>
                <div className="dark:bg-gray-300 font-normal group-hover:font-extrabold group-hover:text-gray-600 transition-all w-20 rounded h-4 animate-pulse mt-2"></div>
            </div>
        </div>
    )
}

/*************************************
    Permissions Cards
*/
export const PermissionCardMd = ({permission,className,...rest}) => {
    

    return (
        <div 
            className={`group rounded p-2 md:w-2/5 dark:bg-gray-800 bg-gray-300 hover:scale-100 scale-95 transition-all transform mx-auto my-2 cursor-pointer transition-all ${className}`}
            {...rest}
        >
            <div className="ml-2">
                <p className="dark:text-gray-300 font-normal font-bold group-hover:text-gray-600 transition-all text-xl ">{permission.name}</p>
                <span className="flex dark:text-gray-400 [&>*]:my-auto"><Label>Access:</Label><span className="ml-2">{permission.access}</span></span>
                <span className="flex dark:text-gray-400 [&>*]:my-auto"><Label>Resource:</Label><span className="ml-2">{permission.resource}</span></span>
            </div>
        </div>
    )
}

export const RoleCardMd = ({role,className,...rest}) => {
    

    return (
        <div 
            className={`group rounded p-2 md:w-2/5 dark:bg-gray-800 bg-gray-300 hover:scale-100 scale-95 transition-all transform mx-auto my-2 cursor-pointer transition-all ${className}`}
            {...rest}
        >
            <div className="ml-2">
                <p className="dark:text-gray-300 font-normal font-bold group-hover:text-gray-600 transition-all text-xl ">{role.title}</p>
                <span className="flex dark:text-gray-400 [&>*]:my-auto"><Label>Permissions:</Label></span>
                <div className="flex max-w-full overflow-x-auto py-1 my-1">
                    {role.permissions.map((permission,index) => {
                        return(
                            <RadioButton key={`role-radio-${index}`}state={true}>
                                {permission.name}
                            </RadioButton>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


/*************************************
    Project Cards
*/
export const ProjectCardSm = ({project,className,...rest}) => {
    return (
        <>
            <div 
                className={`group rounded dark:bg-gray-700 bg-gray-300 p-2 hover:scale-105 transform my-2 flex cursor-pointer transition-all w-fit ${className}`}
                {...rest}
            >
                    <p className="dark:text-gray-300 text-xl  group-hover:text-blue-400 transform transition-all">{project.title}</p>
            </div>
        </>
    )
}


export const ProjectCardMd = ({project,className,...rest}) => {
    return (
        <>
            <div 
                className="group rounded dark:bg-gray-800 bg-gray-300 p-2 w-4/5 md:w-2/5 hover:scale-105 transform mx-auto my-2 flex cursor-pointer transition-all min-w-[300px]"
                {...rest}
            >
                <div>
                    <p className="dark:text-gray-300 text-xl  group-hover:text-blue-400 transform transition-all">{project.title}</p>
                    <p className="dark:text-gray-300 group-hover:font-bold transition-all">{project.description}</p>
                </div>
            </div>
        </>
    )
}

export const ProjectCardLg = ({project,className,...rest}) => {
    return (
        <>
            <div 
                className="group rounded dark:bg-gray-800 bg-gray-300 p-2 w-4/5 md:w-2/5 hover:scale-105 transform mx-auto my-2 cursor-pointer transition-all min-w-[300px]"
                {...rest}
            >
                <div className="ml-2">
                    <p className="dark:text-gray-300 text-xl  group-hover:text-blue-400 transform transition-all">{project.title}</p>
                    <p className="dark:text-gray-300 group-hover:font-bold transition-all">{project.description}</p>
                </div>
                <br/>
                <div className="w-full flex overflow-x-scroll">
                    {project.skills_required.map((skill,index) => {
                        return (
                            <SkillCardXs
                                className={`outline-2 ring-blue-300 ring-2 min-w-1/4 mx-4`}
                                key={index}
                                skill={skill}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

/*************************************
    Company Cards
*/

export const CompanyCardMd = ({company,className,...rest}) => {
    return (
        <>
            <div 
                className="group rounded dark:bg-gray-800 bg-gray-300 p-2 w-4/5 md:w-2/5 hover:scale-105 transform mx-auto my-2 flex cursor-pointer transition-all min-w-[300px]"
                {...rest}
            >
                <div className="ml-2">
                    <p className="dark:text-gray-300 text-xl  group-hover:text-blue-400 transform transition-all">{company.name}</p>
                    <p className="dark:text-gray-300 group-hover:font-bold transition-all">{company.description}</p>
                </div>
            </div>
        </>
    )
}

/*************************************
    Buttons with icons & titles
    -select a button from https://icon-sets.iconify.design/ and copy its name
    -enter the copied name (i.e. edit:feather-3) as the icon parameter
    -add button title as child
*/
export const IconButton = ({icon,children,className,...rest}) => {

    return (
        <button 
            className={`flex w-full text-left dark:text-gray-300 p-2 rounded ${className}`} 
            {...rest}
        >
            <div className='my-auto'>
                <Icon icon={icon} width="30" />
            </div>
            <p className="pl-2 text-light text-lg my-auto uppercase">{children}</p>
        </button>
    )
}