import { toObject } from "./toObject";

const parseGQLString = (
  query: string,
  parsedFragments = {}
): RecursiveObject => {
  let val = "";
  const isNested = (query.match(/fragment/g) || []).length > 1;
  const isQuery = (query.match(/query/g) || []).length >= 1;

  // NESTED FRAGMENTS or GQL QUERIES
  if (isNested || isQuery) {
    if (isQuery) {
      val = query.substring(0, query.indexOf("fragment"));
    } else {
      val = query.substring(
        query.indexOf("{"),
        query.indexOf("fragment", query.indexOf("{"))
      );
    }

    val = val.substring(query.lastIndexOf(")") + 1, val.lastIndexOf("}"));
    val = val.substring(val.indexOf("{") + 1, val.lastIndexOf("}")).trim();
  } else {
    val = query
      .substring(query.indexOf("{") + 1, query.lastIndexOf("}"))
      .trim();
  }

  const lines = val.split("\n");
  return toObject(lines, parsedFragments);
};

export { parseGQLString };
