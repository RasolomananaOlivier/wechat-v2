import React from "react";

import { Divider, ListItemButton } from "@mui/material";

import UserboxAvatar from "./UserboxAvatar";
import UserboxDetails from "./UserboxDetails";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useFilterMessage } from "../../features/message/hooks/userFilterMessages";
import { setCurrentFriend } from "../../redux/reducers/currentFriendSlice";
import { IUser } from "../../types";
import { setCurrentMessage } from "../../redux/reducers/currentMessageSlice";
import { userSelector } from "../../redux/selectors/userSelector";

interface IUserboxContext {
  handleOpenMessage: () => void;
}

interface IUserBoxProps {
  user: IUser;
}

export default function Userbox({ user }: IUserBoxProps) {
  const navigate = useNavigate();
  const { message, totalMessages } = useFilterMessage(user._id!);
  const currentUser = useAppSelector(userSelector);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setCurrentFriend(user));

    if (message._id !== "") {
      dispatch(setCurrentMessage({ ...message, totalMessages }));
      navigate(`/home/messages/${message._id}`);
    }
  };

  const isRead = () => message.readBy.some((id) => id === currentUser._id);
  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: 3,
          mb: 1,
        }}
        onClick={handleClick}
      >
        <UserboxAvatar username={user.firstname} avatarUrl={user.avatarUrl} />
        <UserboxDetails
          read={isRead()}
          fullname={`${user.firstname} ${user.lastname}`}
        />
      </ListItemButton>
      <Divider variant="inset" />
    </>
  );
}
