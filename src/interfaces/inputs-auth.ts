import { Status } from './books-state';

export interface Inputs {
  identifier: string;
  password: string;
}

export interface RegisterInputs {
  username: string;
  password: string;
}

export interface NameInputs {
  firstName: string;
  lastName: string;
}

export interface MailInputs {
  email: string;
  phone: string;
}

export interface AuthFormProps {
  status: Status;
}
