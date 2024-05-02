import React from 'react';
import DashboardPortal from './dashboard_portal';

import { useQuery } from '@apollo/client';
import { GET_USER } from '../../access/queries/get_user';

import { getAuth } from "firebase/auth";

/** Header of Dashboard
 * @returns the dashboard header
 */
const DashboardHeader = () => {
  const auth = getAuth()
  const { data, loading, error } = useQuery(GET_USER,{
      variables: {
          "where":{
            "email": auth.currentUser.email
          }
      }
  });


  return (
      <div className="bg-gray-900 rounded w-full p-4 my-4">
        <p className="text-gray-200 text-4xl">Hello there, {data?.users[0].first}</p>
      </div>
  );
};

/** Launches the dashboard
 *
 * @returns the content of the dashboard page
 */
const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardPortal />
    </>
  );
};

export default Dashboard;
