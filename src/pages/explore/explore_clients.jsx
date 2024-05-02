import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { GET_COMPANY } from "../../access/queries/get_company";
import { explorePageItem } from "../../atoms";
import { CompanyCardMd, UserCardXs } from "../../components/custom.library";
import { Label, LabeledInput, SubText, SubTitle, Title } from "../../components/prebuilt.library";

export const ExploreCLient = () => {
    const [item,] = useRecoilState(explorePageItem)
    return (
        <div className='p-2 [&>*]:my-2'>
            <div className="rounded bg-gray-800 p-4">
                <p className="text-gray-400 text-3xl">{item.name}</p>
                <p className="text-gray-300 text-xl italic">{item.description}</p>
                <br/>
                <br/>
                <Label>Employees</Label>
                <div className="flex max-w-full p-1 overflow-x-scroll pb-4">
                    {item.employees.map((user,index) => {
                        return (
                            <UserCardXs
                                className={`mx-2 w-fit outline-none ring ring-violet-300`}
                                key={`${index}-minicard-${user.first}`}
                                user={user}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const ExploreClients = () => {
    const [,setItem] = useRecoilState(explorePageItem)
    const {data} = useQuery(GET_COMPANY)

    return(
        <div>
            <div className="my-4 p-3 text-2xl w-full rounded-lg dark:bg-gray-800 bg-gray-200">
                <input className="dark:text-white text-black w-full p-1 border-2 shadow dark:border-gray-500 rounded bg-transparent" placeholder="Search clients..."/>
            </div>
            <div>
                {data?.companies.map((company,index) => {
                    return (
                        <CompanyCardMd
                            key={index}
                            company={company}
                            onClick={() => setItem(company)}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default ExploreClients