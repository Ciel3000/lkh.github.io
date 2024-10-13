document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const image = document.getElementById('image').files[0];

    if (name && description && price && quantity && image) {
        const table = document.getElementById('productTable');
        const newRow = table.insertRow();

        newRow.innerHTML = `
            <td>${name}</td>
            <td>${description}</td>
            <td>$${price}</td>
            <td>${quantity}</td>
            <td><img src="${URL.createObjectURL(image)}" alt="${name}" style="width:50px;height:50px;"></td>
            <td><button onclick="deleteProduct(this)">Delete</button></td>
        `;

        // Clear the form fields
        document.getElementById('productForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

function deleteProduct(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}
