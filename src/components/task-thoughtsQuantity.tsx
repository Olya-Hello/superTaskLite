import styled from "@emotion/styled";
import type { Task } from "../entities/task";

const AllCheck = styled.ul`
  border-radius: ${p => p.theme.spacing(0.2)};
  display: inline;
  margin-right: ${p => p.theme.spacing(1)};
  padding: ${p => p.theme.spacing(0.4)};
  border-top: ${p => p.theme.spacing(0.3)} solid
  ${p => p.theme.colors.borderAllCheck};
  border-right: ${p => p.theme.spacing(0.3)} solid
  ${p => p.theme.colors.borderAllCheck};
  border-left: ${p => p.theme.spacing(0.3)} solid
  ${p => p.theme.colors.borderAllCheck};
  &: first-of-type{
  border-left: none;
  }
  &: last-child{
  border-right: none;
  }
`;

const ThoughtsContainer = styled.div`
  margin-top: ${p => p.theme.spacing(2)};
  margin-bottom: ${p => p.theme.spacing(3.7)};
  display: flex;
  justify-content: flex-end;
`;

type ThoughtsProp = {
  tasks: Task[]
}

export function Thoughts(p: ThoughtsProp){
  const completedTrue = p.tasks.filter(p => p.complete === true).length;
  const completedFalse = p.tasks.filter(p => p.complete === false).length;

  return(
          <ThoughtsContainer>
              <AllCheck>
                {p.tasks.length} thoughts
              </AllCheck>
              <AllCheck>
                {completedFalse} active
              </AllCheck>
              <AllCheck>
                {completedTrue} completed
              </AllCheck>
          </ThoughtsContainer>
    )
}

