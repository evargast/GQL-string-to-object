interface Name {
  name: string;
}

interface Kind {
  kind: string;
}

interface Types {
  type: Kind & Name & { ofType?: OfType };
  ofType?: OfType;
}

interface EntryField extends Name, Types {}

interface OfType extends EntryField, Kind {}

interface SchemaType extends Kind, Name {
  fields: EntryField[];
  enumValues?: Name[];
}

type Schema = {
  types: SchemaType[];
};

type ReturnObject = { [key: string]: unknown };
type RecursiveObject = { [key: string]: ReturnObject };
