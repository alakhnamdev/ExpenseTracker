# ----------------------------------------
# STAGE 1: Build the Next.js application
# ----------------------------------------
FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the app using Next.js standalone output
RUN npm run build

# ----------------------------------------
# STAGE 2: Create lightweight runtime image
# ----------------------------------------
FROM node:lts-alpine AS runner

# Create a non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy the .env file
COPY .env ./

# Optional: if using a custom server.js, copy it
# COPY --from=builder /app/server.js ./server.js

# Use non-root user
USER appuser

# Expose the port
EXPOSE 3000

# Run the Next.js app
CMD ["node", "server.js"]
