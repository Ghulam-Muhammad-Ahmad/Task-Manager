// src/AppwriteConfig.js
import { Client, Account, Databases, Query, Permission, Role } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6677c2e000285b05c0da'); // Your Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);

const checkAndCreateDocument = async (databaseId, collectionId, userId) => {
  try {
    const userIdInt = parseInt(userId, 10);

    const result = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('userId', userIdInt)
    ]);

    if (result.total > 0) {
      console.log(`Document with userId = ${userIdInt} already exists.`);
    } else {
      console.log(`No document with userId = ${userIdInt} found. Creating a new document.`);

      const newDocument = await databases.createDocument(
        databaseId,
        collectionId,
        'unique()', // or a unique ID generation logic
        {
          userId: userIdInt,
          categories: []
        },
        [Permission.read(Role.any()), Permission.write(Role.any()), Permission.update(Role.any()), Permission.delete(Role.any())]
      );
      console.log('Document created:', newDocument);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const getCategories = async (databaseId, collectionId, userId) => {
  try {
    const userIdInt = parseInt(userId, 10);

    const result = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('userId', userIdInt)
    ]);

    if (result.total > 0) {
      return result.documents[0].categories;
    } else {
      console.log(`No document with userId = ${userIdInt} found.`);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const updateCategories = async (databaseId, collectionId, documentId, categories) => {
  try {
    await databases.updateDocument(
      databaseId,
      collectionId,
      documentId,
      {
        categories
      }
    );
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

const getTasks = async (databaseId, collectionId, userId) => {
  try {
    const userIdInt = parseInt(userId, 10);

    const result = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('userId', userIdInt)
    ]);

    if (result.total > 0) {
      return {
        documentId: result.documents[0].$id,
        todos: result.documents[0].todos
      };
    } else {
      console.log(`No document with userId = ${userIdInt} found. Creating a new document.`);

      // Create a new document for tasks
      const newDocument = await databases.createDocument(
        databaseId,
        collectionId,
        'unique()',
        {
          userId: userIdInt,
          todos: []
        },
        [Permission.read(Role.any()), Permission.write(Role.any()), Permission.update(Role.any()), Permission.delete(Role.any())]
      );

      // console.log('New task document created:', newDocument);

      return {
        documentId: newDocument.$id,
        todos: []
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      documentId: null,
      todos: []
    };
  }
};


const addTask = async (databaseId, collectionId, userId, task, docId) => {
  try {
    const userIdInt = parseInt(userId, 10);

    // Retrieve the existing document
    const document = await databases.getDocument(databaseId, collectionId, docId);

    // Check if 'todos' is an array, if not initialize it as an array
    const todos = Array.isArray(document.todos) ? document.todos : [];

    // Convert the task to a string (assuming it can be stringified)
    const taskString = JSON.stringify(task);

    // Append the new task string to the 'todos' array
    todos.push(taskString);

    // Update the document with the modified 'todos' array
    await databases.updateDocument(
      databaseId,
      collectionId,
      docId,
      { todos }
    );

    console.log('Task added successfully.');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};



const updateDatabaseTask = async (databaseId, collectionId,  updatedtask, docId,itemId) => {
  try {
    const document = await databases.getDocument(databaseId, collectionId, docId);
    const todos = Array.isArray(document.todos) ? document.todos : [];
    todos[itemId] = JSON.stringify(updatedtask);
console.log("Updated: " + itemId);
    // Update the document with the modified 'todos' array
    await databases.updateDocument(
      databaseId,
      collectionId,
      docId,
      { todos }
    );

    console.log('Task Updated successfully.');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};


// const updateDatabaseTask = async (databaseId, collectionId, userId, docId, updatedTask) => {
//   try {
//     await databases.updateDocument(
//       databaseId,
//       collectionId,
//       docId,
//       {
//         todos: updatedTask
//       }
//     );
//   } catch (error) {
//     console.error('Error updating task:', error);
//   }
// };


const SeverdeleteTask = async (databaseId, collectionId, docId, itemId) => {
  try {
    const document = await databases.getDocument(databaseId, collectionId, docId);
    const todos = Array.isArray(document.todos) ? document.todos : [];
    todos.splice(itemId, 1);
console.log("Deleted: " + todos);
    // Update the document with the modified 'todos' array
    await databases.updateDocument(
      databaseId,
      collectionId,
      docId,
      { todos }
    );

    console.log('Task Deleted successfully.');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export {
  client,
  account,
  databases,
  checkAndCreateDocument,
  getCategories,
  updateCategories,
  getTasks,
  addTask,
  updateDatabaseTask,
  SeverdeleteTask,
  Query
};
