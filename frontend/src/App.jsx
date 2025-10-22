import { useState, useEffect } from "react";
import Dashboard from "./componments/Dashboard";
import Login from "./componments/Login";
import Navbar from "./componments/Navbar";
import PostList from "./componments/PostList";
import PostForm from "./componments/PostForm";
import api from "./api/axios";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [dashboardData, setDashboardData] = useState({ total_posts: 0, roles: [] });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchDashboard();
      fetchPosts();
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/dashboard");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboardData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    fetchDashboard();
    fetchPosts();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container mx-auto p-6">
        <Dashboard data={dashboardData} />
        {!user && <Login onLogin={handleLogin} />}
        {user && (
          <>
            <PostList posts={posts} fetchPosts={fetchPosts} user={user} />
            {user.role === "Admin" && (
              <PostForm
                role={user.role}
                onPostCreated={fetchPosts}
              />
            )}

          </>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
}
