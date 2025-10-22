import { useState } from "react";
import { Edit2, Trash2, X, User, Calendar, FileText } from "lucide-react";
import api from "./../api/axios";
import toast from "react-hot-toast";

export default function PostList({ posts, fetchPosts, user }) {
    const [editingPost, setEditingPost] = useState(null);
    const [form, setForm] = useState({ title: "", content: "" });
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await api.delete(`/posts/${id}`);
            fetchPosts();
            toast.success("Post deleted successfully!");
        } catch (err) {
            console.error("Error deleting post:", err.message);
            toast.error("You do not have permission to delete this post.");
        }
    };

    const handleUpdate = (post) => {
        setEditingPost(post);
        setForm({ title: post.title, content: post.content });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editingPost) return;

        setLoading(true);
        try {
            await api.put(`/posts/${editingPost.id}`, form);
            fetchPosts();
            setEditingPost(null);
            toast.success("Post updated successfully!");
        } catch (err) {
            console.error("Error updating post:", err);
            toast.error("Error updating post. You may not have permission.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto mb-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <FileText className="w-6 h-6 text-white" />
                        <h2 className="text-xl font-bold text-white">All Posts</h2>
                        <span className="ml-auto bg-white bg-opacity-20 px-3 py-1 rounded-full text-black text-sm font-medium">
                            {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-lg">No posts found.</p>
                            <p className="text-gray-400 text-sm mt-2">Create your first post to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-3 leading-relaxed">
                                                {post.content}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    <span>{post.user?.name || "Unknown"}</span>
                                                </div>
                                                {post.created_at && (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {(user?.role === "Admin" || user?.role === "Editor") && (
                                                <button
                                                    onClick={() => handleUpdate(post)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit post"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                            )}

                                            {user?.role === "Admin" && (
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete post"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {editingPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-scale-in">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Update Post</h2>
                                <button
                                    onClick={() => setEditingPost(null)}
                                    className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Post Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Enter post title"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Post Content
                                    </label>
                                    <textarea
                                        name="content"
                                        value={form.content}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Enter post content"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Updating...
                                            </span>
                                        ) : (
                                            "Update Post"
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingPost(null)}
                                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}