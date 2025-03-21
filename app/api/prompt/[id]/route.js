import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  const { id } = await params;
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the resource", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error updating prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = await params;
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};
