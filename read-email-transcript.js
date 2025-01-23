const fs = require("fs");
const path = require("path");

const dataFolder = path.join("./", "data"); 

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const fileContents = fs.readFileSync("DATA-POSTS.md").toString("utf-8"); 

const firstHeaderIndex = fileContents.indexOf("###"); 

const headings = fileContents.substring(firstHeaderIndex); 

const firstRegex = /1\.\s*(.+)/;
const secondRegex = /2\.\s*(.+)/;
const thirdRegex = /3\.\s*(.+)/;

const fourthRegex = /4\.\s*(.+)/;

const fifthRegex = /5\.\s*(.+)/;

const weekRegex = /(?:(?:Quote|Joke|Fact) of the Week|This week'?s quote):\s*\*.+\*\s*—\s*.+/is

const bonusRegex = /Bonus:\s*(.+)/; 

const records = headings.split("###");

if (!fs.existsSync(dataFolder))
{
  fs.mkdirSync(dataFolder, { recursive: true });
}

records.forEach(record => {

  if (record.trim() != "") {
    const trimmedRecord = record.trim();
    const dateEndIndex = trimmedRecord.indexOf("\n");
    const date = new Date(trimmedRecord.substring(0, dateEndIndex));
    const fileName = (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0") + "-" + date.getFullYear().toString() + ".md";
    const firstLink = "linkOneText: " + `"` + trimmedRecord.match(firstRegex)[1] + `"` + "\n";
    const secondLink = "linkTwoText: " + `"` + trimmedRecord.match(secondRegex)[1] + `"` + "\n" ;
    const thirdLink = "linkThreeText: " + `"` + trimmedRecord.match(thirdRegex)[1] + `"` + "\n";
    const fourthLinkMatches = trimmedRecord.match(fourthRegex);
    const fifthLinkMatches = trimmedRecord.match(fifthRegex);
    const bonusMatches = trimmedRecord.match(bonusRegex);
    let fourthLink = "";
    let fifthLink = "";
    let weekContent = "";

    let bonusContent = "";

    if (fourthLinkMatches != null) {
      fourthLink = "linkFourText: " + `"` + fourthLinkMatches[1] + `"` + "\n"; 
    }

    if (fifthLinkMatches != null) {
      fifthLink = "linkFiveText: " + `"` + fifthLinkMatches[1] + `"` + "\n";
    }

    const weekMatches = trimmedRecord.match(weekRegex);

    if (weekMatches != null) {
      weekContent = "weekContent: " + `"` + weekMatches[0] + `"` + "\n";
    }

    if (bonusMatches != null) {
      bonusContent = "bonus: " + `"` + bonusMatches[0] + `"` + "\n";
    }

    const yearFolder = path.join(dataFolder, date.getFullYear().toString());
    if (!fs.existsSync(yearFolder)) {
      fs.mkdirSync(yearFolder,{recursive:true});
    }

    const fileContents = "---" + "\n" + "date: " + `"` + month[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear() + `"` + "\n"
      + firstLink+ secondLink + thirdLink  + fourthLink +  fifthLink +  weekContent
      + bonusContent + "---";

    fs.writeFileSync(path.join(yearFolder, fileName), fileContents); 
  }
}
)

