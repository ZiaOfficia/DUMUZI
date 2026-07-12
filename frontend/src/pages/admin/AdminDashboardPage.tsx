import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { API_BASE_URL } from "../../config";

// Define stricter type matching backend response
interface BackendBlogPost {
  id: string; // UUID
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

const AdminDashboardPage: React.FC = () => {
  const [posts, setPosts] = useState<BackendBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      // Fetch all posts for admin (with high limit to get all)
      const response = await fetch(`${API_BASE_URL}/api/blogs?limit=1000`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Handle both array format (old) and paginated object format (new)
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data.blogs && Array.isArray(data.blogs)) {
        setPosts(data.blogs);
      } else {
        console.error("Unexpected data format:", data);
        setPosts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-stone-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif text-stone-100">
            Admin Dashboard
          </h1>
          <div className="flex gap-4 w-full md:w-auto">
            <Link to="/admin/orders" className="flex-1 md:flex-none">
              <Button variant="outline" className="w-full md:w-auto text-stone-300 border-stone-600 hover:bg-stone-800 justify-center">
                Manage Orders
              </Button>
            </Link>
            <Link to="/admin/create" className="flex-1 md:flex-none">
              <Button variant="primary" className="w-full md:w-auto">
                Create New Post
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-stone-300 border-stone-600 hover:bg-stone-800 flex-1 md:flex-none text-center justify-center"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-stone-800 rounded-lg border border-stone-700 overflow-hidden">
          {/* Table Header - Hidden on Mobile */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-stone-700 bg-stone-900/50 text-stone-400 font-medium text-sm">
            <div className="col-span-1">S.No</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-stone-400">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-stone-400">
              No blog posts found. Create one to get started!
            </div>
          ) : (
            posts.map((post, index) => (
              <div
                key={post.id}
                className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 p-4 border-b border-stone-700/50 items-start md:items-center hover:bg-stone-700/30 transition-colors text-stone-300"
              >
                {/* SNO - Hidden on Mobile, shown inline */}
                <div className="hidden md:block md:col-span-1 text-stone-500 font-medium">
                  {index + 1}
                </div>
                <div className="w-full md:col-span-5 font-medium md:truncate text-lg md:text-base text-white md:text-stone-300">
                  <span className="md:hidden text-stone-500 mr-2">
                    #{index + 1}
                  </span>
                  {post.title}
                </div>

                {/* Mobile: Row for meta info */}
                <div className="w-full flex md:contents justify-between text-sm text-stone-400 md:text-inherit">
                  <div className="md:col-span-2 bg-stone-900/50 md:bg-transparent px-2 py-1 md:p-0 rounded md:rounded-none">
                    {post.category}
                  </div>
                  <div className="md:col-span-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="w-full md:col-span-2 flex justify-start md:justify-end gap-2 mt-2 md:mt-0">
                  <Link
                    to={`/admin/edit/${post.id}`}
                    className="flex-1 md:flex-none"
                  >
                    <button className="w-full md:w-auto p-2 bg-stone-700 md:bg-transparent rounded md:rounded-none text-center text-stone-300 md:text-stone-400 hover:text-yellow-500 transition-colors">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 md:flex-none p-2 bg-stone-700 md:bg-transparent rounded md:rounded-none text-center text-stone-300 md:text-stone-400 hover:text-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
