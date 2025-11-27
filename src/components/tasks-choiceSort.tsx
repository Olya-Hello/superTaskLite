import styled from "@emotion/styled";

const ChoiceDateSortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const ChoiceDateSortBy = styled.label`
  font-weight: 600;
  font-size: ${p => p.theme.spacing(2.4)};
  color: ${p => p.theme.colors.surface};
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const ChoiceDateSortSelect = styled.select`
  border: ${p => p.theme.spacing(0.56)} solid ${p => p.theme.colors.surface};
  cursor: pointer;
  background: transparent;
  padding: ${p => p.theme.spacing(1.4)} ${p => p.theme.spacing(1)};
  padding-right: ${p => p.theme.spacing(4)};
  border-radius: ${p => p.theme.spacing(1.7)};
  box-shadow: inset 0 2px 4px rgba(41, 11, 54, 0);
  transition: box-shadow 0.3s ease;
  font-weight: 600;
  font-size: ${p => p.theme.spacing(2.4)};
  color: ${p => p.theme.colors.surface};
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  box-shadow: inset 0 2px 8px rgba(41, 11, 54, 0.2);

  &: hover {
    box-shadow: inset 0 2px 8px rgba(41, 11, 54, 0.2);
  }

  &: focus {
    box-shadow: inset 0 2px 8px rgba(41, 11, 54, 0.37);
  }

  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: none; 

  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><polygon points='0,0 20,0 10,10'/></svg>");
  background-repeat: no-repeat;
  background-position: right ${p => p.theme.spacing(1)} center;
  background-size: ${p => p.theme.spacing(1.4)};
`;

const ChoiceDateSortOption = styled.option`
`;

export const options = [
  { value: 'new', label: 'new' },
  { value: 'old', label: 'old' }
]

type ChoiceDateSortProp = {
  value: string
  setValue: (newValue: string) => void
}

export function ChoiceDateSort(p: ChoiceDateSortProp) {
  const handleChange = (e: any) => {
    const newValue = e.target.value;
    p.setValue(newValue);
    localStorage.setItem('meow', newValue);
  };

  return (<>
    <ChoiceDateSortContainer>
      <ChoiceDateSortBy>sort by</ChoiceDateSortBy>

      <ChoiceDateSortSelect
      value={p.value} 
      onChange={handleChange}>
        <ChoiceDateSortOption value="new">
          new
        </ChoiceDateSortOption>
        <ChoiceDateSortOption value="old">
          old
        </ChoiceDateSortOption>
      </ChoiceDateSortSelect>

      <ChoiceDateSortBy>ones first</ChoiceDateSortBy>

    </ChoiceDateSortContainer>
  </>);
}
