import styled from "styled-components";
import { theme } from "./theme";
import { Input } from "./components/forms";

export const OtpInput = styled(Input)`
  letter-spacing: 2px;
  text-align: center;
`;

export const InfoText = styled.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`;

export const ResendWrapper = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

export const LoginCard = styled.div`
  max-width: 400px;
  width: 100%;
  /* Enhanced: Increased top padding for breathing room above logo */
  padding: 40px 32px 32px;
  /* Enhanced: Larger border radius for more modern look */
  border-radius: ${theme.borderRadius.large}; // 16px as mentioned
  /* Enhanced: Softer, more elevated shadow */
  box-shadow: ${theme.boxShadow.cardSoft};
  text-align: center;
  background-color: ${theme.colors.background.card};
  /* Add subtle backdrop blur for depth */
  backdrop-filter: blur(10px);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 32px 24px 24px;
    margin: 0 16px;
  }
`;

export const LoginHeader = styled.div`
  margin-bottom: 24px;
`;

export const LogoImage = styled.img`
  height: 60px;
  margin-bottom: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`;