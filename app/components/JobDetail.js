"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendedTopics } from "@/components/RecommendedTopics";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { getAllJobs, getAllPosts } from "../utils/api";
import { PostCard } from "@/components/PostCard";
import { marked } from "marked";

export default function JobDetail() {
    const params = useParams();
    const [job, setJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchJobsAndPosts = async () => {
            const jobsData = await getAllJobs();
            const postsData = await getAllPosts();
            setJobs(jobsData);
            setPosts(postsData); // Set posts data in state
        };

        fetchJobsAndPosts(); // Call fetch function
    }, []);

    useEffect(() => {
        const foundJob = jobs.find(j => j.slug === params.slug);
        if (foundJob) {
            setJob(foundJob);
        }
    }, [jobs, params.slug]); // Dependency array includes jobs

    if (!job) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    const jobSalary = "Gaji : " + job.salary;
    const jobLocations = job.job_locations.map(location => location.name).join(', ');
    const jobLocation = "Lokasi : " + jobLocations;

    const jobTypes = job.job_types.map(type => type.name).join(', ');
    const jobType = "Tipe Pekerjaan : " + jobTypes;
    const jobCategories = job.job_categories.map((category, index) => (
        <a href={`/topic/${category.name.toLowerCase()}`} key={index} className="text-blue-500 underline">
            #{category.name}
        </a>
    ));

    const jobCategory = (
        <span>
            Kategori : {jobCategories.reduce((prev, curr) => [prev, ' ', curr])}
        </span>
    );

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const logoUrl = job.company_id?.logo?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_IMG_URL}${job.company_id.logo.url}`
        : null; // Fallback to null if no logo URL is available

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center mb-4">
                                {logoUrl && (
                                    <img
                                        src={logoUrl}
                                        alt={`${job.company_id?.name} logo`}
                                        className="h-12 w-12 rounded-full mr-4" // Adjust size and styles as needed
                                    />
                                )}
                                <h1 className="text-2xl font-bold text-blue-600">{job.company_id.name}</h1>
                            </div>
                            <div className="flex justify-end items-center">
                                <div className="text-right">
                                    <h3 className="text-lg font-bold text-blue-600 text-center">Share</h3>
                                    <div className="flex justify-end space-x-6 mt-2">
                                        <a href="https://www.instagram.com/badankerja" target="_blank" rel="noopener noreferrer" className="text-[#e4405f] hover:text-red-700 transform hover:scale-110 transition-transform duration-200">
                                            <span className="sr-only">Instagram</span>
                                            <Instagram />
                                        </a>
                                        <a href="https://twitter.com/badankerja" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transform hover:scale-110 transition-transform duration-200">
                                            <span className="sr-only">Twitter</span>
                                            <Twitter />
                                        </a>
                                        <a href="https://www.linkedin.com/company/badankerja/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transform hover:scale-110 transition-transform duration-200">
                                            <span className="sr-only">LinkedIn</span>
                                            <Linkedin />
                                        </a>
                                        <a href="https://www.facebook.com/badankerja" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transform hover:scale-110 transition-transform duration-200">
                                            <span className="sr-only">Facebook</span>
                                            <Facebook />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold mb-2">Deskripsi Pekerjaan</h3>
                                <article dangerouslySetInnerHTML={{ __html: marked(job.company_id.description) }} className='max-w-screen-lg prose text-justify' />
                                <article dangerouslySetInnerHTML={{ __html: marked(job.description) }} className='max-w-screen-lg prose text-justify' />
                            </div>
                            {job.salary || job.job_locations[0].name || job.job_types[0].name || job.job_categories[0].name ? (
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-2">Informasi Tambahan</h3>
                                    {job.salary && <p>{jobSalary}</p>}
                                    {job.job_locations[0].name && <p>{jobLocation}</p>}
                                    {job.job_types[0].name && <p>{jobType}</p>}
                                    {job.job_categories[0].name && <p>{jobCategory}</p>}
                                </div>
                            ) : null}
                            <div className="text-right">
                                <small className='text-gray-500'>{formatDate(job.publishedAt)}</small>
                            </div>
                            {job.applyLink && (
                                <Button className="w-full mt-4 bg-blue-600 font-bold text-white hover:bg-blue-700">Lamar Sekarang</Button>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-none w-full md:w-1/3">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Tips Karir & Blog Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} isBlogPage={false} />
                            ))}
                        </CardContent>
                    </Card>

                    <RecommendedTopics />
                </div>
            </div>
        </div>
    );
}
