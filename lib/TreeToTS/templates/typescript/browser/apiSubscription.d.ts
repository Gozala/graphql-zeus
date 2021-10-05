declare const _default: "\nexport const apiSubscription = (options: chainOptions) => (\n    query: string,\n  ) => {\n    try {\n      const queryString = options[0] + '?query=' + encodeURIComponent(query);\n      const wsString = queryString.replace('http', 'ws');\n      const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;\n      const webSocketOptions = options[1]?.websocket || [host];\n      const ws = new WebSocket(...webSocketOptions);\n      return {\n        ws,\n        on: (e: (args: any) => void) => {\n          ws.onmessage = (event:any) => {\n            if(event.data){\n              const parsed = JSON.parse(event.data)\n              const data = parsed.data\n              if (data) {\n                seekForAliases(data);\n              }\n              return e(data);\n            }\n          };\n        },\n        off: (e: (args: any) => void) => {\n          ws.onclose = e;\n        },\n        error: (e: (args: any) => void) => {\n          ws.onerror = e;\n        },\n        open: (e: () => void) => {\n          ws.onopen = e;\n        },\n      };\n    } catch {\n      throw new Error('No websockets implemented');\n    }\n  };\n";
export default _default;
