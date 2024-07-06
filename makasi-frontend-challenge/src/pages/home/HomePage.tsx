import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Button, Flex } from "@mantine/core";
import classes from "./HomePage.module.css";
import { getUsers } from "../../api/apiService";
import { getMockAllUsers } from "../../api/mock-all-users";

interface User {
  login: string;
  avatar_url: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<User[]>([]);

  const handleNavigate = (username: string) => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  const handleChange = async (val: string) => {
    setValue(val);
    if (val) {
     // const users = await getUsers(val);
     const users = await getMockAllUsers(val);
      setOptions(users);
    } else {
      setOptions([]);
    }
  };

  const mappedOptions = options.map((user) => ({
    value: user.login,
  }));

  return (
    <Flex className={classes.home}>
      <h1>Search Devs</h1>
      <Flex display="flex">
        <Autocomplete
          placeholder="Type the username here..."
          data={mappedOptions}
          value={value}
          onChange={handleChange}
          withScrollArea={false}
          maxDropdownHeight={400}
          styles={{
            dropdown: {
              maxHeight: 200,
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              width: "fit-content",
            },
          }}
          className={classes.autocomplete}
        />
        <Button onClick={() => handleNavigate(value)} className={classes.button}>
          Search
        </Button>
      </Flex>
    </Flex>
  );
};

export default HomePage;
