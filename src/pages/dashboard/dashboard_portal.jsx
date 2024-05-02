import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { UPDATE_EVENT } from '../../access/mutations/update_event.mjs';
import { GET_EVENTS } from '../../access/queries/get_events.mjs';
import { GET_SKILL } from '../../access/queries/get_skill';
import { SkillCardNoBgXs } from '../../components/custom.library';
import { ScrollLoader } from '../../components/prebuilt.library.jsx';

const Event = ({event}) => {
  const auth = getAuth()
  const [updateEvent,{loading:likeLoading}] = useMutation(UPDATE_EVENT,{
    refetchQueries:[GET_EVENTS]
  })

  const onLike = async({id}) => {
    await updateEvent({
      variables:{
        where: {
            id: id
        },
        update: {
            likes: [
              {
                connect: [
                  {
                    where: {
                      node: {
                        email: auth.currentUser.email
                      }
                    }
                  }
                ]
              }
            ]
        }
      }
    })
  }

  const onDislike = async({id}) => {
    await updateEvent({
      variables:{
        where: {
            id: id
        },
        update: {
            likes: [
              {
                disconnect: [
                  {
                    where: {
                      node: {
                        email: auth.currentUser.email
                      }
                    }
                  }
                ]
              }
            ]
        }
      }
    })
  }

  const titles = {
    'new_user':"Our team just got bigger!",
    'aquired_skill':"Someone's been Grinding!"
  }

  return (
    <div className="dark:shadow-lg bg-gray-200 rounded-lg p-2 my-4 dark:bg-gray-500">
        <p className="dark:text-gray-300 text-lg">{titles[event.topic]}</p>
        <p className="dark:text-gray-400 text-md italic ">{event.date}</p>

        <div className="p-2">
          <p className="py-2 dark:text-gray-300">{event.description}</p>
        </div>

        <div 
          className='flex text-gray-300 cursor-pointer'
          onClick={()=>{
            if(event.likes.filter(like => like.email===auth.currentUser.email).length)
              onDislike(event.id)
            else
              onLike(event.id)
          }}
        >
          {likeLoading?(
            <ScrollLoader className="border"/>
          ):(
            <>
              <Icon icon="octicon:thumbsup-16" className='my-auto'/>
              <p className='my-auto mx-2'>{event.likes.length}</p>
            </>
          )}
        </div>
      </div>
  )
}


const PortalPostDirectory = () => {
  const {data,loading} = useQuery(GET_EVENTS)

  return (
    <div className="mx-4 overflow-auto">
      {data?.events.map((event, index) => {
        return (
          <Event event={event} key={index+"-"+event.topic} />
        )
      })}
    </div>
  );
};






const DashboardPortal = () => {
  const {data} = useQuery(GET_SKILL)

  return (
    <div className="overflow-y-scroll">
      <div className="flex flex-row no-wrap max-h-full">
        <div className="grow-0 w-full flex h-fit">
          <PortalPostDirectory /> 
          <div className="flex-none w-2/5 block sm:hidden md:hidden lg:block xl:block">
            <div className="mx-4 bg-gray-600 dark:bg-gray-600 p-4 rounded-lg ">
              <p className="text-xl text-white">Have you seen these skills?</p>

              <div className='flex flex-wrap'>
                {data?.skills.map((skill,index) => {
                  if(index < 8)
                    return <SkillCardNoBgXs className={"w-1/4"} skill={skill} key={index} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPortal;
