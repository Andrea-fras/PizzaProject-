document.addEventListener('DOMContentLoaded', () => {
    const pizzas = [
        { id: 1, name: 'Margherita', price: 10 },
        { id: 2, name: 'Pepperoni', price: 12 },
        { id: 3, name: 'Veggie', price: 9 }
    ];

    const pizzaList = document.getElementById('pizza-list');
    const pizzaSelect = document.getElementById('pizza-id');

    pizzas.forEach(pizza => {
        const li = document.createElement('li');
        li.textContent = `${pizza.name} - $${pizza.price}`;
        pizzaList.appendChild(li);

        const option = document.createElement('option');
        option.value = pizza.id;
        option.textContent = pizza.name;
        pizzaSelect.appendChild(option);
    });

    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const pizzaId = document.getElementById('pizza-id').value;
        const quantity = document.getElementById('quantity').value;
        
        console.log(`Order placed by ${customerName}, Address: ${customerAddress}, Pizza ID: ${pizzaId}, Quantity: ${quantity}`);
        
        // Here you would typically send this data to your server via an AJAX request.
        alert('Order placed successfully!');
    });
});
