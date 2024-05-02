import React, { useState } from 'react'

import '../../index.css';

//https://dummyimage.com/100x100/fff/aaa
//https://i.pravatar.cc/100


export const ProfileCard_v1 = () => {
    const name = 'First M. Last'
    const position = 'junior developer'


    return (
        <div className="group m-auto font-bold rounded-2xl w-full transition-all md:w-3/5 p-3 shadow-2xl bg-blue-100 bg-gray-700 active:bg-gray-600 hover:bg-gray-800 cursor-pointer my-4 md:max-w-md">
            <div className='flex'>
                <div className="md:shrink-0">
                    <img className='rounded-full shadow-xl group-hover:border-solid border-2 group-hover:border-gray-300 border-transparent' src="https://i.pravatar.cc/80?img=58" />
                </div>
                <div className='ml-3 '>
                    <p className='text-gray-100'>{name}</p>
                    <p className='uppercase text-gray-500'>{position}</p>
                    <p className='text-blue-300 underline'>view profile</p>
                </div>
            </div>
        </div>
    )
}


export const ProfileCard_v2 = () => {
    const name = 'First M. Last'
    const position = 'junior developer'

    return (
        <div className="group m-auto rounded-2xl w-full transition-all md:w-3/5 p-3 shadow-2xl active:bg-gray-200 hover:bg-gray-100 cursor-pointer my-4 md:max-w-md">
            <div className='flex'>
            <div className="md:shrink-0">
                    <img className='rounded-full shadow-xl ' src="https://i.pravatar.cc/80?img=43" />
                </div>
                <div className='ml-3 '>
                    <p className='group-hover:font-bold transition-all'>{name}</p>
                    <p className='uppercase text-gray-500 group-hover:font-bold transition-all'>{position}</p>
                    <p className='text-blue-300 underline ease-linear duration-50 group-hover:animate-pulse'>view profile</p>
                </div>
            </div>
        </div>
    )
}


export const ProfileCard_v3 = () => {
    const name = 'First M. Last'
    const position = 'junior developer'
    const email = 'firstmlast@email.com'

    return (
        <div className="m-auto font-bold w-full transition-all md:w-3/5 border-t border-b border-gray-300 p-3 bg-gray-100 my-4 md:max-w-md active:bg-gray-200 hover:bg-transparent cursor-pointer">
            <div className='flex'>
                <div className="md:shrink-0">
                    <img className='rounded-full shadow-xl ' src="https://i.pravatar.cc/80?img=68" />
                </div>
                <div className='ml-3'>
                    <p>{name}</p>
                    <p className='uppercase text-gray-500'>{position}</p>
                    <p>{email}</p>
                    <p className='text-blue-300 underline'>view profile</p>
                </div>
            </div>
        </div>
    )
}


export const ProfileMiniCard_v1 = () => {
    const name = 'First M. Last'
    const position = 'junior developer'
    const email = 'firstmlast@email.com'

    return (
        <div className=''>
            <div className='md:shrink-0 m-auto'>
                <img className='rounded-full shadow-xl m-auto' src="https://i.pravatar.cc/80?img=68" />
            </div>
            <p className='m-auto'>{name}</p>
        </div>
    )
}


export const ProfileMiniCard_v2 = () => {
    const name = 'First M. Last'
    const position = 'junior developer'
    const email = 'firstmlast@email.com'

    return (
        <div className='shadow-2xl m-auto p-2 rounded-lg cursor:pointer'>
            <div className='md:shrink-0 m-auto'>
                <img className='rounded-full shadow-xl m-auto' src="https://i.pravatar.cc/60?img=40" />
            </div>
            <p className='m-auto'>{name}</p>
        </div>
    )
}

export const ProfileMiniCard_v3 = () => {
    const name = 'First M. Last'
    const position = 'junior developer'
    const email = 'firstmlast@email.com'

    return (
        <div className='group m-auto'>
            <div className='shadow-2xl rounded-lg md:shrink-0 m-auto w-fit h-min'>
                <img className='rounded-full shadow-xl m-auto' src="https://i.pravatar.cc/80?img=64" />
            </div>
        </div>
    )
}

export const ProfileMiniCard_v4 = () => {
    const name = 'First M. Last'
    const position = 'junior developer'
    const email = 'firstmlast@email.com'

    return (
        <div className='group h-fit w-fit shadow-2xl p-1 rounded-lg bg-blue-100 bg-gray-700 active:bg-gray-600 hover:bg-gray-800 cursor-pointer'>
            <div className=' md:shrink-0 m-auto '>
                <img className='rounded-full shadow-xl m-auto border-2 group-hover:border-solid group-hover:border-gray-100 border-transparent' src="https://i.pravatar.cc/80?img=33" />
            </div>
            <p className='text-gray-100'>{name}</p>
        </div>
    )
}




