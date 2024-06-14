import { Order } from '@/dtos/Order.dto';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const {id, order } = req.body;

    const orderId = order.find((o:Order) => o.id === id)
    orderId.state = "DELIVERED"
    const data = order.map((order: { id: string; }) => order.id === orderId.id ? orderId : order);

    res.status(200).json({ message: `order ${id} change state to DELIVERED`, data: data });
    
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}