import styled from "styled-components";
import TextInput from "./TextInput";
import ButtonComponent from "./button";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { GenerateImage,CreatePost } from "../api";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Action = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setCreatePostLoading,
  setGenerateImageLoading,
  generateImageLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const generateaImageFun = async () => {
    setGenerateImageLoading(true);
    await GenerateImage({ prompt: post.prompt })
      .then((res) => {
        setPost({
          ...post,
          photo: `data:image/jpeg;base64,${res?.data?.photo}`,
        });
        setGenerateImageLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setGenerateImageLoading(false);
      });
  };
  const createPostFun = async () => {
    setCreatePostLoading(true);
    await CreatePost(post)
      .then((res) => {
        setCreatePostLoading(false);
        navigate("/")
        
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setCreatePostLoading(false);
      });
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt </Title>
        <Desc>
          Write your prompt according to the image you want to generate!
        </Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter You Name . . ."
          name="name"
          value={post.name}
          handleChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Prompt"
          placeholder="Write the detailed prompt about the image you want to generate . . . ."
          name="name"
          rows="8"
          textArea
          value={post.prompt}
          handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        ** You can post the AI Generated Image to the Community **
      </Body>
      <Action>
        <ButtonComponent
          text="Generate Image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={() => generateaImageFun()}
        />
        <ButtonComponent
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={() => createPostFun()}
        />
      </Action>
    </Form>
  );
};

export default GenerateImageForm;
