class Functionality {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          productName: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }
  filter() {
    const queryStringCopy = { ...this.queryString };
    const removeItems = ["keyword", "page", "limit"];
    removeItems.forEach((items) => delete queryStringCopy[items]);

    let string = JSON.stringify(queryStringCopy);
    string = string.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (operator) => `$${operator}`
    );

    this.query = this.query.find(JSON.parse(string));
    return this;
  }
  pagination(productsToBeShown) {
    const currentPage = this.queryString.page || 1;

    const skip = productsToBeShown * (currentPage - 1);

    this.query = this.query.limit(productsToBeShown).skip(skip);
    return this;
  }
}

module.exports = Functionality;
