import qs from "qs";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const getAllJobs = async () => {
    const jobsUrl =
        `${strapiUrl}/job-listings?` +
        qs.stringify({
            populate: ["company_id.logo", "job_categories", "job_types", "job_locations"],
            sort: ["createdAt:desc"],
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
    const today = new Date().toISOString(); // Mendapatkan tanggal hari ini dalam format ISO
    const postsUrl =
        `${strapiUrl}/articles?` +
        qs.stringify({
            populate: "*",
            sort: ["publish_date:desc"], // Menggunakan publish_date untuk pengurutan
            pagination: { pageSize: 10 },
            filters: {
                publish_date: {
                    $lte: today, // Menggunakan operator $gt untuk filter tanggal
                },
            },
        });

    try {
        const response = await fetch(postsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data; // Mengembalikan data postingan
    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Mengembalikan array kosong jika terjadi error
    }
};

