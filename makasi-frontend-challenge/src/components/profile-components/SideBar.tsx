import React, { useEffect, useState } from "react";
import { Flex, Button, Anchor, Loader, Text } from "@mantine/core";
import {
  IconUsers,
  IconStar,
  IconHeart,
  IconBrandX,
  IconLink,
  IconMail,
  IconMapPin,
  IconBuilding,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./ProfileComponents.module.css";
import { getUserDetails } from "../../api/apiService";

interface User {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  following: number;
  starredUser: number;
  location: string;
  company: string;
  blog: string;
  email: string;
  twitter_username: string;
  starredRepos: Array<{ id: number; name: string; html_url: string }>;
}

interface SideBarProps {
  username: string;
}

const SideBar: React.FC<SideBarProps> = ({ username }) => {
  const cellphone = useMediaQuery("(max-width: 410px)");
  const tablet = useMediaQuery("(max-width: 820px)");
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const fetchData = async () => {
    setLoadingUser(true);
    try {
      const userDetails = await getUserDetails(username);
      setUser(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  if (loadingUser) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{ height: cellphone ? "20vh" : "100vh" }}
      >
        <Loader />
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{ height: "100vh", width: "100vw" }}
        direction="column"
        gap="20px"
      >
        <Loader />
        <Text> We could not find the user: {username} !</Text>
        <Button
          onClick={() => navigate(-1)}
          color="gray"
          w={cellphone ? "18vw" : tablet ? "12vw" : "10vw"}
          h={cellphone ? "3vh" : "4vh"}
          style={{
            fontSize: cellphone ? "8px" : "16px",
            fontStyle: "italic",
            backgroundColor: "gray",
            marginTop: "16px",
          }}
        >
          Back
        </Button>
      </Flex>
    );
  }

  return (
    <Flex className={classes.col1}>
      <Flex
        direction={cellphone ? "row" : "column"}
        align={cellphone ? "flex-start" : "center"}
        gap="md"
      >
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className={classes.image}
        />
        <Flex direction="column" align={cellphone ? "flex-start" : "center"}>
          <h2>{user.name}</h2>
          <text>@{user.login}</text>
          <text>{user.bio}</text>
          <Flex align="center" gap="md">
            <div className={classes.iconTextContainer}>
              <IconUsers stroke={2} color="white" width={16} />
              <text>{user.followers} followers</text>
            </div>
            <div className={classes.iconTextContainer}>
              <IconHeart stroke={2} color="white" width={16} />
              <text>{user.following} following</text>
            </div>
            {user.starredRepos.length >= 0 ? (
              <div className={classes.iconTextContainer}>
                <IconStar stroke={2} color="white" width={16} />
                <text>{user.starredRepos.length} stars</text>
              </div>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Flex
          className={classes.col1b}
          direction={cellphone ? "row" : "column"}
          gap={cellphone ? '15px' : '2px'}
        >
          {user.company ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconBuilding stroke={2} color="white" width={16} />
              <text>{user.company}</text>
            </div>
          ) : null}
          {user.location ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconMapPin stroke={2} color="white" width={16} />
              <text>{user.location}</text>
            </div>
          ) : null}
        </Flex>
        {user.email ? (
          <div className={classes.iconTextContainerCol1b}>
            <IconMail stroke={2} color="white" width={16} />
            <text>{user.email}</text>
          </div>
        ) : null}
        <Flex
          className={classes.col1b}
          direction={cellphone ? "row" : "column"}
          gap={cellphone ? '15px' : '2px'}
        >
          {user.blog ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconLink stroke={2} color="white" width={16} />
              <Anchor
                href={
                  user.blog.startsWith("http://") ||
                  user.blog.startsWith("https://")
                    ? user.blog
                    : `https://${user.blog}`
                }
                target="_blank"
                underline="hover"
                c="white"
                style={{
                  fontSize: cellphone ? "10px" : "16px",
                  flexWrap: "wrap",
                }}
              >
                {user.blog}
              </Anchor>
            </div>
          ) : null}
          {user.twitter_username ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconBrandX stroke={2} color="white" width={16} />
              <Anchor
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                underline="hover"
                c="white"
                style={{
                  fontSize: cellphone ? "10px" : "16px",
                  flexWrap: "wrap",
                }}
              >
                {user.twitter_username}
              </Anchor>
            </div>
          ) : null}
      <Button
        onClick={() => navigate(-1)}
        color="gray"
        w={cellphone ? "18vw" : tablet ? "12vw" : "10vw"}
        h={cellphone ? "3vh" : "4vh"}
        style={{
          fontSize: cellphone ? "8px" : "16px",
          fontStyle: "italic",
          backgroundColor: "gray",
          marginTop: cellphone ? '2px' : "16px",
          position:  cellphone ? 'absolute' : 'unset',
          right: cellphone ? '15px' : '0'
        }}
      >
        Back
      </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
