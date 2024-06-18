import React, { useEffect, useState } from 'react'
import Addtasks from './Addtasks';
import Viewtasks from './Viewtasks';

export default function Operations(props) {
  const [title, settitle] = useState("");
  const [taskCat, settaskCat] = useState("");
  const [taskdesc, settaskdesc] = useState("");
  const [taskerror, settaskerror] = useState("");
  const [taskStatus, settaskStatus] = useState("");
  const [taskstate, settaskstate] = useState(false);
  const [updateid, setupdateid] = useState(null);


  const [tasks, settasks] = useState(() => {
      const storedTaks = JSON.parse(localStorage.getItem('toDo_tasks'));
      return storedTaks instanceof Array ? storedTaks : [];
  });

  useEffect(() => {
      localStorage.setItem('toDo_tasks', JSON.stringify(tasks));
  }, [tasks]);

function AddTask(title,desc,cat,status){
// console.log(title,desc,cat);
const today = new Date();
let currentDate = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
const newTaks = [];
newTaks.push({title,desc,cat,status,currentDate});
const updatedTasks = [...tasks, newTaks];
settasks(updatedTasks);
}
function edittask(id){
  settaskstate(true);
  const editstoredtask = JSON.parse(localStorage.getItem('toDo_tasks')).flat();
  const editTask = editstoredtask[id];
  settitle(editTask.title);
  settaskCat(editTask.cat);
  settaskdesc(editTask.desc);
  settaskStatus(editTask.status);
  settaskerror(editTask.error);
  setupdateid(id)
  // console.log(editTask)
}
function updateTask(title,id,desc,cat,status){
  const storedTasks = JSON.parse(localStorage.getItem('toDo_tasks')) || [];
  const tasks = storedTasks.flat();
  const taskIndex = id;
  console.log(taskIndex)
  const today = new Date();
let currentDate = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  if (taskIndex !== -1) {
    tasks[taskIndex] = []
      tasks[taskIndex].push({title,desc,cat,status,currentDate});
      localStorage.setItem('toDo_tasks', JSON.stringify(tasks));
  }
  settitle("");
  settaskdesc("");
  settaskCat("");
  settaskStatus("");
  setupdateid(null);
  settaskstate(false);
  settasks(() => {
    const storedTaks = JSON.parse(localStorage.getItem('toDo_tasks'));
    return storedTaks instanceof Array ? storedTaks : [];
});
}
function deleteTask(id) {

  
  const delete_storedTasks = JSON.parse(localStorage.getItem('toDo_tasks')) || [];
  const delete_tasks = delete_storedTasks; // Assuming tasks are not nested arrays

  const delete_taskIndex = id;
  console.log(delete_taskIndex);
  if (delete_taskIndex !== -1) {
    delete_tasks.splice(delete_taskIndex, 1); // Remove 1 element at index taskIndex
    localStorage.setItem('toDo_tasks', JSON.stringify(delete_tasks));
    
    // Assuming settasks is a state setter
    const updatedTasks = JSON.parse(localStorage.getItem('toDo_tasks'));
    settasks(updatedTasks instanceof Array ? updatedTasks : []);
  } else {
    console.log(`Task with id ${id} not found.`);
  }
}




  return (

    <div className='operations w-full  rounded-lg '>
      <div className="addtasking p-5 m-3 rounded-lg bg-[#F4F4F4] dark:bg-gray-800">

      <Addtasks cats={props.cats} addTask={AddTask} taskstate={taskstate} settitle={settitle} settaskCat={settaskCat} settaskStatus={settaskStatus} settaskdesc={settaskdesc} updateTask={updateTask} settaskerror={settaskerror} updateid={updateid}  taskCat={taskCat} title={title} taskStatus={taskStatus} taskdesc={taskdesc} taskerror={taskerror} />
      </div>
      <div className="viewtasking p-5 rounded-lg m-3 bg-[#F4F4F4] dark:bg-gray-800">
      <Viewtasks tasks={tasks} edittask={edittask} deleteTask={deleteTask} />
      </div>
    </div>


  )
}
