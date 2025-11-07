FROM node:23.4.0 AS build-stage
WORKDIR /app

# Add build arguments for Vite environment variables
ARG VITE_GITLAB_CLIENT_ID
ARG VITE_GITLAB_REDIRECT_URI
ARG NODE_OPTIONS

# CRITICAL: Set environment variables from build arguments
# The NODE_OPTIONS is crucial for preventing memory issues during build
ENV VITE_GITLAB_CLIENT_ID=${VITE_GITLAB_CLIENT_ID}
ENV VITE_GITLAB_REDIRECT_URI=${VITE_GITLAB_REDIRECT_URI}
ENV NODE_OPTIONS=${NODE_OPTIONS:-"--max-old-space-size=4096"}

# Copy package files first for better layer caching
COPY package.json package-lock.json jsconfig.json index.html vite.config.js ./

# Install dependencies
RUN npm install

# Copy source files after dependencies are installed
COPY src ./src
COPY public ./public

# Build the application - NODE_OPTIONS will be used here
RUN npm run build

# Production stage
FROM nginx:1.27.3
WORKDIR /usr/share/nginx/html

# Copy the built application files from the build stage
COPY --from=build-stage /app/dist .

# Add the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
ENTRYPOINT ["/entrypoint.sh"]