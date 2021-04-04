export interface ErrorResponse {
  error: string;
}

export interface GetApyResponse {
  apy: number;
}

export interface GetCollateralValueResponse {
  collateralValue: number;
}

export interface GetBorrowedValueResponse {
  borrowedValue: number;
}

export interface GetLtvResponse {
  borrowedValue: number;
  borrowLimit: number;
  ltv: number;
}
