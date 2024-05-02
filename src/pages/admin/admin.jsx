import { useRecoilState } from 'recoil'
import { adminPageState } from '../../atoms';
import { IconButton, TabButton } from '../../components/custom.library';
import { PageHeader } from '../../components/prebuilt.library';
import RoleAdmin from './role_admin/role_admin';

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import SkillAdmin from './skill_admin/skill_admin';
import UserAdmin from './user_admin/user_admin';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../access/queries/get_user';
import ProjectAdmin from './project_admin/project_admin';
import CompanyAdmin from './company_admin/company_admin';

const adminTabs = [
	{
	  title:'users',
	  icon:'eos-icons:admin-outlined',
	  page:UserAdmin
	},
	{
	  title:'skills',
	  icon:'heroicons:users-20-solid',
	  page:SkillAdmin
	},
	{
	  title:'projects',
	  icon:'eos-icons:project-outlined',
	  page:ProjectAdmin
	},
	{
		title:'companies',
		icon:'carbon:building-insights-1',
		page:CompanyAdmin
	},
	{
	  title:'payroll',
	  icon:'fa6-solid:money-check-dollar',
	  page:SkillAdmin
	},
	{
	  title:'roles',
	  icon:'mdi:graph-outline',
	  page:RoleAdmin
	},
]


const AdminMenu = () => {
	const auth = getAuth()
    const [user] = useAuthState(auth);
	const [pageState,setPageState] = useRecoilState(adminPageState)
	const {data} = useQuery(GET_USER,{
		variables:{
			where:{
				email:user?.email
			}
		}
	})


    return (
        <div>
            <div className="h-min max-h-min dark:bg-gray-600 rounded-lg dark:border-transparent mr-4 w-min">
                <div className="py-2 pl-2 mr-4">
					{adminTabs.map((tab,index) => {
						if(data?.users[0].roles.filter(role => {
							return(
								role.permissions.filter(permission => {
									return (permission.resource === tab.title && permission.access.includes("WD"))
								}).length > 0
							)
						}).length > 0){
							return (
								<IconButton
									key={`icon-${tab.title}-${index}`}
									className={`hover:bg-gray-700 ${pageState===tab.title?'bg-gray-400 dark:bg-gray-500':''}`}
									icon={tab.icon}
									onClick={() => {
										setPageState(tab.title)
									}}
								>
									{tab.title}
								</IconButton>
							)
						}
					})}
                </div>
            </div>
        </div>
    );
};
  

const Admin = () => {
	const auth = getAuth()
    const [user] = useAuthState(auth);

	const {data} = useQuery(GET_USER,{
		variables:{
			where:{
				email:user?.email
			}
		}
	})

    const [pageState,] = useRecoilState(adminPageState)
    const AdminPage = adminTabs.filter(tab => { return tab.title===pageState})[0].page

    return (
		data?.users[0].roles.filter(role => {
			return(
				role.permissions.filter(permission => {
					return (permission.access.includes("WD"))
				}).length > 0
			)
		}).length > 0?(
			<>
				<PageHeader>
					Administrative Access
				</PageHeader>
				<div className="flex no-wrap ">
					<AdminMenu />
					<AdminPage />
				</div>
			</>
		):(<></>)
    )
}
export default Admin;