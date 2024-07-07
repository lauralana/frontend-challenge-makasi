import React, { useEffect, useState } from "react";
import { Flex, Anchor, Loader } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./ProfileComponents.module.css";
import { getUserRepos } from "../../api/apiService";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number | undefined;
  updated_at: string;
}

interface RepoListProps {
  username: string;
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const cellphone = useMediaQuery("(max-width: 410px)");

  const fetchRepos = async () => {
    setLoadingRepos(true);
    try {
      const userRepos = await getUserRepos(username);
      const orderRepos = userRepos.sort(
        (a: { stargazers_count: number; }, b: { stargazers_count: number; }) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
      );
      setRepos(orderRepos);
    } catch (error) {
      console.error("Error fetching user repositories:", error);
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [username]);

  if (loadingRepos || !repos) {
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
    <Flex className={classes.col2}>
      {repos.map((repo) => (
        <div key={repo.id} className={classes.repoContainer}>
          <Anchor
            href={repo.html_url}
            target="_blank"
            underline="never"
            c="blue"
            size="lg"
            style={{
              fontSize: cellphone ? "12px" : "16px",
              flexWrap: "wrap",
            }}
          >
            {repo.name}
          </Anchor>
          <text>{repo.description}</text>
          <Flex align="center" gap="md">
            {repo.stargazers_count !== undefined ? (
              <div className={classes.iconTextContainerCol2}>
                <IconStar stroke={2} color="gray" width={16} />
                <text>{repo.stargazers_count} stars</text>
              </div>
            ) : null}
            <text className={classes.iconTextContainerCol2}>•</text>
            <text className={classes.iconTextContainerCol2}>
              Updated {new Date(repo.updated_at).toLocaleDateString()}
            </text>
          </Flex>
        </div>
      ))}
    </Flex>
  );
};

export default RepoList;
