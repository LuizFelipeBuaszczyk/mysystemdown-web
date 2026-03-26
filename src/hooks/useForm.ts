import { useState } from "react";
import { apiRequest } from "@/utils/api";

export function useForm(endpoint: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await apiRequest(endpoint, "POST", data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success };
}