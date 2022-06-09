import mainStore from "../stores/MainStore";

export const fetchDataFromFile = async (url, columnDefinitions) => {
  //console.log("Authorization string ", "->Basic " + btoa("spice:^4midAble$") + "-<");
  console.log("Column definitions:", columnDefinitions);
  const response = await fetch(
    url
    // , {
    // method: "GET",
    // credentials: "same-origin",
    // redirect: "follow",
    // mode: "no-cors"
    // headers: {
    //   "Content-Type": "text/plain",
    //   Authorization: "Basic " + btoa("spice:^4midAble$")
    // }
    // }
  );
  const body = await response.text();
  const valuesAsTxtLines = body.split("\n");
  valuesAsTxtLines.forEach((dataLine, index) => {
    if (dataLine === "") {
      return;
    }
    if (index === 0) {
      const columns = dataLine.split(",");
      const newColumns: any = [];
      columns.forEach((nameAndType, index) => {
        const name = nameAndType.split(":")[0];
        newColumns.push(index);
        mainStore.columnDefinitions.push({
          name: name,
          type: columnDefinitions[name].type,
          width: columnDefinitions[name].display_width
        });
      });
      mainStore.replaceColumnsOnCurrentPage(newColumns);
    } else {
      const dataRow = dataLine.split("\t");
      mainStore.dataSet.push({ dataRow: dataRow, isSelected: false });
    }
  });
  console.log(
    "Number of rows: ",
    mainStore.dataSet.length,
    " Number of cells [million]:",
    (mainStore.dataSet.length * mainStore.columnDefinitions.length) / 1000000
  );
};

export const fetchDefinitionsFromFile = async url => {
  //console.log("Authorization string ", "->Basic " + btoa("spice:^4midAble$") + "-<");
  const response = await fetch(url);
  const definitions = await response.json();
  console.log("Definitions:", definitions);
  return definitions;
};

export const compareRows = (a, b, orderedByColumn, orderDirection) => {
  return 0;
};
