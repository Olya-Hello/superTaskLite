import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { Button} from "../Button";
import { useState } from "react";

const ButtonListContainer = styled.div`
  display: flex; 
  gap: ${p => p.theme.spacing(0.5)};
`;

const Item = styled.div`
    padding: ${p => p.theme.spacing(1)};
    padding-bottom: ${p => p.theme.spacing(1.2)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 ${p => p.theme.spacing(0.7)};
    transition: margin 0.4s ease, box-shadow 0.4s ease;
    border-left: ${p => p.theme.spacing(0.4)} solid ${p => p.theme.colors.accentShadow};

    &: hover {
    box-shadow: 0 7px 17px rgba(0,0,0,0.2);
    margin: 0;
    border-left: ${p => p.theme.spacing(0.4)} solid ${p => p.theme.colors.accent};
    }
`;

const TextListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${p => p.theme.spacing(2)};
`;

const TaskItemsContainer = styled.div`
    display: flex;
`;

const ButtonDescription = styled.h4`
    display: flex;
    margin-left: ${p => p.theme.spacing(1)};
    cursor: pointer;
`;

const TitleTask = styled.h3<{completed: boolean}>`
    color: ${p => p.completed ? "gray" : "none"};
    text-decoration: ${p => p.completed ? "line-through" : "none"};
    cursor: pointer;
`;

const Description = styled.div`
    padding: ${p => p.theme.spacing(1)};
    background: linear-gradient(135deg, ${p => p.theme.colors.surface} 0%, ${p => p.theme.colors.backgroundList} 100%);
`;

const Krestik = styled.span`
    font-size: ${p => p.theme.spacing(2.7)};
`;

type TaskItemProp = {
    task: Task;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
    onToggle: (id: string) => void;
}

export function TaskItem(p: TaskItemProp) {
  const [showDescription, setShowDescription] = useState(false);

  const description = p.task.description.trim() !== '';

    const showTitle = false ? (
        <h3
        onClick={() => p.onToggle(p.task.id)}>
            {p.task.title}
        </h3>
    ) : (
        <TitleTask
          completed={p.task.complete}
          onClick={() => p.onToggle(p.task.id)}>
            {p.task.title}
        </TitleTask>
    );

    return (
        <Item>
            <TextListContainer>
                <TaskItemsContainer>
                    {showTitle}
                    {description && (
                    <ButtonDescription
                    onClick={() => setShowDescription(p => !p)}>
                        <h4>...</h4>
                    </ButtonDescription>
                    )}
                </TaskItemsContainer>{showDescription && (
                <Description>
                    {p.task.description.trim().replace(/\s+/g, " ")}
                </Description>
                )}
                <p>{p.task.created.toLocaleString()}</p>
            </TextListContainer>

            <ButtonListContainer>
                <Button label="&#9998;"
                onClick = {() => p.onEdit(p.task)} />
                
                <Krestik>
                    <Button label="&#10005;"
                    onClick = {() => p.onRemove(p.task.id)} />
                </Krestik>
            </ButtonListContainer>
        </Item>
    );
}









/*
export function TaskItem(p: TaskItemProp) {
    const [title, setTitle] = useState(p.task.title);
    const [isEditing, setisEditing] = useState(false);

    const showTitle = isEditing ? (
        <input 
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleSave}
        />
    ) : (
        <h3>{p.task.title}</h3>
    );

    function handleSave(){
        p.onEdit(p.task.id, title);
        setisEditing(false)
    }

    return (
        <Item>
            <TextListContainer>
                {showTitle}
                <p>{p.task.created.toLocaleString()}</p>
            </TextListContainer>

            <ButtonListContainer>
                <Button label="&#9998;"
                onClick = { () => p.onEdit(p.task)}>
                </Button>
                
                <Button label="&#10060;"
                onClick = { () => {
                    p.onRemove(p.task.id); 
                }}>    
                </Button>
            </ButtonListContainer>
        </Item>  
    );
}
*/