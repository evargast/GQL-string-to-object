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

## Example implementation

```javascript

import gqlToObject from "gql-string-to-object";

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

## Contributing

Got ideas on how to improve this?? Lets make it happen 🚂

[PRs](https://github.com/evargast/GQL-string-to-object/pulls) here!

[Issues](https://github.com/evargast/GQL-string-to-object/issues) over here!