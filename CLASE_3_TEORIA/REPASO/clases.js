


class Product {
    // Datos 
    // Los de clase 
    static category = "Electronics";
    static inventory = [];
    #iva = 0.21; // Privado, no se puede acceder desde fuera de la clase

    // Los de instancia
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    // Métodos que interactuan con esos datos
    // Método de instancia
    calculatePriceWithTax() {
        return this.price * (1 + this.#iva);
    }
    // Método de clase - Static
    static addToInventory(product) {
        if (product instanceof Product) {
            this.inventory.push(product);
        } else {
            console.error("Solo se pueden agregar instancias de Product al inventario.");
        }
    }
    // Métodos Privados
    #calculateTax() {
        return this.price * this.#iva;
    }
}

// Crear instancias de Product 

const laptop = new Product("Laptop", 1000);

console.log(laptop.name); // Laptop
console.log(laptop.price);

console.log(laptop.calculatePriceWithTax()); // 1210

Product.addToInventory(laptop);
