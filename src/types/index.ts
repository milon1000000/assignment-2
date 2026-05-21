export const USER_ROLE={
maintainer :"maintainer",
contributor :"contributor",
} as const;

export type  ROLES="contributor" | 'maintainer';


export type QueryParams = {
  sort?: string;
  type?: string;
  status?: string;
};