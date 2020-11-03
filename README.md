# GraphQL string to object

<a href="https://www.npmjs.com/package/gql-string-to-object">
    <img alt="npm" src="https://img.shields.io/npm/v/gql-string-to-object.svg?style=flat-square">
</a>

<a href="https://www.npmjs.com/package/gql-string-to-object">
    <img alt="npm" src="https://img.shields.io/npm/dt/gql-string-to-object?style=flat-square">
</a>

Helper function that will convert GraphQL strings into objects.

Intended to allow easier navigation through the implemented schema. Could be for testing, parsing, you name it!

## Installation

```shell
npm install -D gql-string-to-object
```

## Example implementations

### gqlToObject

```javascript
import { gqlToObject } from "gql-string-to-object";

const FRAGMENT_EXAMPLE = `
    fragment ProductDetails on Character {
        name
        sku
        price {
            currency
            symbol
        }
    }
    `;

const QUERY_EXAMPLE = `
    query ProductFinder($first: Int = 3) {
        location
        availability
        details {
            ...ProductDetails
        }
    }
    ${FRAGMENT_EXAMPLE}
`;

const gqlAsObject = gqlToObject(QUERY_EXAMPLE, [FRAGMENT_EXAMPLE]);

console.log(JSON.stringify(gqlAsObject));
```

<details>
<summary><b>Response</b></summary>

```json
{
  "location": {},
  "availability": {},
  "details": {
    "name": {},
    "sku": {},
    "price": {
      "currency": {},
      "symbol": {}
    }
  }
}
```

</details>

<br/>

### schemaToObject

```javascript
import { getIntrospectionQuery, schemaToObject } from "gql-string-to-object";

const response = await fetch(YOUR - URL - HERE, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query: getIntrospectionQuery() }),
});

const data = await response.json();

console.log(schemaToObject(data.__schema, "sale_tag"));
```

Output :

```json
{
  "sale_tag": {
    "amount": "Int",
    "label": "String"
  }
}
```

<details>
<summary><b>Raw schema example</b></summary>

```json
...
{
  "kind": "OBJECT",
  "name": "sale_tag",
  "description": "A description for the SaleTag",
  "fields": [
    {
      "name": "amount",
      "description": "A description for the amount field",
      "args": [],
      "type": {
        "kind": "SCALAR",
        "name": "Int",
        "ofType": null
      },
      "isDeprecated": false,
      "deprecationReason": null
    },
    {
      "name": "label",
      "description": "Some label description",
      "args": [],
      "type": {
        "kind": "SCALAR",
        "name": "String",
        "ofType": null
      },
      "isDeprecated": false,
      "deprecationReason": null
    }
  ],
  "inputFields": null,
  "interfaces": [],
  "enumValues": null,
  "possibleTypes": null
}
...
```

</details>

<br/>

## Contributing

Got ideas on how to improve this?? Lets make it happen 🚂

[PRs](https://github.com/evargast/GQL-string-to-object/pulls) here!

[Issues](https://github.com/evargast/GQL-string-to-object/issues) over here!