export const MiniDiskCollection_v1 = () => {

    return (
        <div className='flex py-8'>
            <div className='group h-fit translate-x-12'>
                <div className='md:shrink-0 m-auto w-fit h-min '>
                    <img className='rounded-full shadow-xl m-auto border-2 border-solid border-gray-100 active:grayscale' src="https://i.pravatar.cc/40?img=24" />
                </div>
                <p className='group-hover:visible invisible bg-gray-800 text-gray-100 rounded m-auto transition-all absolute min-w-max'>One More</p>
            </div>
            <div className='group h-fit translate-x-8'>
                <div className='md:shrink-0 m-auto w-fit h-min '>
                    <img className='rounded-full shadow-xl m-auto border-2 border-solid border-gray-100 active:grayscale' src="https://i.pravatar.cc/40?img=64" />
                </div>
                <p className='group-hover:visible invisible bg-gray-800 text-gray-100 rounded m-auto transition-all absolute min-w-max'>Rand Name</p>
            </div>
            <div className='group h-fit translate-x-4'>
                <div className='md:shrink-0 m-auto w-fit h-min '>
                    <img className='rounded-full shadow-xl m-auto border-2 border-solid border-gray-100 active:grayscale' src="https://i.pravatar.cc/40?img=63" />
                </div>
                <p className='group-hover:visible invisible bg-gray-800 text-gray-100 rounded m-auto transition-all absolute min-w-max'>First Last</p>
            </div>
            <div className='group h-fit translate-x-0'>
                <div className='md:shrink-0 m-auto w-fit h-min '>
                    <img className='rounded-full shadow-xl m-auto border-2 border-solid border-gray-100 active:grayscale' src="https://i.pravatar.cc/40?img=60" />
                </div>
                <p className='group-hover:visible invisible bg-gray-800 text-gray-100 rounded m-auto transition-all absolute min-w-max'>Another User</p>
            </div>
        </div>
    )
}



export const ProjectCard_v1 = () => {
    const title = 'Project Name'
    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quia eligendi ipsum ratione, accusamus deserunt assumenda explicabo ducimus delectus fuga ut magni maxime velit est esse! Ea, error ab. In.'
    const client = 'Tekniverse co.'

    const [dropdownState,setDropdownState] = useState(false)

    return (
        <div className='transition-all w-5/12 my-2 border-solid border-2 border-gray-300 m-auto min-w-min rounded-lg p-2 active:bg-gray-200 hover:bg-gray-100 cursor-pointer h-fit'>
            <p className='text-2xl font-bold'>{title}</p>
            <p className='uppercase text-gray-400'>{client}</p>
            <div className='transition-all overflow-hidden'>
                <button className='underline text-blue-300' onClick={() => {dropdownState ? setDropdownState(false) : setDropdownState(true)}}>{dropdownState ? 'read less' : 'read more'}</button>
                <p className={'transition-all ease-in-out' + (dropdownState? 'visible' : 'invisible h-0')}>{description}</p>
            </div>
        </div>
    )
}

export const ProjectCard_v2 = () => {
    const title = 'Some Random Name'
    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quia eligendi ipsum ratione, accusamus deserunt assumenda explicabo ducimus delectus fuga ut magni maxime velit est esse! Ea, error ab. In.'
    const client = 'Content Critical Solutions'

    const [dropdownState,setDropdownState] = useState(false)

    return (
        <div className='h-fit transition-all lg:w-80 my-2 shadow-2xl active:bg-gray-600 hover:bg-gray-800 bg-blue-100 bg-gray-700 w-5/12 border-solid cursor-pointer m-auto min-w-min rounded-lg p-2 transition-colors'>
            <p className='text-2xl font-bold text-gray-100'>{title}</p>
            <p className='uppercase text-gray-400'>{client}</p>
            <div className='transition-all overflow-hidden'>
                <button className='underline text-blue-300' onClick={() => {dropdownState ? setDropdownState(false) : setDropdownState(true)}}>{dropdownState ? 'read less' : 'read more'}</button>
                <p className={'transition-all ease-in-out text-white ' + (dropdownState? 'visible' : 'invisible h-0')}>{description}</p>
            </div>
        </div>
    )
}

export const ProjectCard_v3 = () => {
    const title = 'Just a Project'
    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quia eligendi ipsum ratione, accusamus deserunt assumenda explicabo ducimus delectus fuga ut magni maxime velit est esse! Ea, error ab. In.'
    const client = 'Jahnel Group'

    const [dropdownState,setDropdownState] = useState(false)

    return (
        <div className='group h-fit transition-all md:w-1/2 lg:w-80 my-2 shadow-2xl w-5/12 cursor-pointer m-auto min-w-min rounded-lg p-2 transition-colors hover:bg-gray-200'>
            <p className='text-2xl font-bold text-gray-300 group-hover:text-white'>{title}</p>
            <p className='uppercase text-gray-400'>{client}</p>
            <div className='transition-all overflow-hidden'>
                <button className='underline text-blue-300' onClick={() => {dropdownState ? setDropdownState(false) : setDropdownState(true)}}>{dropdownState ? 'read less' : 'read more'}</button>
                <p className={'transition-all ease-in-out' + (dropdownState? 'visible' : 'invisible h-0')}>{description}</p>
            </div>
        </div>
    )
}



export const ProjectCard_v4 = () => {
    const title = 'Another Project'
    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quia eligendi ipsum ratione, accusamus deserunt assumenda explicabo ducimus delectus fuga ut magni maxime velit est esse! Ea, error ab. In.'
    const client = 'University at Albany'

    const [dropdownState,setDropdownState] = useState(false)

    return (
        <div className='border-t border-b border-gray-300 group h-fit transition-all md:w-1/2 lg:w-80 my-2 shadow-2xl w-5/12 cursor-pointer m-auto min-w-min p-2 transition-colors hover:bg-gray-200'>
            <p className='text-2xl font-bold text-gray-300 group-hover:text-white'>{title}</p>
            <p className='uppercase text-gray-400'>{client}</p>
            <div className='transition-all overflow-hidden'>
                <button className='underline text-blue-300' onClick={() => {dropdownState ? setDropdownState(false) : setDropdownState(true)}}>{dropdownState ? 'read less' : 'read more'}</button>
                <p className={'transition-all ease-in-out' + (dropdownState? 'visible' : 'invisible h-0')}>{description}</p>
            </div>
        </div>
    )
}