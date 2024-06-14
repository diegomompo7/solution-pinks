import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id, order } = req.body;
    console.log(order)
    const data = order.filter((order: { id: string }) => order.id !== id);
    res.status(200).json({ message: `Order with ID ${id} deleted successfully`, data: data });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}