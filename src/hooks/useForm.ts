import { useState } from "react";
import { apiRequest } from "@/utils/api";

export function useForm(endpoint: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState<any>(null);
  
  const submit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await apiRequest(`${endpoint}/`, "POST", data);

      if (response.ok){
        setSuccess(true);
      } else{
        setError(`Error: ${response.status} ${response.statusText}`);
      }
      setResponse(response);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success, response };
}