document.addEventListener('DOMContentLoaded', function() {
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter'
    };

    var data = [trace1];
    var layout = {
        title: 'Sample Interactive Plot'
    };

    Plotly.newPlot('plot1', data, layout);
});

function performBisection() {
    const f = new Function("x", "return " + document.getElementById('functionInput').value);
    let a = parseFloat(document.getElementById('aInput').value);
    let b = parseFloat(document.getElementById('bInput').value);
    let tolerance = parseFloat(document.getElementById('toleranceInput').value);
    let resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `<h2>Results</h2>`;

    if (f(a) * f(b) >= 0) {
        resultsElement.innerHTML += '<p>No root found or bad initial guess.</p>';
        return;
    }

    let c = a;
    while ((b - a) / 2 > tolerance) {
        c = (a + b) / 2;
        if (f(c) == 0) break;
        else if (f(c) * f(a) < 0) b = c;
        else a = c;

        resultsElement.innerHTML += `<p>a: ${a}, b: ${b}, c: ${c}, f(c): ${f(c)}</p>`;
    }
    resultsElement.innerHTML += `<p>Root is approximately at: ${c}</p>`;
}

function performBisection() {
    const f = new Function("x", "return " + document.getElementById('functionInput').value);
    let a = parseFloat(document.getElementById('aInput').value);
    let b = parseFloat(document.getElementById('bInput').value);
    let tolerance = parseFloat(document.getElementById('toleranceInput').value);
    let resultsElement = document.getElementById('results');
    let plotElement = document.getElementById('plot');
    resultsElement.innerHTML = `<h2>Results</h2>`;

    if (f(a) * f(b) >= 0) {
        resultsElement.innerHTML += '<p>No root found or bad initial guess.</p>';
        return;
    }

    let dataX = [];
    let dataY = [];
    for (let x = a - (b-a)*0.5; x <= b + (b-a)*0.5; x += (b-a)/50) {
        dataX.push(x);
        dataY.push(f(x));
    }

    Plotly.newPlot(plotElement, [{
        x: dataX,
        y: dataY,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)'
    }], {
        title: 'Function Plot'
    });

    let c = a;
    while ((b - a) / 2 > tolerance) {
        c = (a + b) / 2;
        if (f(c) == 0) break;
        else if (f(c) * f(a) < 0) b = c;
        else a = c;

        resultsElement.innerHTML += `<p>a: ${a}, b: ${b}, c: ${c}, f(c): ${f(c)}</p>`;
    }
    resultsElement.innerHTML += `<p>Root is approximately at: ${c}</p>`;
}