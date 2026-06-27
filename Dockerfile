FROM oven/bun:1.1-alpine

WORKDIR /app

# Copy package configurations and lockfile
COPY package.json bun.lock* ./

# Install packages
RUN bun install

# Copy the rest of the files
COPY . .

# Expose dev port
EXPOSE 5173

# Run Vite dev server in host mode for port mapping
CMD ["bun", "run", "dev", "--host"]
