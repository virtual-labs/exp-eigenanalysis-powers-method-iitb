let maindiv = (document.getElementById('pannelcreate'));
function activity1() {
    let text = `
    <div class='divide'>
        <div style='margin-top: 2vw;'>
            <br>
            <h4 class="center-text fs-20px fw-600">Eigen Analysis : Power's Method</h4>
            <br>
            <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
        </div>
    </div>`;
    maindiv.innerHTML = text;
    setTimeout(() => {
        MathJax.typeset();
    }, 300);
    internal_calculation1();
}
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text('Iteration 1', 'act1-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' id='act1-div'>
      <div id="act1-tb-box1"></div>
      <br>
      <p style="text-align:left;">
         Using Power's method, find the largest eigen value and eigen vector.
      </p>
      <p style="text-align:left;">
         Take initital guess as 1 for all eigen vector.
      </p>

      

      <div id="it1-matrix1-div">
         <div class="row justify-content-center" style="align-items:center;" >
            <div id="act1-tb-box2" class="col-md-4" >
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
                              <input type='number' id='it1-1-eigV1-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it1-1-eigV2-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it1-1-eigV3-inp' class='form-control fs-16px' />
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
                              <input type='number' id='it1-rsltV1-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it1-rsltV2-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' id='it1-rsltV3-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='iteration1_verify1();' id='it1-vf-btn1'>Verify</button> 
      </div>
   </div>`;
    maindiv.innerHTML += text;
    let tb_box1 = (document.getElementById('act1-tb-box1'));
    let tb_box2 = (document.getElementById('act1-tb-box2'));
    let mat1 = new Matrix_Without_String('', table_data1, tb_box1);
    mat1.load_matrix();
    let mat2 = new Matrix_Without_String('', table_data1, tb_box2);
    mat2.load_matrix();
    // hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
}
function iteration1_verify1() {
    console.log(eigenVector);
    console.log(resultVector);
    for (let i = 0; i < 3; i++) {
        let inp = (document.getElementById(`it1-1-eigV${i + 1}-inp`));
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
        let inp = (document.getElementById(`it1-rsltV${i + 1}-inp`));
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
    let div = (document.getElementById('it1-matrix1-div'));
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
      <button class='btn btn-info btn-sm std-btn' onclick='internal_calculation2();' id='it1-btn1'>Next</button> 
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function internal_calculation1() {
    k = random1(20, 81);
    console.log(k);
    resultVector = [];
    table_data1 = [
        [k, -k / 2, 0],
        [-k / 2, k, -k / 2],
        [0, -k / 2, k],
    ];
    resultVector = matrix_multiplication(table_data1, convert_1d_to_2d_matrix(eigenVector));
    console.log(table_data1);
    console.log(resultVector);
}
function internal_calculation2() {
    let btn = (document.getElementById('it1-btn1'));
    let div = (document.getElementById('act1-div'));
    btn && btn.remove();
    eigenValues.push(getMaxAbsFromArray(convert_2d_to_1d_vector(resultVector)));
    eigenVector = resultVector.map((items) => {
        return items[0] / eigenValues[0];
    });
    eigenVectors.push(eigenVector);
    console.log(eigenValues);
    console.log(eigenVectors);
    div.innerHTML += `
   <br>
   <p style="text-align:left;">Normalizing by the largest element value.</p>
   <div id="it1-matrix2-div">
         <div class="row justify-content-center" style="align-items:center;" >
            <div id="act1-tb-box3" class="col-sm-3" >
            </div>
            <p class="col-sm-1">=</p>
            <div class="col-sm-6" style="display:inline-flex; align-items:center; justify-content:center">
               <div class="row col-6 justify-content-center ">
                  <p>Eigen value</p>
                  <input type='number' style="width:80%"  id='it1-eigVal-inp' class='form-control fs-16px' />
               </div>
               <div class="row col-6 justify-content-center ">
                  <p>Eigen vector</p>
                  <table>
                     <tbody>
                        <tr>
                           <td>
                              <input type='number' style="margin:0 auto; width:80%" id='it1-2-eigV1-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' style="margin:0 auto; width:80%" id='it1-2-eigV2-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <input type='number' style="margin:0 auto; width:80%" id='it1-2-eigV3-inp' class='form-control fs-16px' />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='iteration1_verify2();' id='it1-vf-btn2'>Verify</button> 
      </div>
   `;
    let tb_box = (document.getElementById('act1-tb-box3'));
    let mat = new Matrix_Without_String('', resultVector, tb_box);
    mat.load_matrix();
}
function iteration1_verify2() {
    let eigVal_inp = (document.getElementById('it1-eigVal-inp'));
    console.log(eigenValues);
    console.log(eigenVectors);
    if (!verify_values(parseFloat(eigVal_inp.value), eigenValues[0])) {
        eigVal_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        eigVal_inp.style.border = '1px solid #ced4da';
        eigVal_inp.disabled = true;
    }
    for (let i = 0; i < 3; i++) {
        let inp = (document.getElementById(`it1-2-eigV${i + 1}-inp`));
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
    let div = (document.getElementById('it1-matrix2-div'));
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

            ${eigenValues[0]}
            \\begin{bmatrix}
            ${eigenVector[0]}\\\\
            ${eigenVector[1]}\\\\
            ${eigenVector[2]}
            \\end{bmatrix}
         $$
      </div>
      <button class='btn btn-info btn-sm std-btn' onclick='activity1_p1();' id='it1-btn2'>Next</button> 
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
//gives max absoltue value from 1D array
function getMaxAbsFromArray(ar) {
    if (ar.length == 0) {
        alert("array's length can't be 0");
        return null;
    }
    let maxIndx = 0;
    let maxAbsValue = 0;
    for (let i = 0; i < ar.length; i++) {
        if (Math.abs(ar[i]) > maxAbsValue) {
            maxAbsValue = Math.abs(ar[i]);
            maxIndx = i;
        }
    }
    return ar[maxIndx];
}
activity1();
//# sourceMappingURL=activity1.js.map