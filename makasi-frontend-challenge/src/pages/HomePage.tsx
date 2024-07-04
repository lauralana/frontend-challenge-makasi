import React, { useState } from "react";
import { Autocomplete, Button, Flex, Text, } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (value) {
      setError("");
      navigate("/profile", { state: { selectedOption: value } });
    } else {
      setError("Por favor, selecione uma opção");
    }
  };

  const handleChange = (val: string) => {
    setValue(val);
    if (error) {
      setError("");
    }
  };

  return (
    
    <Flex
      direction="column"
      align="center"
      w="100vw"
      h="100vh"
      justify="center"
      display="flex"
    >
      <h1>Search Devs</h1>
      <Flex display="flex">
      <Autocomplete
        placeholder="Digite algo..."
        data={["React", "Vue", "Angular", "Svelte", "React Native"]}
        value={value}
        onChange={handleChange}
        withScrollArea={false}
        maxDropdownHeight={200}
        styles={{
          dropdown: {
            maxHeight: 200,
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 'fit-content'
          },
        }}
      />
      <Button onClick={handleNavigate}>Search</Button>
    </Flex>
       {error && (
        <Text style={{ marginTop: "1rem", color: "red" }}>{error}</Text>
      )}
    </Flex>
  );
};

export default HomePage;
