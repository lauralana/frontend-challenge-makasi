import React from "react";
import { AppShell, Loader, Flex, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBarRight, IconArrowBarLeft } from "@tabler/icons-react";
import SideBar from "../../components/profile-components/SideBar";
import RepoList from "../../components/profile-components/RepoList";

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [opened, { toggle: toggleView }] = useDisclosure();

  if (!username) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Loader />
      </Flex>
    );
  }

  return (
    <AppShell
      padding="sm"
      navbar={{
        width: "30vw",
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: opened },
      }}
    >
      <AppShell.Navbar>
        <SideBar username={username} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Flex>
          <Button
            variant="subtle"
            onClick={toggleView}
            style={{ position: "fixed", marginTop: "2vh", zIndex: 10 }}
          >
            {!opened ? (
              <IconArrowBarLeft stroke={2} size={32} />
            ) : (
              <IconArrowBarRight stroke={2} size={32} />
            )}
          </Button>
          <RepoList username={username} />
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
};

export default ProfilePage;
