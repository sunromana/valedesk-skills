name: mcp-universal
description: Allows ValeDesk to call tools from an MCP server defined in the project's local config.json and reads openapi.json
-----------------------------------------------------------------------------------------------------------------

# MCP Universal

This skill connects ValeDesk to a Model Context Protocol (MCP) server.

The MCP server URL is read from the local configuration file located in your current project directory:

./config.json

Example:

```json
{
  "mcpServers": {
    "default": {
      "url": "http://localhost:8081/mcp"
    }
  }
}
