const DATA_FILE = "./conversions.json";
const { writeFile, readFile } = require("node:fs/promises");
const { parse } = require("node:querystring");

// LEGEND:
// 🤖 means a small note from Armaan

// TODO: Fix the broken logic
function cToF(temp) {
  return ((temp * 9/5) + 32);
}
// TODO: Fix the broken logic
function fToC(temp) {
  return ((temp - 32) * 5/9);
}

// 🤖 Get all temperature entries from the database
async function getConversions() {
  try {
    const data = await readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// 🤖 Package up an entry for our "database"
function generateEntry(data) {
  const temp = parseFloat(data.temperature);
  let result = null;
  let from = null;
  let to = null;

  if (data.conversion === "CtoF") {
    result = cToF(temp);
    from = "C";
    to = "F";
  } else {
    result = fToC(temp);
    from = "F";
    to = "C";
  }

  const entry = {
    input: temp.toFixed(2),
    output: result.toFixed(2),
    from,
    to,
  };
  return entry;
}

// 🤖 Save our packaged up entry into our "database"
async function saveConversion(entry) {
  const conversions = await getConversions();
  conversions.push(entry);
  await writeFile(DATA_FILE, JSON.stringify(conversions, null, 2));
}

// 🤖 Convert array of temperature objects into html table rows
function buildRows(conversions) {
  if (!conversions.length) {
    return '<tr><td colspan="2">No conversions yet.</td></tr>';
  }

  return conversions
    .map(
      (c) =>
        `<tr><td>${c.input}° ${c.from}</td><td>${c.output}° ${c.to}</td></tr>`
    )
    .join("");
}

// 🤖 Replace a small segment of our html file with dynamically generated data
function renderTemplate(template, data) {
  return template.replace("{{rows}}", data.rows || "");
}

// 🤖 Convert url-encoded form data pieces into a nice object to work with.
function parseBody(req) {
  return new Promise((resolve, _) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const data = parse(body);
      resolve(data);
    });
  });
}

// function that clears JSON file data:
async function clearConversions() {
  await writeFile(DATA_FILE, JSON.stringify([], null, 2));
}

// 🤖 Small Helper to return a successful html response to the browser
function sendResponse(res, html) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

module.exports = {
  getConversions,
  renderTemplate,
  saveConversion,
  generateEntry,
  buildRows,
  sendResponse,
  parseBody,
  clearConversions,
};
