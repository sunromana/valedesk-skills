const fs = require("fs");
const path = require("path");
const os = require("os");

function getConfig() {
  const configPath = path.join(os.homedir(), ".valedesk", "config.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

const config = getConfig();
const MCP_URL = config.mcpServers.default.url;

async function mcpRequest(method, params = {}) {
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      method,
      params
    })
  });

  return res.json();
}

async function listTools() {
  return await mcpRequest("tools/list");
}

async function callTool(name, args = {}) {
  return await mcpRequest("tools/call", {
    name,
    arguments: args
  });
}

module.exports = {
  listTools,
  callTool
};
