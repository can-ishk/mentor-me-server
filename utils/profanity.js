import Filter from "bad-words";

const filter = new Filter({ placeHolder: "\*" });

filter.addWords('shit');

export default filter;