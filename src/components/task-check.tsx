import styled from "@emotion/styled";
import { Button } from "../Button";
import { MAX_TITLE_LENGTH } from "../utils/constants";
import { isValidTaskTitle, isValidTaskTitleTwo } from "../utils/validation";
import type { Task } from "../entities/task";

const Check = styled.p`
  padding: ${p=> p.theme.spacing(0.4)};
  display: inline-block;
  color: ${p => p.theme.colors.success};
  border-radius: ${p => p.theme.spacing(0.4)};
  margin: ${p => p.theme.spacing(0.4)};
  font-size: ${p => p.theme.spacing(2.4)};
`;

const SoMany = styled.p`
  padding: ${p=> p.theme.spacing(0.1)} ${p=> p.theme.spacing(0.7)};
  display: inline-block;
  color: ${p => p.theme.colors.error};
  background-color: ${p => p.theme.colors.backgroundError};
  border: ${p => p.theme.spacing(0.1)} solid
  ${p => p.theme.colors.borderError};
  border-radius: ${p => p.theme.spacing(0.4)};
  margin-left: ${p => p.theme.spacing(1)};
  font-size: ${p => p.theme.spacing(2.4)};
`;

type TaskCheckProps = {
  symbols: number;
  task: string;
  tasks: Task[];
  handleAddItem: (p: string) => void;
}

export function TaskCheck(p: TaskCheckProps){
  let button;
  let symbolsCheck = 
    <Check>{p.symbols} &lt;= {MAX_TITLE_LENGTH}</Check>;

  if(isValidTaskTitle(p.task) === false){
    symbolsCheck = 
      <SoMany>{p.symbols} &gt; {MAX_TITLE_LENGTH}</SoMany>;
    button =
        <Button label={"cool press"} onClick={() => 0} />
  }
  else if(isValidTaskTitleTwo(p.task) === false){
    button =
      <Button onClick={() => p.handleAddItem('draft ' + '(' + (p.tasks.length + 1) + ')')} label={"cool press"} />
  }
  else{
    button =
        <Button  label={"cool press"} onClick={() => p.handleAddItem(p.task)}/>;
  }
  return <>{button} {symbolsCheck}</>
}

