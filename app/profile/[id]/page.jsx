'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({});

  const {id: userId } = React.use(params);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${userId}/prompts`);
    const data = await response.json();
    setPosts(data);
  }
  
  const fetchProfile = async () => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    console.log('profile', data);
    setProfile(data);
  }
  
  useEffect(() => {
    if (userId) {
      fetchPosts();
      fetchProfile();
    }
  }, [userId])

  return (
    <Profile
      name={profile.username}
      desc={`Bienvenido al perfil de ${profile.username}`}
      data={posts}
    />
  )
};

export default UserProfile;