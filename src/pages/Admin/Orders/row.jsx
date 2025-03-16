import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { formateDate } from '../../../utils/formatDate';
import { ProductImage, SelectStatus } from './styles';
import { orderStatusOptions } from './orderStatus';
import { api } from '../../../services/api';

export function Row(props) {
  const { row, orders, setOrders } = props; //vindo de index.jsx por props
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function newStatusOrder(id, status) {
    // vai atualizar o status da order

    try {

      setLoading(true) // inicio o loading(...)
      await api.put(`orders/${id}`, { status }); // acesso a api na rota orders, metodo put e atualizo o status na order no backend

      const newOrders = orders.map((order) =>
        order._id === id ? { ...order, status } : order,
      ); // pego order por order, comparo o id do pedido q estou alterando com todos os id's que estão chegando aqui da api. Se for igual, esparramo a order e altero apenas o status. Se não retorna a order sem alteração.
      setOrders(newOrders); //atualizo orders com as novas orders que foram mapeadas(tanto a que alterou quanto a q se manteve)
    } catch (err) { // se não conseguir estoura um erro e mostro no console.error com a mensagem de erro gerada.
      console.error(err);
    }

    finally { // o finally é sempre chamado (quando  o try de certo. Quando não dá, cai no catch, catch executa e depois cai no finally)
      setLoading(false) // interrompo o loading(...)
    }
  }

  // console.log(row.status);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{formateDate(row.date)}</TableCell>
        <TableCell>
          <SelectStatus
            options={orderStatusOptions.filter((status) => status.id !== 0)} // tirando o todos do select
            placeholder="Status"
            defaultValue={orderStatusOptions.find(
              (status) => status.value === row.status || null,
            )}
            // procuro dentro do meu array de opções, dentro de status.value se algum é igual ao status que chega em row.status. Se for igual coloco no select, como default. Se não existir deixo como null(aparece status apenas)
            onChange={(status) => newStatusOrder(row.orderId, status.value)} // sempre que mudar no select o status, chama a função newStatusOrder, atualiza a order pelo id (orderId) e o novo status.value q foi selecionado.
            isLoading={loading}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Imagem do Produto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <ProductImage src={product.url} alt={product.name} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  // validando os dados que estão chegando pelos props
  orders: PropTypes.array.isRequired,
  setOrders: PropTypes.func.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
