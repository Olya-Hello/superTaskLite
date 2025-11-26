import styled from "@emotion/styled";

const ButtonFilter = styled.button<{active: boolean}>`
  color: ${p => p.theme.colors.surface};
  cursor: pointer;
  padding: ${p => p.theme.spacing(2)};
  border: none;
  border-radius: ${p => p.theme.spacing(2)};
  margin-right: ${p => p.theme.spacing(0.4)};
  margin-top: ${p => p.theme.spacing(1)};
  border-left: 3px solid ${p => p.active ? p.theme.colors.accentBorderGray : p.theme.colors.accent};
  background-color: ${p => p.active ? p.theme.colors.accentGray : p.theme.colors.accentShadow};
  &:hover {
  background-color: ${p => p.theme.colors.accent};
  border-left: 3px solid ${p => p.theme.colors.accentHover};
  };
`;

type TaskCheckProps = {
  filter: string,
  setFilter: (p: string) => void,
}

export function TaskButtonCompleted (p: TaskCheckProps){
  return <>
    <ButtonFilter active={p.filter ==='all'} onClick={() => p.setFilter('all')}>
      all
    </ButtonFilter>
    <ButtonFilter active={p.filter ==='active'} onClick={() => p.setFilter('active')}>
      completed
    </ButtonFilter>
    <ButtonFilter active={p.filter ==='completed'} onClick={() => p.setFilter('completed')}>
      active
    </ButtonFilter>
  </>
}

