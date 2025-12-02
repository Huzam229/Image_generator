import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  max-width: 1400px;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
@media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
@media (min-width:640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
    @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const item = {
    photo: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "john",
    prompt: "A boy on the rock"
  }
  return (
    <Container>
      <HeadLine>Explore popular post's in the Community.</HeadLine>
      <Span>⦿ Generate With AI ⦿</Span>
      <SearchBar />
      <Wrapper>
        <CardWrapper>
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />
         <ImageCard item={item} />

        </CardWrapper>
      </Wrapper>
    </Container>
  );
};

export default Home;
