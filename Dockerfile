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

ARG NODE_ENV=production
WORKDIR /usr/src/app

# Install production dependencies
RUN apk add --no-cache openssl

# Copy package files and install dependencies based on NODE_ENV
COPY --from=builder /usr/src/app/package*.json ./
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm ci --omit=dev; \
    else \
      npm ci; \
    fi

# Copy necessary files from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/shared/typeorm/migrations ./src/shared/typeorm/migrations

# Copy entrypoint script and make it executable
COPY entrypoint.sh .
RUN sed -i 's/\r$//' entrypoint.sh
RUN chmod +x entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["./entrypoint.sh"]


# Expose the port the app runs on
EXPOSE 3002

# The command to run the application
CMD ["node", "dist/index.js"]
