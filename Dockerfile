FROM node:10

WORKDIR /phemium-web-components

# Install npm modules
ADD package.json /phemium-web-components
ADD package-lock.json /phemium-web-components
RUN npm install grpc@1.20.2
RUN npm install node-pre-gyp@0.13.0
RUN npm install --no-bin-links

# Copy current code
ADD . /phemium-web-components
