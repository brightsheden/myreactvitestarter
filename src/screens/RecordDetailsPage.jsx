import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchEquipmentById } from '../ApiHooks/equipemt';
import MobileHeader from '../components/HeaderNav';
import { ArrowLeft, Clock, Settings, CheckCircle, AlertTriangle, MapPin, FileText } from 'lucide-react';

const RecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: record, isLoading, isError } = useFetchEquipmentById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <p>Error loading record details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileHeader page={record?.name || 'Record Details'} />
      
      <div className="p-4 mt-[10vh]">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className={`p-4 ${record?.status === 'serviceable' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            <h2 className="text-2xl font-bold">{record?.name}</h2>
            <p className="text-sm opacity-75">{record?.make}</p>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={<Clock size={20} />} label="Hours" value={record?.hours_of_utilized} />
              <DetailItem 
                icon={record?.status === 'serviceable' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />} 
                label="Status" 
                value={record?.status}
                className={record?.status === 'serviceable' ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}
              />
              <DetailItem icon={<Settings size={20} />} label="Spare Utilized" value={record?.spaire_utilized} />
              <DetailItem icon={<MapPin size={20} />} label="State" value={record?.state} />
            </div>
            
            <div className="mt-4">
              <DetailItem icon={<FileText size={20} />} label="Remark" value={record?.remarks} fullWidth />
            </div>
          </div>
          
       
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, className = "", fullWidth = false }) => (
  <div className={`flex items-start ${fullWidth ? 'col-span-2' : ''}`}>
    <div className="text-gray-500 mr-2">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-medium ${className}`}>{value}</p>
    </div>
  </div>
);

export default RecordDetails;