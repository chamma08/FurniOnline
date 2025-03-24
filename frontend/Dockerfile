# Use Node.js 20 (latest LTS)
FROM node:20-alpine

# Set working directory
WORKDIR /

# Add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files first (for better caching)
COPY package.json package-lock.json ./


RUN npm install 
#react-scripts@3.4.1 -g --silent


# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Use npm run dev as the start command
CMD ["npm", "run", "dev"]
