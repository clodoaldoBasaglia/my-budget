import { type Ref, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import BankAccountService from './bank-account.service';
import { type IBankAccount } from '@/shared/model/bank-account.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankAccountDetails',
  setup() {
    const bankAccountService = inject('bankAccountService', () => new BankAccountService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const bankAccount: Ref<IBankAccount> = ref({});

    const retrieveBankAccount = async bankAccountId => {
      try {
        const res = await bankAccountService().find(bankAccountId);
        bankAccount.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.bankAccountId) {
      retrieveBankAccount(route.params.bankAccountId);
    }

    return {
      alertService,
      bankAccount,

      previousState,
      t$: useI18n().t,
    };
  },
});
