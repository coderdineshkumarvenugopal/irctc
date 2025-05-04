export interface ResultStateInterface {
  status: string;
  isUninitialized: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  originalArgs?: undefined;
  reset: () => void;
  error?: object;
}

export interface HandleSubmitInterface {
  inputValue: string;
}

export interface NewPasswordInterface {
  cnfrmPassword: string;
  formPassword: string;
}

export interface SignInInterface {
  email: string;
  password: string;
}
