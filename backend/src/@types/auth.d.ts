export interface ResultValidate {
  logged: boolean;
  id_establishment?: number;
}

export interface Token {
  id: number;
  iat: number;
  exp: number;
}
