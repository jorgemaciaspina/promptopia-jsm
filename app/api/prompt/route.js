import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {

  const searchQuery = request?.nextUrl?.searchParams.get('searchText');
  try {
    await connectToDB();

    const prompts = await Prompt.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      {
        $match: {
          $or: [
            { prompt: { $regex: searchQuery, $options: 'i' } },
            { tag: { $regex: searchQuery, $options: 'i' } },
            { "creator.username": { $regex: searchQuery, $options: 'i' } }
          ]
        }
      }
    ]);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};