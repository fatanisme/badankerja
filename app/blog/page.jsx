"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchForm } from "@/components/SearchForm";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { RecommendedTopics } from "@/components/RecommendedTopics";
import { JobCard } from "@/components/JobCard"; // Impor JobCard;
import { getAllJobs, getAllPosts } from '../utils/api';
export default function Blog() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [jobs, setJobs] = useState([]); // State to hold jobs
    const [posts, setPosts] = useState([]); // State to hold posts
    const [cardTitle, setCardTitle] = useState('Postingan Blog');
    const postsPerPage = 10;
    const maxJobCards = 8; // Limit to 8 jobs

    useEffect(() => {
        const fetchJobsAndPosts = async () => {
            const jobsData = await getAllJobs();
            const postsData = await getAllPosts();
            setJobs(jobsData);
            setPosts(postsData); // Set posts data in state
            setFilteredPosts(postsData); // Initialize filtered posts
        };

        fetchJobsAndPosts(); // Call fetch function
    }, []);
    const handleSearch = () => {
        setCurrentPage(1);
        const filtered = posts.filter(post => {
            const title = post.title ? post.title.toLowerCase() : '';
            const content = post.content ? post.content.toLowerCase() : '';
            return title.includes(searchTerm.toLowerCase()) || content.includes(searchTerm.toLowerCase());
        });
        setFilteredPosts(filtered);
    };


    const handleClear = () => {
        setSearchTerm('');
        setFilteredPosts(posts);
        setCurrentPage(1);
        setCardTitle('Postingan Blog'); // Reset title on clear
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Cari Postingan Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <SearchForm
                        onSearch={handleSearch}
                        onClear={handleClear}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        placeholderText="Cari postingan blog..." // Teks placeholder untuk halaman blog
                    />
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:space-x-4">
                <Card className="flex-1 mb-4 md:mb-0">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">{cardTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {currentPosts.length === 0 ? (
                            <p className="text-gray-600">
                                Tidak ada data postingan yang tersedia.
                            </p>
                        ) : (
                            currentPosts.map((post) => (
                                <PostCard key={post.id} post={post} isBlogPage={true} />
                            ))
                        )}

                        {currentPosts.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </CardContent>
                </Card>

                <div className="w-full md:w-1/3">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Rekomendasi Pekerjaan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {jobs.length === 0 ? (
                                <p className="text-gray-600">Tidak ada pekerjaan yang tersedia.</p>
                            ) : (
                                jobs.slice(0, maxJobCards).map((job) => (
                                    <JobCard key={job.id} job={job} isBlogPage={true} />
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Rekomendasi Topik di bawah JobCard */}
                    <RecommendedTopics />
                </div>
            </div>
        </div>
    );
}
