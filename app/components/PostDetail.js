"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendedTopics } from "@/components/RecommendedTopics";
import { Button } from "@/components/ui/button";

export default function PostDetail({ posts, slug }) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = posts.find(p => p.slug === slug);
        setPost(foundPost); // Set post whenever posts change
    }, [posts, slug]);

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
