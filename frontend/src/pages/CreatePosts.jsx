import { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImageCard from "../components/GeneratedImageCard";

const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  height: fit-content;
  width: 100%;
  gap: 12px;
  display: flex;
  justify-content: center;
  max-width: 1200px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CreatePosts = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);

  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          generateImageLoading={generateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
          setGenerateImageLoading= {setGenerateImageLoading}
        />
        <GeneratedImageCard src={post?.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePosts;
