import { useQuery } from "@apollo/client"
import { useState } from "react"
import { Button, ScrollLoader } from "../../../components/prebuilt.library"
import { BackButton, CompanyCardMd, ProjectCardMd, SearchBarLg } from "../../../components/custom.library"
import { GET_COMPANY } from "../../../access/queries/get_company"
import { CompanyCreator } from "./company_creator"
import { CompanyEditor } from "./company_editor"

const CompanyAdmin = () => {
    const { data, loading, error } = useQuery(GET_COMPANY)
    const [search,setSearch] = useState("")
    const [modal,setModal] = useState()

    return (
        loading?(
            <div className="w-full relative">
                <div className='absolute h-screen w-full dark:bg-gray-700 bg-gray-200 flex flex-col items-center'>
                    <ScrollLoader />
                </div>
            </div>
        ):(
            <div className="w-full relative">
                {modal==="create"?(
                    <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4  group-hover:block">
                        <BackButton 
                            onClick={() => {
                                setModal(false)
                            }}
                        />
                        <CompanyCreator />
                    </div>
                ):(<></>)}
                {modal&&modal!=="create"?(
                    <div className="absolute dark:bg-gray-700 bg-gray-200 w-full h-full p-4 group-hover:block">
                        <BackButton 
                            onClick={() => {
                                setModal(false)
                            }}
                        />
                        <CompanyEditor company_id={modal.id}/>
                    </div>
                ):(<></>)}
                {!modal?(
                    <>
                        <SearchBarLg
                            placeholder={`search companies.. `}
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
                            {data?.companies
                            .filter(company => {
                                return company.name.includes(search)
                            })
                            .map((company,index) => {
                                return (
                                    <CompanyCardMd 
                                        key={`${index}-company-card`}
                                        company={company}
                                        onClick={()=>setModal(company)}
                                    />
                                )
                            })}
                        </div>
                    </>
                ):(<></>)}
            </div>
        )

    )
}
export default CompanyAdmin