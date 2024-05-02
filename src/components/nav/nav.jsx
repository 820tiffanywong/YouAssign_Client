import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { GET_USER } from '../../access/queries/get_user.js';
import { pageState } from '../../atoms.js';

const NavButton = ({children,icon,className,...rest}) => {
  return (
      <button
        type="button"
        className={`text-white hover:bg-gray-600 rounded h-fit  p-2 mx-auto group relative flex ${className}`}
        {...rest}
      >
        <Icon icon={icon} width="20"/>
        <p className={'z-50 shadow-lg inline-block absolute py-2 hidden top-0 left-10 px-3 text-sm font-medium text-white bg-gray-700 rounded-lg shadow-sm tooltip dark:bg-gray-600 group-hover:block'}>{children}</p>
      </button>
  )
}

/** Controls page routing
 * @returns the main navigation bar
 */
const Nav = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth);

	const {data} = useQuery(GET_USER,{
		variables:{
			where:{
				email:user?.email
			}
		}
	})
  const [page, setPage] = useRecoilState(pageState);

  
  /** Sets styles for selected page
   * @param {str} checkPage value to compare against current page
   * @returns the styles of a selected tab clicked
   */
  function isSelected(checkPage) {
    if (checkPage === page) return ' bg-gray-600 dark:bg-gray-900 ';
    return '';
  }

  return (
    <nav className=" bg-gray-800 flex flex-col min-h-screen p-4">    
      <NavButton
        icon={'gg:profile'}
        className={('profile' === page) && ' bg-gray-600 dark:bg-gray-900 '}
        onClick={() => setPage('profile')}
      >profile</NavButton>

      
      <NavButton
        icon={'ri:dashboard-3-line'}
        className={('dashboard' === page) && ' bg-gray-600 dark:bg-gray-900 '}
        onClick={() => setPage('dashboard')}
      >dashboard</NavButton>
      
      <NavButton
        icon={'ph:globe-hemisphere-west'}
        className={('explore' === page) && ' bg-gray-600 dark:bg-gray-900 '}
        onClick={() => setPage('explore')}
      >explore</NavButton>


      <NavButton
        icon={'akar-icons:money'}
        className={('payroll' === page) && ' bg-gray-600 dark:bg-gray-900 '}
        onClick={() => setPage('payroll')}
      >payroll</NavButton>

      <NavButton
        icon={'eos-icons:project-outlined'}
        className={('projects' === page) && ' bg-gray-600 dark:bg-gray-900 '}
        onClick={() => setPage('projects')}
      >projects</NavButton>
      
      
      {data?.users[0]?.roles.filter(role => {
        return(
          role.permissions.filter(permission => {
            return (permission.access.includes("WD"))
          }).length > 0
        )
      }).length > 0?(
        <NavButton
          icon={'ic:outline-admin-panel-settings'}
          className={('admin' === page) && ' bg-gray-600 dark:bg-gray-900 '}
          onClick={() => setPage('admin')}
        >admin</NavButton>
      ):(<></>)}


      <NavButton
        icon={'ph:gear'}
        className={('settings' === page) && ' bg-gray-600 dark:bg-gray-900 '}
        onClick={() => setPage('settings')}
      >settings</NavButton>
    </nav>
  );
};

export default Nav;
