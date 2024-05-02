import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { darkMode } from '../atoms';
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { GET_USER } from '../access/queries/get_user';
import { useQuery } from '@apollo/client';

function HandleLogout(){
  const auth = getAuth();
  signOut(auth)
  .then(() => {
      console.log('signed out')
  })
  .catch((error) => {   
      console.log('error in signout')
      console.log(error)
  });
}


/** Contains the user icon, dark mode toggle and search bar toggle
 *
 * @returns the header of the website
 */
const Header = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const {data , loading:queryLoading, error:queryError} = useQuery(GET_USER,{
    variables: {
      where:{
        email:user?.email
      }
    }
  })

  const [theme, setTheme] = useRecoilState(darkMode);
  const [tooltip,setTooltip] = useState(false)

  // sets document theme to dark if not yet set
  useEffect(() => {
    document.documentElement.classList.add('dark');
    setTheme('dark');
  }, []);

  return (
    <div className="flex justify-end">
      <div className="my-auto">
        <button
          className="block"
          onClick={() => {
            if (theme === 'dark') {
              document.documentElement.classList.remove('dark');
              setTheme('light');
            } else {
              document.documentElement.classList.add('dark');
              setTheme('dark');
            }
          }}
        >
          {theme === 'dark' ? '🌝' : '🌚'}
        </button>
      </div>
      <div className="p-2">
        <button
          type="button"
          className="rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => {
            tooltip ? setTooltip(false) : setTooltip(true)
        }}
        >
          <img className="rounded-full shadow w-12 h-12" src={data?.users[0]?.img} />
        </button>
        <div
          className={
            `top-16 right-2 shadow-xl shadow-gray-400 dark:shadow-gray-900 absolute z-50 bg-gray-200 rounded-lg dark:bg-gray-600 transition-all ease-in-out duration-200 overflow-hidden ${(tooltip ? 'h-48 p-2' : 'h-[0%] p-0 ')}`
          }
        >
          <div className="text-gray-800 dark:text-gray-200 text-center px-3 w-fit ">
            <img
              src={data?.users[0].img}
              className="rounded-full mx-auto w-14 h-14 shadow-xl"
            />
            <p className="py-2 text-gray-700 whitespace-nowrap dark:text-gray-200 m-auto block">
              {data?.users[0].first} {data?.users[0].last}
            </p>
            <hr className="border-2 border-solid border-gray-100 rounded" />
            <p className="py-2 dark:hover:text-gray-800 text-gray-700 dark:text-gray-200 cursor-pointer whitespace-nowrap">
              view profile
            </p>
            <hr className="border-2 border-solid border-gray-100 rounded" />
            <p 
              className="py-2 dark:hover:text-gray-800 text-gray-700 dark:text-gray-200 cursor-pointer whitespace-nowrap"
              onClick={() => {
                  HandleLogout()
                  localStorage.clear()
                  window.location.reload()
              }}
            >sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
