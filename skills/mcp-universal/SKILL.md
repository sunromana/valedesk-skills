---
name: mcp-universal
description: Allows ValeDesk to call tools from an MCP server defined in the project's local config.json
---

# MCP Universal

This skill connects ValeDesk to a Model Context Protocol (MCP) server.

The MCP server URL is read from the local configuration file located in your current project directory:

`./config.json`

Example of `config.json`:

```json
{
  "mcpServers": {
    "default": {
      "type": "streamable-http",
      "url": "http://YOUR_SERVER_ADDRESS:PORT/mcp"
    }
  }
}
When this skill is used, ValeDesk can call tools exposed by the configured MCP server.
The available tools are read dynamically via HTTP from the {url}/openapi.json endpoint of your server.
