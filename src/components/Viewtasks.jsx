import React from 'react'
import Taskitem from './Taskitem';

export default function Viewtasks(props) {
    return (
        <div>
            <div className="viewheader flex justify-between items-start">
                <div className="body1">
                    <h3 className='text-lg mb-3 font-bold mt-5 text-black dark:text-white'>View Tasks <span className='bg-[#3763d2] dark:bg-white dark:text-black text-white px-3 py-1.5 rounded-full'>{props.taskNum}</span></h3>
                    {props.tasks.length === 0 ? (
                        <p className='text-sm font-semibold dark:text-white'>No Tasks</p>
                    ) : (
                        <div>
                            <p className='text-sm font-light pb-4 text-slate-600 dark:text-white'>You can see and edit the tasks From Here</p>
                        </div>
                    )}
                </div>
                <div className="body2">
                    {/* <button onClick={()=>{
                        //   localStorage.setItem('toDo_tasks') = [];
                        localStorage.setItem("toDo_tasks" , []);
                          props.settasks([]);
                    }} className=' text-black dark:text-white border border-2 border-gray-200 rounded-md p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  </button> */}
                </div>
            </div>

            <div className="viewtask w-full dark:text-white flex gap-3 justify-start align-middle flex-wrap">

            {props.tasks.flat().map((taskStr, index) => {
    const task = JSON.parse(taskStr);
    return (
        <Taskitem
            key={index}
            id={index}
            edittask={props.edittask}
            title={task.title}
            desc={task.desc}
            cat={task.cat}
            url={task.url}
            duedate={task.duedate}
            status={task.status}
            currentDate={task.currentDate}
            deleteTask={props.deleteTask}
        />
    );
})}


            </div>
        </div>
    )
}
