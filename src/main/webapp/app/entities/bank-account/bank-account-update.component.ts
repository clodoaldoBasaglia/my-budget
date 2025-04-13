import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import BankAccountService from './bank-account.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import BankService from '@/entities/bank/bank.service';
import { type IBank } from '@/shared/model/bank.model';
import { BankAccount, type IBankAccount } from '@/shared/model/bank-account.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankAccountUpdate',
  setup() {
    const bankAccountService = inject('bankAccountService', () => new BankAccountService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const bankAccount: Ref<IBankAccount> = ref(new BankAccount());

    const bankService = inject('bankService', () => new BankService());

    const banks: Ref<IBank[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'pt-br'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

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

    const initRelationships = () => {
      bankService()
        .retrieve()
        .then(res => {
          banks.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      descriptionName: {},
      accountNumber: {},
      accountDigit: {},
      agencyNumber: {},
      agencyDigit: {},
      bank: {},
    };
    const v$ = useVuelidate(validationRules, bankAccount as any);
    v$.value.$validate();

    return {
      bankAccountService,
      alertService,
      bankAccount,
      previousState,
      isSaving,
      currentLanguage,
      banks,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.bankAccount.id) {
        this.bankAccountService()
          .update(this.bankAccount)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('myBudgetApp.bankAccount.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.bankAccountService()
          .create(this.bankAccount)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('myBudgetApp.bankAccount.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
