package br.com.heimdall.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class BankTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Bank getBankSample1() {
        return new Bank().id(1L).descriptionName("descriptionName1");
    }

    public static Bank getBankSample2() {
        return new Bank().id(2L).descriptionName("descriptionName2");
    }

    public static Bank getBankRandomSampleGenerator() {
        return new Bank().id(longCount.incrementAndGet()).descriptionName(UUID.randomUUID().toString());
    }
}
