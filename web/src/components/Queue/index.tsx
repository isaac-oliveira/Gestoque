import React, { useState, ChangeEvent, useEffect } from 'react';
import { FiX, FiDollarSign, FiSearch } from 'react-icons/fi';

import {
  Container,
  Header,
  Title,
  ButtonContainer,
  Content,
  ListContainer,
  SearchContainer,
  Footer,
  Total,
} from './styles';
import Color from '../../themes/Color';
import Button from '../Button';
import Input from '../Input';
import { QueueProps } from '../../@types/props';
import { findProduct } from '../../services/api';
import { Product } from '../../@types/models';

const Queue: React.FC<QueueProps> = ({ title, hideQueue }) => {
  const [query, setQuery] = useState<string>('');
  const [search, setSearch] = useState<Product[]>([]);

  useEffect(() => {
    findProduct(query).then((response) => {
      setSearch(response);
    });
  }, [query]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
  }

  function handleClose(): void {
    if (hideQueue) hideQueue();
  }

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ButtonContainer onClick={handleClose}>
          <FiX color={Color.red} />
        </ButtonContainer>
      </Header>
      <Content>
        <Input
          style={{ width: '100%' }}
          icon={<FiSearch color="white" />}
          placeholder="Buscar produto"
          value={query}
          onChange={onChange}
        />
        {!query && <ListContainer />}
        {query && (
          <SearchContainer>
            {search.map((product) => {
              return <p>{product.name}</p>;
            })}
          </SearchContainer>
        )}
      </Content>
      <Footer>
        <Total>Total: R$ 0,00</Total>
        <Button icon={<FiDollarSign color="white" />} color={Color.accent}>
          Vender
        </Button>
      </Footer>
    </Container>
  );
};

export default Queue;
