import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getContactUs = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/contact-us?page=${page}&limit=${limit}`);
};

export const getContactDetail = (id: string) => {
  return CarbonxApi.get(`/contact-us/${id}`);
};

export const deleteContactUs = (id: string) => {
  return CarbonxApi.delete(`/contact-us/${id}`);
};
