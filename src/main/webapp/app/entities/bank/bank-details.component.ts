import { type Ref, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import BankService from './bank.service';
import { type IBank } from '@/shared/model/bank.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankDetails',
  setup() {
    const bankService = inject('bankService', () => new BankService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const bank: Ref<IBank> = ref({});

    const retrieveBank = async bankId => {
      try {
        const res = await bankService().find(bankId);
        bank.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.bankId) {
      retrieveBank(route.params.bankId);
    }

    return {
      alertService,
      bank,

      previousState,
      t$: useI18n().t,
    };
  },
});
