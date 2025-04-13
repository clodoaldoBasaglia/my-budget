import { type BankTypeEnum } from '@/shared/model/enumerations/bank-type-enum.model';
export interface IBank {
  id?: number;
  descriptionName?: string | null;
  bankType?: keyof typeof BankTypeEnum | null;
}

export class Bank implements IBank {
  constructor(
    public id?: number,
    public descriptionName?: string | null,
    public bankType?: keyof typeof BankTypeEnum | null,
  ) {}
}
