import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchEquipment = async () => {
    const response = await axios.get(`${API_URL}/api/equipments/`); // Replace with your actual endpoint
    return response.data; // Assumes the API returns an array of equipment records
  };
  
  export const useGetEquipment = () => {
    return useQuery('fetchEquipment', fetchEquipment);
  };


  const fetchEquipmentById = async (id)=>{
    console.log(id)

    const response = await axios.get(`${API_URL}/api/equipment/details/${id}`)
    return response.data
  }
 
 
 export const useFetchEquipmentById = (id)=>{
    return useQuery(['fetchEquipmentById ',id], ()=>fetchEquipmentById (id))
 }
 

 export const addRecord = async ({token , data})=>{
    const config = {
    
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`
            }
        
    }
    response = await axios.post(`${API_URL}/api/equipment/details`, data, config
    )
    return response.data
 }


 export const useAddRecord = (token) => {
    const queryClient = useQueryClient();
    return useMutation(
      async (newRecord) => {
       console.log(newRecord, 'record')
        const { data } = await axios.post(`${API_URL}/api/equipment/`, newRecord, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('fetchEquipment'); 
        },
      }
    );
  };
  



  export const useEditRecord = (token) => {
    const queryClient = useQueryClient();
    return useMutation(
      async (newRecord) => {
       console.log(newRecord, 'record')
        const { data } = await axios.put(`${API_URL}/api/equipment/update/${newRecord.id}/`, newRecord, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('fetchEquipment'); 
        },
      }
    );
  };
  

export const useDelete = (token) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
    
      const { data } = await axios.delete(`${API_URL}/api/equipment/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchEquipment'); 
      },
    }
  );

}