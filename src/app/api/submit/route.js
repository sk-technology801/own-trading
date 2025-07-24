import { connectToDatabase } from '@/lib/mongodb';
import FormData from '@/models/FormData';

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const data = await FormData.create(body);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to store data' }), {
      status: 500,
    });
  }
}
