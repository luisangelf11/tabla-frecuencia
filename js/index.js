const $n = document.getElementById("n"),
    $xmax = document.getElementById("xmax"),
    $xmin = document.getElementById("xmin"),
    $NC = document.getElementById("NC"),
    $IC = document.getElementById("IC"),
    $tableData = document.getElementById("table-data"),
    $graph = document.getElementById("graph");

let chartData = [];

function GenerateGraph() {
    console.log(chartData)
    chartData.forEach(element => {
        const $bar = document.createElement('div');
        $bar.classList.add('container-bar');
        $bar.innerHTML = `
        <p>${element.data}</p>
            <div class="bar" style="height: ${element.data}0px;"></div>
            <p class="fw-bold" style="font-size: 10px">${element.class}</p>
        `;
        $graph.appendChild($bar);
    });
}

function GenerateTable() {
    //Data Convert
    let n = parseFloat($n.value),
        xmax = parseFloat($xmax.value),
        xmin = parseFloat($xmin.value),
        NC = parseFloat($NC.value),
        IC = parseFloat($IC.value);
    //console.log(n, xmax, xmin, NC, IC);
    //Vars Table
    let fi = 0,
        fr = 0,
        Fi = 0,
        Fr = 0,
        Xi = 0,
        min = 0,
        max = 0,
        fiNext = 0,
        frNext = 0,
        classTable = "";
    //Clear the tbody
    $tableData.innerHTML = "";
    $graph.innerHTML = "";
    chartData = [];
    //Loop for create the rows
    for (let i = 1; i <= NC; i++) {
        const $tr = document.createElement("tr");
        if (i === 1) {
            //FIRST ROW
            min = xmin;
            max = min + IC;
            classTable = `${min} - ${max}`;
            fi = parseFloat(prompt(`¿Cuantos elementos pertenecen al intervalo (${classTable})?`));
            fr = fi / n;
            Fi = fi;
            Fr = fr;
            Xi = (min + max) / 2;
            fiNext = Fi;
            frNext = Fr;
            // console.log(classTable, fi, fr, Fi, Fr, Xi, fiNext, frNext);
        } else {
            //OTHER ROWS
            min = max;
            max = min + IC;
            classTable = `${min} - ${max}`;
            fi = parseFloat(prompt(`¿Cuantos elementos pertenecen al intervalo (${classTable})?`));
            fr = fi / n;
            Fi = fiNext + fi;
            Fr = frNext + fr;
            Xi = (min + max) / 2;
            fiNext = Fi;
            frNext = Fr;
            //console.log(classTable, fi, fr, Fi, Fr, Xi, fiNext, frNext);
        }
        const objectClass = {
            class: classTable,
            data: fi
        }
        chartData.push(objectClass);
        $tr.innerHTML = `
            <td>${classTable}</td>
            <td>${fi}</td>
            <td>${fr.toFixed(4)}</td>
            <td>${Fi}</td>
            <td>${Fr.toFixed(4)}</td>
            <td>${Xi}</td>
        `;
        $tableData.appendChild($tr);
    }
}

document.addEventListener("submit", (e) => {
    e.preventDefault();
    GenerateTable();
    GenerateGraph();
})