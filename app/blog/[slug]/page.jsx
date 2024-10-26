"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendedTopics } from "@/components/RecommendedTopics";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import qs from "qs";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default function PostDetail() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsUrl = `${strapiUrl}/articles?` + qs.stringify({
                fields: ["title", "slug", "description", "publishedAt"],
                populate: "*",
                sort: ["publishedAt:desc"],
                pagination: { pageSize: 10 }
            });
            try {
                const postResponse = await fetch(postsUrl);
                if (!postResponse.ok) {
                    throw new Error(`HTTP error! status: ${postResponse.status}`);
                }
                const postData = await postResponse.json();
                setPosts(postData.data); // Set posts data in state
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts(); // Call fetchPosts function
    }, []); // Run this effect only once on component mount

    useEffect(() => {
        const foundPost = posts.find(p => p.slug === params.slug);
        console.log(foundPost);
        setPost(foundPost); // Set post whenever posts change
    }, [posts, params.slug]);

    if (!post) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
                            <p className="text-sm text-gray-500">{post.publishedAt}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Konten</h3>
                                <p>{post.description}</p>
                            </div>
                            <Button className="w-full mt-4">Bagikan</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-none w-full md:w-1/3">
                    <RecommendedTopics />
                </div>
            </div>
        </div>
    );
}
