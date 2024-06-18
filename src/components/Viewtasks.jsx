import React from 'react'
import Taskitem from './Taskitem';

export default function Viewtasks(props) {
    return (
        <div>
            <h3 className='text-lg font-bold mt-5 text-black dark:text-white'>View Tasks</h3>
            {props.tasks.length === 0 ? (
                <p className='text-sm font-semibold dark:text-white'>No Tasks</p>
            ) : (
                <div>
                    <p className='text-sm font-light pb-4 text-slate-600 dark:text-white'>You can see and edit the tasks From Here</p>
                </div>
            )}

            <div className="viewtask dark:text-white flex gap-3 justify-start align-middle flex-wrap">

                {props.tasks.flat().map((task, index) => {
                    return (
                        <Taskitem
                            key={index}
                            id={index}
                            edittask={props.edittask}
                            title={task.title}
                            desc={task.desc}
                            cat={task.cat}
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
