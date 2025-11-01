import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_seconday};
  padding: 0px 4px;
  text-transform: uppercase;
`;

const outLinedInput = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_seconday};
  background-color: transparent;
  color: ${({ theme }) => theme.text_seconday};
  outline: none;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Input = styled.div`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_seconday};
  &:focus {
    outline: none;
  }
`;


const TextInput = ({
    label,
    placeholder,
    name,
    value,
    handleChange,
    textArea,
    rows,
    columns
}) =>{
    return(
        <Container>
            <Label>{label}</Label>
            <outLinedInput>
                <Input 
                as={textArea? "textarea" : "input"}
                name={name}
                rows={rows}
                columns={columns}
                placeholder={placeholder}
                value={value}
                onChange={(e)=>handleChange(e)}/>
            </outLinedInput>
        </Container>
    )
}

export default TextInput;
