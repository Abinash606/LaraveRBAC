import { LogOut, User, Shield } from "lucide-react";

export default function Navbar({ user, onLogout }) {
    return (
        <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg">
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-xl font-bold text-white">Permission Dashboard</h1>
                            <p className="text-xs text-blue-100">Role & Access Management</p>
                        </div>
                    </div>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <button className="flex items-center gap-2 bg-white text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
                            <User className="w-4 h-4" />
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}