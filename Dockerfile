FROM node:18-bullseye
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8000
ENV NAME url_shortener
CMD [ "npm","start" ]