import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, TrendingUp, RefreshCw, AlertCircle, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://staging.instapreps.com/api/board');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setBoards(Array.isArray(result) ? result : [result]);
      setIsVisible(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const publishedBoards = boards.filter(b => b.publish).length;
  const unpublishedBoards = boards.filter(b => !b.publish).length;
  const totalBoards = boards.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <RefreshCw className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
            <p className="text-gray-700 text-xl font-medium">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md border border-red-100">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Connection Error</h3>
            <p className="text-gray-600 mb-6 text-center">{error}</p>
            <button
              onClick={fetchData}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  InstaPreps
                </h1>
                <p className="text-gray-600 text-sm">Board Management Dashboard</p>
              </div>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<BookOpen className="w-7 h-7" />}
              title="Total Boards"
              value={totalBoards}
              color="from-blue-500 to-blue-600"
              bgColor="from-blue-50 to-blue-100"
            />
            <StatCard
              icon={<CheckCircle className="w-7 h-7" />}
              title="Published"
              value={publishedBoards}
              color="from-green-500 to-green-600"
              bgColor="from-green-50 to-green-100"
            />
            <StatCard
              icon={<Clock className="w-7 h-7" />}
              title="Unpublished"
              value={unpublishedBoards}
              color="from-orange-500 to-orange-600"
              bgColor="from-orange-50 to-orange-100"
            />
          </div>

          {/* Boards Grid */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              All Boards
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boards.map((board, index) => (
                <div
                  key={board.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`h-2 bg-gradient-to-r ${board.publish ? 'from-green-400 to-green-600' : 'from-gray-300 to-gray-400'}`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                          {board.board}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium">
                          ID: {board.id}
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        board.publish 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {board.publish ? 'Published' : 'Draft'}
                      </div>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        <span className="text-gray-600">Created:</span>
                        <span className="text-gray-900 font-medium">{formatDate(board.created_at)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-600">Updated:</span>
                        <span className="text-gray-900 font-medium">{formatDate(board.updated_at)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-100">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">Priority:</span>
                        <span className="text-gray-900 font-bold">{board.priority}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Detailed Board Data
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Board Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {boards.map((board) => (
                    <tr key={board.id} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">{board.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{board.board}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          board.publish 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {board.publish ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-indigo-600">{board.priority}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(board.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(board.updated_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, title, value, color, bgColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
      <div className={`bg-gradient-to-br ${bgColor} p-6`}>
        <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-lg mb-4`}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">{title}</h3>
        <p className="text-4xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}