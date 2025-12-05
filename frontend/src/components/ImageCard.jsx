import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material"; // correct import
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from 'file-saver'

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverLay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.white};
  transition: opacity 0.3s ease;
  border-radius: 6px;
  justify-content: end;
  padding: 12px;

  ${Card}:hover & {
    opacity: 1;
  }
`;
const Prompt = styled.div`
  font-weight: 400px;
  color: ${({ theme }) => theme.white};
  font-size: 15px;
`;

const Author = styled.div`
  font-weight: 400px;
  color: ${({ theme }) => theme.white};
  font-size: 15px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ImageCard = ({item}) => {
  return (
    <Card>
      <LazyLoadImage
        style={{ borderRadius: "12px" }}
        width="100%"
        src={item?.photo}
        alt={item?.prompt}
      />
      <HoverOverLay>
        <Prompt>{item?.prompt}</Prompt>
        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between"
        }}>
          <Author>
            <Avatar sx={{ fontSize: "12px", height: "32px", width: "32px" }}>
              {item?.name[0]}
            </Avatar>
            {item?.name}
          </Author>
          <DownloadRounded onClick= {()=> FileSaver.saveAs(item?.photo, "download.jpg")} />
        </div>
      </HoverOverLay>
    </Card>
  );
};

export default ImageCard;
