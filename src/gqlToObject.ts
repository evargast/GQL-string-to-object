import { parseGQLString } from "./helpers/parseGQLString";

/** Will convert gql string into objects
 * @params {string} gqlString - GraphQL string that needs to be converted
 * @params {string array} fragments - [optional] if you have nested fragments,  make sure to enter them in an increasing fashion. Smallest, not nested first such as [simpleFragment, simpleFragment, nestedFragment]
 */
const gqlToObject = (
  gqlString: string,
  fragments = [] as string[]
): RecursiveObject => {
  const formattedFragments: RecursiveObject = {};

  fragments.forEach((fragment) => {
    let fragmentId = fragment.trim().slice(0, fragment.indexOf("{"));
    fragmentId = fragmentId.split(" ")[1].trim();

    formattedFragments[fragmentId] = parseGQLString(
      fragment,
      formattedFragments
    );
  });

  return parseGQLString(gqlString, formattedFragments);
};

export default gqlToObject;
