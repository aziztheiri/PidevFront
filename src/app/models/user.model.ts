
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
  reduction?:boolean;
  qrCodeRedeemed?:boolean;
  creationDate:Date;
  points:number;
  quizpassed?:boolean;
  age:number;
  gender:string;
  cluster?: number;
  features?: {
    CIN: string;
    'Customer Lifetime Value': number;
    EmploymentStatus_Employed: number;
    'Location Code_Suburban': number;
    'Monthly Premium Auto': number;
    'Months Since Last Claim': number;
    Name: string;
    'Total Claim Amount': number;
    'Vehicle Class_Luxury Car': number;
  };
}