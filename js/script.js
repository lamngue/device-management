// Gán các event cho pop up
document.getElementById('button-add').addEventListener("click", function () {
    document.querySelector('.bg-modal').style.display = "flex";
});
const x = document.querySelector('.close');
const cancel = document.querySelector('#close');
const save = document.getElementById('save');
[x, cancel].map(el => el.addEventListener("click", function () {
    
    document.querySelector('.bg-modal').style.display = "none";
}));

// Khởi tạo dữ liệu
let pos = 1;
const addNewData = (device) => {
    document.getElementById("content").insertAdjacentHTML('beforeend',
        `<tr class='data' id=${device.tt}>
        <th scope="row">${device.tt}</th>
        <td>${device.ma}</td>
        <td>${device.ten}</td>
        <td>${device.DVT}</td>
        <td>${device.trongLuong}</td>
        <td>
            <button type="button" class="btn btn-danger" onclick='deleteDataUI(this);'>Xóa</button>
            <button type="button" class="btn btn-warning" onclick='editDataUI();'>Sửa</button>
        </td>
    </tr>`)
}

//Them du lieu vao bang
const addDataUI = () => {
    //them du lieu vao bang
    const maSo = document.getElementById("ma-sp").value;
    const ten = document.getElementById("ten-sp").value;
    const dvt = document.getElementById("dvt").value;
    const trongLuong = document.getElementById("trong-luong").value;
    if (maSo === '' || ten === '' || dvt === '' || trongLuong === '') {
        return;
    }
    const newDevice = {
        tt: pos,
        ma: maSo,
        ten,
        DVT: dvt,
        trongLuong
    }
    addNewData(newDevice);
    pos++;
    //dong modal 
    document.querySelector('.bg-modal').style.display = "none";
};


const deleteDataUI = (x) => {
    const row = x.parentNode.closest('tr');
    document.getElementById("devices").deleteRow(x.parentElement.parentElement.rowIndex);
};

let rowIndex;
const editDataUI = () => {
    const table = document.getElementById('devices');
    for(let i = 1;i<table.rows.length;i++){
        table.rows[i].onclick = function(){
            rowIndex = this.rowIndex;
            //put data to modal
            document.getElementById("ma-sp").value = this.cells[1].innerHTML;
            document.getElementById("ten-sp").value = this.cells[2].innerHTML;
            document.getElementById("dvt").value = this.cells[3].innerHTML;
            document.getElementById("trong-luong").value = this.cells[4].innerHTML;
        }
    }
    //show modal
    document.querySelector('.bg-modal').style.display = "flex";
}
const editData = () => {
    const table = document.getElementById('devices');
    //change table data
    let maSP = table.rows[rowIndex].cells[1].innerHTML;
    let name = table.rows[rowIndex].cells[2].innerHTML;
    let dvt = table.rows[rowIndex].cells[3].innerHTML;
    let weight = table.rows[rowIndex].cells[4].innerHTML;
    if(maSP === '' || name === '' || dvt === '' || weight === ''){
        return;
    }
    maSP = document.getElementById("ma-sp").value;
    name = document.getElementById("ten-sp").value;
    dvt = document.getElementById("dvt").value;
    weight = document.getElementById("trong-luong").value;
    document.getElementById("ma-sp").value = '';
    document.getElementById("ten-sp").value = '';
    document.getElementById("dvt").value = '';
    document.getElementById("trong-luong").value = '';
    document.querySelector('.bg-modal').style.display = "none";
};
const searchData = () => {
    const input = document.getElementById('searchBox');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('devices');
    const tr = table.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
    }
};
document.getElementById("save").addEventListener('click', function(){
    addDataUI();  
});
document.getElementById("edit").addEventListener('click',function(){
    editData();
});