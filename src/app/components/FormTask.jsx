'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const FormTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('title', title);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
            {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await res.json();
        console.log(data);
        router.refresh();
    };
    return (
        <>
            <div className='bg-slate-300 p-7 rounded-md h-fit'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-black font-bold'>Add Task</h2>
                    <label htmlFor='title' className='text-black text-xs'>
                        Title:
                    </label>
                    <input
                        type='text'
                        name='title'
                        className='bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900'
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor='description' className='text-black text-xs'>
                        Description:
                    </label>
                    <textarea
                        name='description'
                        className='bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900'
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button
                        type='submit'
                        className='bg-slate-500 text-white rounded-md p-2 block w-full'>
                        Add Task
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormTask;
