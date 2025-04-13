import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import BankService from './bank.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { Bank, type IBank } from '@/shared/model/bank.model';
import { BankTypeEnum } from '@/shared/model/enumerations/bank-type-enum.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankUpdate',
  setup() {
    const bankService = inject('bankService', () => new BankService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const bank: Ref<IBank> = ref(new Bank());
    const bankTypeEnumValues: Ref<string[]> = ref(Object.keys(BankTypeEnum));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'pt-br'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

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

    const initRelationships = () => {};

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      descriptionName: {},
      bankType: {},
      bankAccounts: {},
    };
    const v$ = useVuelidate(validationRules, bank as any);
    v$.value.$validate();

    return {
      bankService,
      alertService,
      bank,
      previousState,
      bankTypeEnumValues,
      isSaving,
      currentLanguage,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.bank.id) {
        this.bankService()
          .update(this.bank)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('myBudgetApp.bank.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.bankService()
          .create(this.bank)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('myBudgetApp.bank.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
