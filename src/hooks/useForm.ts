"use client";

import { useState } from "react";
import { submitRequest } from "@/utils/api";

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

      const headers = new Headers({"Content-Type": "application/json",});
      const response: Response = await submitRequest("POST", `${endpoint}/`, headers, data);

      if (response.ok) {
        setSuccess(true);
      } else{
        const errorData = await response.json();
        setError(`Error: ${errorData.message || 'Unknown error'}`);
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