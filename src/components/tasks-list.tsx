import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { TaskItem } from "./task-item";

const StyledList = styled.ul`
    margin-top: ${p => p.theme.spacing(0.25)};
    border-radius: ${p => p.theme.radius.lg};
    color: ${p => p.theme.colors.text};
    padding: ${p => p.theme.spacing(4)};
    border: ${p => p.theme.spacing(0.4)} solid 
    ${p => p.theme.colors.border.borderList};
    background-color: ${p => p.theme.colors.backgroundList};
    margin-bottom: ${p => p.theme.spacing(0.4)};
`;

const Empty = styled.ul`
    display: flex;
    justify-content: center;
`;

type TasksListProp ={
    tasks: Task[];
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
    onToggle: (id: string) => void;
};

export function TaskList(p: TasksListProp){
    let list = p.tasks.map(task => (
        <TaskItem 
            task={task}
            key={task.id}
            onRemove={p.onRemove}
            onEdit={p.onEdit}
            onToggle={p.onToggle}
        />
    ));

    const result = list.length > 0 ? list : <Empty>empty... that's not cool</Empty>;

    return(
        <StyledList>
            {result}
        </StyledList>
    )
}

