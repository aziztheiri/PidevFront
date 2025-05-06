export interface ShapResult {
    id: number;
    features: {
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
    shap_values: number[][];
  }