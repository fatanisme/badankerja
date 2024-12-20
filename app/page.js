"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchForm } from "@/components/SearchForm";
import { JobCard } from "@/components/JobCard";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { RecommendedTopics } from "@/components/RecommendedTopics";
import { getAllJobs, getAllPosts } from "./utils/api";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState([]); // State to hold jobs
  const [posts, setPosts] = useState([]); // State to hold posts
  const [cardTitle, setCardTitle] = useState("Lowongan Kerja Terbaru");
  const jobsPerPage = 10;
  const maxPostCard = 8; // Limit to 8 posts

  // Fetch jobs and posts on component mount
  useEffect(() => {
    const fetchJobsAndPosts = async () => {
      const jobsData = await getAllJobs();
      const postsData = await getAllPosts();
      setJobs(jobsData);
      setFilteredJobs(jobsData); // Initialize filtered jobs
      setPosts(postsData); // Set posts data in state
    };

    fetchJobsAndPosts(); // Call fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSearch = () => {
    setCurrentPage(1);
    const filtered = jobs.filter((job) => {
      const companyName = job.company_id?.name || '';
      const position = job.position || '';
      const description = job.description || '';

      return (
        companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredJobs(filtered);

    // Update card title based only on search term
    setCardTitle(
      filtered.length > 0
        ? `Lowongan kerja berdasarkan kata kunci: ${searchTerm}`
        : "Tidak ada lowongan kerja yang ditemukan."
    );
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredJobs(jobs);
    setCurrentPage(1);
    setCardTitle("Lowongan Kerja Terbaru"); // Reset title on clear
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Cari Informasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm
            onSearch={handleSearch}
            onClear={handleClear}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholderText="Cari lowongan..." // Teks placeholder untuk halaman home
          />
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <Card className="flex-1 mb-4 md:mb-0">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentJobs.length === 0 ? (
              <p className="text-gray-600">
                Tidak ada data lowongan kerja yang tersedia.
              </p>
            ) : (
              currentJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}

            {currentJobs.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredJobs.length / jobsPerPage)}
                onPageChange={handlePageChange}
              />
            )}
          </CardContent>
        </Card>

        <div className="w-full md:w-1/3">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Tips Karir & Blog Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              {posts.slice(0, maxPostCard).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </CardContent>
          </Card>

          <RecommendedTopics />
        </div>
      </div>
    </div>
  );
}
