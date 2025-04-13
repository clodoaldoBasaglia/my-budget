import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import BankAccountService from './bank-account.service';
import { type IBankAccount } from '@/shared/model/bank-account.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankAccount',
  setup() {
    const { t: t$ } = useI18n();
    const bankAccountService = inject('bankAccountService', () => new BankAccountService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const bankAccounts: Ref<IBankAccount[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveBankAccounts = async () => {
      isFetching.value = true;
      try {
        const res = await bankAccountService().retrieve();
        bankAccounts.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveBankAccounts();
    };

    onMounted(async () => {
      await retrieveBankAccounts();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IBankAccount) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeBankAccount = async () => {
      try {
        await bankAccountService().delete(removeId.value);
        const message = t$('myBudgetApp.bankAccount.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveBankAccounts();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      bankAccounts,
      handleSyncList,
      isFetching,
      retrieveBankAccounts,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeBankAccount,
      t$,
    };
  },
});
