# Base de Datos

Almacenamiento
    Estructurar
        Ordenar
           Integridad
               Seguridad 
                   Acceso



Lo que hacen:
- Instalar. Instala el sistema y el motor (CLI o GUI) de base de datos. 
- Crea un sistema de almacenar datos de una determinada manera.
- Nos brinda un lenguaje de consulta para poder interactuar con la base de datos.



SQL - TABLAS - RELACIONES 
        ID  PK o FK

GENIAL -> datos TRANSACCIONAL - PAGOS - FECHAS

Ejemplo de tabla de base de datos:
```
  PK                                 FK
-------------------------------------------
| ID | Nombre | Apellido | Edad |  club_id |
|------------------------------------------
| 1  | Juan   | Pérez    | 30   |    3     |
| 2  | Ana    | Gómez    | 25   |    3     |
```



NO SQL <- y si es basado en consultas
No relacional <- pero si queremos podemos hacer relaciones.

Ejemplo de Colecciones de base de datos - BSON
```bson

    "_id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "edad": 30,
    "club_id": 3

    "_id": 2,
    "nombre": "Ana",
    "apellido": "Gómez",
    "edad": 25,
    "club_id": 3

```
COLECCIÓN cual LISTAS - JSON - BSON

DOCUMENTOS cual OBJETOS - JSON - BSON

