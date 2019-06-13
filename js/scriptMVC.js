class DevicesModel {
    constructor() {
        //khoi tao devices 
        this.devices = [];
    }
    getDevices() {
        return this.devices;
    }
    saveDevice(device) {
        //them moi hoac edit thiet bi
        const index = this.devices.findIndex(el => el.tt === device.tt);
        //ko tim thay thiet bi thi them vao, tim thay thi thay the
        if (index === -1) {
            this.devices.push(device);
        }
        else {
            this.devices[index] = device;
        }
        return device;
    }
    deleteDevice(id) {
        debugger;
        const index = this.devices.findIndex(el => el.tt === id);
        this.devices.splice(index, 1);
    }
    searchDevice(ma) {
        console.log(ma);
        const matchDevices = this.devices.filter(el => {
            return el.maSo.includes(ma);
        });
        return matchDevices;
    }
}

class DevicesView {
    // Gán các event cho pop up
    showHideModal() {
        document.getElementById('button-add').addEventListener("click", function () {
            document.querySelector('.bg-modal').style.display = "flex";
        });
        const x = document.querySelector('.close');
        const cancel = document.querySelector('#close');
        const save = document.getElementById('save');
        [x, cancel].map(el => el.addEventListener("click", function () {
            document.querySelector('.bg-modal').style.display = "none";
        }));
    }
    getInput(){
        const maSo = document.getElementById("ma-sp").value;
        const ten = document.getElementById("ten-sp").value;
        const dvt = document.getElementById("dvt").value;
        const trongLuong = document.getElementById("trong-luong").value;
        return {maSo,ten,dvt,trongLuong};
    }
    addDevice(device) {
        const markup = `<tr class='data' id=${device.tt}>
                <th scope="row">${device.tt}</th>
                <td>${device.maSo}</td>
                <td>${device.ten}</td>
                <td>${device.dvt}</td>
                <td>${device.trongLuong}</td>
                <td>
                    <button type="button" value=${device.tt} class="btn btn-danger delete">Xóa</button>
                    <button id="edit-device" type="button" value=${device.tt} class="btn btn-warning edit">Sửa</button>
                </td>
            </tr>`;
        document.getElementById("content").insertAdjacentHTML('beforeend', markup);
    }
    viewDevices(devices) {
        document.getElementById("content").innerHTML = '';
        devices.forEach((device, id) => {
            this.addDevice(device);
        });
    }
    editDevice(el) {
        let rowIndex;
        const table = document.getElementById('devices');
        //cho du lieu tu bang vao modal
        rowIndex = el.value;
        //put data to modal
        document.getElementById("ma-sp").value = table.rows[rowIndex].cells[1].innerHTML;
        document.getElementById("ten-sp").value = table.rows[rowIndex].cells[2].innerHTML;
        document.getElementById("dvt").value = table.rows[rowIndex].cells[3].innerHTML;
        document.getElementById("trong-luong").value = table.rows[rowIndex].cells[4].innerHTML;
        //show modal
        document.querySelector('.bg-modal').style.display = "flex";
    }
    closeModalAndResetInput(){
        //dong modal
        document.querySelector('.bg-modal').style.display = "none";
        // xoa field sau khi them
        document.getElementById("ma-sp").value = '';
        document.getElementById("dvt").value = '';
        document.getElementById("trong-luong").value = '';
        document.getElementById("ten-sp").value = '';
    }
}

class DevicesController {
    constructor() {
        this.devicesModel = new DevicesModel();
        this.devicesView = new DevicesView();
        this.devices = this.devicesModel.getDevices();
        this.tt = 1;
        this.deviceToBeEdited = null;
    }
    editDevice(e) {
        this.deviceToBeEdited = e.value;
        this.devicesView.editDevice(e);
    }
    saveDevice() {
        let device;
        const inputs = this.devicesView.getInput();
        const index = this.devices.findIndex(el => el.tt == this.deviceToBeEdited);
        //save thiet bi. (them hoac sua)
        if(index == -1){
            device = { tt: this.tt, maSo: inputs.maSo, ten: inputs.ten, dvt: inputs.dvt, trongLuong: inputs.trongLuong };
            this.devicesModel.saveDevice(device);
            this.devicesView.addDevice(device);
            this.tt += 1;
        }
        else{
            device = this.devices.find(el => el.tt == index+1);
            device.maSo = inputs.maSo;
            device.ten = inputs.ten;
            device.dvt = inputs.dvt;
            device.trongLuong = inputs.trongLuong;
            this.devicesModel.saveDevice(device);
            this.devicesView.viewDevices(this.devices);
        }
        this.devicesView.closeModalAndResetInput();
    }
    deleteDevice(e) {
        debugger;
        const id = e.value;
        this.devicesModel.deleteDevice(id);
        this.tt -= 1;
        this.devicesView.viewDevices(this.devices);
    }
    searchDevice(e){
        const input = e.value;
        const matchDevices = this.devicesModel.searchDevice(input);
        this.devicesView.viewDevices(matchDevices);
    }
    start() {
        this.devicesView.showHideModal();
        //them thiet bi
        document.getElementById("save").addEventListener('click', () => {
            this.saveDevice();
        });
        //xoa hoac thay doi thiet bi
        document.getElementById("content").addEventListener('click', (e) => {
            if (e.target.classList.contains("delete")) {
                this.deleteDevice(e.target);
            }
            else if (e.target.classList.contains("edit")) {
                this.editDevice(e.target);
            }
            else {
                console.log(e.target);
            }
        });
        //tim kiem thiet bi
        document.getElementById("searchBox").addEventListener('input', (e) => {
            if(e.target.value === ''){
                this.devicesView.viewDevices(this.devices);
            }
            else{
                this.searchDevice(e.target);
            }
        });
    }
}
const devicesController = new DevicesController();
devicesController.start();