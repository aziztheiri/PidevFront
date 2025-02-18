
export interface User {
  cin: string;
  email: string;
  name: string;
  password: string;
  image?: string;
  location: string;
  userRole: number;
  showMenu?: boolean;
  verified?: boolean ;
  creationDate:Date;
  age:number;
  gender:string;
}