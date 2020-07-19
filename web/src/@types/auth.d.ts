export interface Auth {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  logged: boolean;
}
