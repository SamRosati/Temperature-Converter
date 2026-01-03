const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const {
  generateEntry,
  getConversions,
  parseBody,
  saveConversion,
  sendResponse,
  renderTemplate,
  buildRows,
  clearConversions,
} = require("./helpers");

const PORT = 3000;

const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    const conversions = await getConversions();
    const template = await readFile("./views/index.html", "utf8");
    const html = renderTemplate(template, {
      rows: buildRows(conversions),
    });
    sendResponse(res, html);
  } else if (req.method === "POST") {
    const data = await parseBody(req);

    if (data.action === "clear") {
      await clearConversions();
    } else {
      const entry = generateEntry(data);
      await saveConversion(entry);
    }

    const conversions = await getConversions();
    const template = await readFile("./views/index.html", "utf8");
    const html = renderTemplate(template, {
      rows: buildRows(conversions),
    });
    sendResponse(res, html);
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
