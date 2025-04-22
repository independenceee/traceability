# Use the official go-ipfs image
FROM ipfs/go-ipfs:latest

# Set working directory
WORKDIR /app

# Initialize IPFS node
RUN ipfs init

# Expose IPFS ports
EXPOSE 4001 5001 8080

# Start IPFS daemon
CMD ["ipfs", "daemon"]