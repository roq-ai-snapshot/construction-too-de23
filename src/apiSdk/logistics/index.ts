import axios from 'axios';
import queryString from 'query-string';
import { LogisticsInterface, LogisticsGetQueryInterface } from 'interfaces/logistics';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLogistics = async (
  query?: LogisticsGetQueryInterface,
): Promise<PaginatedInterface<LogisticsInterface>> => {
  const response = await axios.get('/api/logistics', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createLogistics = async (logistics: LogisticsInterface) => {
  const response = await axios.post('/api/logistics', logistics);
  return response.data;
};

export const updateLogisticsById = async (id: string, logistics: LogisticsInterface) => {
  const response = await axios.put(`/api/logistics/${id}`, logistics);
  return response.data;
};

export const getLogisticsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/logistics/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLogisticsById = async (id: string) => {
  const response = await axios.delete(`/api/logistics/${id}`);
  return response.data;
};
