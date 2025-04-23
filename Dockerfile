# Stage 1: Build
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN ./mvnw -Pprod clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:21-jdk
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY --from=build /app/${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
