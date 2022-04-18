# binary-array
A javascript library that can convert an array to binary and store it in buffer arrays for sending to workers.

example: 

```javascript
array = BinaryArray.fromArray(['example'], 5000);

console.log(array.getArray()); // ['example']
```
