import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { Button} from "../Button";
import { useState } from "react";
import { useTheme } from "@emotion/react";

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

const DeadlineText = styled.span<{color: string}>`
    color: ${p => p.color};
`;

type TaskItemProp = {
    task: Task;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
    onToggle: (id: string) => void;
}

export function TaskItem(p: TaskItemProp) {
  const [showDescription, setShowDescription] = useState(false);

  const theme = useTheme();

  function getDeadline(date: Date){
    const now = new Date();
    // const days = date.getTime();
    const diff = date.getTime() - now.getTime();
    const days = diff / (24 * 3600 * 1000);
    if(days < 0) return theme.colors.error;
    if(days <= 1) return theme.colors.taskLine;
    return theme.colors.accent
  }

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
                <div>
                    <p>
                        {p.task.created.toLocaleString()} <DeadlineText color={getDeadline(
                            p.task.deadline === undefined || p.task.deadline ===  null ? new Date : p.task.deadline)}> 
                            → 
                        </DeadlineText>
                    </p>
                    {p.task.deadline  && 
                    <>
                    <DeadlineText color={getDeadline(p.task.deadline)}> {
                        p.task.deadline.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            }).replace('.', ' | ').replace('.', ' | ') 
                        }
                    </DeadlineText>
                    </>}
                </div>
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

