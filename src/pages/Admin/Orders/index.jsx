import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Row } from './row';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [rows, setRows] = useState([]);
  // console.log(rows)
  useEffect(() => {
    async function loadOrders() {
      // uso uma função assíncrona para fazer uma chamada a api
      const { data } = await api.get('/orders'); //guardo em data o que chega da api na rota get.orders
      setOrders(data); // atualizo as orders aqui
      // console.log(data);
    }

    loadOrders();
  }, []);

 

  function createData(order) { // passando dado por dado pra função createData criar as rows
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products,
    };

    
  }

  useEffect(() => {
    const newRows = orders.map((order) => createData(order)); // toda vez q tiver alteração nas orders, faço um map em orders, chamo o createData passando a order e formo row por row

    setRows(newRows)
    // console.log(newRows)
  }, [orders]); // sempre q orders mudar chamo esse useEffect

  console.log(rows)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Data do Pedido</TableCell>
            <TableCell>Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row._id} row={row} /> // o createData manda as rows e injeta aqui com o map
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
