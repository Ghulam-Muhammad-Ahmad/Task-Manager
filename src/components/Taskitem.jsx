import React, { useState, useEffect } from 'react';

export default function TaskItem(props) {
    const [due, setDue] = useState(false)
    const Datenow = new Date();
    if(Datenow > props.duedate){

    }
    return (
        <div className={`task max-w-min p-3 dark:text-white bg-slate-200 task_${props.id} dark:bg-gray-800 border rounded-md border-2`}>
            <div className="header flex justify-between dark:text-white items-center gap-24">
                <h3 className='text-black font-semibold dark:text-white text-lg capitalize'>
                    {props.title}
                </h3>
                <div className="controls flex">
                    <div className="edit cursor-pointer" onClick={() => props.edittask(props.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                    <div className="delete cursor-pointer" onClick={() => props.deleteTask(props.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="body pb-2">
                {props.desc}
            </div>
            {
                (props.url !== undefined && props.url !== "") ? (
                    <a href={props.url} className="body pb-2 flex gap-2 hover:text-yellow-500" target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                        Link
                    </a>
                ) : null
            }


            <div className="status flex justify-center items-center text-nowrap gap-1">          
            {
  props.status != 'completed' ?
  (
    new Date() > new Date(props.duedate) ?
    <div className="stat p-2 text-white rounded-md font-medium capitalize bg-red-600">Overdue {props.duedate}</div>
    :
    <div className="stat p-2 text-white rounded-md font-medium capitalize bg-green-500">Due {props.duedate}</div>
  )
  :
  <div className="stat p-2 text-white rounded-md font-medium capitalize bg-green-500">Due {props.duedate}</div>
}      
              
               
                {/* <div className="stat p-2 text-white rounded-md font-medium capitalize bg-[#3763d2]">{props.currentDate}</div> */}
                <div className={`stat p-2 rounded-md text-white font-medium capitalize ${props.status === 'completed' ? 'bg-green-500' :
                    props.status === 'pending' ? 'bg-yellow-500' :
                        props.status === 'blocked' ? 'bg-red-500' :
                            'bg-slate-300'}`}>
                    {props.status}
                </div>
                <div className="stat p-2 text-white rounded-md font-medium capitalize bg-[#9d9d9d]">{props.cat}</div>
            </div>
        </div>
    );
}
