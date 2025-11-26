import type { Task } from "./task";

const STORAGE_KEY = 'tasks';
export function saveToLocalstorage(tasks: Task[]){
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

export function loadTasks(): Task[]{
    const saved = localStorage.getItem(STORAGE_KEY);
    if(!saved) return [];

    const parsed = JSON.parse(saved);
    return parsed.map((task: Task) => ({
        ...task,
        deadline: task.deadline ? new Date(task.deadline) 
        : null
    }));
}




// export function loadTasks(): Task[] {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (!saved) return [];

//     try {
//         const parsed = JSON.parse(saved);
//         return parsed.map((task: Task) => ({
//             ...task
//         }));
//     } catch (e) {
//         console.error('Ошибка при парсинге JSON из localStorage:', e);
//         return [];
//     }
// }

