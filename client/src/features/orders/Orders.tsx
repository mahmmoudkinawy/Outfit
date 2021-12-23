import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { formatCurrency } from "../../app/util/util";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders..." />;

  if (orders!.length === 0)
    return (
      <Typography variant="h2" component="h2" style={{ textAlign: "center" }}>
        You did not ask for Orders
        <Button fullWidth component={Link} to="/catalog">
          Go back to the shop
        </Button>
      </Typography>
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="center">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                #{order.id}
              </TableCell>
              <TableCell align="center">
                {formatCurrency(order.total)}
              </TableCell>
              <TableCell align="right">
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell align="center">{order.orderStatus}</TableCell>
              <TableCell align="right">
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
