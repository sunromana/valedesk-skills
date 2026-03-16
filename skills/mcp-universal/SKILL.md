---

name: mcp-universal
description: Allows ValeDesk to call tools from an MCP server defined in the user's local ~/.valedesk/config.json
-----------------------------------------------------------------------------------------------------------------

# MCP Universal

This skill connects ValeDesk to a Model Context Protocol (MCP) server.

The MCP server URL is read from the local configuration file:

`~/.valedesk/config.json`

Example:

```json
{
  "mcpServers": {
    "default": {
      "url": "http://localhost:8081/mcp"
    }
  }
}
```

When this skill is used, ValeDesk can call tools exposed by the configured MCP server.
