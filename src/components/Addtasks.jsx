import React, { useState } from 'react'
export default function Addtasks(props) {
    return (
        <>
            <div className="tasksforms flex flex-col gap-2 justify-center items-center w-full">
                <div className="md:w-2/5">
                    {props.taskstate ? <h3 className='text-lg font-bold text-black dark:text-white'>Edit Tasks</h3> : <h3 className=' dark:text-white text-lg font-bold text-black'>Add Tasks</h3>}
                </div>
                <label htmlFor="task_title" className='dark:text-white bg-transparent border border-2 border-gray-200 rounded-md p-2 w-full md:w-2/5'>
                    <input type="text"
                        placeholder='Enter Task Title'
                        className='bg-transparent focus:outline-none dark:text-white text-gray-600 w-full'
                        name='task_title '
                        onChange={(e) => props.settitle(e.target.value)}
                        value={props.title}
                        id='task_title' />
                </label>
                <select name="task_cat" id="task_cat" value={props.taskCat} placeholder="Select Category" className="bg-transparent dark:text-white border border-2 border-gray-200 rounded-md p-2 w-full md:w-2/5" onChange={(e) => props.settaskCat(e.target.value)}>
                    <option value="" className='dark:text-black'>Select Category</option>
                    {props.cats.map((cat) => {
                        return (
                            <option key={cat} className='dark:text-black' value={cat}>{cat}</option>
                        )
                    })
                    }
                </select>
                <select name="task_status" id="task_status" value={props.taskStatus} placeholder="Select Status" className="dark:text-white bg-transparent border border-2 border-gray-200 rounded-md p-2 w-full md:w-2/5" onChange={(e) => props.settaskStatus(e.target.value)}>
                    <option value=""  className='dark:text-black'>Select Status</option>
                    <option value="pending" className='dark:text-black'>Pending</option>
                    <option value="completed" className='dark:text-black'>Completed</option>
                    <option value="blocked" className='dark:text-black'>Blocked</option>
                </select>
                <textarea name="task_desc" id='task_desc' placeholder='Enter Task Description' className='bg-transparent h-44 dark:text-white border border-2 border-gray-200 rounded-md p-2 w-full md:w-2/5' value={props.taskdesc} onChange={(e) => props.settaskdesc(e.target.value)}>
                </textarea>

                <div className="button md:w-2/5 w-full flex flex-col justify-start items-start">
                    <span className='text-red-600 text-sm font-bold'>
                        {props.taskerror}
                    </span>
                    <button
                        onClick={() => {
                            if (props.taskstate) { 
                                if (props.title && props.taskdesc && props.taskCat && props.taskStatus) {
                                    props.updateTask(props.title, props.updateid, props.taskdesc, props.taskCat, props.taskStatus);
                                    props.settitle("");
                                    props.settaskdesc("");
                                    props.settaskCat("");
                                    props.settaskStatus("");
                                    props.settaskerror("");

                                } else {
                                    props.settaskerror("Please fill all the fields");
                                }  
                            } else {
                                if (props.title && props.taskdesc && props.taskCat && props.taskStatus) {
                                    props.addTask(props.title, props.taskdesc, props.taskCat, props.taskStatus);
                                    props.settitle("");
                                    props.settaskdesc("");
                                    props.settaskCat("");
                                    props.settaskStatus("");
                                    props.settaskerror("")

                                } else {
                                    props.settaskerror("Please fill all the fields");
                                }
                            }
                        }}
                        type='button'
                        className='bg-[#3763d2] dark:bg-white dark:text-black text-white border border-2 border-gray-200 rounded-md p-2 w-full md:w-2/5'
                    >
                        {props.taskstate ? "Edit Task" : "Add Task"}
                    </button>

                </div>
            </div>
        </>
    )
}
