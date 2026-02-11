#in cmd promt
# mvnw clean package

# OR in windows powershell 
# ./mvnw clean package

#use an official maven image to build the spring boot application
FROM maven:3.8.4-openjdk-17 AS build

#set the working directory
WORKDIR /app

#copy the pom.xml and install dependencies 
COPY pom.xml .
RUN mvn dependency:go-offline

#copy the source code and build the application 
COPY src ./src
RUN mvn clean package -DskipTests

#use an official openD=JDK image to run the application
FROM openjdk:17-jdk-slim

#set the workong directory
WORKDIR /app

#copy the build jar file from the build stage
COPY --from=build /app/target/Project-Eccomerce-0.0.1-SNAPSHOT.jar .

#expose port 8080
EXPOSE 8080

#SPECIFY THE COMMAND to run the application
ENTRYPOINT [ "java","-jar","/app/Project-Eccomerce-0.0.1-SNAPSHOT.jar" ]

# docker build -t {//file name in docker ur choice} .
# docket tag file-name-in-docker docker-username/file-name-in-docker:latest
# docker push docker-username/file-name-in-docker:latest