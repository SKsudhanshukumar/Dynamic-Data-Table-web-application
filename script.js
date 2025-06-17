document.addEventListener("DOMContentLoaded", () => {
  const data = [
  { name: "Aarav Sharma", age: 22, city: "Delhi" },
  { name: "Diya Patel", age: 25, city: "Mumbai" },
  { name: "Kabir Mehta", age: 28, city: "Bangalore" },
  { name: "Ishaan Gupta", age: 21, city: "Chennai" },
  { name: "Anaya Singh", age: 30, city: "Kolkata" },
  { name: "Vivaan Reddy", age: 26, city: "Hyderabad" },
  { name: "Meera Das", age: 23, city: "Pune" },
  { name: "Aryan Nair", age: 24, city: "Ahmedabad" },
  { name: "Saanvi Joshi", age: 29, city: "Lucknow" },
  { name: "Reyansh Verma", age: 27, city: "Jaipur" }
];


let currentPage = 1;
const rowsPerPage = 5;
let filteredData = [...data];
let sortDirection = true;

function displayTable(dataSlice) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  dataSlice.forEach(item => {
    const row = `<tr><td>${item.name}</td><td>${item.age}</td><td>${item.city}</td></tr>`;
    tableBody.innerHTML += row;
  });
}

function paginate(data) {
  const pagination = document.getElementById("pagination");
  const pages = Math.ceil(data.length / rowsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className =
      "px-4 py-2 rounded-md border transition text-sm " +
      (i === currentPage
        ? "bg-blue-600 text-white border-blue-600 font-semibold shadow"
        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100");

    btn.onclick = () => {
      currentPage = i;
      updateTable();
    };
    pagination.appendChild(btn);
  }
}

function updateTable() {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  displayTable(filteredData.slice(start, end));
  paginate(filteredData);
}


function sortTable(colIndex) {
  const keys = ["name", "age", "city"];
  const key = keys[colIndex];
  filteredData.sort((a, b) =>
    sortDirection
    ? a[key] > b[key] ? 1 : -1
    : a[key] < b[key] ? 1 : -1
  );
  sortDirection = !sortDirection;
  updateTable();
}

document.getElementById("searchInput").addEventListener("input", e => {
  const searchTerm = e.target.value.toLowerCase();
  filteredData = data.filter(item =>
    Object.values(item).some(val =>
    String(val).toLowerCase().includes(searchTerm)
    )
  );
  currentPage = 1;
  updateTable();
});

window.sortTable = sortTable;

window.exportToCSV = () => {
  const csvRows = [
      ["Name", "Age", "city"],
      ...filteredData.map(item => [item.name, item.age, item.city])
    ];
  const csvContent = csvRows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "table_data.csv";
  a.click();
  URL.revokeObjectURL(url);
  };
  updateTable();
});
