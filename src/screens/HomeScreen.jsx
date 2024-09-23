import React, { useEffect, useState } from 'react';
import { UserStore } from '../state/store';
import { useGetEquipment } from '../ApiHooks/equipemt';
import { Link, useNavigate } from 'react-router-dom';
import MobileHeader from '../components/HeaderNav';
import { Search, Filter } from 'lucide-react';

const HomeScreen = () => {
  const userData = UserStore.useState(s => s.user);
  const isLoggedIn = UserStore.useState(s => s.isLoggedIn);
  const navigate = useNavigate();

  const { data: records = [], isLoading, isError, error } = useGetEquipment();

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRecords = records?.filter((record) => {
    const matchesSearch = record?.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      record?.make.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      record?.state.toLowerCase().includes(searchTerm?.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileHeader page={"Home"} />
      
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Equipment Records</h2>
        
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative mb-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search equipment..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-sm ${filterStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('serviceable')}
              className={`px-3 py-1 rounded-full text-sm ${filterStatus === 'serviceable' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Serviceable
            </button>
            <button
              onClick={() => setFilterStatus('unserviceable')}
              className={`px-3 py-1 rounded-full text-sm ${filterStatus === 'unserviceable' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Unserviceable
            </button>
          </div>
        </div>
        
        {/* Record List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <Link key={record.id} to={`/record/${record.id}`} className="block">
                <div className={`p-4 rounded-lg shadow-lg ${
                  record.status === 'serviceable' ? 'bg-gradient-to-br from-green-100 to-green-200' : 'bg-gradient-to-br from-red-100 to-red-200'
                }`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{record.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><span className="font-semibold">Make:</span> {record.make}</p>
                    <p><span className="font-semibold">Hours:</span> {record.hour_of_utilized}</p>
                    <p><span className="font-semibold">Status:</span> {record.status}</p>
                    <p><span className="font-semibold">State:</span> {record.state}</p>
                  </div>
                  <p className="mt-2 text-sm"><span className="font-semibold">Remark:</span> {record.remarks}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Spare Utilized: {record.spaire_utilized}
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No records found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;