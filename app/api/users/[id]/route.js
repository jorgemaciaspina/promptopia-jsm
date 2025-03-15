import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  const { id } = await params;
  try {
    await connectToDB();

    const user = await User.findById(id);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch user', { status: 500 });
  }
};