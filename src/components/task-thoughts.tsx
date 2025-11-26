import styled from "@emotion/styled";
import { theme } from "../styles/theme";

const StateContainer = styled.span`
  margin-top: ${p => p.theme.spacing(4)};
  margin-left: ${p => p.theme.spacing(3.3)};
`;

const State = styled.p<{color: string}>`
  color: ${p => p.color};
  display: inline;
`;

type TaskStateCompletedProp = {
  filter: string,
  quantity: number,
  tasksLength: number
}

export function TaskStateCompleted (p: TaskStateCompletedProp){
  let colorText = 
    p.filter === 'all' ? theme.colors.all : 
    p.filter === 'active' ? theme.colors.completed : 
    theme.colors.active
  ;

  let quantity = 
    <>
      <State color={colorText}>
        {p.quantity}
      </State>
      /{p.tasksLength}
    </>
  ;
  
  if(p.filter === 'all'){
    quantity = <></>;
  }

  return <StateContainer>
    <State color={colorText}>
      {
      p.filter === 'all' ? ' all' : 
      p.filter === 'active' ? ' completed' : 
      ' active'
      }
    </State> thoughts {quantity}
  </StateContainer>
}

