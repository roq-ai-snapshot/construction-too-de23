import { RentalInterface } from 'interfaces/rental';
import { GetQueryInterface } from 'interfaces';

export interface LogisticsInterface {
  id?: string;
  delivery_date: any;
  return_date: any;
  delivery_address: string;
  return_address: string;
  rental_id: string;
  created_at?: any;
  updated_at?: any;

  rental?: RentalInterface;
  _count?: {};
}

export interface LogisticsGetQueryInterface extends GetQueryInterface {
  id?: string;
  delivery_address?: string;
  return_address?: string;
  rental_id?: string;
}
