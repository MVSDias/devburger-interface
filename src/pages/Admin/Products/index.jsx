import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Container, EditButton, ProductImage } from './styles';
import { CheckCircle, Pencil, XCircle } from '@phosphor-icons/react';
import { formatPrice } from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      //
      const { data } = await api.get('/products'); // vou até o backend em categories e pego o data dentro da response que chega aqui.
      // console.log(data);

      setProducts(data);
    }
    loadProducts();
  }, []);

  function isOffer(offer) {
    // vai determinar se o produto está em oferta. e dependendo da resposta, coloca o ícone correspondente na tabela de produtos

    if (offer) {
      // console.log(offer);
      return <CheckCircle color="#61a120" size="28" />;
    } else {
      return <XCircle color="#FF3205" size="28" />;
    }
  }

  function editProduct(product) {
    // chamada pelo icone editar na tela de produto
    navigate('/admin/editar-produto', { state: { product } }); // vou navegar p tela de editar produto e passo as informações do produto por state. Assim posso pegar essas informações lá nessa tela.
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Produto em Oferta</TableCell>
              <TableCell align="center">Imagem do produto</TableCell>
              <TableCell align="center">Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                {/* // chamo a função isOffer e passo product.offer para ver se é oferta ou não */}
                <TableCell align="center">
                  <ProductImage src={product.url} alt={product.name} />
                </TableCell>
                <TableCell align="center">
                  <EditButton onClick={() => editProduct(product)}>
                    <Pencil />
                  </EditButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
