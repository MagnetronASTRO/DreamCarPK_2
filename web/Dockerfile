ARG NODE_VERSION=22.13.0

################################################################################
# Use the Node.js image for the base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set the working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Use a cache for npm to speed up subsequent builds.
# Bind mount package.json and package-lock.json to avoid unnecessary copying.
RUN --mount=type=bind,source=package.json,target=package.json \
	--mount=type=bind,source=package-lock.json,target=package-lock.json \
	--mount=type=cache,target=/root/.npm \
	npm ci

################################################################################
# Create a stage for building the application.
FROM deps as build

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies.
# Copy necessary files from the build stage.
FROM base as final

# Use production Node.js environment by default.
ENV NODE_ENV production
ENV ORIGIN https://example.com

# Run the application as a non-root user.
USER node

# Copy package.json so npm commands can still be used if needed.
COPY package.json .

# Copy the production dependencies from the deps stage and the built application from the build stage.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server ./server

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "serve"]
