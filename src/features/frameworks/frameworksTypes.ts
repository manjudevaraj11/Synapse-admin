export interface Framework {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFrameworkPayload {
  name: string;
  code: string;
  slug: string;
  version?: string;
  description?: string;
}

export interface UpdateFrameworkPayload {
  id: string;
  name: string;
  description?: string;
}
