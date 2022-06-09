import { observable, action, configure, makeObservable, computed } from "mobx";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true
});

type Order = "asc" | "desc";
interface DataRow {
  dataRow: any[];
  isSelected: boolean;
}

class MainStore {
  dataSet: DataRow[] = [];
  columnDefinitions: any[] = [];
  columnsOnCurrentPage = observable.array();
  globalOverlayHandlers: any[] = [];
  dataFetchingHasStarted = false;

  startPageIndex = 0;

  pageSize = 10;

  pageNr = 0;

  orderedByColumn = "FILENAME";

  orderDirection: Order = "desc";

  infoBarMessage = "Files found:";

  dataIsLoaded = false;

  constructor() {
    makeObservable(this, {
      startPageIndex: observable,
      pageSize: observable,
      pageNr: observable,
      orderedByColumn: observable,
      orderDirection: observable,
      infoBarMessage: observable,
      dataIsLoaded: observable,
      sortedDataRows: computed,
      filteredDataRows: computed,
      currentPage: computed,
      replaceColumnsOnCurrentPage: action,
      initializeColumnDefinitions: action,
      updateFilter: action,
      setInfoBarMessage: action,
      setOrderedByColumn: action,
      setOrderDirection: action,
      setPageSize: action,
      setPageNr: action,
      setDataIsLoaded: action,
      toggleSelection: action
    });
  }

  get sortedDataRows() {
    const rawData = this.dataIsLoaded ? this.dataSet.slice() : [];

    return rawData;
  }

  get filteredDataRows() {
    return this.sortedDataRows;
  }

  get currentPage() {
    const data = this.filteredDataRows.slice(this.pageNr * this.pageSize, (this.pageNr + 1) * this.pageSize);
    return data;
  }

  replaceColumnsOnCurrentPage = newColumns => this.columnsOnCurrentPage.replace(newColumns);

  initializeColumnDefinitions = (columnNames, columnDefinitions) => {
    const definitions = columnNames.map((nameAndType, index) => {
      const columnDefinition = nameAndType.split(":");
      const name = columnDefinition.length > 0 ? columnDefinition[0] : "";
      const type = columnDefinitions[name];
      this.columnsOnCurrentPage.push(index);
      return { name: name, type: type, index: index };
    });
    this.columnDefinitions = definitions;
  };

  updateFilter = (index, minValue, maxValue, equalValue) => {
    if (minValue !== null) this.columnDefinitions[index].minValue = minValue;
    if (maxValue !== null) this.columnDefinitions[index].maxValue = maxValue;
    if (equalValue !== null) this.columnDefinitions[index].equalValue = equalValue;
  };

  setInfoBarMessage = message => (this.infoBarMessage = message);

  setOrderedByColumn = columnName => (this.orderedByColumn = columnName);

  setOrderDirection = sortDirection => (this.orderDirection = sortDirection);

  setPageSize = pageSize => (this.pageSize = pageSize);

  setPageNr = pageNr => (this.pageNr = pageNr);

  setDataIsLoaded = status => (this.dataIsLoaded = status);

  toggleSelection = row => (row.isSelected = !row.isSelected);

  getFilterByName = name => {
    return this.columnDefinitions.find(definition => definition.name === name);
  };

  isFiltered = (dataRow, activeFilters) => {
    if (activeFilters.length === 0) {
      return true;
    }
    const isFiltered = activeFilters.reduce((acc, filter) => {
      if (!acc) {
        return acc;
      }
      const value = dataRow[filter.index];
      if (filter.equalValue) {
        return filter.equalValue === value;
      }
      if (filter.minValue && value < filter.minValue) {
        return false;
      }
      if (filter.maxValue && value > filter.minValue) {
        return false;
      }
      return true;
    }, true);
    return isFiltered;
  };

  handleGlobalMouseDown = ev => {
    console.log("Global mouse down", ev.target, ev.currentTarget, ev.relatedTarget);
    this.globalOverlayHandlers.forEach(handler => {
      if (handler.function) {
        handler.function(ev);
      }
    });
  };

  handleGlobalKeyDown = ev => {
    switch (ev.key) {
      case `Enter`:
        break;
    }
    console.log("Global key down");
  };

  removeGlobalHandler = id => {
    const index = this.globalOverlayHandlers.findIndex(handler => handler.id === id);
    if (index === -1) {
      return;
    }
    this.globalOverlayHandlers.splice(index, 1);
  };
}

const mainStore = new MainStore();
export default mainStore;
