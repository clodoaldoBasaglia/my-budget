import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import BankDetails from './bank-details.vue';
import BankService from './bank.service';
import AlertService from '@/shared/alert/alert.service';

type BankDetailsComponentType = InstanceType<typeof BankDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const bankSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Bank Management Detail Component', () => {
    let bankServiceStub: SinonStubbedInstance<BankService>;
    let mountOptions: MountingOptions<BankDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      bankServiceStub = sinon.createStubInstance<BankService>(BankService);

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
          bankService: () => bankServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        bankServiceStub.find.resolves(bankSample);
        route = {
          params: {
            bankId: `${123}`,
          },
        };
        const wrapper = shallowMount(BankDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.bank).toMatchObject(bankSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        bankServiceStub.find.resolves(bankSample);
        const wrapper = shallowMount(BankDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
