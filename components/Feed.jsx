'use client';

import { useState, useEffect } from "react";
import { useDebounce } from "react-use";

import PromptCard from "./PromptCard";
import { set } from "mongoose";

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState();
  
  useDebounce(() => {
    console.log('searchText', searchText);
    setDebouncedSearchText(searchText)
  }, 500, [searchText]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    console.log('debouncedSearchText', debouncedSearchText);
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt?searchText=${debouncedSearchText}`);
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, [debouncedSearchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Buscar..."
          required
          className="search_input peer"
          onChange={handleSearchChange}
          value={searchText}
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
};

export default Feed;