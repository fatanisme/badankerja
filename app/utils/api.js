import qs from "qs";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const getAllJobs = async () => {
    const jobsUrl =
        `${strapiUrl}/job-listings?` +
        qs.stringify({
            populate: ["company_id.logo", "job_categories"],
            sort: ["publishedAt:desc"],
            pagination: { pageSize: 10 },
        });

    try {
        const response = await fetch(jobsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data; // Return job data
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return []; // Return empty array on error
    }
};

export const getAllPosts = async () => {
    const postsUrl =
        `${strapiUrl}/articles?` +
        qs.stringify({
            sort: ["publishedAt:desc"],
            pagination: { pageSize: 10 },
        });

    try {
        const response = await fetch(postsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data; // Return post data
    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Return empty array on error
    }
};
