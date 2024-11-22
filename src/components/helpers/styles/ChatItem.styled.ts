import styled from "@emotion/styled";
import { TextareaAutosize } from "@mui/material";

interface StyledTextareaProps {
  backgroundclr: string;
  clr: string;
  borderclr: string;
  hover: string;
};

export const CustomTextarea = styled(TextareaAutosize)<StyledTextareaProps>(({ backgroundclr, clr, borderclr, hover }) => ({
  width: '100%',
  padding: '16px',
  paddingRight: "56px",
  resize: 'none',
  boxSizing: 'border-box',
  borderRadius: '8px',
  backgroundColor: backgroundclr,
  color: clr,
  border: `1px solid ${borderclr}`,
  outline: 'none',
  fontFamily: `'Poppins', sans-serif`,
  '&:hover, &:focus': {
    border: `1px solid ${hover}`,
  },
}));

export const Li = styled.li`
  padding: 12px 16px;
  margin-bottom: 8px;
  display: flex;
  width: 100%;
  gap: 12px;
  align-items: left;
  border-radius: 8px;
`

export const Button = styled.button`
position: absolute;
width: 40px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
right: 8px;
bottom: 8px;
border-radius: 20px;
`

export const FormWrap = styled.div`
position: sticky;
bottom: 0;
width: 100%;
padding: 16px;
`

export const Form = styled.form`
display: flex;
width: 800px;
margin: 0 auto;
;position: relative;
`