import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "./constants";

export function isValidTaskTitle(title: string): boolean {
    return title.trim().length <= MAX_TITLE_LENGTH;
};

export function isValidTaskTitleTwo(title: string): boolean {
    return title.trim().length > 0;
};

export function isValidTaskDescription(description: string): boolean {
    return description.trim().length <= MAX_DESCRIPTION_LENGTH;
};


