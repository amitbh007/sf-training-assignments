import { data } from "jquery"

const cellClass = "px-5 py-5 border-b border-gray-200 bg-white text-sm"
const ItemClass = "text-gray-900 whitespace-no-wrap"
const titleClass = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider" 
const buttonClass = "mx-1 bg-blue-700 py-1 px-3 my-2 rounded-full text-white hover:text-gray-500 text-sm"
const inputClass = "box-content w-16 px-1 bg-blue-200 py-1 rounded-md"
let users:any = null;
//create a CRUD classtrin

//user roles 
enum Role {
    SUPER_ADMIN,
    ADMIN,
    SUBSCRIBER
}

//user interface
interface User {
    firstName : string;
    middleName : string;
    lastName:string;
    email:string;
    phone:string;
    address:string;
    role:Role
}


//generic CRUD class
class CRUD <T>{

    //read
    items:Array<T>;

    constructor(){
        this.items = [];
    }

    //create 
    create(e:T):void{
        this.items.push(e)
    }

    //update
    update(i:number,e:T){
        console.log(e);
        this.items[i] = e;
        renderTable();
    }

    //delete
    delete(i:number):void{
        this.items.splice(i,1);
        renderTable();
    }

}

//initial data fetching and setting
$(document).ready(()=>{
    console.log("ready")
    
    $("#loadBtn").click(async ()=>{

        $("table").html("");
        //show loader when fetching
        $("#loader").css("display","block");
        try{
            const data = await fetch("data.json");
            const finalData:Array<User> = await data.json();
            $("#loader").css("display","none");
            $("#loadBtn").html("Reload Data")
            
            users = new CRUD<User>()
            finalData.forEach(e=>{
                // e.role = selectRole(e.role);
                users.create(e);
            })
            renderTable();

            //show the table
            $("table").css("display","block");
            console.log(finalData);
        }
        catch(err){
            $("#loader").css("display","none");
    
            console.log(err)
        }
    })
})
console.log("hello worlda");
//helper functions for DOM
function saveInit(i:number){

    //iniilaize data which needs to be saved
    const roleInput = Number($(`#i_role${i}`).val())
    const e:User = {
        firstName:$(`#i_fName${i}`).val()?.toString()||"",
        middleName:$(`#i_mName${i}`).val()?.toString()||"",
        lastName:$(`#i_lName${i}`).val()?.toString()||"",
        email:$(`#i_email${i}`).val()?.toString()||"",
        phone:$(`#i_phone${i}`).val()?.toString()||"",
        address:$(`#i_address${i}`).val()?.toString()||"",
        role:roleInput==0?Role.SUPER_ADMIN:roleInput==1?Role.ADMIN:Role.SUBSCRIBER
    }
    //update the user
    users.update(i,e);
}

function cancel(i:number){
    $("table").find(`tr[id$="row${i}"]`).html(addRow({type:"data",e:users.items[i],i}))
}

function edit(i:number){
    $("table").find(`tr[id$="row${i}"]`).html(addRow({type:"input",e:users.items[i],i}));
}

function renderTable(){
    $("table").html(addRow({type:"title"}));
    users.items.forEach((e:User,i:number)=>{
        $("table").append(`<tr id="row${i}">`+addRow({type:"data",e,i})+`</tr>`);
    })
}

function addRow({type,e,i}:{type:string,e?:User,i?:number}):string{
    if(type=="data"&&e){
        return `
        <td class="${cellClass}">${e.firstName}</td>
        <td class="${cellClass}">${e.middleName}</td>
        <td class="${cellClass}">${e.lastName}</td>
        <td class="${cellClass}">${e.email}</td>
        <td class="${cellClass}">${e.phone}</td>
        <td class="${cellClass}">${e.address}</td>
        <td class="${cellClass}">${Role[e.role]}</td>
        <td class="${cellClass}">
            <button class="${buttonClass}" onClick="edit(${i})">edit</button>
            <button class="${buttonClass}" onClick="users.delete(${i})" >delete</button>
        </td>`
    }
    
    if(type=="input"&&e){
        
        console.log('input',e);
        return `
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_fName${i}" value="${e.firstName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_mName${i}" value="${e.middleName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_lName${i}" value="${e.lastName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_email${i}" value="${e.email}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_phone${i}" value="${e.phone}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_address${i}" value="${e.address}" type=""text /></td>
        <td class="${cellClass}" >
            <select id="i_role${i}">
                <option value="0" ${e.role==0?'selected':""} >${Role[0]}</option>
                <option value="1" ${e.role==1?'selected':""} >${Role[1]}</option>
                <option value="2" ${e.role==2?'selected':""} >${Role[2]}</option>
            </select>
        </td>
        <td class="${cellClass}" >
            <button class="${buttonClass}" onClick="saveInit(${i})">save</button> 
            <button class="${buttonClass}" onClick="cancel(${i})">cancel</button>
        </td>`
    }

    if(type=="title"){
        return`
        <tr>
            <th class="${titleClass}">firstName</th>
            <th class="${titleClass}">middleName</th>
            <th class="${titleClass}">lastName</th>
            <th class="${titleClass}">email</th>
            <th class="${titleClass}">number</th>
            <th class="${titleClass}">address</th>
            <th class="${titleClass}">role</th>
            <th class="${titleClass}">options</th>
        </tr>
        `
    }
    return "";
}




