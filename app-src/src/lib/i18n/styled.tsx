import styled from 'styled-components';

// Styled components for the language selector
export const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  inline-size: fit-content;
`;

export const GlobeIcon = styled.label`
  font-weight: normal;
  font-size: 1em;
  cursor: pointer;
`;

export const SelectBox = styled.select`
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  min-width: 150px;
  appearance: auto;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: #999;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
`;

export const Option = styled.option`
  padding: 5px;
`;