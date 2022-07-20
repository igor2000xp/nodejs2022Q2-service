# Base image
FROM node:lts-alpine
#FROM node

# Create app directory
WORKDIR /usr/src/app

#USER node
# A wildcard is used to ensure both package.json AND package-lock.json are copied
#COPY --chown=node:node package*.json ./
#COPY package*.json ./
# Install app dependencies
#RUN npm ci --legacy-peer-deps
#RUN npm install

#COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
#COPY ../../../node_modules ./node_modules

# Bundle app source
#COPY --chown=node:node . .
COPY ../../.. .
#COPY /usr/src/docker/app .

#COPY --chown=node:node .env .env
EXPOSE 4000
#EXPOSE ${PORT}

#RUN chown -R node /usr/src/app

# Creates a "dist" folder with the production build
#RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
