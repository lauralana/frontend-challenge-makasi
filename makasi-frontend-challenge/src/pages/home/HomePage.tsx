import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  AutocompleteProps,
  Button,
  Flex,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./HomePage.module.css";
import { getUsers } from "../../api/apiService";

interface User {
  login: string;
  avatar_url: string;
}

const HomePage: React.FC = () => {
  const cellphone = useMediaQuery("(max-width: 375px)");
  const tablet = useMediaQuery("(max-width: 820px)");
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
      const users = await getUsers(val);
      setOptions(users);
    } else {
      setOptions([]);
    }
  };

  const mappedOptions = options.map((user) => ({
    value: user.login,
    avatar_url: user.avatar_url,
  }));

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm">
      <Avatar src={option.avatar_url} size={36} radius="xl" />
        <Text size="sm">{option.value}</Text>
    </Group>
  );

  return (
    <Flex className={classes.home}>
      <h1>Search Devs</h1>
      <Flex display="flex" justify='center'>
        <Autocomplete
          placeholder="Type the username here..."
          data={mappedOptions}
          renderOption={renderAutocompleteOption}
          value={value}
          onChange={handleChange}
          limit={10}
          styles={{
            dropdown: {
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              width: "fit-content",
            },
            input: {
              width: cellphone ? "50vw" : tablet ? "40vw" : "30vw",
              height: cellphone ? "5vh" : "4vh",
              marginRight: cellphone ? "5px" : "8px",
              fontSize: cellphone ? "10px" : "16px",
              fontStyle: "italic",
            },
          }}
        />
        <Button
          onClick={() => handleNavigate(value)}
          color="gray"
          w={cellphone ? "18vw" : tablet ? "12vw" : "10vw"}
          h={cellphone ? "5vh" : "4vh"}
          style={{
            fontSize: cellphone ? "8px" : "16px",
            fontStyle: "italic",
            backgroundColor: "gray",
          }}
        >
          Search
        </Button>
      </Flex>
    </Flex>
  );
};

export default HomePage;
