import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

declare function createMcpServer(httpUrl?: string): McpServer;

export { createMcpServer };
