interface Request {
  user: string;
}

export interface AdminProfile {
  _id: string;
  user: string;
  requests: Request[];
}
