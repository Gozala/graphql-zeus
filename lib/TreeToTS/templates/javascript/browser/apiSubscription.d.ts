declare const _default: "\nexport const apiSubscription = (options) => (\n    query,\n  ) => {\n    try {\n      const queryString = options[0] + '?query=' + encodeURIComponent(query);\n      const wsString = queryString.replace('http', 'ws');\n      const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;\n      const webSocketOptions = options[1]?.websocket || [host];\n      const ws = new WebSocket(...webSocketOptions);\n      return {\n        ws,\n        on: (e) => {\n          ws.onmessage = (event) => {\n            if(event.data){\n              const parsed = JSON.parse(event.data)\n              const data = parsed.data\n              if (data) {\n                seekForAliases(data);\n              }\n              return e(data);\n            }\n          };\n        },\n        off: (e) => {\n          ws.onclose = e;\n        },\n        error: (e) => {\n          ws.onerror = e;\n        },\n        open: (e) => {\n          ws.onopen = e;\n        },\n      };\n    } catch {\n      throw new Error('No websockets implemented');\n    }\n  };\n";
export default _default;