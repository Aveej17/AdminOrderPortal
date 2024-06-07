function handleFormSubmit(event) {
    event.preventDefault();
    const ProductDetails = {
        productPrice: event.target.price.value,
        productName: event.target.productName.value,
        productCategory: event.target.category.value
    };

    axios
        .post(
            "https://crudcrud.com/api/172dba43bb7948beb710ab046af33d10/appointmentData",
            ProductDetails
        )
        .then((response) => {
            displayUserOnScreen(response.data);
        })
        .catch((error) => console.log(error));

    // Clearing the input fields
    document.getElementById("price").value = 0;
    document.getElementById("productName").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/172dba43bb7948beb710ab046af33d10/appointmentData"
        )
        .then((response) => {
            response.data.forEach(product => {
                displayUserOnScreen(product);
            });
        })
        .catch((error) => console.log(error));
});

function displayUserOnScreen(productDetails) {
    const productItem = document.createElement("li");
    productItem.appendChild(
        document.createTextNode(
            `${productDetails.productPrice} - ${productDetails.productName} - ${productDetails.productCategory}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete Product"));
    deleteBtn.classList.add("delete");
    productItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit Product"));
    editBtn.classList.add("edit");
    productItem.appendChild(editBtn);

    const productList = document.getElementById(productDetails.productCategory).nextElementSibling;
    productList.appendChild(productItem);

    deleteBtn.addEventListener("click", function (event) {
        productList.removeChild(event.target.parentElement);
        axios
            .delete(
                `https://crudcrud.com/api/172dba43bb7948beb710ab046af33d10/appointmentData/${productDetails._id}`
            )
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    });

    editBtn.addEventListener("click", function (event) {
        productList.removeChild(event.target.parentElement);
        document.getElementById("price").value = productDetails.productPrice;
        document.getElementById("productName").value = productDetails.productName;
        document.getElementById("category").value = productDetails.productCategory;

        axios
            .delete(
                `https://crudcrud.com/api/172dba43bb7948beb710ab046af33d10/appointmentData/${productDetails._id}`
            )
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    });
}
