import styled from "@emotion/styled";
import type { Task } from "../entities/task";

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button<{percent: number}>`
  color: ${p => p.theme.colors.surface};
  cursor: pointer;
  padding: ${p => p.theme.spacing(1.5)} ${p => p.theme.spacing(3)};
  border-bottom-left-radius: ${p => p.theme.spacing(5)};
  border-bottom-right-radius: ${p => p.theme.spacing(2)};
  border-top: ${p => p.theme.spacing(0.3)} dashed ${p => p.theme.colors.taskLine};
  border-left:  ${p => p.theme.spacing(0.5)} solid ${p => p.theme.colors.taskLine};
  background-color: ${p => p.theme.colors.taskLineShadow};
  border-top: ${p => p.theme.spacing(0.4)} dashed ${p => p.percent === 100 ? p.theme.colors.taskLineShineBorder : p.theme.colors.taskLine};

  &: hover {
  color: ${p => p.theme.colors.taskLine};
  background-color: ${p => p.theme.colors.taskLineShineBorder};
  border-left: ${p => p.theme.spacing(0.5)} solid ${p => p.theme.colors.taskLineShineBorder};
  border-top: ${p => p.theme.spacing(0.4)} dashed ${p => p.theme.colors.taskLine};
  };
`;

type ButtonClearCompletedProp = {
  setTasks: (q: any) => void
  percent: number
}

export function ButtonClearCompleted(p: ButtonClearCompletedProp) {
  const handleRemoveCompleted = () => {
    p.setTasks(
      (tasks: Task[]) => tasks.filter(task => !task.complete)
    );
  };

  return (
  <StyledButtonContainer>
      <StyledButton
        onClick={handleRemoveCompleted}
        percent={p.percent}> 
          clear completed
      </StyledButton>
  </StyledButtonContainer>
  );
}

