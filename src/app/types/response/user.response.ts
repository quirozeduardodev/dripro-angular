import {DateTime} from 'luxon';

export interface UserResponse {
  id: number;
  name: string;
  wwid: string;
  passwordChanged: boolean;
  supervisor: string | null;
  formPermissions: FromPermissions;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}


export interface BasicUserResponse {
  id: number;
  wwid: string;
  name: string;
  countryId: number;
  email: string;
  sitio: string;
  phone: string;
  role: string | null;
  formPermissions: FromPermissions;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}

export interface FromPermissions {
  jsa: boolean;
  service: boolean;
  ingersollRand: boolean;
}
