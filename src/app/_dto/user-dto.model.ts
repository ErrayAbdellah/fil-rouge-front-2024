export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
  }
  
  export interface UserDTO {
    id: number ;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    bio: string;
    profilePictureUrl: string;
    gender: Gender;
  }