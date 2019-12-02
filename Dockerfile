FROM node:10

WORKDIR /phemium-web-components

# Install npm modules
ADD package.json /phemium-web-components
ADD package-lock.json /phemium-web-components
RUN npm install --no-bin-links

# Copy current code
ADD . /phemium-web-components
