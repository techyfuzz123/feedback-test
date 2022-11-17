# Dockerfile

# base image
FROM node:lts-alpine3.16

# create & set working directory
WORKDIR /app

#Change TimeZone
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN echo "Asia/Kolkata" > /etc/timezone
RUN apk del tzdata

# copy source files
COPY . /app

# install dependencies
RUN npm install
RUN npm run build

# start app
EXPOSE 3000
CMD npm run start
