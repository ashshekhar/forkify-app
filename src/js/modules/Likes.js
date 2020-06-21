export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // Persist data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  // If a particular recipe is already liked or not
  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  // So in the same likes key of the localStorage we store id,title,author and img of each of our likes
  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  // On reloading, we want the like items to display
  readStorage() {
    const storage = JSON.parse(localStorage.getItem("likes")); // Converts the strings back to the data structure it was in before

    // Restore from local storage
    if (storage) this.likes = storage;
  }
}
