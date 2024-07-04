import React, { useState } from 'react';
import { Container, Autocomplete, Button, Center, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (value) {
      setError('');
      navigate('/profile', { state: { selectedOption: value } });
    } else {
      setError('Por favor, selecione uma opção');
    }
  };

  const handleChange = (val: string) => {
    setValue(val);
    if (error) {
      setError('');
    }
  };

  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <h1>Home Page</h1>
      <Container>
      <Group style={{ marginTop: '1rem' }}>
          <Autocomplete
            placeholder="Digite algo..."
            data={["React", "Vue", "Angular", "Svelte", "React Native"]}
            value={value}
            onChange={handleChange}
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
            mt="md"
          />
          <Button onClick={handleNavigate}>Search</Button>
        </Group>
        {error && (
          <Text style={{ marginTop: '1rem', color: "red" }}>
            {error}
          </Text>
        )}
      </Container>
    </Center>
  );
};

export default HomePage;
