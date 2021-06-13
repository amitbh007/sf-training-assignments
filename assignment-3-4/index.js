"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cellClass = "px-5 py-5 border-b border-gray-200 bg-white text-sm";
var ItemClass = "text-gray-900 whitespace-no-wrap";
var titleClass = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider";
var buttonClass = "mx-1 bg-blue-700 py-1 px-3 my-2 rounded-full text-white hover:text-gray-500 text-sm";
var inputClass = "box-content w-16 px-1 bg-blue-200 py-1 rounded-md";
var users = null;
//create a CRUD classtrin
//user roles 
var Role;
(function (Role) {
    Role[Role["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["SUBSCRIBER"] = 2] = "SUBSCRIBER";
})(Role || (Role = {}));
//generic CRUD class
var CRUD = /** @class */ (function () {
    function CRUD() {
        this.items = [];
    }
    //create 
    CRUD.prototype.create = function (e) {
        this.items.push(e);
    };
    //update
    CRUD.prototype.update = function (i, e) {
        console.log(e);
        this.items[i] = e;
        renderTable();
    };
    //delete
    CRUD.prototype.delete = function (i) {
        this.items.splice(i, 1);
        renderTable();
    };
    return CRUD;
}());
//initial data fetching and setting
$(document).ready(function () {
    console.log("ready");
    $("#loadBtn").click(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data_1, finalData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $("table").html("");
                    //show loader when fetching
                    $("#loader").css("display", "block");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("data.json")];
                case 2:
                    data_1 = _a.sent();
                    return [4 /*yield*/, data_1.json()];
                case 3:
                    finalData = _a.sent();
                    $("#loader").css("display", "none");
                    $("#loadBtn").html("Reload Data");
                    users = new CRUD();
                    finalData.forEach(function (e) {
                        // e.role = selectRole(e.role);
                        users.create(e);
                    });
                    renderTable();
                    //show the table
                    $("table").css("display", "block");
                    console.log(finalData);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    $("#loader").css("display", "none");
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
console.log("hello worlda");
//helper functions for DOM
function saveInit(i) {
    var _a, _b, _c, _d, _e, _f;
    //iniilaize data which needs to be saved
    var roleInput = Number($("#i_role" + i).val());
    var e = {
        firstName: ((_a = $("#i_fName" + i).val()) === null || _a === void 0 ? void 0 : _a.toString()) || "",
        middleName: ((_b = $("#i_mName" + i).val()) === null || _b === void 0 ? void 0 : _b.toString()) || "",
        lastName: ((_c = $("#i_lName" + i).val()) === null || _c === void 0 ? void 0 : _c.toString()) || "",
        email: ((_d = $("#i_email" + i).val()) === null || _d === void 0 ? void 0 : _d.toString()) || "",
        phone: ((_e = $("#i_phone" + i).val()) === null || _e === void 0 ? void 0 : _e.toString()) || "",
        address: ((_f = $("#i_address" + i).val()) === null || _f === void 0 ? void 0 : _f.toString()) || "",
        role: roleInput == 0 ? Role.SUPER_ADMIN : roleInput == 1 ? Role.ADMIN : Role.SUBSCRIBER
    };
    //update the user
    users.update(i, e);
}
function cancel(i) {
    $("table").find("tr[id$=\"row" + i + "\"]").html(addRow({ type: "data", e: users.items[i], i: i }));
}
function edit(i) {
    $("table").find("tr[id$=\"row" + i + "\"]").html(addRow({ type: "input", e: users.items[i], i: i }));
}
function renderTable() {
    $("table").html(addRow({ type: "title" }));
    users.items.forEach(function (e, i) {
        $("table").append("<tr id=\"row" + i + "\">" + addRow({ type: "data", e: e, i: i }) + "</tr>");
    });
}
function addRow(_a) {
    var type = _a.type, e = _a.e, i = _a.i;
    if (type == "data" && e) {
        return "\n        <td class=\"" + cellClass + "\">" + e.firstName + "</td>\n        <td class=\"" + cellClass + "\">" + e.middleName + "</td>\n        <td class=\"" + cellClass + "\">" + e.lastName + "</td>\n        <td class=\"" + cellClass + "\">" + e.email + "</td>\n        <td class=\"" + cellClass + "\">" + e.phone + "</td>\n        <td class=\"" + cellClass + "\">" + e.address + "</td>\n        <td class=\"" + cellClass + "\">" + Role[e.role] + "</td>\n        <td class=\"" + cellClass + "\">\n            <button class=\"" + buttonClass + "\" onClick=\"edit(" + i + ")\">edit</button>\n            <button class=\"" + buttonClass + "\" onClick=\"users.delete(" + i + ")\" >delete</button>\n        </td>";
    }
    if (type == "input" && e) {
        console.log('input', e);
        return "\n        <td class=\"" + cellClass + "\" ><input autocomplete=\"off\" class=\"" + inputClass + "\" id=\"i_fName" + i + "\" value=\"" + e.firstName + "\" type=\"\"text /></td>\n        <td class=\"" + cellClass + "\" ><input autocomplete=\"off\" class=\"" + inputClass + "\" id=\"i_mName" + i + "\" value=\"" + e.middleName + "\" type=\"\"text /></td>\n        <td class=\"" + cellClass + "\" ><input autocomplete=\"off\" class=\"" + inputClass + "\" id=\"i_lName" + i + "\" value=\"" + e.lastName + "\" type=\"\"text /></td>\n        <td class=\"" + cellClass + "\" ><input autocomplete=\"off\" class=\"" + inputClass + "\" id=\"i_email" + i + "\" value=\"" + e.email + "\" type=\"\"text /></td>\n        <td class=\"" + cellClass + "\" ><input autocomplete=\"off\" class=\"" + inputClass + "\" id=\"i_phone" + i + "\" value=\"" + e.phone + "\" type=\"\"text /></td>\n        <td class=\"" + cellClass + "\" ><input autocomplete=\"off\" class=\"" + inputClass + "\" id=\"i_address" + i + "\" value=\"" + e.address + "\" type=\"\"text /></td>\n        <td class=\"" + cellClass + "\" >\n            <select id=\"i_role" + i + "\">\n                <option value=\"0\" " + (e.role == 0 ? 'selected' : "") + " >" + Role[0] + "</option>\n                <option value=\"1\" " + (e.role == 1 ? 'selected' : "") + " >" + Role[1] + "</option>\n                <option value=\"2\" " + (e.role == 2 ? 'selected' : "") + " >" + Role[2] + "</option>\n            </select>\n        </td>\n        <td class=\"" + cellClass + "\" >\n            <button class=\"" + buttonClass + "\" onClick=\"saveInit(" + i + ")\">save</button> \n            <button class=\"" + buttonClass + "\" onClick=\"cancel(" + i + ")\">cancel</button>\n        </td>";
    }
    if (type == "title") {
        return "\n        <tr>\n            <th class=\"" + titleClass + "\">firstName</th>\n            <th class=\"" + titleClass + "\">middleName</th>\n            <th class=\"" + titleClass + "\">lastName</th>\n            <th class=\"" + titleClass + "\">email</th>\n            <th class=\"" + titleClass + "\">number</th>\n            <th class=\"" + titleClass + "\">address</th>\n            <th class=\"" + titleClass + "\">role</th>\n            <th class=\"" + titleClass + "\">options</th>\n        </tr>\n        ";
    }
    return "";
}
