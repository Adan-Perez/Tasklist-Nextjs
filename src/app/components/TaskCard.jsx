'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const TaskCard = ({ task }) => {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description);

    const handleDelete = async (id) => {
        console.log('Deleting task with id:', id);
        if (confirm('Are you sure you want to delete this task?')) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`,
                { method: 'DELETE' }
            );
            if (res.status === 204) {
                router.refresh();
            }
        }
    };

    const handleTaskDone = async (id) => {
        console.log('Marking task as done with id:', id);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
            { method: 'POST' }
        );
        if (res.status === 200) {
            router.refresh();
        }
    };

    const handleUpdate = async (id) => {
        console.log('Updating task with id:', id);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    title: newTitle,
                    description: newDescription,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await res.json();
        setNewTitle(data.title);
        setNewDescription(data.description);

        setIsEditing(!isEditing);
    };

    return (
        <div className='bg-slate-500 px-4 py-3 mb-2 rounded-md flex justify-between items-center'>
            <div className='flex flex-col space-y-2 items-start'>
                {!isEditing ? (
                    <h2 className='text-xl font-bold text-white'>
                        {newTitle}

                        {task.done ? (
                            <span className='text-green-500'> ✔️</span>
                        ) : (
                            <span className='text-red-500'> ❌</span>
                        )}
                    </h2>
                ) : (
                    <input
                        type='text'
                        placeholder={task.title}
                        className='bg-slate-500 text-white border-b-2 border-white p-2 rounded-md w-60'
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                )}

                {!isEditing ? (
                    <p className='text-white'>{newDescription}</p>
                ) : (
                    <textarea
                        placeholder={task.description}
                        className='bg-slate-500 text-white border-b-2 border-white p-2 rounded-md w-60'
                        rows={1}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                )}
            </div>

            <div className='flex space-x-2'>
                {isEditing && (
                    <button
                        className='bg-green-500 text-white px-2 py-1 rounded-md'
                        onClick={() => handleUpdate(task.id)}>
                        Guardar
                    </button>
                )}

                <button
                    className={`${
                        task.done ? 'bg-green-500' : 'bg-yellow-500'
                    } text-white px-2 py-1 rounded-md`}
                    onClick={() => handleTaskDone(task.id)}>
                    {task.done ? 'Desmarcar' : 'Marcar'}
                </button>

                <button
                    className='bg-red-500 text-white px-2 py-1 rounded-md'
                    onClick={() => handleDelete(task.id)}>
                    Eliminar
                </button>
                <button
                    className='bg-blue-500 text-white px-2 py-1 rounded-md'
                    onClick={() => setIsEditing(!isEditing)}>
                    Editar
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
