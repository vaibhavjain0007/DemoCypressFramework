# Base image
FROM cypress/included:latest

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./
# Copy rest of the project
COPY . .

# Install dependencies
RUN npm install

# Run tests by default
ENTRYPOINT ["npx", "cypress", "run"]