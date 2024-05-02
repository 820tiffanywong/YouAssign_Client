import React from 'react';
import { useRecoilState } from 'recoil';
import { pageState } from '../atoms';


import Nav from './nav/nav'
import Dashboard from '../pages/dashboard/dashboard';
import Header from './header.component';
import Explore from '../pages/explore/explore'
import Profile from '../pages/profile/profile'
import Settings from '../pages/settings/settings'
import Error from '../pages/error/error'
import Admin from '../pages/admin/admin';
import Payroll from '../pages/payroll/payroll';
import Projects from '../pages/projects/projects';


const routes ={
  'dashboard':Dashboard,
  'explore':Explore,
  'settings':Settings,
  'profile':Profile,
  'error':Error,
  'admin':Admin,
  'projects':Projects,
  'payroll':Payroll
}

/** Container for the selected page's content
 * @returns a container holding the selected page
 */
const ContentRouter = () => {
  const [page, setPage] = useRecoilState(pageState);
  const CurrentPage = routes[page] 

  return (
    <div className='bg-gray-200 dark:bg-gray-700 h-screen w-screen transition-all flex no-wrap relative'>
      <Nav />
      <div className="w-11/12  px-2 transition-all mx-2 flex flex-col items-top justify-top h-screen overflow-y-scroll">
          <Header />
          <CurrentPage />
      </div>
    </div>
  );
};

export default ContentRouter;