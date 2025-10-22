import { Loader2 } from "lucide-react";

export default function Dashboard({ data, loading }) {

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600 font-medium">Loading dashboard...</span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                No dashboard data available.
            </div>
        );
    }

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium mb-1">Total Posts</p>
                            <p className="text-3xl font-bold">{data.total_posts || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium mb-1">Total Roles</p>
                            <p className="text-3xl font-bold">{data.roles_summary?.length || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium mb-1">Total Users</p>
                            <p className="text-3xl font-bold">
                                {data.roles_summary?.reduce((sum, role) => sum + (role.users_count || 0), 0) || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mr-3">Roles Breakdown</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.roles_summary?.length > 0 ? (
                        data.roles_summary.map((role) => (
                            <div key={role.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">{role.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">{role.users_count} {role.users_count === 1 ? 'user' : 'users'}</p>
                                    </div>
                                    <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                        {role.users_count}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No roles found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
