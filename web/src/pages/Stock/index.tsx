import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiTrash2, FiEdit2 } from 'react-icons/fi';

import {
  Container,
  Header,
  Title,
  Content,
  ListContainer,
  ItemContainer,
  SpaceBetween,
  Name,
  Type,
  Value,
  StockAmount,
  ButtonContainer,
  Footer,
} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useDialog from '../../hooks/dialog';
import Color from '../../themes/Color';
import { Product } from '../../@types/models';
import { getProducts, deleteProduct } from '../../services/api';
import AddProduct from '../../dialogs/AddProduct';

const Stock: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dialog = useDialog();

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  function handleAdd(): void {
    dialog.show(() => <AddProduct title="Adicionar Produto" />);
  }

  function handleEdit(product: Product): void {
    dialog.show(() => <AddProduct title="Editar Produto" product={product} />);
  }

  const renderItem = (product: Product): React.ReactElement => {
    function handleItem(): void {
      handleEdit(product);
    }

    async function handleDelete(): Promise<void> {
      await deleteProduct(product.id);
    }

    return (
      <ItemContainer key={String(product.id)}>
        <SpaceBetween>
          <Name>Nome: {product.name}</Name>
          <Type>Tipo: {product.type}</Type>
          <Value>Valor: {product.sale_value}</Value>
        </SpaceBetween>
        <StockAmount>No estoque: {product.amount}</StockAmount>
        <SpaceBetween>
          <ButtonContainer onClick={handleDelete}>
            <FiTrash2 style={{ alignSelf: 'flex-end' }} color={Color.red} />
          </ButtonContainer>
          <Button
            icon={<FiEdit2 color={Color.white} />}
            color={Color.accent}
            onClick={handleItem}
          >
            Editar
          </Button>
        </SpaceBetween>
      </ItemContainer>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Produtos</Title>
      </Header>
      <Content>
        <Input
          style={{ width: '100%' }}
          icon={<FiSearch color="white" />}
          placeholder="Buscar produto"
        />
        <ListContainer>
          {products.map((product) => renderItem(product))}
        </ListContainer>
      </Content>
      <Footer>
        <Button icon={<FiPlus color={Color.white} />} onClick={handleAdd}>
          Adicionar
        </Button>
      </Footer>
    </Container>
  );
};

export default Stock;
