import React from "react";
import { Loader, Flex, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import SideBar from "../../components/profile-components/SideBar";
import RepoList from "../../components/profile-components/RepoList";
import { useDisclosure } from "@mantine/hooks";

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
    <Flex>
      <SideBar username={username} />
      <RepoList username={username} />
    </Flex>
  );
};

export default ProfilePage;
