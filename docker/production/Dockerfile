FROM node:17-alpine3.14

# Create the directory on the node image
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and yarn.lock
# to the /app working directory
COPY package.json /app
COPY yarn.lock /app

# Install dependencies in /app
RUN yarn install

# Copy the rest of the files into /app
COPY . /app

# Build the app
RUN yarn build

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn start, as we would via the command line
CMD ["yarn", "start"]
