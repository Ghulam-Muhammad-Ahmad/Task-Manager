// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import Existcat from './Existcat';
import { account, databases, checkAndCreateDocument, getCategories, updateCategories, Query } from '../AppwriteConfig';

export default function Sidebar(props) {
    const [catinput, setcatinput] = useState("");
    const [cats, setcats] = useState([]);
    const [documentId, setDocumentId] = useState(null);

    useEffect(() => {
        const fetchSessionAndCategories = async () => {
            try {
                const session = await account.get();

                if (!session) {
                    console.error('User is not authenticated.');
                    return;
                }

                const userId = parseInt(session.$id, 10);
                const databaseId = '6677c3ce000b080c49ae'; // Replace with your database ID
                const collectionId = '6677c3e40037a89d648e'; // Replace with your collection ID

                await checkAndCreateDocument(databaseId, collectionId, userId);

                const categories = await getCategories(databaseId, collectionId, userId);
                setcats(categories);

                const result = await databases.listDocuments(databaseId, collectionId, [
                    Query.equal('userId', userId)
                ]);
                if (result.total > 0) {
                    setDocumentId(result.documents[0].$id);
                }
            } catch (error) {
                console.error('Error fetching session or categories:', error);
            }
        };

        fetchSessionAndCategories();
    }, []);

    useEffect(() => {
        if (documentId) {
            const databaseId = '6677c3ce000b080c49ae'; // Replace with your database ID
            const collectionId = '6677c3e40037a89d648e'; // Replace with your collection ID

            updateCategories(databaseId, collectionId, documentId, cats);
            props.setcat(cats);
        }
    }, [cats, documentId, props]);

    function submitCat(e) {
        e.preventDefault();
        const updatedCats = [...cats, catinput];
        setcats(updatedCats);
        setcatinput("");
    }

    return (
        <>
            <div className="text-lg font-bold text-center dark:text-white text-slate-900">
                Categories
            </div>
            <p className='text-sm font-light pb-4 text-slate-600 dark:text-white text-center'>
                These are the categories to set the Tasks accordingly.
            </p>
            <div className=''>
              <form onSubmit={submitCat} className='flex justify-between p-2 align-middle border border-2 border-gray-200 rounded-md'>
                <label htmlFor="categories_input" className='bg-transparent'>
                    <input
                        type="text"
                        required
                        placeholder='Enter Category'
                        className='bg-transparent dark:text-white focus:outline-none text-gray-600'
                        name='categories_input'
                        onChange={(e) => setcatinput(e.target.value)}
                        value={catinput}
                        id='categories_input'
                    />
                </label>
                <button type='submit' className='flex justify-center align-middle'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" className='dark:text-white text-slate-900' strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                </form>
            </div>
            <Existcat categories={cats} setCategories={setcats} />
        </>
    );
}
