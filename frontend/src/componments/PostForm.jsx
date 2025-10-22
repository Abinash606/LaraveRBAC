import { useState } from "react";
import { PlusCircle, FileText, Type } from "lucide-react";
import api from "./../api/axios";
import toast from "react-hot-toast";

export default function PostForm({ role, onPostCreated }) {
    const [form, setForm] = useState({ title: "", content: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role !== "Admin") return;

        setLoading(true);
        try {
            await api.post("/posts", form);
            toast.success("Post created successfully!");
            setForm({ title: "", content: "" });
            onPostCreated();
        } catch (err) {
            console.error(err);
            toast.error("Error creating post");
        } finally {
            setLoading(false);
        }
    };

    if (role !== "Admin") {
        return (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                        <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-amber-900 mb-1">Admin Access Required</h3>
                        <p className="text-amber-700 text-sm">
                            Only administrators can create new posts. Contact your admin for access.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <div className="flex items-center gap-2">
                    <PlusCircle className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">Create New Post</h2>
                </div>
            </div>

            <div className="p-6">
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post Title
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Type className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter an engaging title for your post"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Make it clear and descriptive
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post Content
                        </label>
                        <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                                <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                                name="content"
                                placeholder="Write your post content here..."
                                value={form.content}
                                onChange={handleChange}
                                rows="6"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                                required
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Share your thoughts, ideas, or announcements
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex gap-4 text-gray-500">
                            <span>Title: {form.title.length} characters</span>
                            <span>Content: {form.content.length} characters</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || !form.title.trim() || !form.content.trim()}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Post...</span>
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="w-5 h-5" />
                                    <span>Create Post</span>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({ title: "", content: "" })}
                            disabled={loading}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}