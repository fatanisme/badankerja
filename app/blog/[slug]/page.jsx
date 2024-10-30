import { getAllPosts } from '../../utils/api';
import PostDetail from '@/components/PostDetail';

export async function generateMetadata({ params }) {
    const { slug } = params;

    const posts = await getAllPosts();
    const foundPost = posts.find(p => p.slug === slug);
    if (!foundPost) {
        return {
            title: "Blog tidak ditemukan",
            description: "Halaman Blog yang anda Cari tidak ditemukan !"
        };
    }

    return {
        title: foundPost.title,
        openGraph: {
            description: foundPost.description,
            images: foundPost.cover, // Make sure foundPost.cover is an array or a string
        },
    };
}

export async function generateStaticParams() {
    try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const response = await fetch(`${strapiUrl}/articles`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Access the data array
        const posts = result.data;

        // Log the result to check the structure

        if (!Array.isArray(posts)) {
            throw new Error(`Invalid data format received: ${typeof posts}`);
        }

        // Map over the data to create params
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (err) {
        console.error('Error fetching articles:', err.message);
        // Return an empty array if there’s an error
        return [];
    }
}

export default async function Page({ params }) {
    const posts = await getAllPosts();
    return <PostDetail posts={posts} slug={params.slug} />;
}
