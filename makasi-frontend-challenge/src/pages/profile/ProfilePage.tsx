import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Loader, Anchor } from "@mantine/core";
import classes from "./ProfilePage.module.css";
import { getUserDetails, getUserRepos } from "../../api/apiService";
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
import { useMediaQuery } from "@mantine/hooks";
import { getMockUser } from "../../api/mock-user";
import { getMockRepositories } from "../../api/mock-user-repo";

interface User {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  following: number;
  star: number;
  location: string;
  company: string;
  blog: string;
  email: string;
  twitter_username: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number | undefined;
  updated_at: string;
}

const ProfilePage: React.FC = () => {
  const cellphone = useMediaQuery("(max-width: 375px)");
  const tablet = useMediaQuery("(max-width: 820px)");
  const navigate = useNavigate();

  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);

  const fetchData = async () => {
    setLoadingUser(true);
    try {
      //const userDetails = await getUserDetails(username);
      const userDetails = await getMockUser(username);
      setUser(userDetails);
      //const userRepos = await getUserRepos(username);
      const userRepos = await getMockRepositories(username);
      const orderRepos = userRepos.sort(
        (a: { stargazers_count: number }, b: { stargazers_count: number }) =>
          b.stargazers_count - a.stargazers_count
      );
      setRepos(orderRepos);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  if (!user) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Loader />
      </Flex>
    );
  }

  if (loadingUser) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Loader />
      </Flex>
    );
  }

  return (
    <Flex className={classes.profile}>
      {/* sideBar component */}
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
          {user.star ? (
            <div className={classes.iconTextContainer}>
              <IconStar stroke={2} color="white" width={16} />
              <text>stars</text>
            </div>
          ) : (
            ""
          )}
        </Flex>
        <Flex className={classes.col1b}>
          {user.company ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconBuilding stroke={2} color="white" width={32} />
              <text> {user.company} </text>
            </div>
          ) : (
            ""
          )}
          {user.location ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconMapPin stroke={2} color="white" width={32} />
              <text>{user.location}</text>
            </div>
          ) : (
            ""
          )}
          {user.email ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconMail stroke={2} color="white" width={32} />
              <text>{user.email}</text>
            </div>
          ) : (
            ""
          )}
          {user.blog ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconLink stroke={2} color="white" width={32} />
              <Anchor
                href={user.blog}
                target="_blank"
                underline="hover"
                c="white"
              >
                {user.blog}
              </Anchor>
            </div>
          ) : (
            ""
          )}
          {user.twitter_username ? (
            <div className={classes.iconTextContainerCol1b}>
              <IconBrandTwitter stroke={2} color="white" width={32} />
              <Anchor href={user.twitter_username} target="_blank" underline="hover" c="white">
                {user.twitter_username}
              </Anchor>
            </div>
          ) : (
            ""
          )}
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
            marginTop: "20vh",
          }}
        >
          Back
        </Button>
      </Flex>
      {/* respList component */}
      <Flex className={classes.col2}>
        {repos.map((repo) => (
          <div key={repo.id} className={classes.repoContainer}>
            <Anchor
              href={repo.html_url}
              target="_blank"
              underline="never"
              c="blue"
              size="lg"
            >
              {repo.name}
            </Anchor>
            <text>{repo.description}</text>
            <Flex align="center" gap="md">
              {repo.stargazers_count >= 0 ? (
                <div className={classes.iconTextContainerCol2}>
                  <IconStar stroke={2} color="gray" width={16} />
                  <text>{repo.stargazers_count} stars</text>
                </div>
              ) : (
                ""
              )}
              <text className={classes.iconTextContainerCol2}>•</text>
              <text className={classes.iconTextContainerCol2}>
                Updated {new Date(repo.updated_at).toLocaleDateString()}
              </text>
            </Flex>
          </div>
        ))}
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
