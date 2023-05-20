import fs from "fs";

const file = "./db/data.json";

export function saveData(data) {
  fs.writeFileSync(file, JSON.stringify(data));
}

export function readData() {
  return !fs.existsSync(file)
    ? null
    : JSON.parse(fs.readFileSync(file, "utf8"));
}
