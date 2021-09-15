var stockData = [];

function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ",";
    lineDelimiter = args.lineDelimiter || "\n";
    keys = Object.keys(data[0]);
    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
        cntr = 0;
        keys.forEach(function (key) {
            if (cntr > 0) {
                result += columnDelimiter;
            }
            item[key] = item[key].trim();
            if (item[key].includes("—") || item[key].includes(" ")) {
                item[key] = "-";
            }
            result += item[key];
            cntr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {
    storeLeft();
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: stockData
    });

    
    if (csv == null) return;

    filename = args.filename || "export.csv";

    if((window.navigator.userAgent.indexOf("Edge") > -1) || (window.navigator.userAgent.indexOf("MSIE") > -1)){
        var newBlob = new Blob([csv], {type: ""})
        navigator.msSaveOrOpenBlob(newBlob, filename);
        return;
    }

    if (!csv.match(/^data:text\/csv/i)) {
        csv = "data:text/csv;charset=utf-8," + csv;
    }

    

    data = encodeURI(csv);

    link = document.createElement("a");

    link.setAttribute("href", data);
    link.setAttribute("download", filename);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function storeLeft() {
    var top = $("th").children();
    var two = $(document.querySelectorAll(firstSelect)[0]).text().trim();
    var three = $(document.querySelectorAll(secondSelect)[0]).text().trim();
    var hold2 = two.split("\n");
    var hold3 = three.split("\n");
    var column2 = [];
    var column3 = [];
    for (var i in hold2) {
        hold2[i] = hold2[i].trim();
        if (hold2[i] == "") {
            delete hold2[i];
        }
        if (hold2[i] != undefined) {
            column2.push(hold2[i]);
        }
    }
    for (var i in hold3) {
        hold3[i] = hold3[i].trim();
        if (hold3[i] == "") {
            delete hold3[i];
        }
        if (hold3[i] != undefined) {
            column3.push(hold3[i]);
        }
    }
    
    stockData = [];
    var bottom = $("td").find(".ph");
    var arr1 = [];
    var arr2 = [];
    var total;
    var first = [];
    var second = [];
    for (var i = 0; i < top.length; i++) {
        arr1.push(top[i].textContent);
    }
    for (var i = 0; i < bottom.length; i++) {
        arr2.push(bottom[i].textContent);
    }
    total = arr2;
    $(firstSelect).each(function () {
        first.push($(this).text());
    });
    $(secondSelect).each(function () {
        second.push($(this).text());
    });
    var uno = arr1[0].trim();
    var dos = column2[0];
    var tres = column3[0];
    if (column2.length == 1 && column3.length == 1) {
        for (var i = 0; i < column2.length - 1; i++) {
            stockData.push({
                [uno]: "" + arr1[i + 1] + "",
                [dos]: "",
                [tres]: ""
            });
        }
    } else if (column2.length == 1 && secondSelect != ".Empty") {
        for (var i = 0; i < column2.length - 1; i++) {
            stockData.push({
                [uno]: "" + arr1[i + 1] + "",
                [dos]: "",
                [tres]: "" + column3[i + 1]
            });
        }
    } else if (secondSelect != ".Empty") {
        for (var i = 0; i < column2.length - 1; i++) {
            stockData.push({
                [uno]: "" + arr1[i + 1] + "",
                [dos]: "" + column2[i + 1] + "",
                [tres]: "" + column3[i + 1] + ""
            });
        }
    } else {
        for (var i = 0; i < column2.length - 1; i++) {
            stockData.push({
                [uno]: "" + arr1[i + 1] + "",
                [dos]: "" + column2[i + 1] + "",
                [tres]: ""
            });
        }
    }

    for (var i = 0; i < first.length - 1; i++) {
        stockData.push({
            [uno]: "" + total[i] + "",
            [dos]: "" + first[i + 1] + "",
            [tres]: " " + second[i + 1] + ""
        });
    }
}

downloadCSV({
    filename: "HPE_Synergy_Custom_SPP.csv"
});