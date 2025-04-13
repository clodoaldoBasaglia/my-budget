import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import BankAccountDetails from './bank-account-details.vue';
import BankAccountService from './bank-account.service';
import AlertService from '@/shared/alert/alert.service';

type BankAccountDetailsComponentType = InstanceType<typeof BankAccountDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const bankAccountSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('BankAccount Management Detail Component', () => {
    let bankAccountServiceStub: SinonStubbedInstance<BankAccountService>;
    let mountOptions: MountingOptions<BankAccountDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      bankAccountServiceStub = sinon.createStubInstance<BankAccountService>(BankAccountService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          bankAccountService: () => bankAccountServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        bankAccountServiceStub.find.resolves(bankAccountSample);
        route = {
          params: {
            bankAccountId: `${123}`,
          },
        };
        const wrapper = shallowMount(BankAccountDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.bankAccount).toMatchObject(bankAccountSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        bankAccountServiceStub.find.resolves(bankAccountSample);
        const wrapper = shallowMount(BankAccountDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
