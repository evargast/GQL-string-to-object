/** Will convert a GraphQL schema into an key-value object
 * @params {schema} schema - GraphQL schema object
 * @params {string} targetType - [optional] return a specific type / interface rather than the whole schema
 * @params {boolean} hideTypes - [optional, default = false] return {} as value instead of  "String", "Int", "ENUM", etc...
 * @params {boolean} minimizeEnum - [optional, default = true] whether ENUMs should be listed out or return "ENUM" instead
 */
const schemaToObject = (
  schema: Schema,
  targetType?: string,
  hideTypes = false,
  minimizeEnum = true
): ReturnObject => {
  const returnObj = {} as ReturnObject;
  const types = schema.types;

  types.forEach((schemaEntry: SchemaType) => {
    if (
      schemaEntry.kind !== "INPUT_OBJECT" &&
      schemaEntry.kind !== "SCALAR" &&
      !schemaEntry.name.includes("__")
    ) {
      processEntry(types, schemaEntry, returnObj, hideTypes, minimizeEnum);
    }
  });

  if (targetType) {
    if (returnObj[targetType]) {
      const returnVal: ReturnObject = {};
      returnVal[targetType] = returnObj[targetType];
      return returnVal;
    }
  }
  // prettifySchema(schema);
  // eslint-disable-next-line no-console

  return returnObj;
};

const processEntry = (
  dataSource: SchemaType[],
  schemaEntry: SchemaType,
  returnObj: ReturnObject,
  hideTypes?: boolean,
  minimizeEnum?: boolean
) => {
  if (schemaEntry.kind === "ENUM") {
    if (!hideTypes) {
      if (minimizeEnum) {
        returnObj[schemaEntry.name] = schemaEntry.kind;
      } else {
        returnObj[schemaEntry.name] = schemaEntry.enumValues?.map(
          (enumEntry) => enumEntry.name
        );
      }
    } else {
      returnObj[schemaEntry.name] = {};
    }
  }

  if (schemaEntry.kind === "OBJECT" || schemaEntry.kind === "INTERFACE") {
    // entry will process all the "field" children and then link that back to returnObj
    const entry: ReturnObject = {};

    schemaEntry.fields.forEach((entryField: EntryField) => {
      if (entryField.type.kind !== "SCALAR") {
        let target;
        let isOfTypeScalar = false;
        if (entryField.type.name === null && entryField.type.ofType?.name) {
          target = entryField.type.ofType.name;
          isOfTypeScalar = entryField.type?.ofType?.kind === "SCALAR";
        } else {
          target = entryField.type.name;
        }

        if (isOfTypeScalar) {
          entry[entryField.name] = hideTypes ? {} : target;
        } else {
          if (!returnObj[target]) {
            processEntry(
              dataSource,
              getEntry(dataSource, target),
              returnObj,
              hideTypes,
              minimizeEnum
            );
          }
          entry[entryField.name] = returnObj[target];
        }
      } else {
        entry[entryField.name] = hideTypes ? {} : entryField.type.name;
      }

      returnObj[schemaEntry.name] = entry;
    });
  }
};

const getEntry = (
  schemaEntries: SchemaType[],
  targetName: string
): SchemaType => {
  let returnVal = {} as SchemaType;
  schemaEntries.forEach((schemaEntry: SchemaType) => {
    if (schemaEntry.name === targetName) {
      returnVal = schemaEntry;
    }
  });
  return returnVal;
};

// eslint-disable-next-line no-unused-vars
const prettifySchema = (schema: Schema, printResults = true) => {
  const parsedResults: SchemaType[] = [];
  const types = schema.types;

  types.forEach((schemaEntry: SchemaType) => {
    if (
      schemaEntry.kind !== "INPUT_OBJECT" &&
      schemaEntry.kind !== "SCALAR" &&
      !schemaEntry.name.includes("__")
    ) {
      const object = {
        name: schemaEntry.name,
        kind: schemaEntry.kind,
        fields: schemaEntry.fields?.map((field) => {
          const parsed = {
            name: field.name,
            type: field.type,
          };
          return parsed;
        }),
        enumValues: schemaEntry.enumValues?.map((enumVal) => {
          const parsed = {
            name: enumVal.name,
          };
          return parsed;
        }),
      };
      parsedResults.push(object);
    }
  });

  if (printResults) {
    // eslint-disable-next-line no-console
    console.log(parsedResults);
  }

  return parsedResults;
};

export default schemaToObject;
