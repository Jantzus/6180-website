import styled from 'styled-components';

export const Headline = styled.h1`
  font-size: 1.8em;
  margin: 40px 0;
`;

export const Button = styled.button<{ primary?: boolean; isHovered?: boolean }>`
  padding: 12px 20px;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  background-color: ${props => props.primary ? '#007bff' : '#e9e9e9'};
  color: ${props => props.primary ? 'white' : '#333'};
  background-color: ${props => props.primary && props.isHovered ? '#0056b3' : undefined};
`;

export const LegalLinksFooter = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 0.9em;
  color: #555;
`;

export const LegalLinkFooterButton = styled.a<{ isHovered?: boolean }>`
  margin: 0 10px;
  color: #555;
  text-decoration: ${props => props.isHovered ? 'underline' : 'none'};
`;