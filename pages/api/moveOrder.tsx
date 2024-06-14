import { Order } from '@/dtos/Order.dto';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const {id, state, order } = req.body;
    console.log(order, id, state)
    const orderId = order.find((o:Order) => o.id === id)
    const updatedOrder = orderId.state = state
    const data = order.map((order: { id: string; }) => order.id === updatedOrder.id ? updatedOrder : order);

    res.status(200).json({ message: `order ${id} change state to ${state}`, data: data });
    
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}