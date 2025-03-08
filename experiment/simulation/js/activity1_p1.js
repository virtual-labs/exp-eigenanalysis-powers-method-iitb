function activity1_p1() {
    let btn = (document.getElementById('it1-btn2'));
    btn && btn.remove();
    internal_calculation3();
    let btn_text = get_collapse_btn_text('Iteration 2', 'act1-it2-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' id='act1-it2-div'>
      <div id="it2-matrix1-div">
         <div class="row justify-content-center" style="align-items:center;" >
            <div id="act1-it2-tb-box2" class="col-md-4" >
            <br>
            </div>
            <p class="col-md-1"><br>$$\\times$$</p>
            <div class="col-md-6" style="display:inline-flex; align-items:center; justify-content:center ">
               <div class="row">
                  <p>Eigen vector</p>
                  <table>
                     <tbody>
                        <tr>
                           <td>
                              <input type='number' id='it2-1-eigV1-inp'    class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it2-1-eigV2-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it2-1-eigV3-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               
               <p style="margin: 0 20px;">=</p>
               <div class="row">
                  <p>Improved eigen vector</p>
                  <table>
                     <tbody>
                        <tr>
                           <td>
                              <input type='number' id='it2-rsltV1-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it2-rsltV2-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it2-rsltV3-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='iteration2_verify1();' id='it2-vf-btn1'>Verify</button> 
      </div>
   </div>`;
    maindiv.innerHTML += text;
    let tb_box = (document.getElementById('act1-it2-tb-box2'));
    let mat = new Matrix_Without_String('', table_data1, tb_box);
    mat.load_matrix();
    // hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act1-it2-div');
    }, 150);
}
function iteration2_verify1() {
    console.log(eigenVector);
    console.log(resultVector);
    for (let i = 0; i < 3; i++) {
        let inp = (document.getElementById(`it2-1-eigV${i + 1}-inp`));
        if (!verify_values(parseFloat(inp.value), eigenVector[i])) {
            inp.style.border = '1px solid red';
            alert('Incorrect value');
            return;
        }
        else {
            inp.style.border = '1px solid #ced4da';
            inp.disabled = true;
        }
    }
    for (let i = 0; i < 3; i++) {
        let inp = (document.getElementById(`it2-rsltV${i + 1}-inp`));
        if (!verify_values(parseFloat(inp.value), resultVector[i][0])) {
            inp.style.border = '1px solid red';
            alert('Incorrect value');
            return;
        }
        else {
            inp.style.border = '1px solid #ced4da';
            inp.disabled = true;
        }
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('it2-matrix1-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <div>
         $$
            \\begin{bmatrix}
            40 & -20 & 0 \\\\
            -20 & 40 & -20 \\\\
            0 & -20 & 40
            \\end{bmatrix}

            \\times

            \\begin{bmatrix}
            ${eigenVector[0]} \\\\
            ${eigenVector[1]} \\\\
            ${eigenVector[2]} 
            \\end{bmatrix}
            
            =

            \\begin{bmatrix}
            ${resultVector[0][0]} \\\\
            ${resultVector[1][0]} \\\\
            ${resultVector[2][0]} 
            \\end{bmatrix}
         $$
      </div>
      <button class='btn btn-info btn-sm std-btn' onclick='internal_calculation4();' id='it2-btn1'>Next</button> 
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function internal_calculation3() {
    console.log(k);
    resultVector = [];
    // table_data1 = [
    // 	[k, -k / 2, 0],
    // 	[-k / 2, k, -k / 2],
    // 	[0, -k / 2, k],
    // ];
    resultVector = matrix_multiplication(table_data1, convert_1d_to_2d_matrix(eigenVector));
    console.log(table_data1);
    console.log(resultVector);
}
function internal_calculation4() {
    let btn = (document.getElementById('it2-btn1'));
    let div = (document.getElementById('act1-it2-div'));
    btn && btn.remove();
    eigenValues.push(getMaxAbsFromArray(convert_2d_to_1d_vector(resultVector)));
    eigenVector = resultVector.map((items) => {
        return items[0] / eigenValues[1];
    });
    eigenVectors.push(eigenVector);
    console.log(eigenValues);
    console.log(eigenVectors);
    div.innerHTML += `
   <br>
   <p style="text-align:left;">Normalizing by the largest element value.</p>
   <div id="it2-matrix2-div">
         <div class="row justify-content-center" style="align-items:center;" >
            <div id="act1-it2-tb-box3" class="col-sm-3" >
            </div>
            <p class="col-sm-1">=</p>
            <div class="col-sm-6" style="display:inline-flex; align-items:center; justify-content:center ">
               <div class="row col-6 justify-content-center ">
                  <p>Eigen value</p>
                  <input type='number' style="width:80%" id='it2-eigVal-inp' class='form-control fs-16px' />
               </div>
               <div class="row col-6 justify-content-center">
                  <p>Eigen vector</p>
                  <table>
                     <tbody>
                        <tr>
                           <td>
                              <input style="margin:0 auto; width:80%" type='number' id='it2-2-eigV1-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input style="margin:0 auto; width:80%" type='number' id='it2-2-eigV2-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input style="margin:0 auto; width:80%" type='number' id='it2-2-eigV3-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='iteration2_verify2();' id='it2-vf-btn2'>Verify</button> 
      </div>
   `;
    let tb_box = (document.getElementById('act1-it2-tb-box3'));
    let mat = new Matrix_Without_String('', resultVector, tb_box);
    mat.load_matrix();
}
function iteration2_verify2() {
    let eigVal_inp = (document.getElementById('it2-eigVal-inp'));
    console.log(eigenValues);
    console.log(eigenVectors);
    if (!verify_values(parseFloat(eigVal_inp.value), eigenValues[1])) {
        eigVal_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        eigVal_inp.style.border = '1px solid #ced4da';
        eigVal_inp.disabled = true;
    }
    for (let i = 0; i < 3; i++) {
        let inp = (document.getElementById(`it2-2-eigV${i + 1}-inp`));
        if (!verify_values(parseFloat(inp.value), eigenVector[i])) {
            inp.style.border = '1px solid red';
            alert('Incorrect value');
            return;
        }
        else {
            inp.style.border = '1px solid #ced4da';
            inp.disabled = true;
        }
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('it2-matrix2-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <div>
         $$
            \\begin{bmatrix}
            ${resultVector[0]} \\\\
            ${resultVector[1]} \\\\
            ${resultVector[2]}
            \\end{bmatrix}
            =

            ${eigenValues[1]}
            \\begin{bmatrix}
            ${eigenVector[0]}\\\\
            ${eigenVector[1]}\\\\
            ${eigenVector[2]}
            \\end{bmatrix}
         $$
      </div>
      <button class='btn btn-info btn-sm std-btn' onclick='internal_calculation5();' id='it2-btn2'>Next</button> 
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function internal_calculation5() {
    for (let i = 2; i < 10; i++) {
        resultVector = [];
        resultVector = matrix_multiplication(table_data1, convert_1d_to_2d_matrix(eigenVector));
        eigenValues.push(getMaxAbsFromArray(convert_2d_to_1d_vector(resultVector)));
        eigenVector = resultVector.map((items) => {
            return items[0] / eigenValues[i];
        });
        eigenVectors.push(eigenVector);
    }
    load_eigen_table();
}
function load_eigen_table() {
    let btn = (document.getElementById('it2-btn2'));
    btn && btn.remove();
    let div = (document.getElementById('act1-it2-div'));
    div.innerHTML += `
   <br>
   <div id="eigen-table" class='table-responsive'>
      <table class='table table-stripped' style="border: 1px solid black;">
         <thead class='table-dark'>
            <tr>
               <th style="border: 1px solid white;">Eigen Value</th>
               <th style="border: 1px solid white;">Eigen Vector</th>
            </tr>
         </thead>
         <tbody id="eigen-table-body">
         </tbody>
      </table>
   </div>
   <br>
   <button class='btn btn-info btn-sm std-btn' onclick='act1_complete();' id='it2-btn3'>Next</button> 
   `;
    // let table_div: HTMLDivElement = <HTMLDivElement>(
    // 	document.getElementById('eigen-table')
    // );
    let tbody = (document.getElementById('eigen-table-body'));
    for (let i = 0; i < eigenValues.length; i++) {
        tbody.innerHTML += `
         <tr>
            <td style="align-content: center;border: 1px solid black;">${parseFloat(eigenValues[i].toFixed(4))}</td>
            <td style="border: 1px solid black;">
               <div id="eigen-vec-${i}">
               
               </div>
            </td>
         </tr>
      `;
        let tb_box = (document.getElementById(`eigen-vec-${i}`));
        let mat = new Matrix_Without_String('', convert_1d_to_2d_matrix(eigenVectors[i]), tb_box);
        mat.load_matrix();
    }
}
function act1_complete() {
    let btn = (document.getElementById('it2-btn3'));
    btn && btn.remove();
    alert('Experiment Completed');
}
// activity1_p1();
//# sourceMappingURL=activity1_p1.js.map