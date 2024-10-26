import Link from 'next/link';
import { marked } from 'marked';
export function JobCard({ job, isBlogPage }) {
    const logoUrl = job.company_id?.logo?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_IMG_URL}${job.company_id.logo.url}`
        : null; // Fallback to null if no logo URL is available
    const jobDescription = marked(job.company_id?.description);

    return (
        <Link href={`/jobs/${job.slug}`} className="block">
            <div className="border-b py-4 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        {logoUrl && (
                            <img
                                src={logoUrl}
                                alt={`${job.company_id?.name} logo`}
                                className="h-12 w-12 rounded-full mr-4"
                            />
                        )}
                        <div>
                            {isBlogPage ? (
                                <h3 className="text-blue-600 font-semibold cursor-pointer hover:underline">
                                    {job.company_id?.name}
                                </h3>
                            ) : (
                                <>
                                    <h3 className="text-blue-600 font-semibold">
                                        {job.company_id?.name}
                                    </h3>
                                    <p className="text-gray-600 mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: jobDescription }}></p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
