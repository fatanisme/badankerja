import Link from 'next/link'


const topics = [
    "Software Engineering",
    "Machine Learning",
    "JavaScript",
    "Cybersecurity",
    "Science",
    "Software Development",
    "Artificial Intelligence"
]

export function RecommendedTopics() {
    return (
        <div className="mt-8 p-6">
            <h2 className="text-2xl font-bold mb-4">Recommended topics</h2>
            <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                    <Link
                        key={index}
                        href={`/topic/${topic.toLowerCase().replace(' ', '-')}`}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors"
                    >
                        {topic}
                    </Link>
                ))}
            </div>
            <Link href="/topics" className="text-green-600 hover:underline mt-4 inline-block">
                See more topics
            </Link>
        </div>
    )
}