const features = [
  {
    id: 1,
    title: "Decentralized Data Storage",
    slogan: "Securely store supply chain information on a decentralized network",
    description:
      "Record and store all data about the origin, transportation itinerary, and certification of goods on a decentralized network such as IPFS. Ensure information is immutable, always secure, and accessible at any time by stakeholders in the supply chain.",
  },
  {
    id: 2,
    title: "Dynamic Product Metadata",
    slogan: "Flexible and transparent product information management",
    description:
      "Create and update detailed product information – from where it was produced, to harvest date, to quality standards – as metadata on the blockchain. This makes it easy for anyone to verify the origin and quality of goods with just a few simple steps.",
  },
  {
    id: 3,
    title: "Batch Organization",
    slogan: "Organize goods into product batches quickly and efficiently",
    description:
      "Group and manage goods visually by production lots or shipping stages. This feature allows businesses to easily track each product group, from raw materials to finished goods, throughout the supply chain.",
  },
  {
    id: 4,
    title: "Product Tokenization",
    slogan: "Tokenizing goods into digital assets on the blockchain",
    description:
      "Turn each product or batch of goods into a unique digital asset (token) on the Cardano blockchain. Each token contains traceability information, helping to authenticate goods and effectively prevent fraud in the supply chain.",
  },
  {
    id: 5,
    title: "Real-Time Updates",
    slogan: "Real-time inventory status updates",
    description:
      "Track and update information about goods – such as current location, shipping status, or certification changes – instantly on the blockchain. Ensure data is always accurate, supporting parties to make quick and timely decisions.",
  },
  {
    id: 6,
    title: "Data Retirement",
    slogan: "Delete product information when completing the supply chain",
    description:
      "Allows for the permanent deletion of data or digital assets of goods from the blockchain once the product has reached the consumer or is no longer needed to be tracked. This helps optimize data management and protect privacy when necessary.",
  },
] as const;

export default features;
