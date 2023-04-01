import { Status } from './books-state';

export interface UserInfo {
  identifier: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UserData {
  jwt: string;
  user: User;
}

export interface IAuth {
  data: UserData | null;
  status: Status;
  error: number | null | undefined;
  requestData: UserInfo | null;
}
