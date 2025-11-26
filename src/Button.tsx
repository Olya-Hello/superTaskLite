import styled from "@emotion/styled";

export type ButtonProp = {
    label: string;
    onClick: () => void;
};

const StyledButton = styled.button`
    background: linear-gradient(135deg, rgba(133, 94, 190, 0.67) 0%, rgba(163, 101, 255, 0.67) 100%);
    &:hover { background-color: 
    ${p => p.theme.colors.accentHover};}
    border-radius ${p => p.theme.radius.md};
    cursor: pointer;
    color: ${p => p.theme.colors.surface};
    padding: ${p => p.theme.spacing(2)};
    border:none;
    border-radius: ${p => p.theme.spacing(0.4)};
`;

export function Button(p: ButtonProp) {
    return (
    <StyledButton onClick={p.onClick}>
        {p.label} 
    </StyledButton>
    );
}

 