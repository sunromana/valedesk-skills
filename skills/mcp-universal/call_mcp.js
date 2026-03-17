const fs = require("fs");
const path = require("path");

function getConfig() {
  // process.cwd() указывает на папку, откуда был запущен процесс агента (ваша папка проекта).
  // Это гарантирует, что агент не полезет искать конфиг на диск C в папку инсталляции.
  const configPath = path.join(process.cwd(), "config.json");
  
  if (!fs.existsSync(configPath)) {
    console.warn(`[MCP Skill] Конфиг не найден по пути: ${configPath}. Используются настройки по умолчанию.`);
    return { mcpServers: { default: { url: "http://localhost:8081/mcp" } } };
  }
  
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
  // Читаем тулы напрямую из файла ../mcp/openapi.json относительно папки проекта.
  // Если папка mcp находится ВНУТРИ проекта (например .mcp), замените "..", "mcp" на ".mcp"
  const openapiPath = path.join(process.cwd(), "..", "mcp", "openapi.json");
  
  try {
    const fileContent = fs.readFileSync(openapiPath, "utf8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error(`[MCP Skill] Ошибка при чтении openapi.json по пути: ${openapiPath}`, err.message);
    
    // Альтернативный вариант: если под "..mcp/openapi.json" вы имели в виду URL на сервере
    // раскомментируйте код ниже, чтобы забирать тулы по сети:
    /*
    const openapiUrl = MCP_URL.replace(/\/mcp\/?$/, "/mcp/openapi.json");
    const res = await fetch(openapiUrl);
    return await res.json();
    */

    return
