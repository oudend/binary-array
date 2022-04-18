# binary-array
A javascript library that can convert an array to binary and store it in buffer arrays for sending to workers.

example: 

```javascript
array = BinaryArray.fromArray(['example'], 5000);

console.log(array.getArray()); // ['example']
```

sending to workers and reconstructing:

index.js
```javascript
array = BinaryArray.fromArray(['example'], 5000);

worker.postMessage({view: array.view, locater: array.locater}, [array.view.buffer, array.locater.buffer]);
```

worker.js - onmessage
```javascript
reconstructedArray = new BinaryBufferArray(1000);

reconstructedArray.view = e.data.view;
reconstructedArray.locater = e.data.locater;

array = reconstructedArray.getArray(); // ['example']
```
