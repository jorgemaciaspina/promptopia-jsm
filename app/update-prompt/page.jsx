'use client'

import { useState, useEffect, use } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  } 

  return (
    <Form
      type="Actualizar"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt