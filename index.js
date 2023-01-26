import { csvParse } from "d3-dsv";
import * as fs from "node:fs/promises";

async function readParse() {
  const dataDict = {};
  const files = await fs.readdir("./Data/");
  
  for (const file of files) {
    const fileTxt = await fs.readFile("./Data/" + file, "utf8");
    const fileKey = file.replace(".csv", "");

    dataDict[fileKey] = (fileKey === "Dashboard") ?  
      fillSpaces(csvParse(fileTxt), ["Section", "Group", "Story"]) : 
      csvParse(fileTxt);
  }
    
  return dataDict;
}

const techSoup = await readParse();
console.log(techSoup);

function fillSpaces(parsedCSV, columnsToFill){
  for (let i = 0; i < parsedCSV.length; i++){
    if (i >= 1){
      for (let key of columnsToFill){
        if (parsedCSV[i][key] === ""){
          parsedCSV[i][key] = parsedCSV[i - 1][key] 
        }
      }
    }
  }
  return parsedCSV;
}


