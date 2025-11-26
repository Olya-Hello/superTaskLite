import creationDate from "../utils/data";
import { generateId } from "../utils/id";

export type Task = {
    readonly id: string;
    title: string;
    description: string;
    created: string;
    dedline?: Date | null;
    complete: boolean;
}

export type Filter = "all" | "active" | "completed";

export function makeTask(title: string): Task{
    return{
        id: generateId(),
        title: title.trim().replace(/\s+ /g, " "),
        created: "created " + creationDate,
        complete: false,
        description: ''
    }
}

