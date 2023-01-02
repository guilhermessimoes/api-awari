import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

const randomBackground = () => {
  const backgrounds = ['#f44336', '#9c27b0', '#3f51b5', '#4caf50', '#ffc107'];
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

const theme = {
  background: '#fff',
  contrast: background => {
    if (background === '#fff') {
      return '#000';
    } else {
      return '#fff';
    }
  }
};


const Card = styled.div`
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  width: 300px;
  background: ${randomBackground};
  color: ${({ theme }) => theme.contrast(randomBackground())};

  h3 {
    margin: 0 0 10px 0;
  }

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMonsters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://www.dnd5eapi.co/api/monsters?challenge_rating=5');
        const data = await response.json();
        setMonsters(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMonsters();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
      {monsters.map(monster => (
        <Card key={monster.name}>
          <h3>{monster.name}</h3>
        </Card>
      ))}
      </Container>
    </ThemeProvider>
  );
};

export default App;