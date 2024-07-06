// ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails, getUserRepos } from "../../api/apiService";

interface User {
  login: string;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
}

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails(username);
        setUser(userDetails);
        const userRepos = await getUserRepos(username);
        setRepos(userRepos);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.login}</h2>
      <img src={user.avatar_url} alt={`${user.login} avatar`} />
      <h3>Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
