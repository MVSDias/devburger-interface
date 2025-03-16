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
import { orderStatusOptions } from './orderStatus';
import { Filter, FilterOptions } from './styles'

export function Orders() {
  const [orders, setOrders] = useState([]); // backup de orders
  const [filteredOrders, setfilteredOrders] = useState([]); // valores(orders) que estão na tela
  const [activeStatus, setActiveStatus] = useState(0) // mostra o status q está ativo. Por padrão, começa com 0(todos)
  const [rows, setRows] = useState([]);
  // console.log(rows)
  useEffect(() => {
    async function loadOrders() {
      // uso uma função assíncrona para fazer uma chamada a api
      const { data } = await api.get('/orders'); //guardo em data o que chega da api na rota get.orders
      setOrders(data); // atualizo as orders aqui
      setfilteredOrders(data)// atualizo as orders q estão na tela aqui
      // console.log(data);
    }

    loadOrders();
  }, []);

  function createData(order) {
    // passando dado por dado pra função createData criar as rows
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products,
    };
  }

  useEffect(() => {
    const newRows = filteredOrders.map((order) => createData(order)); // toda vez q tiver alteração no filteredOrders(orders na tela), faço um map e  chamo o createData passando a order para formar row por row

    setRows(newRows);
    // console.log(newRows)
  }, [filteredOrders]); // sempre q filteredOrders mudar chamo esse useEffect
  // console.log(rows)

  function handleStatus(status){ // recebe o status(id,  value e label)
    if(status.id === 0){ // se escolhi todos (id = 0)
      setfilteredOrders(orders); // abasteço o setFilteredOrders com o backup(orders)
    } else {
      const newOrders = orders.filter(order => order.status === status.value); // filtro o backup(sempre fitro pelo backup, pq ele sempre tem todas as orders), e comparo o status da orderdo backup com o status.value (q está chegando aqui em status). se for igual vai pro novo array(newOrders)
      setfilteredOrders(newOrders); // abasteço o array q vai aparecer na tela com newOrders

    }

    setActiveStatus(status.id) // atualizo o active Status com o id do status ativo na tela
  }

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOptions 
          key={status.id}
          onClick={() => handleStatus(status)}
          $isActiveStatus={activeStatus === status.id} //faço uma verificação p saber se o staus ativo tem o mesmo id do status. concluo no styled.
          >{status.label}</FilterOptions>
        ))}
      </Filter>
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
              <Row
                key={row.orderId}
                row={row} // passando a row, orders e setOrders p function row em row.jsx por props
                orders={orders}
                setOrders={setOrders}
              /> // o createData manda as rows e injeta aqui com o map
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
