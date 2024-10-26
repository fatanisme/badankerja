import Link from 'next/link';

export function PostCard({ post, isBlogPage }) {
    // Convert publishedAt date to "24 Oktober 2024" format
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        : 'Tanggal Tidak Tersedia'; // Fallback if date is not available

    return (
        <div className="border-b py-4">
            <Link href={`/blog/${post.slug}`}>
                <h3 className="text-blue-600 font-semibold cursor-pointer hover:underline">{post.title}</h3>
            </Link>
            {isBlogPage && (
                <>
                    <p className="mt-2">{post.description}</p>
                    <p className="text-gray-600 text-right">{formattedDate}</p>
                </>
            )}
        </div>
    );
}
