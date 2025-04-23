package br.com.heimdall;

import br.com.heimdall.config.AsyncSyncConfiguration;
import br.com.heimdall.config.EmbeddedKafka;
import br.com.heimdall.config.EmbeddedSQL;
import br.com.heimdall.config.JacksonConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { MyBudgetApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class })
@EmbeddedSQL
@EmbeddedKafka
public @interface IntegrationTest {
}
