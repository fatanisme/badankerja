"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import qs from "qs";

// Get data from Strapi API
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export function RecommendedTopics() {
  const [topics, setTopics] = useState([]); // State to hold topic
  // Fetch topic and posts on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      const topicUrl =
        `${strapiUrl}/job-categories?` +
        qs.stringify({
          fields: ["name", "slug", "publishedAt"],
          sort: ["publishedAt:desc"],
          pagination: { pageSize: 10 },
        });
      try {
        const topicResponse = await fetch(topicUrl);
        if (!topicResponse.ok) {
          throw new Error(`HTTP error! status: ${topicResponse.status}`);
        }
        const topicData = await topicResponse.json();
        setTopics(topicData.data); // Set topics data in state
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics(); // Call fetchTopics function
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="mt-8 p-6">
      <h2 className="text-2xl font-bold mb-4">Recommended topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <Link
            key={index}
            href={`/topic/${topic.slug}`}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors"
          >
            {topic.name}
          </Link>
        ))}
      </div>

    </div>
  );
}
