/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { FiSave, FiMinus, FiPlus } from 'react-icons/fi';

import {
  Container,
  Header,
  Title,
  Content,
  Label,
  Input,
  ValueContainer,
  PurchaseContainer,
  SaleContainer,
  AmountContainer,
  AmountContent,
  AmountInput,
  ButtonContainer,
  StockAmount,
  Footer,
  ButtonCancelar,
} from './styles';
import { AddProductProps } from '../../@types/props';
import Button from '../../components/Button';
import Color from '../../themes/Color';
import useDialog from '../../hooks/dialog';
import { Product } from '../../@types/models';
import { createProduct, updateProduct } from '../../services/api';

const AddProduct: React.FC<AddProductProps> = ({ title, product }) => {
  const [productInfo, setProductInfo] = useState<Product>(
    product ||
      ({
        purchase_value: 0,
        sale_value: 0,
        amount: 0,
      } as Product)
  );
  const { hide } = useDialog();

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  }

  function handleSave(): void {
    if (!product) createProduct(productInfo);
    else updateProduct(productInfo);
    hide();
  }

  function handleMinus(): void {
    const amount = 'amount';
    const value = Number(productInfo.amount) - 1;
    if (value >= 0) setProductInfo({ ...productInfo, [amount]: value });
  }

  function handlePlus(): void {
    const amount = 'amount';
    const value = Number(productInfo.amount) + 1;
    setProductInfo({ ...productInfo, [amount]: value });
  }

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        <Label>Produto</Label>
        <Input name="name" value={productInfo?.name} onChange={onChange} />
        <Label>Tipo</Label>
        <Input name="type" value={productInfo?.type} onChange={onChange} />
        <ValueContainer>
          <PurchaseContainer>
            <Label>Valor de compra</Label>
            <Input
              name="purchase_value"
              value={productInfo?.purchase_value}
              onChange={onChange}
            />
          </PurchaseContainer>
          <SaleContainer>
            <Label>Valor de venda</Label>
            <Input
              name="sale_value"
              value={productInfo?.sale_value}
              onChange={onChange}
            />
          </SaleContainer>
        </ValueContainer>
        <AmountContainer>
          <Label>Quantidade</Label>
          <AmountContent>
            <AmountInput
              name="amount"
              value={productInfo?.amount || 0}
              onChange={onChange}
            />
            <ButtonContainer onClick={handleMinus} color={Color.red}>
              <FiMinus color={Color.red} />
            </ButtonContainer>
            <ButtonContainer onClick={handlePlus} color={Color.green}>
              <FiPlus color={Color.green} />
            </ButtonContainer>
            {product && (
              <StockAmount>No Estoque: {product?.amount}</StockAmount>
            )}
          </AmountContent>
        </AmountContainer>
      </Content>
      <Footer>
        <ButtonCancelar onClick={hide}>Cancelar</ButtonCancelar>
        <Button
          onClick={handleSave}
          icon={<FiSave color={Color.white} />}
          color={Color.accent}
        >
          Salvar
        </Button>
      </Footer>
    </Container>
  );
};

export default AddProduct;
