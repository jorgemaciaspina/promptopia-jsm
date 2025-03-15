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

  const handleDelete = async () => {
    
  }

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