import * as moment from 'moment-timezone';

export interface UserResponse {
  id: number;
  name: string;
  wwid: string;
  passwordChanged: boolean;
  formPermissions: FromPermissions;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}


export interface BasicUserResponse {
  id: number;
  wwid: string;
  name: string;
  countryId: number;
  email: string;
  sitio: string;
  phone: string;
  formPermissions: FromPermissions;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}

export interface FromPermissions {
  jsa: boolean;
  service: boolean;
  ingersollRand: boolean;
}
