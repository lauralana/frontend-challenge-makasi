import React from "react";
import { Loader, Flex, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import SideBar from "../../components/profile-components/SideBar";
import RepoList from "../../components/profile-components/RepoList";
import classes from "../../components/profile-components/ProfileComponents.module.css";

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Loader />
      </Flex>
    );
  }

  return (
    <Flex className={classes.profile}>
      <SideBar username={username} />
      <RepoList username={username} />
    </Flex>
  );
};

export default ProfilePage;
