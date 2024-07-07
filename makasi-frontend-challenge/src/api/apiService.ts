import axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "../keys";
import { GITHUB_TOKEN } from "../keys";

async function instance(endpoint: string, params?: unknown, method: string = 'GET'): Promise<any> {
  const config: AxiosRequestConfig = {
    method,
    url: `${API_URL}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${GITHUB_TOKEN}`,
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
    const response = await instance('search/users', { q: query });
    return response.items;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserDetails = async (username: string) => {
  try {
    const response = await instance(`users/${username}`);
    console.log("🚀 ~ getUserDetails ~ response:", response)
    return response;
  } catch (error) {
    console.error(`Error fetching user details for ${username}:`, error);
    throw error;
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const response = await instance(`users/${username}/repos`);
    console.log("🚀 ~ getUserRepos ~ response:", response)
    return response;
  } catch (error) {
    console.error(`Error fetching user repos for ${username}:`, error);
    throw error;
  }
};
