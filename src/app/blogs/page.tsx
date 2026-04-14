"use client";
import { useEffect, useState, useMemo } from "react";
// Removed unused 'Link' import to fix ESLint warning
import { LuLoader2, LuCalendar, LuUser, LuArrowRight } from "react-icons/lu";
import Breadcrumb from "~/components/Breadcrumb";
import * as components from "~/components";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

// Mock blog data
const MOCK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "How to Plan the Perfect Experience",
    excerpt:
      "Learn the key tips and tricks for hosting an unforgettable experience on MySlotmate.",
    author: "Sarah Johnson",
    date: "2026-04-05",
    category: "Hosting",
    image: "/assets/home/hiking.jpg",
    readTime: 5,
  },
  {
    id: "2",
    title: "Top 10 Wellness Activities for Relaxation",
    excerpt:
      "Discover the best wellness experiences that will rejuvenate your mind and body.",
    author: "Arun Patel",
    date: "2026-04-02",
    category: "Wellness",
    image: "/assets/home/hiking.jpg",
    readTime: 8,
  },
  {
    id: "3",
    title: "Finding Your Perfect Local Adventure",
    excerpt:
      "Explore hidden gems and unique adventures right in your own city.",
    author: "Emma Wilson",
    date: "2026-03-30",
    category: "Adventure",
    image: "/assets/home/hiking.jpg",
    readTime: 6,
  },
  {
    id: "4",
    title: "The Art of Culinary Experiences",
    excerpt: "Master the basics of hosting amazing food and drink experiences.",
    author: "Chef Michael",
    date: "2026-03-28",
    category: "Culinary",
    image: "/assets/home/hiking.jpg",
    readTime: 7,
  },
  {
    id: "5",
    title: "Community Stories: Inspiring Hosts",
    excerpt:
      "Read inspiring stories from our community of passionate experience creators.",
    author: "MySlotmate Team",
    date: "2026-03-25",
    category: "Community",
    image: "/assets/home/hiking.jpg",
    readTime: 10,
  },
  {
    id: "6",
    title: "Safety Tips for Experience Guests",
    excerpt:
      "Everything you need to know to stay safe while enjoying experiences.",
    author: "Safety Team",
    date: "2026-03-20",
    category: "Safety",
    image: "/assets/home/hiking.jpg",
    readTime: 4,
  },
  {
    id: "7",
    title: "Getting Started: Your First MySlotmate Experience",
    excerpt:
      "A beginner's guide to booking your first experience on MySlotmate. From browsing to booking, we've got you covered with every step.",
    author: "Alex Kumar",
    date: "2026-04-08",
    category: "Getting Started",
    image: "/assets/home/hiking.jpg",
    readTime: 6,
  },
];

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      hosting: "bg-blue-100 text-blue-800",
      wellness: "bg-purple-100 text-purple-800",
      adventure: "bg-green-100 text-green-800",
      culinary: "bg-orange-100 text-orange-800",
      community: "bg-pink-100 text-pink-800",
      safety: "bg-red-100 text-red-800",
      "getting started": "bg-indigo-100 text-indigo-800",
    };
    return colors[category.toLowerCase()] ?? "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <div className="h-48 w-full overflow-hidden bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${getCategoryColor(post.category)}`}
          >
            {post.category}
          </span>
          <span className="text-xs text-gray-500">
            {post.readTime} min read
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 hover:text-[#0e8ae0]">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <LuUser className="h-3 w-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <LuCalendar className="h-3 w-3" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
          <LuArrowRight className="h-5 w-5 text-[#0e8ae0]" />
        </div>
      </div>
    </div>
  );
};

const BlogLoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {/* Fixed: Replaced [...Array(6)] with Array.from to prevent unsafe spread error */}
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-48 w-full rounded-xl bg-gray-200" />
        <div className="mt-4 space-y-2 px-4">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-5 rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
);

export default function BlogsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredBlogs = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return MOCK_BLOGS.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.category.toLowerCase().includes(searchLower) ||
        blog.author.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <components.Navbar />

      <div className="flex-1">
        <div className="site-x mx-auto w-full max-w-[1120px] py-8">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog & Stories" }]}
          />

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              MySlotmate Blog
            </h1>
            <p className="mb-6 text-gray-600">
              Discover tips, stories, and insights from our community. Learn how
              to make the most of your MySlotmate experience.
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#0e8ae0] focus:outline-none"
              />
            </div>
          </div>

          {isLoading ? (
            <BlogLoadingSkeleton />
          ) : filteredBlogs.length > 0 ? (
            <div>
              <p className="mb-6 text-sm text-gray-600">
                Found {filteredBlogs.length} article
                {filteredBlogs.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} post={blog} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <LuLoader2 className="mb-4 h-12 w-12 text-gray-300" />
              <p className="text-center text-gray-500">
                {searchTerm
                  ? "No articles found matching your search."
                  : "No articles available at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>

      <components.Home.Footer />
    </div>
  );
}
