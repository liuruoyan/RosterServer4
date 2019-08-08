import { Moment } from 'moment';

export interface IEducationExperience {
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  school?: string;
  major?: string;
  inDate?: Moment;
  graduationDate?: Moment;
  education?: string;
  inception?: boolean;
  isSelfVerify?: boolean;
  isHrVerify?: boolean;
  empId?: number;
}

export const defaultValue: Readonly<IEducationExperience> = {
  inception: false,
  isSelfVerify: false,
  isHrVerify: false
};
