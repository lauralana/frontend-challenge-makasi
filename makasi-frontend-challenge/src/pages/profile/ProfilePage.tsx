import React from "react";
import { AppShell, Loader, Flex, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import SideBar from "../../components/profile-components/SideBar";
import RepoList from "../../components/profile-components/RepoList";
import { useDisclosure } from '@mantine/hooks';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Loader />
      </Flex>
    );
  }
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] =
    useDisclosure(true);

  return (
    <AppShell
    padding="md"
    navbar={{
      width:"30vw", 
      breakpoint: "sm",
      collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
    }}
  >
    <AppShell.Navbar>
      <SideBar username={username}/>
    </AppShell.Navbar>
    <AppShell.Main>
      <RepoList username={username}/>
    </AppShell.Main>
  </AppShell>
  );
};

export default ProfilePage;
