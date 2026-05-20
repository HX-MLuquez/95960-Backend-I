console.log(global)

console.log(process)

# Tipos de datos

## Primitivos
- String
- Number
- Boolean
- Null
- Undefined
- Symbol
- BigInt

## No primitivos - Tipo Objeto
- Object (-> JSON)
- Array (-> JSON)
- Function
- Date
- RegExp
- Map
- Set

{} -> "{}"  Objeto objeto 
[] -> "[]"  Objeto Lista (array)

```js
const frutas = ["manzana", "banana", "naranja"];

// Por defecto está indexado
//      01:        02:       03:
// ["manzana", "banana", "naranja"];  

// Analogía usando {}

const frutas_obj = {
    0: "manzana",
    1: "banana",
    2: "naranja"
    }
```

- Objeto:
```javascript
const user = {
    name: "John Doe",
    email: "john@gmail.com"
}
```

- JSON:
```json
{
    "name": "John Doe",
    "email": "john@gmail.com"
}
```

**Antes del JSON se usaba mucho el formato XML para el intercambio de datos entre cliente y servidor.**

- XML es:
```xml
<users>
    <user>
        <name>John Doe</name>
        <email>john@gmail.com</email>
    </user>
</users>
```