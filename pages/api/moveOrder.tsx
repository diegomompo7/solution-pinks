import type { NextApiRequest, NextApiResponse } from 'next'
import { useOrders } from "../../contexts/Orders.context";

const { orders, pickup, readyOrder } = useOrders();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const {id, state } = req.query;
    res.status(200).json(orders);
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}