const fs = require("fs");
const path = require("path");

function getConfig() {
  // Ищем config.json в рабочей директории проекта (process.cwd())
  const configPath = path.join(process.cwd(), "config.json");
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`[MCP Skill] Конфиг не найден! Пожалуйста, создайте файл config.json в папке вашего проекта: ${configPath}`);
  }
  
  try {
    const fileContent = fs.readFileSync(configPath, "utf8");
    const configData = JSON.parse(fileContent);
    
    if (!configData?.mcpServers?.default?.url) {
      throw new Error("Неверный формат конфига. Ожидается: mcpServers.default.url");
    }
    
    return configData;
  } catch (err) {
    throw new Error(`[MCP Skill] Ошибка чтения config.json: ${err.message}`);
  }
}

// Получаем URL сервера один раз при инициализации скила
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

  if (!res.ok) {
    throw new Error(`[MCP Skill] Ошибка запроса к MCP: HTTP ${res.status}`);
  }

  return res.json();
}

async function listTools() {
  // Динамически формируем путь до openapi.json на основе URL из конфига пользователя
  const openapiUrl = MCP_URL.endsWith("/") 
    ? `${MCP_URL}openapi.json` 
    : `${MCP_URL}/openapi.json`;
  
  try {
    const res = await fetch(openapiUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`[MCP Skill] Ошибка при загрузке списка тулов по адресу ${openapiUrl}:`, err.message);
    // Возвращаем пустую структуру, чтобы агент мог продолжить работу, даже если сервер тулов временно недоступен
    return {};
  }
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
