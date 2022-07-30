export interface USER_PAYLOAD {
  auth_type: string;
  username: string;
  first_name: string;
  last_name: string;
}
export interface IAuthState {
  username: string;
  first_name: string;
  last_name: string;
  auth_type: string;
}
