import React from 'react';
import TaskCard from './TaskCard';

async function loadTasks() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/tasks/`);
    const tasks = await res.json();
    return tasks;
}

const ListTask = async () => {
    const tasks = await loadTasks();
    console.log(tasks);

    return (
        <div className='bg-slate-700 p-4 w-full'>
            <h1>Tasks List</h1>

            {tasks.map((task) => (
                <TaskCard task={task} key={task.id} />
            ))}
        </div>
    );
};

export default ListTask;
