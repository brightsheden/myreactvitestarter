import React, { useState } from 'react';
import MobileHeader from '../components/HeaderNav';
import { useDelete, useGetEquipment } from '../ApiHooks/equipemt';
import { UserStore } from '../state/store';
import { Button } from '@material-tailwind/react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminRecordList = () => {
  // Sample data for demonstration (replace with actual data or API integration)

  const user = UserStore.useState(state => state?.user)
  const token = user?.token


  const [searchTerm, setSearchTerm] = useState('');
  const { data: records = [], isLoading, isError, error } = useGetEquipment();

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle deleting a record
  const {mutate:deleteRecord} = useDelete(token)
  const handleDelete = (id) => {
    deleteRecord(id)
  
  };

  // Function to handle editing a record (navigate to an edit form or inline edit)
  const navigate = useNavigate()
  const handleEdit = (id) => {
    navigate(`/editrecord/${id}/`)
    // Implement your edit logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
        <MobileHeader page={"Manage records"}/>
      <h2 className="text-2xl font-bold text-center text-black mb-6">Admin Record List</h2>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, make, or state"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
        />
      </div>

      
      <div className='my-8'>
      <Link to={'/addrecord'} >
      <Button>
          <FaPlusCircle/>
        </Button>
        </Link>

      </div>
    
      
      {/* Record List */}
      <div className="flex flex-col space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className={`p-4 rounded-lg shadow-lg ${
                record.status === 'serviceable' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-black">{record?.name}</h3>
                  <p className="text-black">Make: {record.make}</p>
                  <p className="text-black">Hour: {record?.hour_of_utilized}</p>
                  <p className="text-black">Status: {record?.status}</p>
                  <p className="text-black">Remark: {record?.remarks}</p>
                  <p className="text-black">Spare Utilized: {record?.spaire_utilized}</p>
                  <p className="text-black">State: {record?.state}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleEdit(record.id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No records found</p>
        )}
      </div>
    </div>
  );
};

export default AdminRecordList;
