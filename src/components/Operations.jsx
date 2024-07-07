// src/Operations.jsx
import React, { useEffect, useState } from 'react';
import Addtasks from './Addtasks';
import Viewtasks from './Viewtasks';
import {
  databases,
  account,
  checkAndCreateDocument,
  getCategories,
  updateCategories,
  getTasks,
  addTask,
  updateDatabaseTask,
  SeverdeleteTask
} from '../AppwriteConfig'; // Adjust path as necessary

export default function Operations(props) {
  const [title, settitle] = useState('');
  const [titleurl, settitleurl] = useState('');
  const [taskCat, settaskCat] = useState('');
  const [taskdesc, settaskdesc] = useState('');
  const [taskerror, settaskerror] = useState('');
  const [taskStatus, settaskStatus] = useState('');
  const [taskduedate, settaskduedate] = useState('');

  const [taskstate, settaskstate] = useState(false);
  const [updateid, setupdateid] = useState(null);
  const [taskNum, settaskNum] = useState(0);
  const [tasks, settasks] = useState([]);
  const [docId, setdocId] = useState(null);


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const session = await account.get();

      if (!session) {
          console.error('User is not authenticated.');
          return;
      }

      const userId = parseInt(session.$id, 10);

      const fetchedTasks = await getTasks('6677c3ce000b080c49ae', '6677c4820035a3611e2e', userId); // Replace with actual IDs
      settasks(fetchedTasks.todos);
      settaskNum(fetchedTasks.todos.length);
      setdocId(fetchedTasks.documentId);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const AddTask = async (title, desc, cat, status, url, duedate) => {
    const today = new Date();
    let currentDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    const newTask = { title, desc, cat, status, url, duedate, currentDate };

    try {
      await addTask('6677c3ce000b080c49ae', '6677c4820035a3611e2e', props.userId, newTask, docId); // Replace with actual IDs
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = (id) => {
    settaskstate(true);
    console.log(tasks);
    
    const editTask = JSON.parse(tasks[id]); // Parse the JSON string to get the task object
    
    settitle(editTask.title);
    settaskCat(editTask.cat);
    settaskdesc(editTask.desc);
    settaskStatus(editTask.status);
    settaskerror(editTask.error); // Assuming error is part of the task object
    settitleurl(editTask.url);
    setupdateid(id);
};


  // const updateTask = async (id, title, desc, cat, status, url) => {
  //   const updatedTask = { title, desc, cat, status, url };

  //   try {
  //     await updateTask('6677c3ce000b080c49ae', '6677c4820035a3611e2e', props.userId, docId, updatedTask); // Replace with actual IDs
  //     fetchTasks();
  //     settitle('');
  //     settaskdesc('');
  //     settaskCat('');
  //     settaskStatus('');
  //     settitleurl('');
  //     setupdateid(null);
  //     settaskstate(false);
  //   } catch (error) {
  //     console.error('Error updating task:', error);
  //   }
  // };
  const updateTask = async (id, title, desc, cat, status, url) => {
    const today = new Date();
    let currentDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    const updatedTask = { title, desc, cat, status, url, currentDate };

    try {
      const databaseId = '6677c3ce000b080c49ae'; // Replace with actual database ID
      const collectionId = '6677c4820035a3611e2e'; // Replace with actual collection ID
  
      await updateDatabaseTask(databaseId, collectionId, updatedTask, docId, updateid);
      fetchTasks();
      settitle('');
      settaskdesc('');
      settaskCat('');
      settaskStatus('');
      settitleurl('');
      setupdateid(null);
      settaskstate(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log(id);
      await SeverdeleteTask('6677c3ce000b080c49ae', '6677c4820035a3611e2e', docId , id); // Replace with actual IDs
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="operations w-full rounded-lg">
      <div className="addtasking p-5 m-3 rounded-lg bg-[#F4F4F4] dark:bg-gray-800">
        <Addtasks
          isValidUrl={isValidUrl}
          cats={props.cats}
          titleurl={titleurl}
          settitleurl={settitleurl}
          addTask={AddTask}
          taskstate={taskstate}
          settitle={settitle}
          settaskCat={settaskCat}
          settaskStatus={settaskStatus}
          settaskdesc={settaskdesc}
          taskduedate={taskduedate}
          settaskduedate={settaskduedate}
          updateTask={updateTask}
          settaskerror={settaskerror}
          updateid={updateid}
          taskCat={taskCat}
          title={title}
          taskStatus={taskStatus}
          taskdesc={taskdesc}
          taskerror={taskerror}
        />
      </div>
      <div className="viewtasking p-5 rounded-lg m-3 bg-[#F4F4F4] dark:bg-gray-800">
        <Viewtasks tasks={tasks} taskNum={taskNum} edittask={editTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
