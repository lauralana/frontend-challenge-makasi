import React from 'react';
import { Center } from '@mantine/core';
import { useLocation } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { selectedOption } = location.state || { selectedOption: 'Nenhuma opção selecionada' };

  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <h1>Profile Page</h1>
      <p>Opção selecionada: {selectedOption}</p>
    </Center>
  );
};

export default ProfilePage;

