import { defineComponent, provide } from 'vue';

import BankAccountService from './bank-account/bank-account.service';
import BankService from './bank/bank.service';
import UserService from '@/entities/user/user.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('bankAccountService', () => new BankAccountService());
    provide('bankService', () => new BankService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
