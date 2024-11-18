# syntax=docker/dockerfile:1

FROM node
WORKDIR /app
COPY ["package.json","package-lock.json","./"]
RUN npm install
ENV PORT=3050
COPY . .
CMD ["npm","run","dev"]
