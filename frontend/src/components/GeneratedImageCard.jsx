import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  min-height:300px;
   @media (max-width: 768px) {
    min-height: 100px; // reduce height for small screens
    padding: 12px;
  }

`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  background: ${({ theme }) => theme.black + 50};
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; // space between spinner and text
`;

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <Container>
      {loading ? (
        <LoadingWrapper>
          <CircularProgress
            style={{ color: "inherit", width: "24px", height: "24px" }}
          />
          <span>Generating Your Image ...</span>
        </LoadingWrapper>
      ) : (
        <>
          {src ? <Image src={src} /> : <>Write a prompt to generate image.</>}
        </>
      )}
    </Container>
  );
};

export default GeneratedImageCard;
