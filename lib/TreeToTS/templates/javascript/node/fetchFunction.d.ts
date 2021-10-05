declare const _default: "\nconst handleFetchResponse = response => {\n  if (!response.ok) {\n    return new Promise((resolve, reject) => {\n      response.text().then(text => {\n        try { reject(JSON.parse(text)); }\n        catch (err) { reject(text); }\n      }).catch(reject);\n    });\n  }\n  return response.json();\n};\n\nexport const apiFetch = (options) => (query, variables = {}) => {\n    let fetchFunction;\n    let queryString = query;\n    let fetchOptions = options[1] || {};\n    try {\n        fetchFunction = require('node-fetch');\n    } catch (error) {\n        throw new Error(\"Please install 'node-fetch' to use zeus in nodejs environment\");\n    }\n    if (fetchOptions.method && fetchOptions.method === 'GET') {\n      try {\n        queryString = require('querystring').stringify(query);\n      } catch (error) {\n        throw new Error(\"Something gone wrong 'querystring' is a part of nodejs environment\");\n      }\n      return fetchFunction(`${options[0]}?query=${queryString}`, fetchOptions)\n        .then(handleFetchResponse)\n        .then((response) => {\n          if (response.errors) {\n            throw new GraphQLError(response);\n          }\n          seekForAliases(response.data)\n          return response.data;\n        });\n    }\n    return fetchFunction(`${options[0]}`, {\n      body: JSON.stringify({ query: queryString, variables }),\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      ...fetchOptions\n    })\n      .then(handleFetchResponse)\n      .then((response) => {\n        if (response.errors) {\n          throw new GraphQLError(response);\n        }\n        seekForAliases(response.data)\n        return response.data;\n      });\n  };";
export default _default;