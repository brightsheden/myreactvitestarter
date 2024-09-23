import React, { useEffect, useState } from 'react';
import { useAddRecord, useEditRecord, useFetchEquipmentById } from '../ApiHooks/equipemt';
import { UserStore } from '../state/store';
import MobileHeader from '../components/HeaderNav';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const EditRecord = () => {
  const {id} = useParams()
  const [name, setName] = useState('');
  const [make, setMake] = useState('');
  const [hour, setHour] = useState('');
  const [status, setStatus] = useState('serviceable');
  const [remark, setRemark] = useState('');
  const [spareUtilized, setSpareUtilized] = useState('');
  const [state, setState] = useState('');
  const token = UserStore.useState(s => s.user.token)
  const {mutate:editrecord,  isLoading, isSuccess:editSuccess, error} = useEditRecord(token)
 
  const {data, isError,isLoading:loadinRecord} = useFetchEquipmentById(id)
  useEffect(()=>{
    if(data) {
      setName(data.name)
      setHour(data.hour_of_utilized)
      setMake(data.make)
      setRemark(data.remarks)
      setSpareUtilized(data.spaire_utilized)
      setState(data.state)
      setStatus(data.status)
    }


  },[data])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      make,
      hour_of_utilized:hour,
      status,
      remarks:remark,      
      spaire_utilized : spareUtilized,
      state,
      id:id
    }

    editrecord(data)
 
    // Add logic to save the record
  };
const navigate = useNavigate()
  useEffect(()=>{
    if(editSuccess){
      navigate('/adminrecords')
    }


  },[editSuccess])



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <MobileHeader page={"Edit Record"} />
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mt-[10vh] md:mt-0">
        <h2 className="text-2xl font-bold text-center text-black mb-6 hidden md:block ">Add Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="make">
              Make
            </label>
            <input
              type="text"
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter make"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="hour">
              Hour
            </label>
            <input
              type="number"
              id="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter hour"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            >
              <option value="serviceable">Serviceable</option>
              <option value="unserviceable">Unserviceable</option>
            </select>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="remark">
              Remark
            </label>
            <textarea
              id="remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter remark"
            ></textarea>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="spareUtilized">
              Spare Utilized
            </label>
            <input
              type="text"
              id="spareUtilized"
              value={spareUtilized}
              onChange={(e) => setSpareUtilized(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter spare utilized"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter state"
            />
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? (
 <Button
 loading={true}
 type="submit"
 className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
>
 loading...
</Button>
            ):
            ( <Button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
            >
              Add Record
            </Button>)
            }
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecord;
