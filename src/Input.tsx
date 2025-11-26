import styled from "@emotion/styled";

export const StyledInput = styled.input`
  background-color: ${p => p.theme.colors.surface};
  padding: ${p => p.theme.spacing(2)};
  margin-bottom: ${p => p.theme.spacing(2)};
  border-radius: ${p => p.theme.spacing(0.7)};
  border: ${p => p.theme.spacing(0.3)} solid ${p => p.theme.colors.accentBorderShine};
  border-left: ${p => p.theme.spacing(0.3)} solid ${p => p.theme.colors.border.built_in};
  margin-right:  ${p => p.theme.spacing(1.7)};

  &:hover {
  background-color: ${p => p.theme.colors.border};
  border-left: ${p => p.theme.spacing(0.3)} solid ${p => p.theme.colors.accent};
  };

  &:focus {
    outline: ${p => p.theme.spacing(0.3)} solid  ${p => p.theme.colors.accentOutline};
    &:hover {
      border-left: ${p => p.theme.spacing(0.3)} solid ${p => p.theme.colors.border.built_in};
    };
  }
`;

