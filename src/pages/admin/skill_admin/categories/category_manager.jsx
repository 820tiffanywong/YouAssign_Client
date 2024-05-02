import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_CATEGORY } from "../../../../access/queries/get_category"

import { BackButton, CategoryCardMd, SearchBarLg } from "../../../../components/custom.library"
import { Button, ScrollLoader } from "../../../../components/prebuilt.library"
import CategoryCreator from "./category_creator"
import CategoryEditor from "./category_editor"


export const CategoryManager = () => {
    const [modal,setModal] = useState(false)
    const { data, loading, error } = useQuery(GET_CATEGORY)

    if(data){
        return (
            <div className="w-full relative">
                {loading?(
                    <div className='absolute h-full w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                        <ScrollLoader />
                    </div>
                ):(
                    <>
                        {modal==="create"?(
                            <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4  group-hover:block">
                                <BackButton 
                                    onClick={() => {
                                        setModal(false)
                                    }}
                                />
                                <CategoryCreator />
                            </div>
                        ):(<></>)}
                        {modal&&modal!=="create"?(
                            <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4 group-hover:block">
                                <BackButton 
                                    onClick={() => {
                                        setModal(false)
                                    }}
                                />
                                <CategoryEditor key={modal.title} category_title={modal.title} />
                            </div>
                        ):(<></>)}
                        <SearchBarLg
                            placeholder="search categories.."
                        >
                            <Button
                                onClick={() => {
                                    setModal("create")
                                }}
                            >
                                add new
                            </Button>
                        </SearchBarLg>
                                
                        <div className="md:flex flex-wrap">
                            {data?.categories.map((category,index) => {
                                return (
                                    <CategoryCardMd 
                                        key={`${category.title}-${index}`} 
                                        category={category} 
                                        onClick={() => {
                                            modal ? setModal(false) : setModal(category)
                                        }}        
                                    />
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        )
    }
} 