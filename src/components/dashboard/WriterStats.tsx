import React from 'react';
import { TrendingUp, Users, Clock } from 'lucide-react';

interface WriterStatsProps {
  stats: {
    pendingRequests: number;
    rank: number;
    totalWriters: number;
    avgResponseTime: string;
  };
}

const WriterStats: React.FC<WriterStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="bg-yellow-100 rounded-full p-3">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Pending Requests</p>
            <h3 className="text-2xl font-semibold text-gray-900">{stats.pendingRequests}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="bg-green-100 rounded-full p-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Your Rank</p>
            <h3 className="text-2xl font-semibold text-gray-900">
              {stats.rank} <span className="text-sm text-gray-500">of {stats.totalWriters}</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-full p-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
            <h3 className="text-2xl font-semibold text-gray-900">{stats.avgResponseTime}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterStats;