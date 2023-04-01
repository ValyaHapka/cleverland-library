import { Status } from './books-state';
import { UserData } from './i-auth';

export enum Step {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
}

export interface RegisterUserInfo {
  email: string | null;
  username: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

export interface RegisterState {
  data: UserData | null;
  status: Status;
  error: number | null | undefined;
  step: Step;
  requestData: RegisterUserInfo | null;
}

export const requestDataPattern = {
  email: null,
  username: null,
  password: null,
  firstName: null,
  lastName: null,
  phone: null,
};
