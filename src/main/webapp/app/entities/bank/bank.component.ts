import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import BankService from './bank.service';
import { type IBank } from '@/shared/model/bank.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Bank',
  setup() {
    const { t: t$ } = useI18n();
    const bankService = inject('bankService', () => new BankService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const banks: Ref<IBank[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveBanks = async () => {
      isFetching.value = true;
      try {
        const res = await bankService().retrieve();
        banks.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveBanks();
    };

    onMounted(async () => {
      await retrieveBanks();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IBank) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeBank = async () => {
      try {
        await bankService().delete(removeId.value);
        const message = t$('myBudgetApp.bank.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveBanks();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      banks,
      handleSyncList,
      isFetching,
      retrieveBanks,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeBank,
      t$,
    };
  },
});
