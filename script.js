let expenses = []
let totalamount= 0
const categoryTotals = {
    Rent: 0,
    Transportation: 0,
    Fun: 0,
    Grocery: 0,
    Miscellaneous: 0,
};
function getCategoryIndex(category) {
    const categories = ["Rent", "Transportation", "Fun", "Grocery", "Miscellaneous"];
    return categories.indexOf(category) + 2; // +2 because of <h1> and Total Expense in HTML
}


const categorySelect = document.getElementById("category-select")
const amountInput = document.getElementById("amount-input")
const amounttotal = document.getElementById("total-amt")

const dateInput = document.getElementById("date-input")
const descriptionInput = document.getElementById("description-input")
const addBtn = document.getElementById("add-btn")




addBtn.addEventListener("click", function () {
    const amount = parseFloat(amountInput.value); // Parse the input amount
    
    if (!isNaN(amount) && amount > 0) {
        totalamount += amount; // Update the total amount
        categoryTotals[categorySelect.value] += amount; // Update the category total
        document.querySelector(`#imp p:nth-child(${getCategoryIndex(categorySelect.value)})`).textContent = `
        ${categorySelect.value}: ${categoryTotals[categorySelect.value]}`; //chatgpt sol

        amounttotal.textContent = `Total Amount: ${totalamount}`; // Update the displayed total
    } else {
        alert("Please enter a valid amount.");
        return;
    }

    const expense = [
        categorySelect.value + "  ",
        amountInput.value + "  ",
        dateInput.value + "  ",
        descriptionInput.value + "  "
    ];
    expenses.push(expense);

    let newsection = document.createElement("div");
    newsection.classList.add("new-section");
    newsection.innerHTML = `
        <p class="abc"> 
            <span id="amount">${expense[1]}</span>
            <button class="delete-btn">Delete</button>
            <span id="category">${expense[0]}</span> 
            <span id="date">${expense[2]}</span><br>
            <span id="description">${expense[3]}</span>
        </p>`;
    
    document.getElementById("transaction-list").appendChild(newsection);

    const deleteBtn = newsection.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        const deletedAmount = parseFloat(expense[1].trim());
        if (!isNaN(deletedAmount)) {
            totalamount -= deletedAmount; // Subtract the amount
            const deletedCategory = expense[0].trim(); // Get the deleted category
        categoryTotals[deletedCategory] -= deletedAmount; // Update the category total
        document.querySelector(`#imp p:nth-child(${getCategoryIndex(deletedCategory)})`).textContent = `
        ${deletedCategory}: ${categoryTotals[deletedCategory]}`;

            amounttotal.textContent = `Total Amount: ${totalamount}`; // Update total display
        }

        newsection.remove();
    });

    // Clear input fields
    amountInput.value = '';
    dateInput.value = '';
    descriptionInput.value = '';
    categorySelect.value = 'Miscellaneous';
});










