FROM openjdk:11-jdk-oracle

COPY /target/movie-watcher-0.0.1-SNAPSHOT.jar .

CMD ["java","-jar","movie-watcher-0.0.1-SNAPSHOT.jar"]

