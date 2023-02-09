import { ArrowBackIos, Menu } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMobileSize } from "../../../../hooks/useMobileSize";
import { ChatRootLeftSideContext } from "../../context/leftSideContext";

interface ChatRoomHeaderProps {
  height: number;
}

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ height }) => {
  const isMobileScreen = useMobileSize();
  const params = useParams();
  const navigate = useNavigate();

  const chatRoomLeftSideContext = useContext(ChatRootLeftSideContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mx: 1,
        mt: 0.5,
        height: `${height}px`,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        {isMobileScreen && (
          <IconButton onClick={() => navigate("/home/messages")}>
            <ArrowBackIos />
          </IconButton>
        )}
        {/* @ts-ignore */}
        <Avatar src={""} slt="sdgd" />
        <Box sx={{ ml: 2 }}>
          <Typography>User name {params.messageId}</Typography>
          <Typography sx={{ fontSize: 12, color: "gray" }}>Actif</Typography>
        </Box>
      </Box>
      <IconButton
        aria-label="chat option"
        onClick={() =>
          // @ts-ignore
          chatRoomLeftSideContext.setShow(!chatRoomLeftSideContext.show)
        }
      >
        <Menu />
      </IconButton>
    </Box>
  );
};

export default ChatRoomHeader;
