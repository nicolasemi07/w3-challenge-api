# Use the official Node.js image as the base image
FROM node:18

# Install netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Copy the entrypoint script
COPY entrypoint.sh ./
RUN chmod +x /app/entrypoint.sh

# Command to run the entrypoint script
CMD ["/app/entrypoint.sh"]
