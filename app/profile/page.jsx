'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {

  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/prompts`);
    const data = await response.json();
    setPosts(data);
  }
  
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("¿Estás seguro de que desea eliminar este prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }    
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, [session?.user.id])

  return (
    <Profile
      name="Mi"
      desc="Bienvenido a tu perfil"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
};

export default MyProfile;