import { getAllJobs } from '../../utils/api';
import JobDetail from '@/components/JobDetail';
export async function generateMetadata({ params }) {
    const { slug } = params;
    const jobs = await getAllJobs();
    const foundJob = jobs.find(p => p.slug === slug);
    if (!foundJob) {
        return {
            title: "Job tidak ditemukan",
            description: "Halaman Job Detail yang anda Cari tidak ditemukan !"
        };
    }

    return {
        title: foundJob.title,
        description: foundJob.description,
        openGraph: {
            description: foundJob.description,
            images: foundJob.cover,
        },
    };
}

export async function generateStaticParams() {
    try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const response = await fetch(`${strapiUrl}/job-listings`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Access the data array
        const jobs = result.data;

        // Log the result to check the structure

        if (!Array.isArray(jobs)) {
            throw new Error(`Invalid data format received: ${typeof jobs}`);
        }

        // Map over the data to create params
        return jobs.map((post) => ({
            slug: post.slug,
        }));
    } catch (err) {
        console.error('Error fetching articles:', err.message);
        // Return an empty array if there’s an error
        return [];
    }
}

export default async function Page({ params }) {
    const jobs = await getAllJobs();
    return <JobDetail jobs={jobs} slug={params.slug} />;
}
