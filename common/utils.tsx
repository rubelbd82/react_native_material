
export  default function csvToJson(csv)  {
    const lines = csv.split("\n");

    const result = [];

    const headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        const obj = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
        }

    result.push(obj);

    }

    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
};

