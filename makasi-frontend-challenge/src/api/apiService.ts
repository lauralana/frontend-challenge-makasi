import axios, { AxiosRequestConfig } from "axios";

const API_URL = "https://api.github.com";

async function instance(
  endpoint: string,
  params?: unknown,
  method: string = "GET"
): Promise<any> {
  const url = `${API_URL}/${endpoint}`;
  console.log("Request URL:", url); 
  const config: AxiosRequestConfig = {
    method,
    url: `${API_URL}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
    params,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

export const getUsers = async (query: string) => {
  try {
    const response = await instance("search/users", { q: query });
    return response.items;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserDetails = async (username: string) => {
  try {
    const userResponse = await instance(`users/${username}`);
    const starredRepos = await instance(`users/${username}/starred`);
    return { ...userResponse, starredRepos };
  } catch (error) {
    console.error(`Error fetching user details for ${username}:`, error);
    throw error;
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const response = await instance(`users/${username}/repos`);
    return response;
  } catch (error) {
    console.error(`Error fetching user repos for ${username}:`, error);
    throw error;
  }
};
