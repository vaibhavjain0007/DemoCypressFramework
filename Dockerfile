# Cypress included image (version includes Cypress + browsers)
FROM cypress/included:15.0.0

# Set working directory
WORKDIR /e2e

# Copy package files first (to cache dependencies separately from test code)
COPY package.json package-lock.json* ./

# Install your project dependencies (like exceljs, mochawesome, etc.)
RUN npm ci

# Copy the rest of your Cypress project (tests, config, etc.)
COPY . .

# Default command: run Cypress tests
CMD ["cypress", "run", "--spec", "cypress/e2e/APITesting/Authentications.js"]

# # Base image
# FROM cypress/included:15.0.0

# # Set working directory
# WORKDIR /app

# # Copy package.json first for caching
# COPY package*.json ./
# # Copy rest of the project
# COPY . .

# # Install dependencies
# RUN npm install

# # Run tests by default
# ENTRYPOINT ["npx", "cypress", "run"]
