package br.com.heimdall.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class BankAccountTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static BankAccount getBankAccountSample1() {
        return new BankAccount()
            .id(1L)
            .descriptionName("descriptionName1")
            .accountNumber("accountNumber1")
            .accountDigit("accountDigit1")
            .agencyNumber("agencyNumber1")
            .agencyDigit("agencyDigit1");
    }

    public static BankAccount getBankAccountSample2() {
        return new BankAccount()
            .id(2L)
            .descriptionName("descriptionName2")
            .accountNumber("accountNumber2")
            .accountDigit("accountDigit2")
            .agencyNumber("agencyNumber2")
            .agencyDigit("agencyDigit2");
    }

    public static BankAccount getBankAccountRandomSampleGenerator() {
        return new BankAccount()
            .id(longCount.incrementAndGet())
            .descriptionName(UUID.randomUUID().toString())
            .accountNumber(UUID.randomUUID().toString())
            .accountDigit(UUID.randomUUID().toString())
            .agencyNumber(UUID.randomUUID().toString())
            .agencyDigit(UUID.randomUUID().toString());
    }
}
