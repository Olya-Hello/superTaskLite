import styled from "@emotion/styled";

export const Line = styled.div<{active: number}>`
  margin-top: ${p => p.theme.spacing(2)};
  color: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.spacing(2)};
  border-bottom-right-radius: 0;
  border: 3px solid ${p => p.theme.colors.taskLineShineBorder};
  border-bottom: none;
  background-color: ${p => p.theme.colors.taskLineShine};
`;

export const Completed = styled.div<{active: number}>`
  background-color: ${p => p.theme.colors.taskLineShadow};
  width: ${p => p.active}%;
  padding: 0 ${p => p.theme.spacing(3.3)} 0 ${p => p.theme.spacing(1)};
  transition: width 1s ease;
  color: ${p=> p.theme.colors.surface};
  border-bottom: 3px solid ${p => p.theme.colors.taskLine};
  border-top-left-radius: ${p => p.theme.spacing(3)};
  border-bottom-left-radius: ${p => p.theme.spacing(3)};

  border-top-right-radius: ${p => p.active < 100 ? 0 : p.theme.spacing(2.7)};
  border-bottom-right-radius: ${p => p.active === 0 || p.active === 100 ? 0 : p.theme.spacing(6)};
`;

type LineCompletedProp = {
  active: number
}

export function LineCompleted(p: LineCompletedProp){
  return (
  <Line active={p.active}>
    <Completed active={p.active}>
      {p.active}%
    </Completed>
  </Line>
  )
}

