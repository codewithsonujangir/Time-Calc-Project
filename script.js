// My Project no. #1



// list variable for input sections (default two section)
let input_section_list = ["section-1", "section-2"];


document.addEventListener("DOMContentLoaded", () => {
    // loop for create input section (default 2 section)
    for (let section of input_section_list) {
        createInputSection(section);
    }
});



// function for add more section
function add_section () {
    const new_section = `section-${input_section_list.length + 1}`;
    input_section_list.push(new_section);
    createInputSection(new_section);
}


// function for remove last section
function remove_section () {
    const removed = input_section_list.pop();
    const remove_el = document.getElementById(removed);
    remove_el.remove();
}





// function for increase value of a specific section and it's time
function incrementValue(el) {
    const input_element = el.parentElement.querySelector("input");
    input_element.value ++;
    // condition for
    if (input_element.className !== "hour") {
        if (input_element.value > 59) {
            input_element.value = 0;
        }
    }
}


// function for decrease value of a specific section and it's time
function decrementValue(el) {
    const input_element = el.parentElement.querySelector("input");
    input_element.value --;
    // condition for limit the value from 0 to infinite
    if (input_element.value < 0) {
        if (input_element.className !== "hour") {
            input_element.value = 59;
        }else {
            input_element.value = 0;
        }
    }
}






// function for create a input section
function createInputSection (section_id) {
    // get form element
    const form_el = document.querySelector("form");
    // create input section div element
    const input_section_el = document.createElement("div");
    // set class and id attribute
    input_section_el.setAttribute("class", "input-section");
    input_section_el.setAttribute("id", section_id);
    // append it to container div
    form_el.append(input_section_el);
    
    const time_section_list = ["hour", "minute", "second"];
    // loop
    for (let time of time_section_list) {
        // create time element of div
        const time_el = document.createElement("div");
        // set class attribute for it
        time_el.setAttribute("class", `${time}-section`);
        // append it to input_section_el
        input_section_el.append(time_el);
        // create 4 element
        const increment_el = document.createElement("div");
        const decrement_el = document.createElement("div");
        const input_el = document.createElement("input");
        const p_el = document.createElement("p");
        // set class attribute for div
        increment_el.setAttribute("class", "increment-section");
        decrement_el.setAttribute("class", "decrement-section");
        // set function attribute for div
        increment_el.setAttribute("onclick", "incrementValue(this)");
        decrement_el.setAttribute("onclick", "decrementValue(this)");
        // add text for div
        increment_el.innerText = "+";
        decrement_el.innerText = "-";
        // ser attribute for input
        input_el.setAttribute("type", "number");
        input_el.setAttribute("value", "00");
        input_el.setAttribute("class", time);
        input_el.setAttribute("name", `${section_id}-${time}`);
        // set attribute for p
        p_el.setAttribute("class", "time-label");
        // add text for p
        if (time === "hour") {
            p_el.innerText = "HH";
        }else if (time === "minute") {
            p_el.innerText = "MM";
        }else {
            p_el.innerText = "SS";
        }
        // append 4 elements in time_el
        time_el.append(increment_el);
        time_el.append(input_el);
        time_el.append(decrement_el);
        time_el.append(p_el);
    }
}





// function for calculate the final result and show
function calculate () {
    const form_el = document.querySelector("form");
    const form_data = new FormData (form_el);
    
    let hour_list = [];
    let minute_list = [];
    let second_list = [];
    
    for (let data of form_data) {
        if (data[0].includes("hour")) {
            hour_list.push(parseInt(data[1]));
        }else if (data[0].includes("minute")) {
            minute_list.push(parseInt(data[1]));
        }else if (data[0].includes("second")) {
            second_list.push(parseInt(data[1]));
        }
    }
    
    const total_hours = sumArray(hour_list);
    const total_minutes = sumArray(minute_list);
    const total_seconds = sumArray(second_list);
    
    const result = organizeTime(total_hours, total_minutes, total_seconds);
    
    // get result element
    const result_el = document.getElementById("result");
    result_el.innerText = result;
}





// function for add all elements in a specific array. In this case (arr)
function sumArray(arr) {
    let sum_arr = 0;
    for (let i = 0; i < arr.length; i++) {
        sum_arr += arr[i];
    }
    return sum_arr;
}




// function for format time and return as string
function organizeTime(total_hours, total_minutes, total_seconds) {
    // Calculate the total time in seconds
    let total_seconds_all = total_hours * 3600 + total_minutes * 60 + total_seconds;

    // Calculate hours, minutes, and seconds
    let hours = Math.floor(total_seconds_all / 3600);
    let remaining_seconds = total_seconds_all % 3600;
    let minutes = Math.floor(remaining_seconds / 60);
    let seconds = remaining_seconds % 60;

    // Format the hours, minutes, and seconds with leading zeros if necessary
    let formatted_hours = hours < 10 ? '0' + hours : hours;
    let formatted_minutes = minutes < 10 ? '0' + minutes : minutes;
    let formatted_seconds = seconds < 10 ? '0' + seconds : seconds;

    // Return the organized time as a string
    return `${formatted_hours}:${formatted_minutes}:${formatted_seconds}`;
}







// Hope you liked this code.
// I have written a post for this code. You can checkout if you want.
// Please let me know in the comments so I can improve it further.










