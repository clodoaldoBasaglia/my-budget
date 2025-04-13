import { type IBank } from '@/shared/model/bank.model';

export interface IBankAccount {
  id?: number;
  descriptionName?: string | null;
  accountNumber?: string | null;
  accountDigit?: string | null;
  agencyNumber?: string | null;
  agencyDigit?: string | null;
  bank?: IBank | null;
}

export class BankAccount implements IBankAccount {
  constructor(
    public id?: number,
    public descriptionName?: string | null,
    public accountNumber?: string | null,
    public accountDigit?: string | null,
    public agencyNumber?: string | null,
    public agencyDigit?: string | null,
    public bank?: IBank | null,
  ) {}
}
