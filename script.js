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
    // Define the function, get input values and the results container
    const f = new Function("x", "return " + document.getElementById('functionInput').value);
    let a = parseFloat(document.getElementById('aInput').value);
    let b = parseFloat(document.getElementById('bInput').value);
    let tolerance = parseFloat(document.getElementById('toleranceInput').value);
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<h2>Results</h2>'; // Clear previous results


    // Check if the initial guesses bracket the root
    if (f(a) * f(b) >= 0) {
        resultsContainer.innerHTML += '<p>No root found or bad initial guess.</p>';
        return;
    }


    // Start the iteration process
    let c;
    do {
        c = (a + b) / 2;
        let resultText = `<p>a: ${a}, b: ${b}, c: ${c}, f(c): ${f(c)}</p>`;


        // Create a new container for each plot
        let plotDiv = document.createElement('div');
        plotDiv.className = 'plot';
        resultsContainer.appendChild(plotDiv); // Append the plot container to the results container


        // Display the current iteration result
        let iterationResultDiv = document.createElement('div');
        iterationResultDiv.innerHTML = resultText;
        resultsContainer.appendChild(iterationResultDiv); // Append the iteration result to the results container


        // Create the plot for the current iteration
        createPlot(f, a, b, c, plotDiv);


        // Prepare for next iteration or break if root is found
        if (f(c) === 0 || Math.abs(f(c)) < tolerance) {
            break;
        } else if (f(a) * f(c) < 0) {
            b = c;
        } else {
            a = c;
        }
    } while ((b - a) / 2 > tolerance);


    // Display the approximate root after completion
    resultsContainer.innerHTML += `<p>Root is approximately at: ${c}</p>`;
}



function createPlot(f, a, b, c) {
    // Create a unique ID for each plot to avoid duplicates
    let uniqueId = `plot-${Date.now()}-${Math.random().toString().slice(2)}`;
    let plotDiv = document.createElement('div');
    plotDiv.id = uniqueId;
    document.getElementById('results').appendChild(plotDiv); // Append to the results container

    // Generate data for the function plot
    let traceFunction = {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)'
    };
    
    // Generate the range of x values
    let step = (b - a) / 100;
    for (let x = a - 1; x <= b + 1; x += step) {
        traceFunction.x.push(x);
        traceFunction.y.push(f(x));
    }
    
    // Create trace for the 'a' line
    let traceA = {
        x: [a, a],
        y: [Math.min(...traceFunction.y), Math.max(...traceFunction.y)],
        mode: 'lines',
        type: 'scatter',
        name: 'a',
        line: {color: 'green'}
    };
    
    // Create trace for the 'b' line
    let traceB = {
        x: [b, b],
        y: [Math.min(...traceFunction.y), Math.max(...traceFunction.y)],
        mode: 'lines',
        type: 'scatter',
        name: 'b',
        line: {color: 'blue'}
    };
    
    // Create trace for the 'c' line
    let traceC = {
        x: [c, c],
        y: [Math.min(...traceFunction.y), Math.max(...traceFunction.y)],
        mode: 'lines',
        type: 'scatter',
        name: 'c (midpoint)',
        line: {color: 'red'}
    };

    let layout = {
        title: `Function Plot at c = ${c}`,
        hovermode: 'closest',  // Enable hover by default
        xaxis: {
            title: 'x',
            range: [a - 1, b + 1]
        },
        yaxis: {
            title: 'f(x)',
            range: [Math.min(...traceFunction.y), Math.max(...traceFunction.y)]
        }
    };
    
    // Plot using Plotly
    Plotly.newPlot(uniqueId, [traceFunction, traceA, traceB, traceC], layout);
}

