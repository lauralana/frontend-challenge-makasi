import React, { useEffect, useState } from "react";
import { Flex, Button, Anchor, Loader } from "@mantine/core";
import {
  IconUsers,
  IconStar,
  IconHeart,
  IconBrandTwitter,
  IconLink,
  IconMail,
  IconMapPin,
  IconBuilding,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./ProfileComponents.module.css";
import { getMockUser } from "../../api/mock-user";
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
      // const userDetails = await getUserDetails(username);
      const userDetails = await getMockUser(username);
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

  if (loadingUser || !user) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{ height: "100vh", width: "50vw" }}
      >
        <Loader />
      </Flex>
    );
  }

  return (
    <Flex className={classes.col1}>
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className={classes.image}
      />
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
        {user.starredUser ? (
          <div className={classes.iconTextContainer}>
            <IconStar stroke={2} color="white" width={16} />
            <text>{user.starredUser}stars</text>
          </div>
        ) : null}
      </Flex>
      <Flex className={classes.col1b}>
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
        {user.email ? (
          <div className={classes.iconTextContainerCol1b}>
            <IconMail stroke={2} color="white" width={16} />
            <text>{user.email}</text>
          </div>
        ) : null}
        {user.blog ? (
          <div className={classes.iconTextContainerCol1b}>
            <IconLink stroke={2} color="white" width={16} />
            <Anchor
              href={user.blog}
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
            <IconBrandTwitter stroke={2} color="white" width={16} />
            <Anchor
              href={user.twitter_username}
              target="_blank"
              underline="hover"
              c="white"
            >
              {user.twitter_username}
            </Anchor>
          </div>
        ) : null}
      </Flex>
      <Button
        onClick={() => navigate(-1)}
        color="gray"
        w={cellphone ? "18vw" : tablet ? "12vw" : "10vw"}
        h={cellphone ? "5vh" : "4vh"}
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
};

export default SideBar;
