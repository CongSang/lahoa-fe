import { ReactNode } from "react";

export interface LayoutProps {
    children: ReactNode
}

export enum StatusCommon {
  ALL = "ALL",
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export interface Status {
  label: string;
  className: string; 
}

export const STATUS_MAP: Record<StatusCommon, Status> = {
  [StatusCommon.ALL]: {
    label: 'Tất cả',
    className: '',
  },
  [StatusCommon.ACTIVE]: {
    label: 'Hoạt động',
    className: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  },
  [StatusCommon.INACTIVE]: {
    label: 'Tạm ngưng',
    className: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  },
};

export interface ExtraParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
