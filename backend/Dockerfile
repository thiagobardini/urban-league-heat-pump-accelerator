# syntax=docker/dockerfile:1
FROM ruby:3.1.2
RUN apt-get update -y && apt-get upgrade -y && apt-get install -y postgresql-client
# for alpine; when dependency resolution is fixed.
# FROM ruby:3.1.2-alpine
# RUN apk update && apk upgrade && apk add postgresql-client
WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .
EXPOSE 3000
RUN chmod +x start.sh

CMD ["./start.sh"]