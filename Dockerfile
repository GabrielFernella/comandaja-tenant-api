# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache openssl build-base python3

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /usr/src/app

# Install production dependencies
RUN apk add --no-cache openssl

# Copy necessary files from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/shared/typeorm/migrations ./src/shared/typeorm/migrations

# Expose the port the app runs on
EXPOSE 3005

# The command to run the application
CMD ["node", "dist/index.js"]
