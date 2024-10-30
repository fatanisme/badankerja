"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendedTopics } from "@/components/RecommendedTopics";
import { Button } from "@/components/ui/button";
import { marked } from 'marked';


export default function PostDetail({ posts, slug }) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = posts.find(p => p.slug === slug);
        setPost(foundPost); // Set post whenever posts change;
    }, [posts, slug]);

    if (!post) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const imgCover = post.cover.formats.large.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_IMG_URL}${post.cover.formats.large.url}`
        : null; // Fallback to null if no logo URL is available
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-blue-500 text-center">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <img src={imgCover} alt={post.cover.formats.large.name} className="w-full h-full object-cover mb-4" />
                                <article dangerouslySetInnerHTML={{ __html: marked(post.content) }} className='max-w-screen-lg prose text-justify' />
                            </div>
                            <Button className="w-full mt-4 text-blue-500">Bagikan</Button>
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
