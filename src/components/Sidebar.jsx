import React, { useState, useEffect } from 'react';
import Existcat from './Existcat';

export default function Sidebar(props) {
    const [catinput, setcatinput] = useState("");
    const [cats, setcats] = useState(() => {
        const storedCats = JSON.parse(localStorage.getItem('toDo_categories'));
        return storedCats instanceof Array ? storedCats : [];
    });

    useEffect(() => {
        localStorage.setItem('toDo_categories', JSON.stringify(cats));
props.setcat(cats);
    }, [cats]);

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
            <div className='flex justify-between p-2 align-middle border border-2 border-gray-200 rounded-md'>
                <label htmlFor="categories_input" className='bg-transparent'>
                    <input
                        type="text"
                        placeholder='Enter Category'
                        className='bg-transparent dark:text-white focus:outline-none text-gray-600'
                        name='categories_input'
                        onChange={(e) => setcatinput(e.target.value)}
                        value={catinput}
                        id='categories_input'
                    />
                </label>
                <button onClick={submitCat} className='flex justify-center align-middle'>
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
            </div>
            <Existcat categories={cats} setCategories={setcats} />
        </>
    );
}
