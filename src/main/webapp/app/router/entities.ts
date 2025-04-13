import { Authority } from '@/shared/security/authority';
const Entities = () => import('@/entities/entities.vue');

const BankAccount = () => import('@/entities/bank-account/bank-account.vue');
const BankAccountUpdate = () => import('@/entities/bank-account/bank-account-update.vue');
const BankAccountDetails = () => import('@/entities/bank-account/bank-account-details.vue');

const Bank = () => import('@/entities/bank/bank.vue');
const BankUpdate = () => import('@/entities/bank/bank-update.vue');
const BankDetails = () => import('@/entities/bank/bank-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'bank-account',
      name: 'BankAccount',
      component: BankAccount,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bank-account/new',
      name: 'BankAccountCreate',
      component: BankAccountUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bank-account/:bankAccountId/edit',
      name: 'BankAccountEdit',
      component: BankAccountUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bank-account/:bankAccountId/view',
      name: 'BankAccountView',
      component: BankAccountDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bank',
      name: 'Bank',
      component: Bank,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bank/new',
      name: 'BankCreate',
      component: BankUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bank/:bankId/edit',
      name: 'BankEdit',
      component: BankUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bank/:bankId/view',
      name: 'BankView',
      component: BankDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
