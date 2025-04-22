FROM ipfs/go-ipfs:latest
WORKDIR /app
RUN ipfs init
EXPOSE 4001 5001 8080
CMD ["ipfs", "daemon"]