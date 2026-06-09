import { prisma } from "db";

async function createMarkets() {
  const markets = [
    {
      title: "Bitcoin will reach $100k by EOY",
      description: "Will the price of Bitcoin reach $100,000 or higher before the end of this year?",
      resolutionDescription: "Resolves YES if Bitcoin reaches $100k, NO otherwise"
    },
    {
      title: "Ethereum Merge Success",
      description: "Will Ethereum's next major upgrade be completed successfully?",
      resolutionDescription: "Resolves YES if completed without critical issues"
    },
    {
      title: "Crypto Market Cap $3T",
      description: "Will total cryptocurrency market cap exceed $3 trillion?",
      resolutionDescription: "Based on CoinMarketCap data on specified date"
    },
    {
      title: "US Adopts Bitcoin as Legal Tender",
      description: "Will the US government officially adopt Bitcoin as legal tender this year?",
      resolutionDescription: "Official government legislation required"
    },
    {
      title: "Solana Network Uptime 99.9%",
      description: "Will Solana maintain 99.9% network uptime for Q3?",
      resolutionDescription: "Based on official Solana network statistics"
    },
    {
      title: "NFT Market Volume $50B",
      description: "Will NFT trading volume exceed $50B in the next quarter?",
      resolutionDescription: "Based on major NFT marketplace data"
    }
  ];

  for (const market of markets) {
    const existing = await prisma.market.findFirst({
      where: { title: market.title }
    });
    
    if (!existing) {
      await prisma.market.create({
        data: {
          ...market,
          yesOrderbook: {},
          noOrderbook: {},
          totalQty: 0
        }
      });
      console.log(`✓ Created market: ${market.title}`);
    } else {
      console.log(`✗ Market already exists: ${market.title}`);
    }
  }

  console.log("\nMarkets creation complete!");
  process.exit(0);
}

createMarkets().catch(error => {
  console.error("Error:", error);
  process.exit(1);
});
