# Base image
FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

# Install app dependencies
#RUN npm ci --legacy-peer-deps
RUN npm install -g npm@8.17.0
RUN npm install &&  npm cache clean --force

# Creates a "dist" folder with the production build
#RUN npm run build

RUN chown -R node /usr/src/app
USER node

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
