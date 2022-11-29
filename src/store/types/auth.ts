export interface USER_PAYLOAD {
  auth_type: string;
  username: string;
  first_name: string;
  last_name: string;
}
export interface IAuthState {
  _id: string;
  first_name: string;
  last_name: string;
  auth_type: string;
  username: string;
  date_of_birth: Date;
  profilePicture: string;
}
