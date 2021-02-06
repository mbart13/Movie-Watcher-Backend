FROM openjdk:8-jdk-alpine

COPY /target/movie-watcher-0.0.1-SNAPSHOT.jar .

CMD ["java","-jar","movie-watcher-0.0.1-SNAPSHOT.jar"]

