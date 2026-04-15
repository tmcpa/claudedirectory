import { MCPServer } from "@/lib/types";                         
                                                                 
  export const skyvernServer: MCPServer = {                        
    slug: "skyvern",                                             
    title: "Skyvern",                                            
    description: "AI-powered browser automation — control a real browser with natural language, fill forms, extract structured data, log in with stored credentials, and build reusable workflows",                                                      
    tags: ["browser", "automation", "scraping", "ai", "community"],
    featured: false,                                               
    author: {                                                    
      name: "Skyvern AI",                                          
      url: "https://github.com/Skyvern-AI",
    },                                                             
    repoUrl: "https://github.com/Skyvern-AI/skyvern",            
    installCommand: "pip install skyvern",                       
    config: `{                                                     
    "mcpServers": {
      "skyvern": {                                                 
        "type": "streamable-http",                                 
        "url": "https://api.skyvern.com/mcp/",                   
        "headers": {                                               
          "x-api-key": "YOUR_SKYVERN_API_KEY"                      
        }                                                        
      }                                                            
    }                                                            
  }`,                                                              
  };
