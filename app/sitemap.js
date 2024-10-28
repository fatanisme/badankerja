import { getAllJobs, getAllPosts } from "./utils/api";

export default async function sitemap() {
    const baseUrl = "https://badankerja.com"
    const jobsResponse = await getAllJobs();
    const Jobs = jobsResponse.map((job) => {
        return {
            url: baseUrl + `/jobs/${job.slug}`,
            lastModified: new Date(job.publishedAt),
        };
    });
    const postsResponse = await getAllPosts();
    const Posts = postsResponse.map((post) => {
        return {
            url: baseUrl + `/blog/${post.slug}`,
            lastModified: new Date(post.publishedAt),
        };
    });
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...Jobs,
        ...Posts
    ];
}