FROM openjdk:11-jdk-oracle

COPY /target/movie-watcher-0.0.1-SNAPSHOT.jar .

CMD ["java","-Xms256m","-Xmx256m","-Xss512k","-XX:+UseContainerSupport","-jar","movie-watcher-0.0.1-SNAPSHOT.jar"]

