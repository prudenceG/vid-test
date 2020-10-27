import { District } from './district.interface';

export interface User {
  firstname: string;
  lastname: string;
  phone: number;
  district: District;
  id: string;
}
