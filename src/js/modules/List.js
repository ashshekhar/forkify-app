import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  additem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.items.push(item);
  }

  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);

    // [2,4,8] -> splice(1,2) -> returns [4,8] ; original array left [2]
    // [2,4,8] -> slice(1,2) -> returns [4] ; original array left [2,4,8]
    this.items.splice(index, 1);
  }

  // This is to keep the count of ingredients flexible in the shopping list
  // So on passing the id of a particular ingredient, we update its count to newCount
  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count = newCount;
  }
}
