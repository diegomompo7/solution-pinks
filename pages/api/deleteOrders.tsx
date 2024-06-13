import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.query; 
    res.status(200).json({ message: `Order with ID ${id} deleted successfully` });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}