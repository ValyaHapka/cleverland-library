import { Status } from './books-state';
import { UserData } from './i-auth';

export interface ForgotInput {
  email: string;
}

export interface ResetPassword {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export interface ResetPasswordInputs {
  password: string;
  passwordConfirmation: string;
}

export interface ForgotState {
  data: UserData | null;
  statusSend: Status;
  statusReset: Status;
  error: number | null | undefined;
  errorSend: string | null | undefined;
  requestData: ResetPassword | null;
}
