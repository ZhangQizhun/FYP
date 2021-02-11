
// various variables to be declared
var layer1 = new Layer();


var tc1 = new Path();
tc1.strokeColor = 'black';
var tc2 = new Path();
tc2.strokeColor = 'black';
var tc3 = new Path();
tc3.strokeColor = 'black';
var tc4 = new Path();
tc4.strokeColor = 'black';
var speed = 3;
var scene = 0;

initial_destination = new Point(300,350);
destination = new Point(300, 350);
var cur_frame= [0];
var flag = [0];
var number_text = new Group();
var nth = '';
var height = 20;
var clocklength = 8;
var risedelay =13;
var stretch = 40;
var amount=0;
var changeindex = [4,5,8,9,12,13,16,17,20,21,24,25,28,29,32,33,36,37]
var input1 = "111111111"

//dictionaries with significant segment numbers of paths
PointText.prototype.wordwrap=function(max,txt){
    this.content = '';
    var lines=[];
    var space=-1;
    times=0;
    function cut(){
        for(var i=0;i<txt.length;i++){
            (txt[i]==' ')&&(space=i);
            if(i>=max){
                (space==-1||txt[i]==' ')&&(space=i);
                if(space>0){lines.push(txt.slice((txt[0]==' '?1:0),space));}
                txt=txt.slice(txt[0]==' '?(space+1):space);
                space=-1;
                break;
                }}check();}
    function check(){if(txt.length<=max){lines.push(txt[0]==' '?txt.slice(1):txt);txt='';}else if(txt.length){cut();}return;}
    check();
    return this.content=lines.join('\n');
}

//function to push coordinates into arrays
function fill(num, x, y) {
    if(num==0){
       c_array[0].push(x);
       c_array[1].push(y);
    }
    if(num==1){
        w_array[0].push(x);
        w_array[1].push(y);
     }
}

// draw_address_box(0, set_2, coordinate_1, '00000000', 'Reg Addr', 0);
//drawbox(control, num, coordinate, 120, group, content, label);
function drawbox(control, num, coordinate_1, length, group, content, label){
    var tempgroup = new Group();
    var rect = new Rectangle(new Point(coordinate_1.x[num], coordinate_1.y[num]), new Size(length, height));
    var box = new Path.Rectangle(rect);
    box.strokeColor = 'black';
    if(control==0){
        box.fillColor = 'lightblue';
    }
    if(control==1){
        box.fillColor = 'yellow';
    }
    tempgroup.addChild(box);
    var text = new PointText(new Point(coordinate_1.x[num]+length/2, coordinate_1.y[num]+height*8/10));
    text.justification = 'center';
    text.fillColor = 'black';
    text.fontWeight =  600;
    text.fontSize = 15;
    text.content = content;
    bottom_text = text.clone();
    bottom_text.content = label;
    bottom_text.position += new Point(0,20);
    tempgroup.addChild(bottom_text);
    tempgroup.addChild(text);
    group.addChild(tempgroup);
    coordinate_1.x[num] += length;

}


function draw_start_box(control, group, coordinate, num){
    content = 'S';
    drawbox(control, num, coordinate, 20, group, content, nth);
}
function draw_stop_box(control, group, coordinate, num){
    content = 'P';
    drawbox(control, num, coordinate, 20, group, content, nth);
}
function draw_ack_box(control, group, type, coordinate, num){
    switch(type){
        case 0:
            content = 'A';
            break;
        case 1:
            content = 'Ā';
            break;
    }
    drawbox(control, num, coordinate, 20, group, content, nth);
}
function draw_rw_box(control, group, type, coordinate, num){
    switch(type){
        case 0:
            content = 'R';
            break;
        case 1:
            content = 'W';
            break;
    }
    drawbox(control, num, coordinate, 20, group, content, nth);
}
function draw_data_box(control, group, coordinate, data, label, num){
    drawbox(control, num, coordinate, 100, group, data, label);
}
function draw_address_box(control, group, coordinate, content, label, num){
    drawbox(control, num, coordinate, 120, group, content, label);
}

//functions for drawing waveform/clock

function draw(path, type){
    path.add(new Point(wave_coordinate.x[type], wave_coordinate.y[type]));
}

function rise(coordinate, type) {
    coordinate.x[type]+=risedelay;
    coordinate.y[type]-=height;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function rrise(coordinate, type) {
    coordinate.x[type]-=risedelay;
    coordinate.y[type]+=height;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function delay(coordinate, type){
    coordinate.x[type]+=risedelay;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function rdelay(coordinate, type){
    coordinate.x[type]-=risedelay;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function line(coordinate, type){
    coordinate.x[type]+=stretch;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function fullLine(coordinate, type, length){
    coordinate.x[type]+=length;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function rline(coordinate, type){
    coordinate.x[type]-=stretch;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function partline(coordinate, type){
    coordinate.x[type]+=stretch;
    coordinate.x[type]-=risedelay;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function rpartline(coordinate, type){
    coordinate.x[type]-=stretch;
    coordinate.x[type]+=risedelay;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function fall(coordinate, type) {
    coordinate.x[type]+=risedelay;
    coordinate.y[type]+=height;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function rfall(coordinate, type) {
    coordinate.x[type]-=risedelay;
    coordinate.y[type]-=height;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function period(coordinate, type) {
    coordinate.x[type]+=clocklength;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function rperiod(coordinate, type) {
    coordinate.x[type]-=clocklength;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function heightdown(coordinate, type) {
    coordinate.y[type]+=height;
    fill(type, coordinate.x[type], coordinate.y[type]);
}
function thickendown(coordinate, type){
    coordinate.y[type]+=5;
    fill(type, coordinate.x[type], coordinate.y[type]);
}

function drawoverlay() {
    var ctl = new Rectangle(new Point(325, 75), new Size(stretch+risedelay+5, 50))
    var ctlbox = new Path.Rectangle(ctl);
    overlay_group.addChild(ctlbox);

    var rect = new Rectangle(new Point(353+5, 75), new Size(42, 50))
    box = new Path.Rectangle(rect);
    overlay_group.addChild(box);
    for (var i = 1; i < 9; i++) {
        box1 = box.clone();
        box1.position += new Point(42*i, 0);
        overlay_group.addChild(box1);
        }
    var rect = new Rectangle(new Point(353+42*9+5, 75), new Size(stretch*2+clocklength*2, 50));
    big_box = new Path.Rectangle(rect);
    overlay_group.addChild(big_box);
    var ctlbox1 = ctlbox.clone();
    ctlbox1.position += new Point(0,75);
    overlay_group.addChild(ctlbox1);

    btmbox = box.clone();
    btmbox.position += new Point(0,75);
    overlay_group.addChild(btmbox);
    for (var i = 1; i < 9; i++) {
        box1 = btmbox.clone();
        box1.position += new Point(42*i, 0)
        overlay_group.addChild(box1);
        }
    last = big_box.clone();
    last.position += new Point(0, 75);
    overlay_group.addChild(last);
}

function sda_control(type, num){
    for(var i = 0; i<11; i++){
        if(type == 0 && i == num){
            overlay_group.children[i].fillColor = 'lightblue';
        } 
        if(type == 1 && i == num){
            overlay_group.children[i].fillColor = 'yellow';
        }
        if(type == 2 && i == num){
            overlay_group.children[i].fillColor = 'white';
        }
    }
}

// function scl_control(type, num){
//     for(var i = 11; i<22; i++){
//         if(type == 0 && i == num+11){
//             overlay_group.children[i].fillColor = 'lightblue';
//         } 
//         if(type == 1 && i == num+11){
//             overlay_group.children[i].fillColor = 'yellow';
//         }
//         if(type == 2 && i == num+11){
//             overlay_group.children[i].fillColor = 'white';
//         }
//     }
// }

function clock_pulse_control(num){
    for(i=11; i<=20; i++){
        if(num==1){
        overlay_group.children[i].fillColor = 'yellow';   
        }
        else{
        overlay_group.children[i].fillColor = 'lightblue';   
        }
    }
}
// function clock_clear(){
//     for(i=12; i<=20; i++){
//         overlay_group.children[i].fillColor = 'lightblue';
//     }
// }

function byte_control(type){
    clock_pulse_control(0);
    for(i=1; i<=8; i++){
        if(type == 0){
            overlay_group.children[i].fillColor = 'lightblue';
        }
        if(type == 1){
            overlay_group.children[i].fillColor = 'yellow';
        }
        if(type == 2){
            overlay_group.children[i].fillColor = 'white';
        }
    }

}

// function sdaControl(type){
//     clock_pulse_control();
//     for(i=0; i<=10; i++){
//         if(type == 0){
//             overlay_group.children[i].fillColor = 'lightblue';
//         }
//         else if(type == 1){
//             overlay_group.children[i].fillColor = 'yellow';
//         }
//         else {
//             overlay_group.children[i].fillColor = 'white';
//         }
//     }

// }

function sdaControl(type){
    // clock_pulse_control();
    for(i=0; i<=10; i++){
        if(type == 0){
            overlay_group.children[i].fillColor = 'lightblue';
        }
        else if(type == 1){
            overlay_group.children[i].fillColor = 'yellow';
        }
        else {
            overlay_group.children[i].fillColor = 'white';
        }
    }

}

function ack_control(type){
    if(type == 0){
        overlay_group.children[9].fillColor = 'lightblue';
    }
    if(type == 1){
        overlay_group.children[9].fillColor = 'yellow';
    }
    if(type == 2){
        overlay_group.children[9].fillColor = 'white';
    }
}

function start_control(type){
    if(type == 0){
        overlay_group.children[0].fillColor = 'lightblue';
    } 
    if(type == 1){
        overlay_group.children[0].fillColor = 'white';
    }
}
function stop_control(type){
    if(type == 0){
        overlay_group.children[10].fillColor = 'lightblue';
    } 
    if(type == 1){
        overlay_group.children[10].fillColor = 'white';
    }
}

function clear_control(){
    for(i= 0; i<22; i++){
        overlay_group.children[i].fillColor = 'white';
    }
    // overlay_group.children[11].fillColor = 'white';
    // overlay_group.children[21].fillColor = 'white';
}

function draw_wave_end(group){
    draw_number(number_text);
    var clk = new Path();
    clk.strokeColor = 'black';
    var waveform1 = new Path();
    waveform1.strokeColor = 'black';
    heightdown(wave_coordinate, 0);
    draw(clk, 0);
    line(wave_coordinate, 0);
    draw(clk,0);
    delay(wave_coordinate,0);
    draw(clk,0)

    period(wave_coordinate, 0);
    draw(clk, 0);
    for(var i=1;i<=9;i++){
        rise(wave_coordinate, 0);
        draw(clk, 0);
        period(wave_coordinate, 0);
        draw(clk, 0);
        fall(wave_coordinate, 0);
        draw(clk, 0);
        period(wave_coordinate, 0);
        draw(clk, 0)
    }
    period(wave_coordinate, 0);
    draw(clk, 0);
    rise(wave_coordinate, 0);
    draw(clk, 0);
    partline(wave_coordinate, 0);
    draw(clk, 0);
    delay(wave_coordinate, 0);
    draw(clk, 0);
    partline(wave_coordinate, 0);
    draw(clk, 0);
    clk.opacity = 1;



    draw(waveform1, 1);
    partline(wave_coordinate, 1);
    draw(waveform1, 1);
    delay(wave_coordinate, 1);
    draw(waveform1, 1);
    period(wave_coordinate, 1);
    draw(waveform1, 1);
    fall(wave_coordinate, 1);
    draw(waveform1, 1);
    delay(wave_coordinate, 1);
    period(wave_coordinate, 1);
    delay(wave_coordinate, 1);
    draw(waveform1, 1);

    for(var k=0; k<8; k++){
        period(wave_coordinate, 1);
        draw(waveform1, 1);
        delay(wave_coordinate, 1);
        period(wave_coordinate, 1);
        delay(wave_coordinate, 1);
        draw(waveform1, 1);
    }
    period(wave_coordinate,1);
    draw(waveform1, 1);
    period(wave_coordinate, 1);
    draw(waveform1, 1);
    delay(wave_coordinate, 1);
    draw(waveform1, 1);
    partline(wave_coordinate, 1);
    draw(waveform1, 1);
    rise(wave_coordinate, 1);
    draw(waveform1, 1);
    partline(wave_coordinate, 1);
    draw(waveform1, 1);

    waveform2= waveform1.clone();
    var wav_group = new Group([waveform1, waveform2]);
    wav_group.opacity = 0;
    wav_group.selected= false;
    wav_group.strokeColor = 'black';
    wav_group.bringToFront();
    wav_group.opacity = 1 ;
    group.addChild(wav_group);
    group.addChild(clk);
    group.addChild(number_text);
    group.visible = false;
    // wav_group.fillColor = 'red';
}

function draw_wave_middle(group){
    draw_number(number_text);
    var clk = new Path();
    clk.strokeColor = 'black';
    var waveform1 = new Path();
    waveform1.strokeColor = 'black';
    heightdown(wave_coordinate, 0);
    draw(clk, 0);
    line(wave_coordinate, 0);
    draw(clk,0);
    delay(wave_coordinate,0);
    draw(clk,0)

    period(wave_coordinate, 0);
    draw(clk, 0);
    for(var i=1;i<=9;i++){
        rise(wave_coordinate, 0);
        draw(clk, 0);
        period(wave_coordinate, 0);
        draw(clk, 0);
        fall(wave_coordinate, 0);
        draw(clk, 0);
        period(wave_coordinate, 0);
        draw(clk, 0)
    }
    period(wave_coordinate, 0);
    draw(clk, 0);
    delay(wave_coordinate, 0);
    draw(clk, 0);
    clk.opacity = 1;



    draw(waveform1, 1);
    partline(wave_coordinate, 1);
    draw(waveform1, 1);
    delay(wave_coordinate, 1);
    draw(waveform1, 1);
    period(wave_coordinate, 1);
    draw(waveform1, 1);
    fall(wave_coordinate, 1);
    draw(waveform1, 1);
    delay(wave_coordinate, 1);
    period(wave_coordinate, 1);
    delay(wave_coordinate, 1);
    draw(waveform1, 1);

    for(var k=0; k<8; k++){
        period(wave_coordinate, 1);
        draw(waveform1, 1);
        delay(wave_coordinate, 1);
        period(wave_coordinate, 1);
        delay(wave_coordinate, 1);
        draw(waveform1, 1);
    }
    period(wave_coordinate,1);
    draw(waveform1, 1);
    period(wave_coordinate, 1);
    draw(waveform1, 1);
    rise(wave_coordinate, 1);
    draw(waveform1, 1);
    

    waveform2= waveform1.clone();
    var wav_group = new Group([waveform1, waveform2]);
    wav_group.opacity = 0;
    wav_group.selected= false;
    wav_group.strokeColor = 'black';
    wav_group.bringToFront();
    wav_group.opacity = 1 ;
    group.addChild(wav_group);
    group.addChild(clk);
    group.addChild(number_text);
    group.visible = false;
    // wav_group.fillColor = 'red';
}

function draw_wave_start(group){
    draw_number(number_text);
    // draw(clk, 0);
    // thickenup(coordinate, 0);
    var clk = new Path();
    clk.strokeColor = 'black';
    var waveform1 = new Path();
    waveform1.strokeColor = 'black';
    draw(clk, 0);
    line(wave_coordinate, 0);
    draw(clk,0);
    fall(wave_coordinate,0);
    draw(clk,0)

    period(wave_coordinate, 0);
    draw(clk, 0);
    for(var i=1;i<=9;i++){
        rise(wave_coordinate, 0);
        draw(clk, 0);
        period(wave_coordinate, 0);
        draw(clk, 0);
        fall(wave_coordinate, 0);
        draw(clk, 0);
        period(wave_coordinate, 0);
        draw(clk, 0)
    }
    period(wave_coordinate, 0);
    draw(clk,0);
    delay(wave_coordinate, 0);
    draw(clk, 0);
    clk.opacity = 1;
    clk.bringToFront();

    
    draw(waveform1, 1);
    partline(wave_coordinate, 1);
    draw(waveform1, 1);
    fall(wave_coordinate, 1);
    draw(waveform1, 1);
    delay(wave_coordinate, 1);
    draw(waveform1, 1);

    for(var k=0; k<9; k++){
        period(wave_coordinate, 1);
        draw(waveform1, 1);
        delay(wave_coordinate, 1);
        period(wave_coordinate, 1);
        delay(wave_coordinate, 1);
        draw(waveform1, 1);
    }
    period(wave_coordinate,1);
    draw(waveform1, 1);
    period(wave_coordinate, 1);
    draw(waveform1, 1);
    rise(wave_coordinate, 1);
    draw(waveform1, 1);

    waveform2= waveform1.clone();
    var wav_group = new Group([waveform1, waveform2]);
    wav_group.opacity = 0;
    wav_group.strokeColor = 'black';
    wav_group.bringToFront();
    wav_group.opacity = 1 ;
    group.addChild(wav_group);
    group.addChild(clk);
    group.addChild(number_text);
    group.visible = false;
    // wav_group.fillColor = 'red';
}


function draw_wave_initiate(group){
    var clk = new Path();
    clk.strokeColor = 'black';
    var waveform1 = new Path();
    waveform1.strokeColor = 'black';
    draw(clk, 0);
    fullLine(wave_coordinate, 0, 460);   //function line(coordinate, type)
    draw(waveform1, 1);         //function draw(path, type)
    fullLine(wave_coordinate, 1, 460);
    draw(clk, 0);
    fullLine(wave_coordinate, 0, 460);   //function line(coordinate, type)
    draw(waveform1, 1);         //function draw(path, type)
    fullLine(wave_coordinate, 1, 460);
    waveform2= waveform1.clone();
    var wav_group = new Group([waveform1, waveform2]);
    wav_group.opacity = 0;
    wav_group.strokeColor = 'black';
    wav_group.bringToFront();
    // wav_group.sendToBack();
    wav_group.opacity = 1 ;
    group.addChild(wav_group);
    group.addChild(clk);
    group.addChild(number_text);
    group.visible = false;
}

function  animate_draw_wave(wave, wave1, wave2){
    disable_play_buttons();
    all_waves.visible = true;
    progress_bar.visible = true;
    var offset = 0;
    var offset1 = 0;
    var offset2 = 0;
    var offset3 = 0;
    var speed_1 = 600/speed;
    flag[0] = 1;
    var first_time = 0;
    var framehandler = function(event){

        if(first_time == 0){
            cur_frame[0] = event.count;
            first_time = 1;
        }

        if(event.count < cur_frame[0]+speed_1*1.1){
            wave.dashArray = [offset, 1000];
            offset+= wave.length/speed_1;
            wave1.dashArray = [offset1, 1000];
            offset1+=wave1.length/speed_1;
            wave2.dashArray = [offset2, 1000];
            offset2+=wave2.length/speed_1;
            progress_bar.dashArray = [offset3+5, 1000];
            offset3+= progress_bar.length/(speed_1*1.1);
        } else {
            flag[0] = 0;
            progress_bar.dashArray = [1000, 1000];
            enable_play_buttons();
            view.off('frame', framehandler);
        }
    }
    view.on('frame', framehandler);
}



function change_waveform(input) {
    length = input.toString().length;
    if(length == 8) {
        seperate(digits1, input);
        for (var i = 1; i <=8; i++) {
            var segnum = w_dict[i];
            // var segnum2 = w_dict[i+8];
            if(digits1[i-1]==1){
                    all_waves.children[0].children[1].opacity = 0;
                    high(segnum, all_waves.children[0].children[0]);
                // if(i%2==1){
                //     all_waves.children[0].children[1].opacity = 0;
                //     high(segnum, all_waves.children[0].children[0]);
                //     // high(segnum2, waveform1)
                // } else {
                //     all_waves.children[0].children[1].opacity = 0;
                //     high(segnum, all_waves.children[0].children[1]);
                //     // high(segnum2, waveform2);
                // }
            } else if (digits1[i-1]==0) {
                    all_waves.children[0].children[1].opacity = 0;
                    low(segnum, all_waves.children[0].children[0]);
                // if(i%2==1){
                //     //all_waves.children[0].children[0].opacity = 0;
                //     low(segnum, all_waves.children[0].children[0]);
                //     // low(segnum2, waveform1);
                // } else {
                //     all_waves.children[0].children[1].opacity = 0;
                //     low(segnum, all_waves.children[0].children[1]);
                //     // low(segnum2, waveform2);
                // }
            }
        }
    } else {
        alert("Input invalid");
    }
}

function move_waveform(destination, group){
    var clone = all_waves.clone();
    clone.visible = true;
    disable_play_buttons();
    all_waves.visible = true;
    flag[0] = 1;
    var offset = 0;
    var offset1 = 0;
    var path = new Path();
    path.add(all_waves.position);
    path.add(destination);
    var a = path.length/speed;
    var b = Math.log(0.22);
    var scaling = Math.exp(b/a)

    var framehandler = function(event){
        if(offset < path.length) {
            clone.position = path.getPointAt(offset);
            clone.scale(scaling);
            offset+=speed;
            progress_bar.dashArray = [offset1, 1000];
            offset1+= progress_bar.length / (a);
        } else {
            flag[0] = 0;
            clone.removeChildren();
            // number_text.removeChildren();
            group.visible = true;
            progress_bar.dashArray = [1000, 1000];
            enable_play_buttons();
            view.off('frame', framehandler)
        }
    }
    view.on('frame', framehandler);
}

function move_to_position(path1, object, group){ //Removed moving animation, item just appears in position
    // disable_play_buttons();
    var final = path1.getPointAt(0)- new Point(0,30);
    // group.visible = false;
    // var clone = object.clone();
    // flag[0] = 1;
    // var offset = 0;
    // offset1 = 0;
    // var path = new Path();
    // path.add(object.position);
    // path.add(final);
    // var framehandler = function(event){
    //     if(offset < path.length) {
    //         clone.position = path.getPointAt(offset);
    //         offset+=speed;
    //         progress_bar.dashArray = [offset1, 1000];
    //         offset1+= progress_bar.length / (path.length/speed);
    //     } else {
    //         clone.remove();
    //         group.position = final + new Point(0,21);
    //         group.visible = true;
    //         flag[0] = 0;
    //         progress_bar.dashArray = [1000, 1000];
    //         enable_play_buttons();
    //         view.off('frame', framehandler)
    //     }
    // }
    // view.on('frame', framehandler);
    group.position = final + new Point(0,21);
    group.visible = true;
}

function move_to_position_2(path1, object, group){ //removed moving animations, item just appears in place
    // disable_play_buttons();
    // var clone = object.clone();
    final = path1.getPointAt(path1.length)-new Point(0, 30);
    // flag[0] = 1;
    // var offset = 0;
    // var offset1 = 0;
    // var path = new Path();
    // path.add(object.position);
    // path.add(final);
    // var framehandler = function(event){
    //     if(offset < path.length) {
    //         clone.position = path.getPointAt(offset);
    //         offset+=speed;
    //         progress_bar.dashArray = [offset1, 1000];
    //         offset1+= progress_bar.length / (path.length/speed);
    //     } else {
    //         clone.remove();
    //         group.position = final + new Point(0,21);
    //         group.visible = true;
    //         flag[0] = 0;
    //         progress_bar.dashArray = [1000, 1000];
    //         enable_play_buttons();
    //         view.off('frame', framehandler)
    //     }
    // }
    // view.on('frame', framehandler);
    group.position = final + new Point(0,21);
    group.visible = true;
}

function draw_number(group){
    var text = new PointText(new Point(375, 95));
    text.fillColor = 'black';
    text.content = '0';
    group.insertChild(0, text);
    for(i = 1; i<= 8; i++){
        var text_clone = text.clone();
        text_clone.position += new Point(i*2*(clocklength+risedelay), 0);
        group.insertChild(i, text_clone);
    }
    group.visible = true;
}

function fill_num(input, group){
    seperate_9(digits1, input);
    for(i = 0; i<=8; i++){
        group.children[i].content = digits1[i].toString();
    }
}

function seperate(digits, value){
    num = value;
    for(var i = 7; i>=0; i--) {
        digits[i] = num % 10;
        num = parseInt(num / 10);
    }
}
function seperate_9(digits, value){
    num = value;
    for(var i = 8; i>=0; i--) {
        digits[i] = num % 10;
        num = parseInt(num / 10);
    }
}

function low(segnum, x){
    var segment = x.segments[0];
    var original = segment.point.y; 
    for(var j = 1; j<=2; j++) {
        segment = x.segments[segnum];
        segnum++;
        if(segment.point.y==original) {
            segment.point.y = segment.point.y + height;
        } else {
            continue;
        }
    }
}

function high(segnum, x){
    console.log(x.segments[0]);
    var segment = x.segments[0];
    var original = segment.point.y; 
    for(var j = 1; j<=2; j++) {
        segment = x.segments[segnum];
        segnum++;
        if(segment.point.y!=original) {
            segment.point.y = segment.point.y - height;
        } else {
            continue;
        }
    }
}
function show_start(){
    start_group.visible = true;
}
function clearboxes(){
    ack_group.visible = false;
    ack_true.visible = false;
    nack_true.visible = false;
    read_group.visible = false;
    read_text.visible = false;
    write_text.visible = false;
    start_group.visible = false;
    stop_group.visible = false;
}

function read_or_write(input) {
    read_group.visible = true;
    length = input.toString().length;
    var segnum = w_dict[8]
    if(input == 'w') { 
        low(segnum, all_waves.children[0].children[1]);
        write_text.visible = true;
        read_text.visible = false;
    } else {
        if(input =='r') {
            high(segnum, all_waves.children[0].children[1]);
            write_text.visible = false;
            read_text.visible = true;
        }
        else {
            alert("Input invalid");
        }
    }
}

function ack_or_nack(input) {
    length = input.toString().length;
    var segnum = w_dict[9]
    ack_group.visible = true;
    if(input == 'y') { 
        low(segnum, all_waves.children[0].children[0]);
        ack_true.visible = true;
        nack_true.visible = false;
    } else {
        if(input =='n') {
            high(segnum, all_waves.children[0].children[0]);
            ack_true.visible = false;
            nack_true.visible = true;
        }
        else {
            alert("Input invalid");
        }
    }
}
//Function for acknowledge 


function illustrate(group, type, animate){
    switch(type) {
        case 0:
            draw_wave_start(group);
            slave_group.position = new Point(810, 143);
            break;
        case 1:
            draw_wave_middle(group);
            slave_group.position = new Point(810, 143);
            break;
        case 2:
            draw_wave_end(group); 
            slave_group.position = new Point(823+stretch*2-risedelay, 143);
            break;
        case 3:
            draw_wave_initiate(group);
            slave_group.position = new Point(810, 143);
        case 4:
            draw_wave_start(group);
            slave_group.position = new Point(762, 143);
            slave_group.bringToFront();
            break;
        case 5:
            draw_wave_middle(group);
            slave_group.position = new Point(762, 143);
            slave_group.bringToFront();
            break;
        case 6:
            draw_wave_end(group);
            slave_group.position = new Point(762, 143);
            slave_group.bringToFront();
            break;
        case 7:
            draw_wave_end(group);
            slave_group.position = new Point(808, 143);
            slave_group.bringToFront();
            break;    
    }
    wave_coordinate.x[0] = 300;
    wave_coordinate.x[1] = 300;  
    wave_coordinate.y[0] = 160;
    wave_coordinate.y[1] = 100;
    if (animate == 1) {
        animate_draw_wave(all_waves.children[1], all_waves.children[0].children[0], all_waves.children[0].children[1]);
    }

}

function show_en_diagram(num){
    switch(num){
        case 0:
            en_diagram.children[0].visible = false;
            en_diagram.children[1].visible = false;
            en_diagram.children[2].visible = false;
            break;
        case 1:
            en_diagram.children[0].visible = true;
            en_diagram.children[1].visible = false;
            en_diagram.children[2].visible = false;
            break;
        case 2:
            en_diagram.children[0].visible = true;
            en_diagram.children[1].visible = true;
            en_diagram.children[2].visible = false;
            break;
        case 3:
            en_diagram.children[0].visible = true;
            en_diagram.children[1].visible = true;
            en_diagram.children[2].visible = true;
            break;
    }
}

function show_read_diagram(num){
    switch(num){
        case 0:
            read_diagram.children[0].visible = false;
            read_diagram.children[1].visible = false;
            read_diagram.children[2].visible = false;
            read_diagram.children[3].visible = false;
            break;
        case 1:
            read_diagram.children[0].visible = true;
            read_diagram.children[1].visible = false;
            read_diagram.children[2].visible = false;
            read_diagram.children[3].visible = false;
            break;
        case 2:
            read_diagram.children[0].visible = true;
            read_diagram.children[1].visible = true;
            read_diagram.children[2].visible = false;
            read_diagram.children[3].visible = false;
            break;
        case 3:
            read_diagram.children[0].visible = true;
            read_diagram.children[1].visible = true;
            read_diagram.children[2].visible = true;
            read_diagram.children[3].visible = false;
            break;
        case 4:
            read_diagram.children[0].visible = true;
            read_diagram.children[1].visible = true;
            read_diagram.children[2].visible = true;
            read_diagram.children[3].visible = true;
            break;
    }
}

var clk_dict = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    length: 8
};
for(var key in clk_dict) {
    clk_dict[key]+=2; 
   }
var w_dict = {
    1:4,
    2:6,
    3:8,
    4:10,
    5:12,
    6:14,
    7:16,
    8:18,
    9:20,
    10:40,
    11:38,
    12:36,
    13:34,
    14:32,
    16:30,
    length: 8
}

//array to contain coordinates of waveform/clock
var wave_coordinate = { x: [300, 300, 300, 300], y: [160, 100, 150, 100]}
var w_array = new Array(2);
for (var i = 0; i < w_array.length; i++) {
    w_array[i] = new Array(0);
  }
var c_array = new Array(2);
for (var i = 0; i < c_array.length; i++) {
    c_array[i] = new Array(0);
  }

fill(0, wave_coordinate.x[0], wave_coordinate.y[0]);
fill(1, wave_coordinate.x[1], wave_coordinate.y[1]);
var digits = [1,1,1,1,1,1,1,1,1];
var digits1 = [1,1,1,1,1,1,1,1,1];

//draw micro controller box
var microCtr_group = new Group();
var Micro = new Rectangle(new Point(50, 55), new Size(100, 150));
var microPath = new Path.Rectangle(Micro);
microPath.fillColor = 'lightblue';
microPath.strokeColor = 'blue';
microCtr_group.addChild(microPath);
var microTxt = new PointText(new Point(100, 110));
microTxt.justification = 'center';
microTxt.fillColor = 'black';
microTxt.content = 'Micro';
microTxt.fontSize = '20';
ctrTxt = microTxt.clone();
ctrTxt.content = 'Controller';
ctrTxt.position = new Point(100, 130);
microCtr_group.addChild(microTxt);
microCtr_group.addChild(ctrTxt);
var arrow = new Group();
var box = new Path.Rectangle(new Point(100,100), new Size(15,45));
box.fillColor = 'lightblue';
var triangle = new Path.RegularPolygon(new Point(107, 100), 3, 20);
triangle.fillColor = 'lightblue';
var tri1 = new Path.RegularPolygon(new Point(107, 75), 3, 20);
tri1.fillColor = 'lightblue';
arrow.addChild(box);
arrow.addChild(triangle);
arrow.rotate(180); 
arrow.addChild(tri1);
arrow.scale(0.56);
arrow.rotate(90);
arrow.position=new Point(175, 125);
microCtr_group.addChild(arrow);



//draw master box
var master_group = new Group();
var x1 = wave_coordinate.x[0];
var y1 = wave_coordinate.y[0];
var x2 = wave_coordinate.x[1];
var y2 = wave_coordinate.y[1];
var Master = new Rectangle(new Point(200, 55), new Size(100, 150));
var path = new Path.Rectangle(Master);
master_group.addChild(path);
path.fillColor = 'white';
path.strokeColor = 'black';
var text_m = new PointText(new Point(250, 225));
text_m.justification = 'center';
text_m.fillColor = 'black';
text_m.content = 'Master';
text_m.fontSize = '20';
master_group.addChild(text_m);
var msda0 = new PointText(new Point(301, 118));
msda0.content = '0';
var msda = new PointText(new Point(301, 85));
msda.content = 'SDA';
var msda1 = new PointText(new Point(301, 98));
msda1.content = '1';
master_group.addChild(msda0);
master_group.addChild(msda);
master_group.addChild(msda1);
var mscl0 = new PointText(new Point(301, 178));
mscl0.content = '0';
var mscl = new PointText(new Point(301, 145));
mscl.content = 'SCL';
var mscl1 = new PointText(new Point(301, 158));
mscl1.content = '1';
master_group.addChild(mscl0);
master_group.addChild(mscl);
master_group.addChild(mscl1);
var conset_group=new Group();
var Conset = new Rectangle(new Point(210,61), new Size(80,22));
var path1 = new Path.Rectangle(Conset);
conset_group.addChild(path1);
path1.fillColor = 'lightblue';
path1.strokeColor = 'black';
var text = new PointText(new Point(250, 79));
text.justification = 'center';
text.fillColor = 'black';
text.content = 'CONSET';
text.fontSize = '16';
conset_group.addChild(text);
master_group.addChild(conset_group);
conclear_group=conset_group.clone();
conclear_group.position.y +=25;
conclear_group.children[1].content='CONCLR';
master_group.addChild(conclear_group);
dat_group=conset_group.clone();
dat_group.position.y +=50;
dat_group.children[1].content='DAT';
master_group.addChild(dat_group);
stat_group=conset_group.clone();
stat_group.position.y +=75;
stat_group.children[1].content='STAT';
master_group.addChild(stat_group);
text1=text.clone();
text1.position.y +=100;
text1.fontSize=14;
text1.content='I2C';
master_group.addChild(text1);
text2=text1.clone();
text2.position.y +=18;
text2.content='INTERFACE';
master_group.addChild(text2);

// Draw CONSET PATH

var conset_path=new Group();
var path=new Path({
    segments: [[195, 72], [165, 72], [165, 225], [50, 225], [50, 310], [98, 310]]
});
path.strokeColor='purple';
path.dashArray=[15, 5];
var path1=new Path({
    segments: [[189, 69], [195, 72], [189, 75]]
});
path1.strokeColor='purple';
conset_path.addChild(path);
conset_path.addChild(path1);

// Draw CONCLR PATH

var conclr_path=new Group();
var path=new Path({
    segments: [[195, 97], [180, 97], [180, 245], [70, 245], [70, 410], [98, 410]]
});
path.strokeColor='purple';
path.dashArray=[15, 5];
var path1=new Path({
    segments: [[189, 94], [195, 97], [189, 100]]
});
path1.strokeColor='purple';
conclr_path.addChild(path);
conclr_path.addChild(path1);

conset_path.visible=false;
conclr_path.visible=false;

//Draw content box function



var height = 20;

var coordinate_1 = { x: [100, 100, 100, 100], y: [100, 100, 100, 100]}
coordinate_1.x[0] = initial_destination.x;
coordinate_1.y[0] = initial_destination.y;
coordinate_1.x[1] = initial_destination.x;
coordinate_1.y[1] = initial_destination.y;


var small_box_length = 20;
var data_box_length = 100;
var address_box_length = 120;

var diagram1_button = new Group();
var button_box = new Path.Rectangle(new Point(400, 30), new Size(130,30));
button_box.strokeColor = 'black';
button_box.fillColor = 'darkgray';
// button_box.opacity = 0.3;
var text = new PointText(new Point(405, 50));
text.content = 'What is this diagram?';
text.opacity = 1;
diagram1_button.addChild(button_box);
diagram1_button.addChild(text);
diagram1_button.position += new Point(100, -20);







//new layer for creating series of coloured boxes to visualize master/slave control of waveform
//trying it out via coloured boxes
var overlay_group = new Group();

drawoverlay();  

// overlay_group.selected = true;




var all_waves = new Group();




testing = new PointText(new Point(50,50));
testing.content = 0;
testing.strokeColor = 'black';


//Slave box
var slave_group = new Group();
x3 = 747-clocklength;
y3 = 55;
x4 = 747+150-clocklength;
y4 = 55+150;
var Slave = new Rectangle(new Point(747, 55), new Size(150, 150));
var path = new Path.Rectangle(Slave);
path.fillColor = 'white';
path.strokeColor = 'black';
slave_group.addChild(path);
var text_s = new PointText(new Point(747+75, 225));
text_s.justification = 'center';
text_s.fillColor = 'black';
text_s.content = 'Slave';
text_s.fontSize = '20';
slave_group.addChild(text_s);
var text0 = new PointText(new Point(740, 118));
text0.content = '0';
var text = new PointText(new Point(722, 85));
text.content = 'SDA';
var text1 = new PointText(new Point(740, 98));
text1.content = '1';
slave_group.addChild(text);
slave_group.addChild(text0);
slave_group.addChild(text1);
var text0 = new PointText(new Point(740, 178));
text0.content = '0';
var text = new PointText(new Point(722, 145));
text.content = 'SCL';
var text1 = new PointText(new Point(740, 158));
text1.content = '1';
slave_group.addChild(text);
slave_group.addChild(text0);
slave_group.addChild(text1);
var saddress_group=new Group();
var sbox = new Rectangle(new Point(751, 97), new Size(16, 56));
var path1 = new Path.Rectangle(sbox);
path1.strokeColor = 'black';
var slave_address = new PointText(new Point(760, 130));
slave_address.justification = 'center';
slave_address.fillColor = 'black';
slave_address.content='1000100';
slave_address.rotate(-90);
saddress_group.addChild(path1);
saddress_group.addChild(slave_address);
slave_group.addChild(saddress_group);

var command_group=new Group();
var scommond = new Rectangle(new Point(770,61), new Size(120,22));
var path2 = new Path.Rectangle(scommond);
command_group.addChild(path2);
path2.fillColor = 'yellow';
path2.strokeColor = 'black';
var txt = new PointText(new Point(770+120/2, 79));
txt.justification = 'center';
txt.fillColor = 'black';
txt.content = 'COMMAND';
txt.fontSize = '16';
command_group.addChild(txt);
lsb_group=command_group.clone();
lsb_group.position.y +=25;
lsb_group.children[1].content='LSB_SENSOR';
msb_group=command_group.clone();
msb_group.position.y +=50;
msb_group.children[1].content='MSB_SENSOR';
txt1=txt.clone();
txt1.position.y +=100;
txt1.fontSize=14;
txt1.content='LIGHT';
txt2=txt1.clone();
txt2.position.y +=18;
txt2.content='SENSOR';
slave_group.addChild(command_group);
slave_group.addChild(lsb_group);
slave_group.addChild(msb_group);

slave_group.position = new Point(823, 143);

// var limit = new Rectangle(new Point(x2, y1-95), new Point(x3, y4+85))
// var limitbox = new Path.Rectangle(limit);


//Draw acknowledge box, set visibility to false first
var topleft = new Point(689+5,60);
var rectsize = new Size(40,140);
var test = new Rectangle(topleft, rectsize);
var ack_rect = new Path.Rectangle(test);
ack_rect.strokeColor = '#ff0000';
ack_rect.strokeWidth = 1;
ack_rect.dashArray = [5, 3];
var ack_text = new PointText(new Point(714, 55));
ack_text.justification = 'center';
ack_text.fillColor = 'black';
ack_text.content = 'ACK bit';
ack_text.fontSize = '10';
var close_ack = new Rectangle(topleft, new Size(10, 10));
var close_ack_box = new Path.Rectangle(close_ack);
close_ack_box.strokeColor='black';
close_ack_box.fillColor = 'black';
var ack_group = new Group([ack_text, ack_rect, close_ack_box]);
ack_group.visible = true;


// ack/nack text
var ack_true = new PointText(714, 115);
ack_true.justification = 'center';
ack_true.fillColor = 'black';
ack_true.content = 'ACK';
ack_true.fontSize = '12';
ack_true.visible = false;

var read_text = ack_true.clone();
read_text.content = 'R';
read_text.visible = false;
read_text.position -=new Point(risedelay*2+clocklength*2,0);
var write_text = read_text.clone();
write_text.content = 'W';
write_text.visible = false;

var nack_true = new PointText(new Point(714, 115));
nack_true.justification = 'center';
nack_true.fillColor = 'black';
nack_true.content = 'NACK';
nack_true.fontSize = '12';
nack_true.visible = false;
ack_group.visible = false;

read_group = ack_group.clone();
read_group.children[0].content = 'R/W bit';
read_group.position -= new Point(42, 0);

read_group.visible = false;

var starttopleft = new Point(320, 60);
startrectsize = new Size(25,140)
var test1 = new Rectangle(starttopleft, startrectsize);
var start_rect = new Path.Rectangle(test1);
start_rect.strokeColor = '#ff0000';
start_rect.strokeWidth = 1;
start_rect.dashArray = [5, 3];
// start_rect.opacity = 0;
var start_text = new PointText(new Point(332, 55));
start_text.justification = 'center';
start_text.fillColor = 'black';
start_text.content = 'Start Condition';
start_text.fontSize = '10';
var close_start = new Rectangle(starttopleft, new Size(10, 10));
var close_start_box = new Path.Rectangle(close_start);
close_start_box.strokeColor='black';
close_start_box.fillColor = 'black';
var start_group = new Group([start_text, start_rect, close_start_box]);
start_group.visible = false;

var stop_group = start_group.clone()
stop_group.visible = true;
stop_group.children[0].content = 'Stop Condition';
stop_group.position += new Point(460, 0);
stop_group.visible = false;




//disable for now try to fix touch events


// function onMouseDown(event){
//     var hitResult = close_ack_box.hitTest(event.point);
//     activeItem = hitResult && hitResult.item;
//     if(activeItem) {
//         ack_group.visible= false;
//         ack_true.visible = false;
//         nack_true.visible = false;
//     }
//     var hitResult1 = read_group.children[2].hitTest(event.point);
//     var activeItem1 = hitResult1 && hitResult1.item;
//     if(activeItem1) {
//         read_text.visible = false;
//         write_text.visible = false;
//         read_group.visible = false;
//     }
// }



var boxes_group = new Group();
boxes_group.addChildren([ack_group, ack_true, nack_true, read_group, read_text, write_text, start_group, stop_group]);





// draw_start_box(coordinate_1);
// draw_address_box(coordinate_1, data, 'Slave Addr');
// draw_rw_box(1, coordinate_1);
// draw_ack_box(0, coordinate_1);
// draw_data_box(data, coordinate_1, nth);
// draw_ack_box(0, coordinate_1);


var en_diagram = new Group();
var read_diagram = new Group();


var set_1 = new Group();
var temp_group = new Group();
draw_start_box(0, set_1, coordinate_1, 0);
draw_address_box(0, temp_group, coordinate_1, '1000100', 'Slave Addr', 0);
draw_rw_box(0, temp_group, 1, coordinate_1, 0);
set_1.addChild(temp_group);
draw_ack_box(1, set_1, 0, coordinate_1, 0);
en_diagram.addChild(set_1);

var set_2 = new Group();
draw_address_box(0, set_2, coordinate_1, '00000000', 'Reg Addr', 0);
draw_ack_box(1, set_2, 0, coordinate_1, 0);
en_diagram.addChild(set_2);

var set_3 = new Group();
draw_data_box(0, set_3, coordinate_1, '10000000', nth, 0);
draw_ack_box(1, set_3, 0, coordinate_1, 0);
draw_stop_box(0, set_3, coordinate_1, 0);
en_diagram.addChild(set_3);



show_en_diagram(0);


var set_4 = new Group();
var temp_group_2 = new Group();
coordinate_1.x[1] -= 120;
draw_start_box(0, set_4, coordinate_1, 1);
draw_address_box(0, temp_group_2, coordinate_1, '1000100', 'Slave Addr', 1);
draw_rw_box(0, temp_group_2, 1, coordinate_1, 1);
set_4.addChild(temp_group_2);
draw_ack_box(1, set_4, 0, coordinate_1, 1);
read_diagram.addChild(set_4);

var set_5 = new Group();
draw_address_box(0, set_5, coordinate_1, '00001000', 'Reg Addr', 1);
draw_ack_box(1, set_5, 0, coordinate_1, 1);
// draw_stop_box(0, set_5, coordinate_1, 1);
read_diagram.addChild(set_5);

var set_6 = new Group();
var temp_group_3 = new Group();
draw_start_box(0, set_6, coordinate_1, 1);
draw_address_box(0, temp_group_3, coordinate_1, '1000100', 'Slave Addr', 1);
draw_rw_box(0, temp_group_3, 0, coordinate_1, 1);
set_6.addChild(temp_group_3);
draw_ack_box(1, set_6, 0, coordinate_1, 1);
read_diagram.addChild(set_6);

var set_7 = new Group();
draw_data_box(1, set_7, coordinate_1, '11001011', 'Read Data', 1);
draw_ack_box(0, set_7, 1, coordinate_1, 1);
draw_stop_box(0, set_7, coordinate_1, 1);
read_diagram.addChild(set_7);


show_read_diagram(0);


function default_scenario(){
    all_waves.removeChildren();
    illustrate(all_waves, 3, 1);
}

var sda = initLine("sda", 1);
var sda_yPos = sda.position.y;
var sda0_yPos = sda_yPos + 20;
var scl = initLine("scl", 1);
var scl_yPos = scl.position.y;
var scl0_yPos = scl_yPos + 20;



function initLine(serial, state){
    var line = new Path();
    line.strokeColor = 'black';
    if (serial == "sda"){
        if(state == 0){
            line.add(new Point(300,120), new Point(760,120));
        }
        else{
            line.add(new Point(300,100), new Point(760,100));
        }
    }
    else if (serial =="scl"){
        if(state == 0){
            line.add(new Point(300,180), new Point(760,180));
        }
        else{
            line.add(new Point(300,160), new Point(760,160));
        }
    }
    return line;
}


function resetSignal(signal, value){
    if (signal.position.y != value){
        signal.position.y = value;
    }
}

function visibleSignal(status){
    sda.visible=status;
    scl.visible=status;
}

function animateSignal(signal, value){
    disable_play_buttons();
    var i = 0;
    var framehandler = function(event){
        if (value == 0){
            if(i<20){
                signal.position.y += 1;
                i++;
            }
            else{
                enable_play_buttons();
                view.off('frame', framehandler);
            }
        }
        else{
            if(i<20){
                signal.position.y -= 1;
                i++;
            }
            else{
                enable_play_buttons();
                view.off('frame', framehandler);
            }
        }
    }
    view.on('frame', framehandler);
}

function clockPulse(){
    disable_play_buttons();
     var count = 0, i=0, clk_num=0;
     var framehandler = function(event){
    if(count<19){
        ClkNum.content= 'CLK Pulse No.' + clk_num;
        SCL_ctr.content='SCL Master Control';
        SDA_ctr.content='SDA Transmitter Control';
        clock_pulse_control(0);
        if(count%2==0){
            if(i<20){
                scl.position.y += 1;
                i++;
            }
            else if (i=20){
                         count += 1;
                         clk_num++;  
            }
        }
        else {
            if(i>0){
                scl.position.y -= 1;
                i--;
            }
            else if(i==0){
            count += 1; 
            }
           }
        }
       else {
        view.off('frame', framehandler);
        enable_play_buttons();
    }
     }
    view.on('frame', framehandler);
}

function clockStretching(){
    disable_play_buttons();
     var count = 0, i=0, clk_num=0;
     var framehandler = function(event){
    if(count<18){
        ClkNum.content= 'CLK Pulse No.' + clk_num;
        if(count<17){
            SCL_ctr.content='SCL Master Control';
            SDA_ctr.content='SDA Transmitter Control';
            clock_pulse_control(0);
        }
        if(count%2==0){
            if(i<20){
                scl.position.y += 1;
                i++;
            }
            else if (i=20){
                clk_num++;
                // if(count==16){
                //     sda.position.y = sda_yPos;
                // }
                         count += 1;   
            }
        }
        else {
            if(i>0){
                scl.position.y -= 1;
                i--;
            }
            else if(i==0){
                if (count==17){
                    scl.position.y=scl0_yPos;
                    SCL_ctr.content='SCL Slave Control';
                    clock_pulse_control(1);
                    view.off('frame', framehandler);
                    enable_play_buttons();
                }
            count += 1; 
            }

           }
        }
       else {
        view.off('frame', framehandler);
        enable_play_buttons();
    }
     }
    view.on('frame', framehandler);
}

function ack(){
    disable_play_buttons();
     var count = 0, i=0, clk_num=0;
     var framehandler = function(event){
    if(count<19){
        ClkNum.content= 'CLK Pulse No.' + clk_num;
        if(count<17){
        SCL_ctr.content='SCL Master Control';
        SDA_ctr.content='SDA Transmitter Control'; 
        clock_pulse_control(0);          
        }
        if(count%2==0){
            if(i<20){
                scl.position.y += 1;
                i++;
            }
            else if (i=20){
                clk_num++;
                if(count==16){
                    sda.position.y = sda_yPos;
                }
                         count += 1;   
            }
        }
        else {
            if(i>0){
                scl.position.y -= 1;
                i--;
                    if (count==17 && i == 15){
                    sda.position.y=sda0_yPos;
                    SDA_ctr.content='SDA/ACK Receiver Control';
                }
            }
            else if(i==0){
            count += 1; 
            }

           }
        }
       else {
        view.off('frame', framehandler);
        enable_play_buttons();
    }
     }
    view.on('frame', framehandler);
}

function nack(){
     disable_play_buttons();
     var count = 0, i=0, clk_num=0;
     var framehandler = function(event){
    if(count<19){
        ClkNum.content= 'CLK Pulse No.' + clk_num;
        if(count<17){
        SDA_ctr.content='SDA Transmitter Control'; 
        SCL_ctr.content='SCL Master Control';
        clock_pulse_control(0);          
        }
        if(count%2==0){
            if(i<20){
                scl.position.y += 1;
                i++;
            }
            else if (i=20){
                clk_num++;
                if(count==16){
                    sda.position.y = sda_yPos;
                }
                         count += 1;   
            }
        }
        else {
            if(i>0){
                scl.position.y -= 1;
                i--;
                //     if (count==17 && i == 15){
                //     sda.position.y=sda0_yPos;
                // }
            }
            else if(i==0){
            count += 1; 
            }

           }
        }
       else {
        SDA_ctr.content='SDA/NACK Receiver Control';
        view.off('frame', framehandler);
        enable_play_buttons();
    }
     }
    view.on('frame', framehandler);
}

function ackFlag(){
    disable_play_buttons();
     var count = 0, i=0;
     sda.position.y = sda_yPos;
     scl.position.y = scl0_yPos;
     var framehandler = function(event){
    if(count==0){
            if(i<20){
                sda.position.y += 1;
                i++;
            }
            else if (i=20){
                 count += 1;   
            }
        }
        else if(count==1){
            if(i>0){
                scl.position.y -= 1;
                i--;
                }
            else if(i==0){
            count += 1; 
            }
           }
        else if(count==2 && i<20){
                scl.position.y += 1;
                i++;
            if(i==20){
            count += 1; 
            }
        }
        else {
        view.off('frame', framehandler);
        enable_play_buttons();
    }
     }
    view.on('frame', framehandler);
}

// Register box function
var regBox_group = new Group();
var regBox_group1 = new Group();

function register_box(group, posX, posY, bitNum, value, txt){
    var offX = 20;
    var offY = 20;
    var reg1bit_group = new Group();
    var topLeft = new Point(posX, posY);
    var rectSize = new Size(offX, offY);
    var regBox = new Rectangle(topLeft, rectSize);
    var regBoxPath = new Path.Rectangle(regBox);
    regBoxPath.strokeColor = 'black';
    reg1bit_group.addChild(regBoxPath);
    group.addChild(reg1bit_group);
    regBoxPath.fillColor=(value==1?'lightblue':'white');

    var boxText = new PointText(new Point(posX+offX/2, 5+posY+offY/2));
    boxText.justification = 'center'
    boxText.fillColor = 'black';
    boxText.content = value;
    boxText.fontSize = '12';
    boxText.fontWeight =  600;
    bottomText = boxText.clone();
    bottomText.content = (bitNum==-1? ' ': bitNum);
    bottomText.position += new Point(0,20);
    reg1bit_group.addChild(boxText);
    reg1bit_group.addChild(bottomText);
    topText = boxText.clone();
    topText.content = name;
    // topText.fontSize = '18';
    topText.content = txt;
    topText.position += new Point(0,-18);
    reg1bit_group.addChild(topText);
    group.addChild(reg1bit_group);
}

function register_label(group, posX, posY, label){
    var regLabel_group = new Group();
    var regLabel = new PointText(new Point(posX, posY));
    regLabel.justification = 'left'
    regLabel.fillColor = 'black';
    regLabel.content = label;
    regLabel.fontSize = '18';
    regLabel.fontWeight =  600;
    regLabel_group.addChild(regLabel);
    group.addChild(regLabel_group);
}

function ctrReg_box(group, type, ctrBit, posX, posY, offsetX){
    var regLength = posX;
    var text, label, bitNum, value='X', txt;
    switch(ctrBit){
        case 2:
          text='AA';
          break;
        case 3: 
          text='SI';
          break;
        case 4: 
          text='STO';
          break;
        case 5: 
          text='STA';
          break;
        case 6:
          text='I2EN';
          break;
          default:
          text=' ';
    }
    if(type==1){
        label = 'I2CxCONSET ';
    }
    else {
        label = 'I2CxCONCLR ';
        if(text!='STO'){
        text +=(text?'C':' ');
        }
    }
  
    for(var i=0; i<10; i++){
        // regLength += offsetX;
        switch(i){
                case 0: 
                  bitNum = '31';
                  break;
                case 2: 
                  bitNum = '7';
                break;
                case 9:
                  bitNum = '0';
                  break;
                default:
                  bitNum = '-1';
        }
        if(ctrBit>1 && ctrBit<7){
            if (i==9-ctrBit){
                bitNum = '--';
                if(ctrBit==4 && type==0){
                value = 'X';
                txt = ' ';
                }
                else{
                value = '1';
                txt = text;
                // group.fillColor='lightblue';   
                }
            }
            else if (i==3){
                value = '1';
                txt = ' ';   
            }
            else if (i==1){
                value = '...';
                txt = ' ';
                }
            else {
                value = 'X';
                txt = ' '; 
            }
        }
        else {
                value = 'X';
                txt = ' ';

               } 

            register_box(group, posX+(offsetX*i), posY, bitNum, value, txt);
        }
    // register_label(group, offsetX+regLength/2, posY-10, label);    
    register_label(group, posX+offsetX/4, posY-15, label); 
    
        group.children[1].children[0].remove();
    }  

function move_bit(group, bitnum, offset) {
    var bitbox = group.children[9-bitnum].clone();
    bitbox.visible = true;
    bitbox.position.y +=2*offset    
    bitbox.children[0].fillColor='lightblue';
    bitbox.children[0].strokeColor='white';
    bitbox.children[1].content='1';
    bitbox.children[2].content=' ';
    bitbox.children[3].content=' ';
    disable_play_buttons();
    flag[0] = 1;
    var offset = 0;
    var offset1 = 0;
    var path = new Path();
    path.add(bitbox.position);
    path.add(group.children[9-bitnum].position);
    speed1=speed/5;
    var a = path.length/(speed1);
    bitbox.bringToFront();

    var framehandler = function(event){
           group.children[9-bitnum].children[1].content='X';
           if(bitnum==6){
            if(group==regBox_group){
               master_group.children[1].content=' '; 
            }
            else {
               master_group.children[1].content='Master';  
            }
           }
           if(group==regBox_group1){
            regBox_group.children[9-bitnum].children[1].content='1';
            group.children[9-bitnum].children[1].content='X';
           }
        if(offset < path.length) {
            bitbox.position = path.getPointAt(offset);
            offset+=speed1;
            progress_bar.dashArray = [offset1, 1000];
            offset1+= progress_bar.length / (a);
        } else {
            flag[0] = 0;
            bitbox.removeChildren();
           group.children[9-bitnum].children[1].content='1';
           master_group.children[1].content='Master';
           if(group==regBox_group1){
            regBox_group.children[9-bitnum].children[1].content='0';
            if(bitnum==6){
               master_group.children[1].content=' '; 
            }
           }
            group.visible = true;
            progress_bar.dashArray = [1000, 1000];
            enable_play_buttons();
            view.off('frame', framehandler)
        }
    }
    view.on('frame', framehandler);
}    

function stoSet(group){
    ctrReg_box(group, 1, 4, 100, 300, 20);
    var bitbox = group.children[5].clone();
    bitbox.visible = true;
    bitbox.position.y +=40   
    bitbox.children[0].fillColor='lightblue';
    bitbox.children[0].strokeColor='white';
    bitbox.children[1].content='1';
    bitbox.children[2].content=' ';
    bitbox.children[3].content=' ';
    disable_play_buttons();
    flag[0] = 1;
    var offset = 0;
    var offset1 = 0;
    var path = new Path();
    path.add(bitbox.position);
    path.add(group.children[5].position);
    speed1=speed/5;
    var a = path.length/(speed1);
    bitbox.bringToFront();

    var framehandler = function(event){
           group.children[5].children[1].content='X';
        if(offset < path.length) {
            bitbox.position = path.getPointAt(offset);
            offset+=speed1;
            progress_bar.dashArray = [offset1, 1000];
            offset1+= progress_bar.length / (a);
        } else {
            flag[0] = 0;
            bitbox.removeChildren();
            group.children[5].children[1].content='1';
            group.visible = true;
            progress_bar.dashArray = [1000, 1000];
            enable_play_buttons();
            view.off('frame', framehandler)
        }
    }
    view.on('frame', framehandler);
}

function stoClr(group){
    ctrReg_box(group, 1, 4, 100, 300, 20);
    var bitbox = group.children[5].clone();
    bitbox.visible = true;
    bitbox.position.y +=40   
    bitbox.children[0].fillColor='lightblue';
    bitbox.children[0].strokeColor='white';
    bitbox.children[1].content='0';
    bitbox.children[2].content=' ';
    bitbox.children[3].content=' ';
    disable_play_buttons();
    flag[0] = 1;
    var offset = 0;
    var offset1 = 0;
    var path = new Path();
    path.add(bitbox.position);
    path.add(group.children[5].position);
    speed1=speed/5;
    var a = path.length/(speed1);
    bitbox.bringToFront();

    var framehandler = function(event){
           group.children[5].children[1].content='1';
        if(offset < path.length) {
            bitbox.position = path.getPointAt(offset);
            offset+=speed1;
            progress_bar.dashArray = [offset1, 1000];
            offset1+= progress_bar.length / (a);
        } else {
            flag[0] = 0;
            bitbox.removeChildren();
            group.children[5].children[1].content='0';
            group.visible = true;
            progress_bar.dashArray = [1000, 1000];
            enable_play_buttons();
            view.off('frame', framehandler)
        }
    }
    view.on('frame', framehandler);
}


function ctrRegBox_visible(status){
    regBox_group.visible = status;
    regBox_group1.visible = status;
}

function ctrRegBox_clear(){
    regBox_group.removeChildren();
    regBox_group1.removeChildren();
}

ctrRegBox_visible(false);

var SDA_ctr = new PointText(new Point(360,70));
SDA_ctr.content = '';
SDA_ctr.fontSize = 16;
SDA_ctr.fontWeight = 'bold';
SDA_ctr.fillColor = 'black';

var SCL_ctr = new PointText(new Point(360, 220));
SCL_ctr.content = '';
SCL_ctr.fontSize = 16;
SCL_ctr.fontWeight = 'bold';
SCL_ctr.fillColor = 'black';

var ClkNum = new PointText(new Point(600, 220));
ClkNum.content = '';
ClkNum.fontSize = 16;
ClkNum.fontWeight = 'bold';
ClkNum.fillColor = 'black';

function signalCtr(num1, num2){
    if(num1==0){
        SDA_ctr.content='SDA Master Control';
    }
    else if (num1==1){
        SDA_ctr.content='SDA Slave Control';
    }
    else if (num1==2){
        SDA_ctr.content='SDA Transmitter Control';
    }
    else if (num1==3){
        SDA_ctr.content='SDA Receiver Control';
    }
    else {
        SDA_ctr.content=' ';
    }
    if(num2==0){
        SCL_ctr.content='SCL Master Control';
    }
    else if (num2==1){
        SCL_ctr.content='SCL Slave Control';
    }
    else {
        SCL_ctr.content=' ';
    }

}

//draw start bit
var S_bit = new Group();
var S_box = new Rectangle(new Point(300, 75), new Size(50, 50));
var path = new Path.Rectangle(S_box);
S_bit.addChild(path);
path.fillColor = 'lightblue';
// path.strokeColor = 'black';
var Stext = new PointText(new Point(305, 95));
Stext.justification = 'left';
Stext.fillColor = 'black';
Stext.content = 'S bit';
Stext.fontSize = '16';
S_bit.addChild(Stext);
var path1=new Path();
path1.strokeColor='black';
path1.add(new Point(300, 100), new Point(320, 100), new Point(330, 120), new Point(350, 120) );
S_bit.addChild(path1);
S_bit.visible=false;

// Draw Stop bit
P_bit = S_bit.clone();
P_bit.children[1].content='P bit';
var path2=new Path();
path2.strokeColor='black';
path2.add(new Point(300, 120), new Point(320, 120), new Point(330, 100), new Point(350, 100) );
P_bit.children[2].remove();
P_bit.addChild(path2);


// Draw Clock Pulse bit
CLK9 = S_bit.clone();
CLK9.position=new Point(325, 160);
CLK9.children[1].content='CLK 9';
CLK9.children[1].fontSize=16;
var path3=new Path();
path3.strokeColor='black';
path3.add(new Point(300, 180), new Point(305, 180), new Point(320, 160), new Point(330, 160), new Point(345, 180), new Point(350, 180));
CLK9.children[2].remove();
CLK9.addChild(path3);
clkTxt=new PointText(new Point(325, 196));
clkTxt.justification = 'center';
clkTxt.fillColor = 'black';
clkTxt.content = '9';
CLK9.addChild(clkTxt);

// Draw master ACK bit
ACK_M = S_bit.clone();
ACK_M.children[1].content='ACK';
var path4=new Path();
path4.strokeColor='black';
path4.add(new Point(300, 120), new Point(350, 120) );
ACK_M.children[2].remove();
ACK_M.addChild(path4);

// Draw master NACK bit
NACK_M = ACK_M.clone();
NACK_M.children[1].content='NACK';
NACK_M.children[2].position.y -=20


// Draw slave ACK bit
ACK_S = ACK_M.clone();
ACK_S.children[0].fillColor='yellow';
ACK_S.position = new Point(735, 100);


//Define bit sending function

function sendBit(group, type){
    disable_play_buttons();
    flag[0] = 1;
    var offset = 0;
    var offset1 = 0;
    var init_x=group.position.x;
    var dest_x=group.position.x;
    var dest_y=group.position.y;
    if(type==0){
        dest_x +=447;
    }
    else{
        dest_x -=447;
    }

    var path = new Path();
    path.add(group.position);
    path.add(new Point(dest_x, dest_y));
    var speed1=speed*0.8
    var a = path.length/(speed1);
    group.bringToFront();
    slave_group.bringToFront();
    master_group.bringToFront();
    var framehandler = function(event){
           group.visible=true;
        if(offset < path.length) {
            group.position = path.getPointAt(offset);
            offset+=speed1;
            progress_bar.dashArray = [offset1, 1000];
            offset1+= progress_bar.length / (a);
        } else {
            flag[0] = 0;
            group.position.x=init_x;
            group.visible = false;
            progress_bar.dashArray = [1000, 1000];
            enable_play_buttons();
            view.off('frame', framehandler)
        }
    }
    view.on('frame', framehandler);
} 



// General Scenario function
function gen_scenario(num){
        switch(num){
         case 0: //I2C interface enable
            ctrReg_box(regBox_group, 1, 6, 100, 300, 20);
            move_bit(regBox_group, 6, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            scenario.content = 'I2C Interface Enable';
            break;
         case 1: //I2C interface disable
            ctrReg_box(regBox_group, 1, 6, 100, 300, 20);
            ctrReg_box(regBox_group1, 0, 6, 100, 400, 20);
            move_bit(regBox_group1, 6, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            conclr_path.visible=true;
            scenario.content = 'I2C Interface Disable';
            break;
         case 2: //Set STA Flag
            ctrReg_box(regBox_group, 1, 5, 100, 300, 20);
            move_bit(regBox_group, 5, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            scenario.content = 'Set STA Flag';
            break;  
          case 3: //Clear STA Flag
            ctrReg_box(regBox_group, 1, 5, 100, 300, 20);
            ctrReg_box(regBox_group1, 0, 5, 100, 400, 20);
            move_bit(regBox_group1, 5, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            conclr_path.visible=true;
            scenario.content = 'Clear STA Flag';
            break;
         case 4: //Set SI Flag
            ctrReg_box(regBox_group, 1, 3, 100, 300, 20);
            move_bit(regBox_group, 3, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            scenario.content = 'Set SI Flag';
            break; 
         case 5: //Clear SI Flag
            ctrReg_box(regBox_group, 1, 3, 100, 300, 20);
            ctrReg_box(regBox_group1, 0, 3, 100, 400, 20);
            move_bit(regBox_group1, 3, 20);
            conset_path.visible=true;
            conclr_path.visible=true;
            ctrRegBox_visible(true);
            // scenario.content = 'Clear SI Flag';
            break;  
         case 6: //Set STO Flag
            stoSet(regBox_group);
            regBox_group.visible=true;
            scenario.content = 'Set STO Flag';
            conset_path.visible=true;
            break; 
         case 7: //STO Flag Clear
            stoClr(regBox_group);
            regBox_group.visible=true;
            conset_path.visible=true;
            scenario.content = 'Clear STO Flag';
            break;    
         case 8: //Set AA Flag
            ctrReg_box(regBox_group, 1, 2, 100, 300, 20);
            move_bit(regBox_group, 2, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            scenario.content = 'Set AA Flag';
            break; 
         case 9: //Clear AA Flag
            ctrReg_box(regBox_group, 1, 2, 100, 300, 20);
            regBox_group.children[29].children[1].content='0';
            ctrReg_box(regBox_group1, 0, 2, 100, 400, 20);
            move_bit(regBox_group1, 2, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            conclr_path.visible=true;
            scenario.content = 'Clear AA Flag';
            break; 
         case 10: //Send Start Bit
            scl.visible=true;
            scl.position.y=scl_yPos;
            sendBit(S_bit, 0);
            break;
         case 11: //Send Stop Bit
            scl.visible=true;
            scl.position.y=scl_yPos;
            sendBit(P_bit, 0);
            break;  
         case 12: //Slave Send ACK Bit
            ACK_S.visible=true;
            CLK9.visible=true;
            sendBit(ACK_S, 1);
            sendBit(CLK9, 0);
            break;
        case 13: //Set STA Flag for Sr
            ctrReg_box(regBox_group, 1, 5, 100, 300, 20);
            regBox_group.children[6].children[1].content='1';
            move_bit(regBox_group, 5, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            scenario.content = 'Set STA Flag';
            break;  
        case 14: //Clear STA Flag and SI flag
            ctrReg_box(regBox_group, 1, 5, 100, 300, 20);
            regBox_group.children[6].children[1].content='1';
            regBox_group.children[6].children[3].content='SI';
            ctrReg_box(regBox_group1, 0, 5, 100, 400, 20);
            regBox_group1.children[6].children[3].content='SIC';
            move_bit(regBox_group1, 5, 20);
            move_bit(regBox_group1, 3, 20);
            ctrRegBox_visible(true);
            conset_path.visible=true;
            conclr_path.visible=true;
            scenario.content = 'Clear STA Flag';
            break;

        case 15: //LSB_Sensor diagram
            illustrate(all_waves, 7, 0);
            byte_control(0);
            ack_control(1);
            change_waveform('00001000');
            ack_or_nack('y');
            fill_num('000010000', number_text);
            stop_group.visible = false;
            show_read_diagram(1);
            move_waveform(read_diagram.children[1].position, read_diagram.children[1]);
            clock_pulse_control(0);
            clkPulseNum(1, pulseNum);
            break;

        case 16://Send Slave Address & W BIT
            illustrate(all_waves, 4, 1);
            show_en_diagram(0);
            start_control(0);
            byte_control(0);
            change_waveform('10001000');
            fill_num('100010000', number_text);
            read_or_write('w');
            clock_pulse_control(0);
            clkPulseNum(1, pulseNum);
            break;
        case 17:
            illustrate(all_waves, 5, 1);
            show_en_diagram(1);
            byte_control(0);
            // ack_control(1);
            // ack_or_nack('y');
            change_waveform('00000000');
            clkPulseNum(1, pulseNum);
            break;
        case 18:
            // temp_stop();
            show_en_diagram(2);
            illustrate(all_waves, 6, 1);
            byte_control(0);
            // ack_control(1);
            // stop_control(0);
            change_waveform('10000000');
            // ack_or_nack('y');
            fill_num('100000000', number_text);
            clkPulseNum(1, pulseNum);
            // stop_group.visible = true;
            break;
        case 19:
            show_en_diagram(2);
            illustrate(all_waves, 2, 1);
            byte_control(0);
            ack_control(1);
            stop_control(0);
            change_waveform('10000000');
            ack_or_nack('y');
            // fill_num('100000000', number_text);
            clkPulseNum(1, pulseNum);
            stop_group.visible = true;
            break;
        case 20:
            illustrate(all_waves, 5, 1);
            show_en_diagram(1);
            byte_control(0);
            // ack_control(1);
            // ack_or_nack('y');
            change_waveform('00001000');
            fill_num('000010000', number_text);
            clkPulseNum(1, pulseNum);
            break;
         case 21://Send Slave Address & W BIT
            illustrate(all_waves, 4, 1);
            // start_control(0);
            byte_control(0);
            // show_start();
            change_waveform('10001001');
            read_or_write('r');
            fill_num('100010010', number_text);
            clkPulseNum(1, pulseNum);
            show_read_diagram(2);
            break;

        case 22: //Read data from LSB_sensor
            illustrate(all_waves, 6, 1);
            byte_control(1);
            change_waveform('11001011');
            fill_num('110010111', number_text);
            show_read_diagram(3);
            clkPulseNum(1, pulseNum);
            break;
        case 23: //Master Send NACK Bit
            NACK_M.visible=true;
            CLK9.visible=true;
            sendBit(NACK_M, 0);
            sendBit(CLK9, 0);
            break;
        }
}

//Clock pulse sequence number
pulseNum = new Group();
function draw_PulseNum(group){
    var text = new PointText(new Point(335, 195));
    text.fillColor = 'black';
    text.content = ' ';
    group.insertChild(0, text);
    for(i = 1; i<= 9; i++){
        var text_clone = text.clone();
        text_clone.position += new Point(i*2*(clocklength+risedelay), 0);
        group.insertChild(i, text_clone);
        group.children[i].content = i;
        }
}
draw_PulseNum(pulseNum);
function clkPulseNum(num, group){
    if(num==1){   
            group.visible = true; 
        }         
    else{
            group.visible = false; 
        } 
}

//Switch cases for diagram 1 animation states
function enable_scenario(num) {
    switch(num){
        case 0:
            // all_waves.removeChildren();
            illustrate(all_waves, 0, 1);
            show_en_diagram(0);
            start_control(0);
            byte_control(0);
            ack_control(1);
            show_start();
            change_waveform('10001000');
            read_or_write('w');
            ack_or_nack('y');
            fill_num('100010000', number_text);
            clkPulseNum(1, pulseNum);
            break;
        case 1:
            // all_waves.removeChildren();
            // clearboxes();
            // clear_control();
            illustrate(all_waves, 0, 0);
            show_en_diagram(0);
            start_control(0);
            byte_control(0);
            ack_control(1);
            show_start();
            change_waveform('10001000');
            read_or_write('w');
            ack_or_nack('y');
            fill_num('100010000', number_text);
            clkPulseNum(1, pulseNum);
            move_waveform(set_1.position, en_diagram.children[0]);
            break;       
        case 2:
            // temp_stop();
            // all_waves.removeChildren();
            illustrate(all_waves, 1, 1);
            show_en_diagram(1);
            byte_control(0);
            ack_control(1);
            ack_or_nack('y');
            change_waveform('00000000');
            clkPulseNum(1, pulseNum);
            break;
        case 3:
            // all_waves.removeChildren();
            illustrate(all_waves, 1, 0);
            show_en_diagram(1);
            byte_control(0);
            ack_control(1);
            ack_or_nack('y');
            change_waveform('00000000');
            fill_num('000000000', number_text);
            clkPulseNum(1, pulseNum);
            // clearboxes();
            // clear_control();
            move_waveform(set_2.position, en_diagram.children[1]);
            break;
        case 4:
            // temp_stop();
            // all_waves.removeChildren();
            show_en_diagram(2);
            illustrate(all_waves, 2, 1);
            byte_control(0);
            ack_control(1);
            stop_control(0);
            change_waveform('10000000');
            ack_or_nack('y');
            fill_num('100000000', number_text);
            clkPulseNum(1, pulseNum);
            stop_group.visible = true;
            break;
        case 5:
            // all_waves.removeChildren();
            illustrate(all_waves, 2, 0);
            show_en_diagram(2);
            byte_control(0);
            ack_control(1);
            stop_control(0);
            change_waveform('10000000');
            ack_or_nack('y');
            fill_num('100000000', number_text);
            clkPulseNum(1, pulseNum);
            stop_group.visible = true;
            // clear_control();
            // clearboxes();
            move_waveform(set_3.position, en_diagram.children[2]);
            break;         
    }
}

// check here
function read_scenario(num) {
    switch(num){
        case 0:
            all_waves.removeChildren();
            // illustrate(all_waves, 0, 1);
            illustrate(all_waves, 0, 1);
            start_control(0);
            byte_control(0);
            ack_control(1);
            show_start();
            change_waveform('10001000');
            read_or_write('w');
            ack_or_nack('y');
            fill_num('100010000', number_text);
            clkPulseNum(1, pulseNum);
            show_read_diagram(0);
            break;
        case 1:
            all_waves.removeChildren();
            illustrate(all_waves, 0, 0);
            start_control(0);
            byte_control(0);
            ack_control(1);
            show_start();
            change_waveform('10001000');
            read_or_write('w');
            ack_or_nack('y');
            fill_num('100010000', number_text);
            clkPulseNum(1, pulseNum);
            // clearboxes();
            // clear_control();
            show_read_diagram(0);
            move_waveform(read_diagram.children[0].position, read_diagram.children[0]);
            break;       
        case 2:
            // temp_stop();
            all_waves.removeChildren();
            illustrate(all_waves, 2, 1);
            byte_control(0);
            ack_control(1);
            stop_control(0);
            change_waveform('00001000');
            ack_or_nack('y');
            fill_num('000010000', number_text);
            clkPulseNum(1, pulseNum);
            stop_group.visible = true;
            show_read_diagram(1);
            break;
        case 3:
            all_waves.removeChildren();
            illustrate(all_waves, 2, 0);
            byte_control(0);
            ack_control(1);
            stop_control(0);
            change_waveform('00001000');
            ack_or_nack('y');
            fill_num('000010000', number_text);
            clkPulseNum(1, pulseNum);
            stop_group.visible = true;
            // clearboxes();
            // clear_control();
            show_read_diagram(1);
            move_waveform(read_diagram.children[1].position, read_diagram.children[1]);
            break;     
        case 4:
            // temp_stop();
            all_waves.removeChildren();
            illustrate(all_waves, 0, 1);
            start_control(0);
            byte_control(0);
            ack_control(1);
            show_start();
            change_waveform('10001001');
            read_or_write('r');
            ack_or_nack('y');
            fill_num('100010010', number_text);
            clkPulseNum(1, pulseNum);
            show_read_diagram(2);
            break;
        case 5:
            all_waves.removeChildren();
            illustrate(all_waves, 0, 0);
            start_control(0);
            byte_control(0);
            ack_control(1);
            show_start();
            change_waveform('10001001');
            read_or_write('r');
            ack_or_nack('y');
            fill_num('100010010', number_text);
            clkPulseNum(1, pulseNum);
            // clearboxes();
            // clear_control();
            show_read_diagram(2);
            move_waveform(read_diagram.children[2].position, read_diagram.children[2]);
            break; 
        case 6:
            // temp_stop();
            all_waves.removeChildren();
            illustrate(all_waves, 2, 1);
            byte_control(1);
            ack_control(0);
            stop_control(0);
            change_waveform('11001011');
            ack_or_nack('n');
            fill_num('110010111', number_text);
            clkPulseNum(1, pulseNum);
            stop_group.visible = true;
            show_read_diagram(3);
            break;
        case 7:
            all_waves.removeChildren();
            illustrate(all_waves, 2, 0);
            byte_control(1);
            ack_control(0);
            stop_control(0);
            change_waveform('11001011');
            ack_or_nack('n');
            fill_num('110010111', number_text);
            clkPulseNum(1, pulseNum);
            stop_group.visible = true;
            // clearboxes();
            // clear_control();
            show_read_diagram(3);
            move_waveform(read_diagram.children[3].position, read_diagram.children[3]);
            break; 
    }
}

// New layer starts here(second animation) -------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
var layer2 = new Layer();

var t_height = 60;
var t_width = 20;
var clones = 4;
var small_radius = 8;
var big_radius = 25;
var small_gap = 3;
var spacing = 80;
var firstline = 20;
var secondline = 60;
var box_sides = 10;
var r_height = 20;
var r_length = 80;
t_box = new Group();
collection = new Group();
var device_array = [0,0];
var test_array = [0,0];
var coordinate = { x: [130, 130, 130, 130, 130, 150, 150], y: [80, 160, 240, 320, 400, 80, 240]}
var coordinate1 = { x: [130, 130, 130, 130, 130], y: [80, 160, 240, 320, 400]}

function light_up(num){
    for(i = 1; i<4; i++){
        if(i == num){
            reg_group.children[i].children[0].fillColor = 'green';
        } else {
            reg_group.children[i].children[0].fillColor = 'white';
        }
    }
}

function draw_2(path, coordinate, type){
    path.add(new Point(coordinate.x[type], coordinate.y[type]));
}
function right(coordinate, type) {
    coordinate.x[type]+= firstline;
}
function farright(coordinate, type) {
    coordinate.x[type]+= secondline;
}
function down(coordinate, type) {
    coordinate.y[type]+= spacing;
}
function up(coordinate, type) {
    coordinate.y[type]-= spacing;
}
function trafficgreen(num){
    for (var i = 0; i<5; i++){
        if(i == num){
            collection.children[i].children[3].fillColor= 'green';
            collection.children[i].children[1].fillColor= 'black';
            hor1.children[4-i].strokeColor = 'green';
        } else {
            collection.children[i].children[1].fillColor= 'red';
            collection.children[i].children[3].fillColor= 'black';
            hor1.children[4-i].strokeColor = 'red';
        }
    }
    switch(num) {
        case '0': case 0:
            ver1.children[0].strokeColor = 'red';
            ver1.children[1].strokeColor = 'red';
            ver1.children[2].strokeColor = 'green';
            ver1.children[3].strokeColor = 'green';
            across.strokeColor = 'green';
            break;  
        case '1': case 1:
            ver1.children[0].strokeColor = 'red';
            ver1.children[1].strokeColor = 'red';
            ver1.children[2].strokeColor = 'green';
            ver1.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break;      
        case '2': case 2:
            ver1.children[0].strokeColor = 'red';
            ver1.children[1].strokeColor = 'red';
            ver1.children[2].strokeColor = 'red';
            ver1.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break;  
        case '3': case 3:
            ver1.children[0].strokeColor = 'red';
            ver1.children[1].strokeColor = 'green';
            ver1.children[2].strokeColor = 'red';
            ver1.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break; 
        case '4': case 4:
            ver1.children[0].strokeColor = 'green';
            ver1.children[1].strokeColor = 'green';
            ver1.children[2].strokeColor = 'red';
            ver1.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break;   
        case '5': case 5:
            ver1.children[0].strokeColor = 'red';
            ver1.children[1].strokeColor = 'red';
            ver1.children[2].strokeColor = 'red';
            ver1.children[3].strokeColor = 'red';
            across.strokeColor = 'red';
            break;   

    }
}
function slavegreen(num){
    for (var i = 0; i<5; i++){
        if(i == num){
            hor2.children[4-i].strokeColor = 'green';
        } else {
            hor2.children[4-i].strokeColor = 'red';
        }
    }
    switch(num) {
        case '0': case 0: 
            ver2.children[0].strokeColor = 'red';
            ver2.children[1].strokeColor = 'red';
            ver2.children[2].strokeColor = 'green';
            ver2.children[3].strokeColor = 'green';
            across.strokeColor = 'green';
            break;  
        case '1': case 1:
            ver2.children[0].strokeColor = 'red';
            ver2.children[1].strokeColor = 'red';
            ver2.children[2].strokeColor = 'green';
            ver2.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break;      
        case '2': case 2:
            ver2.children[0].strokeColor = 'red';
            ver2.children[1].strokeColor = 'red';
            ver2.children[2].strokeColor = 'red';
            ver2.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break;  
        case '3': case 3:
            ver2.children[0].strokeColor = 'red';
            ver2.children[1].strokeColor = 'green';
            ver2.children[2].strokeColor = 'red';
            ver2.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break; 
        case '4': case 4:
            ver2.children[0].strokeColor = 'green';
            ver2.children[1].strokeColor = 'green';
            ver2.children[2].strokeColor = 'red';
            ver2.children[3].strokeColor = 'red';
            across.strokeColor = 'green';
            break;
        case '5': case 5:
            ver2.children[0].strokeColor = 'red';
            ver2.children[1].strokeColor = 'red';
            ver2.children[2].strokeColor = 'red';
            ver2.children[3].strokeColor = 'red';
            across.strokeColor = 'red';
            break;          
    }
}
function all_red(){
    light_up(0);
    trafficgreen(5);
    slavegreen(5);  
}

function change_value_item(text, rw){
    value_item.children[1].content = rw;
    for(var i = 0; i < 5; i++){
        prop_clones.children[i].children[3].content = text;
    }
    value_item.children[3].content = text;
    for(var i = 0; i < 5; i++){
        prop_clones.children[i].children[1].content = rw;
    }
}
function change_signal_item(rw){
    single_signal.children[1].content = rw;
    for(var i = 0; i < 5; i++){
        signal_clones.children[i].children[1].content = rw;
    }
}

function propagatefrom(path1, object, group, num) {
    disable_play_buttons();
    object.visible = true;
    var offset1 = 0;
    var offset2 = 0;
    var offset3 = 0;
    var total_length = path1.length + right_path.children[4].length;
    flag[0] = 1;
    var framehandler = function (event) {
        if (offset1< path1.length){
            object.position =path1.getPointAt(offset1)+ new Point(0,-9);
            offset1+=speed/2; // speed - 150px/second
            progress_bar.dashArray = [offset3, 1000];
            offset3+= progress_bar.length*(path1.length/total_length)/(path1.length/(speed/2));
        } else {
            group.visible = true;
            object.visible = false;
            progress_bar.dashArray = [offset3, 1000];
            offset3+= progress_bar.length*(right_path.children[4].length/total_length)/(right_path.children[4].length/(speed/2));
            for(var i = 0; i<5; i++){
                group.children[i].visible = true;
            }
            if(offset2<right_path.children[0].length){
                group.children[0].position =right_path.children[0].getPointAt(offset2)+ new Point(0,-9);
            } else {
                group.children[0].visible = false;
            }
            if(offset2<right_path.children[1].length){
                group.children[1].position =right_path.children[1].getPointAt(offset2)+ new Point(0,-9);
            } else {
                group.children[1].visible = false;
            }
            if(offset2<right_path.children[2].length){
                group.children[2].position =right_path.children[2].getPointAt(offset2)+ new Point(0,-9);
            } else {
                group.children[2].visible = false;
            }
            if(offset2<right_path.children[3].length){
                group.children[3].position =right_path.children[3].getPointAt(offset2)+ new Point(0,-9);
            } else {
                group.children[3].visible = false;
            }
            if(offset2<right_path.children[4].length){
                group.children[4].position =right_path.children[4].getPointAt(offset2)+ new Point(0,-9);
            } else {
                group.children[4].visible = false;
                light_up(num);
                flag[0] = 0;
                progress_bar.dashArray = [1000, 1000];
                enable_play_buttons();
                view.off('frame', framehandler);
            }
            offset2+=speed/2;
        }
    }
    view.on('frame', framehandler);
}

function movealong2paths(path1, path2, object, num, content_1, content_2) {
    disable_play_buttons();
    object.visible = true;
    var offset1 = 0;
    var offset2 = 0;
    var offset3 = 0;
    total_length = path1.length + path2.length;
    flag[0] = 1;
    var framehandler = function (event) {
        if (offset1< path1.length){
            object.position =path1.getPointAt(offset1)+ new Point(0,-9);
            offset1+= speed/2; 
            progress_bar.dashArray = [offset3, 1000];
            offset3+= progress_bar.length*(path1.length/total_length)/(path1.length/(speed/2));
        } else {
            if(offset2 < path2.length) {
                object.position =path2.getPointAt(offset2)+ new Point(0,-9);
                offset2+= speed/2; 
                progress_bar.dashArray = [offset3, 1000];
                offset3+= progress_bar.length*(path2.length/total_length)/(path2.length/(speed/2));
            } else {
                enable_play_buttons();
                object.visible = false;
                light_up(num);
                regaddress.children[2].content = content_1;
                regvalue.children[2].content = content_2;
                flag[0] = 0;
                progress_bar.dashArray = [1000, 1000];
                view.off('frame', framehandler);
            }
        }
    }
    view.on('frame', framehandler);
}
function movealong2paths_no_change(path1, path2, object, num) {
    disable_play_buttons();
    object.visible = true;
    var offset1 = 0;
    var offset2 = 0;
    var offset3 = 0;
    var total_length = path1.length + path2.length;
    flag[0] = 1;
    var framehandler = function (event) {
        if (offset1< path1.length){
            object.position =path1.getPointAt(offset1)+ new Point(0,-9);
            offset1+=speed/2;
            progress_bar.dashArray = [offset3, 1000];
            offset3+= progress_bar.length*(path1.length/total_length)/(path1.length/(speed/2));
        } else {
            if(offset2 < path2.length) {
                object.position =path2.getPointAt(offset2)+ new Point(0,-9);
                offset2+=speed/2; 
                progress_bar.dashArray = [offset3, 1000];
                offset3+= progress_bar.length*(path2.length/total_length)/(path2.length/(speed/2));
            } else {
                object.visible = false;
                light_up(num);
                flag[0] = 0;
                progress_bar.dashArray = [1000, 1000];
                enable_play_buttons();
                view.off('frame', framehandler)
            }
        }
    }
    view.on('frame', framehandler);
}
function stop_bit(path1, path2, object, num, content_1, content_2) {
    disable_play_buttons();
    object.visible = true;
    var offset1 = 0;
    var offset2 = 0;
    var offset3 = 0;
    var total_length = path1.length + path2.length;
    flag[0] = 1;
    var framehandler = function (event) {
        if (offset1< path1.length){
            object.position =path1.getPointAt(offset1)+ new Point(0,-9);
            offset1+= speed/2;
            progress_bar.dashArray = [offset3, 1000];
            offset3+= progress_bar.length*(path1.length/total_length)/(path1.length/(speed/2));
        } else {
            if(offset2 < path2.length) {
                object.position =path2.getPointAt(offset2)+ new Point(0,-9);
                offset2+= speed/2; 
                progress_bar.dashArray = [offset3, 1000];
                offset3+= progress_bar.length*(path2.length/total_length)/(path2.length/(speed/2));
            } else {
                object.visible = false;
                light_up(num);
                regaddress.children[2].content = content_1;
                regvalue.children[2].content = content_2;
                trafficgreen(5);
                slavegreen(5);
                flag[0] = 0;
                progress_bar.dashArray = [1000, 1000];
                enable_play_buttons();
                view.off('frame', framehandler);
            }
        }
    }
    view.on('frame', framehandler);
}
// function onFrame(event){
//     movealong2paths(left_path.children[4], 0, value_item, event);
// }

function reversealong2paths(path1, path2, object, num) {
    disable_play_buttons();
    object.visible = true;  
    var offset1 = path1.length;
    var offset2 = path2.length;
    var offset3 = 0;
    var total_length = path1.length + path2.length;
    flag[0] = 1;
    var framehandler = function (event) {
        if (offset1 > 0){
            object.position =path1.getPointAt(offset1)+ new Point(0,-9);
            offset1-= speed/2;
            progress_bar.dashArray = [offset3, 1000];
            offset3+= progress_bar.length*(path1.length/total_length)/(path1.length/(speed/2));
        } else {
            if(offset2 > 0) {
                object.position =path2.getPointAt(offset2)+ new Point(0,-9);
                offset2-= speed/2;
                progress_bar.dashArray = [offset3, 1000];
                offset3+= progress_bar.length*(path2.length/total_length)/(path2.length/(speed/2));
            } else {
                object.visible = false;
                light_up(num);
                flag[0] = 0;
                progress_bar.dashArray = [1000, 1000];
                enable_play_buttons();
                view.off('frame', framehandler)
            }
        }
    }
    view.on('frame', framehandler);
}


function transmit(first, second, num, reg_address, reg_value){
    trafficgreen(first);
    slavegreen(second);
    movealong2paths(left_path.children[4-first], right_path.children[second], value_item, num, reg_address, reg_value);
}
function transmit_no_change(first, second, num, object){
    trafficgreen(first);
    slavegreen(second);
    movealong2paths_no_change(left_path.children[4-first], right_path.children[second], object, num);
}
function transmit_stop(first, second, num, reg_address, reg_value){
    trafficgreen(first);
    slavegreen(second);
    stop_bit(left_path.children[4-first], right_path.children[second], single_signal, num, reg_address, reg_value);
}
function rtransmit(first, second, num, object){
    trafficgreen(first);
    slavegreen(second);
    reversealong2paths(right_path.children[second], left_path.children[4-first], object, num);
}
function propagate(first, num, object, group){
    trafficgreen(first);
    allslaves.strokeColor = 'green';
    propagatefrom(left_path.children[4-first], object, group, num);
}

function write_slave_address(RW, reg_address, reg_value){
    address = '0x44';
    change_value_item(address, RW)
    propagate(2, 1, value_item, prop_clones);
    regaddress.children[2].content = reg_address;
    regvalue.children[2].content = reg_value;
}
function slave_acknowledge(){
    light_up(0);
    address = '';
    read = 'A';
    change_signal_item(read);
    rtransmit(2, 4, 0, single_signal);
}
function slave_nacknowledge(){
    light_up(0);
    address = '';
    read = 'Ā';
    change_value_item(address, read);
    rtransmit(2, 4, 0, single_signal);
}
function master_acknowledge(){
    light_up(0);
    read = 'A';
    change_signal_item(read);
    transmit_no_change(2, 4, 0, single_signal);
}
function master_nacknowledge(){
    light_up(0);
    read = 'Ā';
    change_signal_item(read);
    transmit_no_change(2, 4, 0, single_signal);
}
function write_slave_reg_address(reg_address, reg_value){
    transmit(2, 4, 2, reg_address, reg_value);
}

function write_slave_reg_value(reg_address, reg_value){
    address = '0x80';
    read = '';
    change_value_item(address, read);
    transmit(2, 4, 3, reg_address, reg_value);
}
function read_slave_value(value, reg_address, reg_value){
    read = '';
    change_value_item(value, read)
    light_up(3);
    regaddress.children[2].content = reg_address;
    regvalue.children[2].content = reg_value;
    rtransmit(2, 4, 3, value_item);
}
function start_scene(){
    read = 'S';
    change_signal_item(read);
    reg_address = '';
    reg_value = '';
    propagate(2, 0, single_signal, signal_clones);
}
function complete_stop(){
    read = 'P';
    change_signal_item(read);
    transmit_stop(2, 4, 0, nth, nth);
}
function stop_scene(reg_address, reg_value){
    read = 'P';
    change_signal_item(read);
    transmit_stop(2, 4, 0, reg_address, reg_value);
}
function show_box_diagram(num){
    for(var i = 0; i < box_diagram.children.length; i++){
        if(i == num){
            box_diagram.children[i].visible = true;
        } else {
            box_diagram.children[i].visible = false;
        }
    }
}

function show_read_box_diagram(num){
    for(var i = 0; i < read_box_diagram.children.length; i++){
        if(i == num){
            read_box_diagram.children[i].visible = true;
        } else {
            read_box_diagram.children[i].visible = false;
        }
    }
}


function show_box_children(group, num){ 
    for(var i = 0; i< group.children.length; i++){
        if(i == num){
            group.children[i].opacity = 1;
            if(group.children[i].children.length == 3) {
                group.children[i].children[0].strokeColor = 'darkgreen';
                group.children[i].children[0].strokeWidth = 3;
                group.children[i].children[1].fillColor = 'black';
                group.children[i].children[2].fillColor = 'black';
            } else if(group.children[i].children.length == 2){
                group.children[i].children[0].children[0].strokeColor = 'darkgreen';
                group.children[i].children[0].children[0].strokeWidth = 3;
                group.children[i].children[0].children[1].fillColor = 'black';
                group.children[i].children[0].children[2].fillColor = 'black';
                group.children[i].children[1].children[0].strokeColor = 'darkgreen';
                group.children[i].children[1].children[0].strokeWidth = 3;
                group.children[i].children[1].children[1].fillColor = 'black';
                group.children[i].children[1].children[2].fillColor = 'black';
            }
        }
        else {
            group.children[i].opacity = 0.5;
            if(group.children[i].children.length == 3) {
                group.children[i].children[0].strokeColor = 'black';
                group.children[i].children[0].strokeWidth = 1;
                group.children[i].children[1].fillColor = 'black';
                group.children[i].children[2].fillColor = 'black';
            } else if(group.children[i].children.length == 2){
                group.children[i].children[0].children[0].strokeColor = 'black';
                group.children[i].children[0].children[0].strokeWidth = 1;
                group.children[i].children[0].children[1].fillColor = 'black';
                group.children[i].children[0].children[2].fillColor = 'black';
                group.children[i].children[1].children[0].strokeColor = 'black';
                group.children[i].children[1].children[0].strokeWidth = 1;
                group.children[i].children[1].children[1].fillColor = 'black';
                group.children[i].children[1].children[2].fillColor = 'black';
            }    
        }
    }
}

// function movealong1path(path, object){
//     object.visible = true;
//     var offset = 0;
//     flag[0] = 1;
//     object.onFrame = function (event) {
//         if (offset< path.length){
//             object.position =path.getPointAt(offset)+ new Point(0,-9);
//             offset+=event.delta*100; // speed - 150px/second
//         } else {
//             object.visible = false;
//             flag[0] = 0;
//         }
//     }
// }
// function reversealong1path(path, object){
//     object.visible = true;
//     var offset = path.length;
//     flag[0] = 1;
//     object.onFrame = function (event) {
//         if (offset> 0){
//             object.position =path.getPointAt(offset)+ new Point(0,-9);
//             offset-=event.delta*100; // speed - 150px/second
//         } else {
//             object.visible = false;
//             flag[0] = 0;
//         }
//     }
// }



var topleft = new Point(50,50);
var rectsize = new Size(t_width,t_height);
var rect = new Rectangle(topleft, rectsize);
var b_box = new Path.Rectangle(rect);
b_box.strokeColor = 'black';
b_box.fillColor = 'black';
t_box.addChild(b_box);
var path = new Path.Circle(new Point(60, 61), small_radius)
path.strokeColor = 'white';
t_box.addChild(path);
for(var i = 1; i<3; i++){
    var circleclone = path.clone();
    t_box.addChild(circleclone);
    circleclone.position +=new Point(0,i*(2*small_radius + small_gap));
}
collection.addChild(t_box);

for(var i = clones; i >=1; i--){
    var clone = t_box.clone();
    collection.addChild(t_box);
    clone.position += new Point(0, i*spacing);
}
//set all traffic to red
for (var i = 0; i<5; i++){
    collection.children[i].children[1].fillColor= 'red';
}
var master_devices = new Group();
var slave_devices = new Group();
var path = new Path.Circle(new Point(105,80), big_radius);
master_devices.addChild(path);
path.fillColor='lightblue';
for(var i = 1; i<5; i++){
    var circleclone = path.clone();
    circleclone.position +=new Point(0,i*spacing);
    master_devices.addChild(circleclone);
}

var slave_circle = path.clone();
slave_circle.fillColor = 'yellow';
slave_circle.position += new Point(firstline*2+secondline*2+big_radius*2, 0);
slave_devices.addChild(slave_circle);
for(var i = 1; i<5; i++){
    var circleclone = slave_circle.clone();
    circleclone.position +=new Point(0,i*spacing);
    slave_devices.addChild(circleclone);
}

var diagram2_button = diagram1_button.clone();
layer2.addChild(diagram2_button);
diagram2_button.position += new Point(-100, 0);

//invisible left lines drawing
var left_path = new Group()
var path = new Path();
left_path.addChild(path);
draw_2(path, coordinate1, 0);
right(coordinate1, 0);
draw_2(path, coordinate1, 0);
down(coordinate1, 0);
down(coordinate1, 0);
draw_2(path, coordinate1, 0);
farright(coordinate1, 0);
draw_2(path, coordinate1, 0);
var path = new Path();
left_path.addChild(path);
draw_2(path, coordinate1, 1);
right(coordinate1, 1);
draw_2(path, coordinate1, 1);
down(coordinate1, 1);
draw_2(path, coordinate1, 1);
farright(coordinate1, 1);
draw_2(path, coordinate1, 1);
var path = new Path();
left_path.addChild(path);
draw_2(path, coordinate1, 2);
right(coordinate1, 2);
farright(coordinate1, 2);
draw_2(path, coordinate1, 2);
var path = new Path();
left_path.addChild(path);
draw_2(path, coordinate1, 3);;
right(coordinate1, 3);
draw_2(path, coordinate1, 3);;
up(coordinate1, 3);
draw_2(path, coordinate1, 3);;
farright(coordinate1, 3);
draw_2(path, coordinate1, 3);;
var path = new Path();
left_path.addChild(path);
draw_2(path, coordinate1, 4);
right(coordinate1, 4);
draw_2(path, coordinate1, 4);
up(coordinate1, 4);
up(coordinate1, 4);
draw_2(path, coordinate1, 4);
farright(coordinate1, 4);
draw_2(path, coordinate1, 4);


//invisible right lines draw_2ing
var right_path = new Group()
var path = new Path();
right_path.addChild(path);
draw_2(path, coordinate1, 0);
farright(coordinate1, 0);
draw_2(path, coordinate1, 0);
down(coordinate1, 0);
down(coordinate1, 0);
draw_2(path, coordinate1, 0);
right(coordinate1, 0);
draw_2(path, coordinate1, 0);
var path = new Path();
right_path.addChild(path);
draw_2(path, coordinate1, 1);
farright(coordinate1, 1);
draw_2(path, coordinate1, 1);
down(coordinate1, 1);
draw_2(path, coordinate1, 1);
right(coordinate1, 1);
draw_2(path, coordinate1, 1);
var path = new Path();
right_path.addChild(path);
draw_2(path, coordinate1, 2);
farright(coordinate1, 2);
right(coordinate1, 2);
draw_2(path, coordinate1, 2);
var path = new Path();
right_path.addChild(path);
draw_2(path, coordinate1, 3);
farright(coordinate1, 3);
draw_2(path, coordinate1, 3);
up(coordinate1, 3);
draw_2(path, coordinate1, 3);
right(coordinate1, 3);
draw_2(path, coordinate1, 3);
var path = new Path();
right_path.addChild(path);
draw_2(path, coordinate1, 4);
farright(coordinate1, 4);
draw_2(path, coordinate1, 4);
up(coordinate1, 4);
up(coordinate1, 4);
draw_2(path, coordinate1, 4);
right(coordinate1, 4);
draw_2(path, coordinate1, 4);


//Visible lines draw_2ing to change colour 
var hor1 = new Group();
for(i = 0; i<=4; i++){
    var path = new Path();
    draw_2 (path, coordinate, i);
    right(coordinate, i);
    draw_2(path, coordinate, i); 
    hor1.addChild(path);   
}
hor1.strokeColor = 'red';

var ver1 = new Group();
for(i = 0; i<=3; i++){
    var path = new Path();
    draw_2 (path, coordinate, 5);
    down(coordinate, 5);
    draw_2(path, coordinate, 5); 
    ver1.addChild(path);   
}
ver1.strokeColor = 'red';

var ver2 = new Group();
farright(coordinate, 5);
farright(coordinate, 5);
for(i=0;i<4;i++){
    up(coordinate, 5);
}
for(i = 0; i<=3; i++){
    var path = new Path();
    draw_2 (path, coordinate, 5);
    down(coordinate, 5);
    draw_2(path, coordinate, 5); 
    ver2.addChild(path);   
}
ver2.strokeColor = 'red';


var across = new Group();
var path = new Path();
draw_2(path, coordinate, 6);
farright(coordinate, 6);
farright(coordinate, 6);
draw_2(path, coordinate, 6);
across.addChild(path);
across.strokeColor = 'red';

var hor2 = new Group();
for(i = 0; i<=4; i++){
    var path = new Path();
    farright(coordinate, i);
    farright(coordinate, i);
    draw_2 (path, coordinate, i);
    right(coordinate, i);
    draw_2(path, coordinate, i); 
    hor2.addChild(path);   
}
hor2.strokeColor = 'red';
var allslaves = new Group();
allslaves.addChild(hor2);
allslaves.addChild(ver2);


var reg_group = new Group();
var rect = new Rectangle(new Point(350, 50), new Size(200, 100));
var lightbox = new Path.Rectangle(rect);
lightbox.strokeColor = 'black';
reg_group.addChild(lightbox);
var val_group = new Group();
var rect = new Rectangle(new Point(460, 55), new Size(r_length, r_height));
var addressbox = new Path.Rectangle(rect);
addressbox.strokeColor = 'black';
val_group.addChild(addressbox);
var text = new PointText(new Point(360 + r_length/2, 55 +5 + r_height/2));
text.fillColor = 'black';
text.content = 'Slave Addr';
text.justification = 'center';
val_group.addChild(text)
clone = text.clone();
clone.content = '0x44'
clone.position += new Point(100,0);
val_group.addChild(clone);
reg_group.addChild(val_group);
regaddress = val_group.clone();
regaddress.children[1].content = 'Register Addr';
regaddress.children[2].content = '';
regaddress.position += new Point(0, 25);
reg_group.addChild(regaddress);
regvalue = val_group.clone();
regvalue.children[1].content = 'Register Value';
regvalue.children[2].content = '';
regvalue.position += new Point(0, 50);
reg_group.addChild(regvalue);



var value_item = new Group();
circle = new Path.Circle(40,30,4);
circle.strokeColor = 'green';

var rect = new Rectangle(new Point(18,9), new Size(31,15));
var databox = new Path.Rectangle(rect);
databox.strokeColor = 'black';

var rect = new Rectangle(new Point(18+31,9), new Size(15,15));
var readbox = new Path.Rectangle(rect);
readbox.strokeColor = 'black';

var text = new PointText(new Point(33,21));
text.fillColor = 'black';
text.content = '117';
text.justification = 'center';

var rw = text.clone();
rw.content = 'R';
rw.position += new Point(23,0);
value_item.addChild(databox);
value_item.addChild(rw);
value_item.addChild(readbox);
value_item.addChild(text);
value_item.addChild(circle);
value_item.visible = false;

var single_signal = new Group();
var rect = new Path.Rectangle(new Point(18+31,9), new Size(15,15));
rect.strokeColor = 'black';
var text = rw.clone();
var circle = circle.clone();
circle.position+= new Point(16,0);
single_signal.addChildren([rect, text, circle]);
single_signal.visible = false;


var prop_clones = new Group();
for(var i = 0; i < 5; i++){
    clone = value_item.clone();
    prop_clones.addChild(clone);
}

var signal_clones = new Group();
for(var i = 0; i < 5; i++){
    clone = single_signal.clone();
    signal_clones.addChild(clone);
}
signal_clones.visible = false;




prop_clones.visible = false;
// value_item.visible = false;
var z = 0;
var z1 = 0;
var z2 = 0;
var z3 = 0;
var z4 = 0;


var scene_num_1 = new PointText(new Point(200, 40));


function enable_scenario_2(num){
    switch(num) {
        case 0: case '0':
            start_scene();
            break;
        case 1: case '1':
            RW = 'W';
            reg_address = '';
            reg_value = '';
            write_slave_address(RW, reg_address, reg_value);
            break;  
        case 2: case '2':
            slave_acknowledge();
            break;      
        case 3: case '3':
            reg_address = '0x00';
            reg_value = '';
            address = '0x00';
            change_value_item(address, nth);
            write_slave_reg_address(reg_address, reg_value);
            break;  
        case 4: case '4':
            slave_acknowledge();
            break; 
        case 5: case '5':
            reg_address = '0x00';
            reg_value = '0x80';
            write_slave_reg_value(reg_address, reg_value);
            break;     
        case 6: 
            slave_acknowledge();
            break;
        case 7:
            complete_stop();
            break;
    }    
}
function read_scenario_2(num){
    switch(num) {
        case 0: case '0':
            start_scene();
            break;
        case 1: case '1':
            RW = 'W';
            reg_address = '';
            reg_value = '';
            write_slave_address(RW, reg_address, reg_value);
            break;  
        case 2: case '2':
            slave_acknowledge();
            break;      
        case 3: case '3':
            reg_address = '0x04';
            reg_value = '';
            address = '0x04';
            change_value_item(address, nth);
            write_slave_reg_address(reg_address, reg_value);
            break;  
        case 4: case '4':
            slave_acknowledge();
            break; 
        case 5: case '5':
            reg_address = '0x04';
            reg_value = ''; 
            stop_scene(reg_address, reg_value);
            break;    
        case 6: case '6':
            start_scene();
            break;
        case 7: case '7':
            RW = 'R';
            reg_address = '0x04';
            reg_value = '';
            write_slave_address(RW, reg_address, reg_value);
            break; 
        case 8: case '8':
            slave_acknowledge();
            break;
        case 9: case '9':
            reg_address = '0x04';
            reg_value = '';
            read_slave_value('0xCB', reg_address, '0xCB');
            break;
        case 10: case '10':
            master_nacknowledge();
            break;
        case 11: case '11':
            complete_stop();
            break;
    }    
}



layer2.visible = false;
layer1.visible = false;
//-------------------------------------------------Start layer 3------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
layer3 = new Layer();

btn2.onclick = function update(){
    if(speed>1){
        speed-=1;
    }
    document.getElementById("speed_text").innerHTML = speed;
}
btn1.onclick = function update(){
    speed+=1;
    document.getElementById("speed_text").innerHTML = speed;
}

function add_page(group, txt){
    page = new PointText(new Point(1040, 50));
    page.fontSize = 15;
    page.wordwrap(55, txt);
    group.addChild(page);
}
function show_page(num){
    for(var i=0; i<pages.children.length;i++){
        if(i==num-1){
            pages.children[i].visible = true;
        } else{
            pages.children[i].visible = false;
        }
    }
}


function show_read_page(num){
    for(var i=0; i<read_pages.children.length;i++){
        if(i==num-1){
            read_pages.children[i].visible = true;
        } else{
            read_pages.children[i].visible = false;
        }
    }
}


function write_message(message, type){
    content = '';
    if(type == 1) {
        content = 'right';
        content1 = 'Slave';
    }
    if(type == 0){
        content = 'left';
        content1 = 'Master';
    }
    chatMessages.push({
        name: "ms1",
        msg: message,
        delay: 500,
        align: content,
        showTime: true,
        time: content1
    });
}
function write_r_message(message, type){
    content = '';
    if(type == 1) {
        content = 'right';
        content1 = 'Slave';
    }
    if(type == 0){
        content = 'left';
        content1 = 'Master';
    }
    r_chatMessages.push({
        name: "ms1",
        msg: message,
        delay: 500,
        align: content,
        showTime: true,
        time: content1
    });
}

function onRowAdded() {
    $('.chat-container').stop(true, true).animate({
      scrollTop: $('.chat-container').prop('scrollHeight')
    });
  };

  function add_message(obj){
    chatDelay = chatDelay;
    chatDelay2 = chatDelay 
    chatDelay3 = chatDelay2 + 10;
    scrollDelay = chatDelay;
    chatTimeString = " ";
    msgname = "." + obj.name;
    msginner = ".messageinner-" + obj.name;
    spinner = ".sp-" + obj.name;
    if (obj.showTime == true) {
      chatTimeString = "<span class='message-time'>" + obj.time + "</span>";
    }
    $(".chat-message-list").append("<li class='message-" + obj.align + " " + obj.name + "' hidden><div class='sp-" + obj.name + "'><span class='spinme-" + obj.align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + obj.name + "' hidden><span class='message-text'>" + obj.msg + "</span>" + chatTimeString + "</div></li>");
    $(msgname).delay(chatDelay).fadeIn();
    $(spinner).delay(chatDelay).hide(1);
    $(msginner).delay(chatDelay).fadeIn();
    setTimeout(onRowAdded, 0);
}

function add_message_mass(group, num) {
    for(var i = 0; i<num; i++){
        chatTimeString = " ";
        msgname = "." + group[i].name;
        msginner = ".messageinner-" + group[i].name;
        spinner = ".sp-" + group[i].name;
        if (group[i].showTime == true) {
        chatTimeString = "<span class='message-time'>" + group[i].time + "</span>";
        }
        $(".chat-message-list").append("<li class='message-" + group[i].align + " " + group[i].name + "' hidden><div class='sp-" + group[i].name + "'><span class='spinme-" + group[i].align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + group[i].name + "' hidden><span class='message-text'>" + group[i].msg + "</span>" + chatTimeString + "</div></li>");
        $(msgname).show();
        $(spinner).hide(1);
        $(msginner).show();
        setTimeout(onRowAdded, 0);
    }
    chatDelay = chatDelay;
    chatDelay2 = chatDelay 
    chatDelay3 = chatDelay2 + 10;
    scrollDelay = chatDelay;
    chatTimeString = " ";
    msgname = "." + group[num].name;
    msginner = ".messageinner-" + group[num].name;
    spinner = ".sp-" + group[num].name;
    if (group[num].showTime == true) {
      chatTimeString = "<span class='message-time'>" + group[num].time + "</span>";
    }
    $(".chat-message-list").append("<li class='message-" + group[num].align + " " + group[num].name + "' hidden><div class='sp-" + group[num].name + "'><span class='spinme-" + group[num].align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + group[num].name + "' hidden><span class='message-text'>" + group[num].msg + "</span>" + chatTimeString + "</div></li>");
    $(msgname).delay(chatDelay).fadeIn();
    $(spinner).delay(chatDelay2).hide(1);
    $(msginner).delay(chatDelay3).fadeIn();
    setTimeout(onRowAdded, 0);
}
function add_message_mass_no_wait(group, num) {
    for(var i = 0; i<=num; i++){
        chatDelay = chatDelay;
        chatDelay2 = chatDelay 
        chatDelay3 = chatDelay
        scrollDelay = chatDelay;
        chatTimeString = " ";
        msgname = "." + group[i].name;
        msginner = ".messageinner-" + group[i].name;
        spinner = ".sp-" + group[i].name;
        if (group[i].showTime == true) {
        chatTimeString = "<span class='message-time'>" + group[i].time + "</span>";
        }
        $(".chat-message-list").append("<li class='message-" + group[i].align + " " + group[i].name + "' hidden><div class='sp-" + group[i].name + "'><span class='spinme-" + group[i].align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + group[i].name + "' hidden><span class='message-text'>" + group[i].msg + "</span>" + chatTimeString + "</div></li>");
        $(msgname).show();
        $(spinner).hide(1);
        $(msginner).show();
        setTimeout(onRowAdded, 0);
    }
}

function clear_messages(){
    $(".chat-message-list").empty();
}

// function feedback_button_glow(){
//     $('#feedback').addClass('glowing');
//     document.getElementById('feedback').style.color = 'white';
// }
// function feedback_button_not_glowing(){
//     $('#feedback').removeClass('glowing');
//     document.getElementById('feedback').style.color = 'gray';
// }

function show_layer(num){
    clear_messages();
    switch(num){
        case 1:
            layer1.visible = true;
            layer2.visible = false;
            break;
        case 2:
            value_item.visible = false;
            layer1.visible = false;
            layer2.visible = true;
            break;
        default:
            value_item.visible = false;
            layer1.visible = false;
            layer2.visible = false;
    }

}



function clear_waves(){
    all_waves.removeChildren();
}

function clear_all(){
    all_waves.removeChildren();
    number_text.removeChildren();
    clear_control();
    ctrRegBox_clear();
    show_en_diagram(0);
    show_read_diagram(0);
    show_box_diagram(99);
    show_read_box_diagram(99);
    clearboxes();
    all_red();
    signalCtr(5,5);
    ClkNum.content=' ';
    clkPulseNum(0, pulseNum);
    visibleSignal(false);
    value_item.visible = false;
    single_signal.visible = false;
}

// General
// default_status.onclick = function update(){
//     clear_all();
//     scene = 3;
//     scene_num = 0;
//     scene_num_1.content = scene_num;
//     testing.content = scene_num;
//     compiled_gen_scenario(scene_num);
//     show_read_page(0);
//     show_page(0);
// }

// start.onclick = function update(){
//     clear_all();
//     scene = 3;
//     scene_num = 1;
//     scene_num_1.content = scene_num;
//     testing.content = scene_num;
//     compiled_gen_scenario(scene_num);
//     show_read_page(0);
//     show_page(0);
// }

// clk_stretching.onclick = function update(){
//     clear_all();
//     scene = 3;
//     scene_num = 11;
//     scene_num_1.content = scene_num;
//     testing.content = scene_num;
//     compiled_gen_scenario(scene_num);
//     show_read_page(0);
//     show_page(0);
// }

// i2en.onclick = function update(){
//     clear_all();
//     scene = 3;
//     scene_num = 13;
//     scene_num_1.content = scene_num;
//     testing.content = scene_num;
//     compiled_gen_scenario(scene_num);
//     show_read_page(0);
//     show_page(0);
//     enable_play_buttons();
// }

// End of General

enable_btn.onclick = function update(){
    clear_all();
    scene = 1;
    // scenario.content = 'Enabling The Light Sensor';
    scene_num = 0;
    scene_num_1.content = scene_num;
    compiled_enable_scenario(scene_num);
}

enable_set_2.onclick = function update(){
    clear_all();
    scene = 1;
    scene_num = 16;
    compiled_enable_scenario(scene_num);
}

enable_set_3.onclick = function update(){
    clear_all();
    scene = 1;
    scene_num = 24;
    compiled_enable_scenario(scene_num);
}

read_btn.onclick = function update(){
    clear_all();
    scene = 2;
    scene_num = 0;
    compiled_read_scenario(scene_num);
}

read_set_2.onclick = function update(){
    clear_all();
    scene = 2;
    scene_num = 16;
    compiled_read_scenario(scene_num);
}

read_set_3.onclick = function update(){
    clear_all();
    scene = 2;
    scene_num = 25;
    compiled_read_scenario(scene_num);
}

read_set_4.onclick = function update(){
    clear_all();
    scene = 2;
    scene_num = 37;
    compiled_read_scenario(scene_num);
}


prev_btn.onclick = function update(){
    if(flag[0] == 0) {
        if( scene_num >= 1){
            scene_num--;
        }
        clear_all();
        if(scene == 1) {
            compiled_enable_scenario(scene_num);
        }
        else if(scene == 2) {
            compiled_read_scenario(scene_num);
        }
        else if(scene == 3) {
            compiled_gen_scenario(scene_num);
        }
    }
}


next_btn.onclick = function update(){
    // message_text.visible = true;
    if(flag[0] == 0) {
        clear_all();
        scene_num++;
        if(scene == 1) {
            compiled_enable_scenario(scene_num);
        }
        else if(scene == 2) {
            compiled_read_scenario(scene_num);
        }
        else if(scene == 3) {
            compiled_gen_scenario(scene_num);
        }
    }
}

play_btn.onclick = function update(){
    if(flag[0] == 0 && scene == 1) {
        clear_all();
        compiled_enable_scenario(scene_num);
    }
    else if(flag[0] == 0 && scene == 2) {
        clear_all();
        compiled_read_scenario(scene_num);
    }
    else if(flag[0] == 0 && scene == 3) {
        clear_all();
        compiled_gen_scenario(scene_num);
    }
}

function show_overlay(){
    document.getElementById('instructions_overlay').style.display = 'block';
    instruction_overlay.visible = true;
    pages.visible = false;
    read_pages.visible = false;
    scenario.content = ' ';
    ctrRegBox_clear();
    // document.getElementById('feedback').style.display = 'none';   
}
function hide_overlay(){
    document.getElementById('instructions_overlay').style.display = 'none';
    instruction_overlay.visible = false;  
    pages.visible = true;
    read_pages.visible = true;
}   

close_instructions.onclick = function update(){
    hide_overlay();
    document.getElementById('master_popup').style.display = 'block';
    show_read_page(0);
    show_page(0);
    disable_play_buttons();  
}

// close_prior.onclick = function update(){
    // document.getElementById('first_survey').style.display = 'none';   
//     document.getElementById('main').style.overflow = 'scroll';
//     show_overlay();
//     disable_play_buttons();  
// }

show_instruction.onclick = function update(){
    show_overlay();
    show_layer(0);  
    document.getElementById('master_popup').style.display = 'none';
    disable_play_buttons();
}

// feedback.onclick = function update(){
    // document.getElementById('last_survey').style.display = 'block';  
    // document.getElementById('main').style.overflow = 'hidden';
//     window.open('https://docs.google.com/forms/d/e/1FAIpQLSfsudw44xkbIPprUacfXZVv2Bh7PcKkoNJgQKEm0mIAG4tK3g/viewform?usp=sf_link', '_blank');
// }

// close_feedback.onclick = function update(){
    // document.getElementById('last_survey').style.display = 'none';   
    // document.getElementById('main').style.overflow = 'scroll';
// }

function disable_play_buttons(){
    document.getElementById('prev_btn').disabled = true;
    document.getElementById('next_btn').disabled = true;
    document.getElementById('play_btn').disabled = true;
}

function enable_play_buttons(){
    if(scene_num == 0) {
        document.getElementById('prev_btn').disabled = true;
    } else {
        document.getElementById('prev_btn').disabled = false;
    }
    if(scene_num == 51 && scene == 2) {
        document.getElementById('next_btn').disabled = true;
    } else if(scene_num == 36 && scene == 1) {
        document.getElementById('next_btn').disabled = true;
    } else {
        document.getElementById('next_btn').disabled = false;
    }
    document.getElementById('play_btn').disabled = false;
}

var scenario = new PointText(new Point(50,25));
scenario.content = '';
scenario.fontSize = 20;
scenario.fontWeight = 'bold';
scenario.fillColor = 'black';

var instruction_overlay = new Group();
var arrow = new Group();
var box = new Path.Rectangle(new Point(100,100), new Size(15,45));
box.fillColor = 'red';
var triangle = new Path.RegularPolygon(new Point(107, 100), 3, 20);
triangle.fillColor = 'red';
var tri1 = new Path.RegularPolygon(new Point(107, 75), 3, 20);
tri1.fillColor = 'red';
arrow.addChild(box);
arrow.addChild(triangle);
arrow.rotate(180); 
dbl_arrow=arrow.clone();
dbl_arrow.addChild(tri1);
dbl_arrow.visible=false;
arrow.position += new Point(305, 330);
instruction_overlay.addChild(arrow);
var text = new PointText(new Point (340, 400));
text.strokeColor = 'red';
text.fontSize = 15;
text.content = 'Controls and Progress Bar';
instruction_overlay.addChild(text);
var box = new Path.Rectangle(new Point(880,30), new Size(390, 242));
box.strokeColor = 'red';
instruction_overlay.addChild(box);
var instruction_text = text.clone();
instruction_text.content = 'Instructional text will be located here.';
instruction_text.position += (new Point(550, -375));
instruction_overlay.addChild(instruction_text);
menu_arrow = arrow.clone();
menu_arrow.rotate(180);
menu_arrow.position += new Point(-200, -400);
menu_text = instruction_text.clone();
menu_text.content = 'Menu';
menu_text.position += new Point(-695, 75);
// feedback_arrow = arrow.clone();
// feedback_arrow.position += new Point(650, 15);
// feedback_text = text.clone();
// feedback_text.content = 'Open Feedback Form';
// feedback_text.position += new Point(650, 15);


var progress_bar_wrapper = new Path();
progress_bar_wrapper.strokeColor = 'darkgray';
progress_bar_wrapper.strokeWidth = 20;
progress_bar_wrapper.add(new Point(80, 500));
progress_bar_wrapper.add(new Point(750, 500));

var progress_bar = new Path();
progress_bar.strokeColor = 'lightgray';
progress_bar.strokeWidth = 20;
progress_bar.add(new Point(80, 500));
progress_bar.add(new Point(750, 500));
progress_bar.visible = false;






message_text = new PointText(new Point(890, 300))
message_text.content = 'Show Message';
message_text.fontSize = 30;
message_text.visible = false;

var message_flag = 0;

var display_message = function(){
    if(message_flag == 0){
        document.getElementById('master_popup').style.display = 'block';
        message_flag = 1;
    } else if(message_flag == 1){
        document.getElementById('master_popup').style.display = 'none';
        message_flag = 0;
    }
}

// var display_diagram1_text = function(){

// }

message_text.on('mousedown', display_message);


message_text.on('mouseenter', function() {
    message_text.fillColor = 'grey';
});

message_text.on('mouseleave', function() {
    message_text.fillColor = 'black';
});

diagram1_button.on('mouseenter', function(){
    diagram1_button.children[0].fillColor = 'lightgray';
    diagram1_button.children[1].fillColor = 'darkgray';
    document.getElementById('diagram_1').style.display = 'block';
});

diagram1_button.on('mouseleave', function(){
    diagram1_button.children[0].fillColor = 'darkgray';
    diagram1_button.children[1].fillColor = 'black';
    document.getElementById('diagram_1').style.display = 'none';
});

diagram2_button.on('mouseenter', function(){
    diagram2_button.children[0].fillColor = 'lightgray';
    diagram2_button.children[1].fillColor = 'darkgray';
    document.getElementById('diagram_2').style.display = 'block';
});

diagram2_button.on('mouseleave', function(){
    diagram2_button.children[0].fillColor = 'darkgray';
    diagram2_button.children[1].fillColor = 'black';
    document.getElementById('diagram_2').style.display = 'none';
});

// diagram1_button.on('mousedown', display_diagram1_text)


pages = new Group();
read_pages = new Group();


//1 General Introduction
add_page(pages, "This application will be simulating the process of I2C communications between a Master and Slave for the purposes of enabling a LSB sensor. On the left you will see a waveform being drawn that will depict the data to be communicated between the Master and Slave. Any part of the diagram being highlighted in light blue is being controlled by the Master, while anything highlighted in yellow is being controlled by the Slave.");
//2 I2EN
add_page(pages, "First, there needs to write '1' to CONSET bit 6 to enable I2C interface, the default SDA and SCL are both at high");
//3 STA
add_page(pages, 'Then STA flag needs to be set by writting "1" to CONSET bit 5');
//4 Diagram introduction
add_page(pages, 'The diagram shows a 5 different master devices represented by blue circles, and 5 different slave devices represented by the yellow circles. As I2C is a half-duplex, serial communication, only one device can transmit at any point in time. Furthermore, there is collision detection and arbitration to allow for multiple masters. At any point when one master is communicating, no other masters will be able to communicate, this is represented by the traffic light which will show which master is communicating while the others are forced to stop. This diagram will show how each segment of the waveform shown earlier is transmitted.');
//5 Send START bit, STAC
add_page(pages, 'After the STA flag is set, the master will send out START bit, the START bit is SDA changes from high to low while SCL is at high. At the same time, STA flag is cleared by writting "1" to CONCLR bit 5. All slaves will start listening to the bus. As I2C communication is half-duplex, only one device can transmit at any time, in this way it is somewhat like having a conversation where each party has to affirm that they have received a message. The chat window below shows a conversation between the master and slave as each bit is sent across.');

//6  Send START bit, STAC
add_page(pages, 'The master send out the START bit and STA flag is cleared by writting "1" to CONCLR bit 5.');

//7  Set SI flag
add_page(pages, 'After the START bit is successfully sent, the SI flag is set by writting "1" to CONSET bit 3.');
//8 Send Slave Address with 'W' bit
add_page(pages, 'The master will now propagate the slave address it wants to communicate with onto the bus, for this demonstration, our top most is the Slave Address 0x44. The slave address is appended with "W" bit to show that the master want to write data to slave. At the same time, the SI flag is cleared by writting "1" to CONCLR bit 3');
//9 Send Slave Address with 'W' bit, clear SI flag
add_page(pages, 'The master sends out slave address appended with "w" bit, at the same time, the SI flag is cleared by writting "1" to CONCLR bit 3.');

//10 Receive ACK from Slave
add_page(pages, 'The slave then acknowledges that it has received the message by replying with an acknowledge bit "ACK", which is SDA low during the 9th clock pulse.');

//11 Set SI aft Receiving ACK from Slave
add_page(pages, 'Once ACK from slave is received, the I2C interrupt flag is set by writting "1" to CONSET bit 3.');

//12 Send Reg address and clear SI flag
add_page(pages, 'Next the master sends out the address of the command register on the light, which is 0x00, or 00000000. At the same time, the SI flag is cleared by writting "1" to CONCLR bit 3');
//13 SIC & send 1 Byte data
add_page(pages, 'The master then send a byte of data to write to command register. At the same time, the SI flag is cleared by writting "1" to CONCLR bit 3 ');
//14 Set STO
add_page(pages, 'If the master does not want to carry on the communication, the STO flag is set by writting "1" to CONSET bit 4. ');
//15 STOP
add_page(pages, 'The master then send out the STOP bit, which is SDA change from low to high while SCL is kept at high. At the same time, the interrupt flag is cleared.')
//16 STOC
add_page(pages, 'After the master send out the stop bit, the STO flag is self cleared.');

//1 General Description
add_page(read_pages, "This application will be simulating the process of I2C communications between a Master and Slave for the purposes of enabling a LSB sensor. On the left you will see a waveform being drawn that will depict the data to be communicated between the Master and Slave. Any part of the diagram being highlighted in light blue is being controlled by the Master, while anything highlighted in yellow is being controlled by the Slave.");
//2 I2EN
add_page(read_pages, "We will be simulating the process of reading from the light sensor. First, there needs to write '1' to CONSET bit 6 to enable I2C interface, the default SDA and SCL are both at high.");
//3 STA
add_page(read_pages, 'Then STA flag needs to be set by writting "1" to CONSET bit 5');
//4 Diagram Introduction
add_page(read_pages, "We will now proceed to view how each part of the signal is transmitted by the master/slave. To the left you can see a number of masters represented by the light blue circles, while slaves are represented by the yellow circles. As I2C is a half-duplex, serial communication, only one device can transmit at any point in time. Furthermore, there is collision detection and arbitration to allow for multiple masters. At any point when one master is communicating, no other masters will be able to communicate, this is represented by the traffic light which will show which master is communicating while the others are forced to stop.");
//5 Send START bit, STAC
add_page(read_pages, 'After the STA flag is set, the master will send out START bit, the START bit is SDA changes from high to low while SCL is at high. At the same time, STA flag is cleared by writting "1" to CONCLR bit 5. All slaves will start listening to the bus. As I2C communication is half-duplex, only one device can transmit at any time, in this way it is somewhat like having a conversation where each party has to affirm that they have received a message. The chat window below shows a conversation between the master and slave as each bit is sent across.');
//6  Set SI flag
add_page(read_pages, 'After the START bit is successfully sent, the SI flag is set by writting "1" to CONSET bit 3.');
//7 Send Slave Address with 'W' bit
add_page(read_pages, 'The master will now propagate the slave address it wants to communicate with onto the bus, for this demonstration, our top most is the Slave Address 0x44. The slave address is appended with "W" bit to show that the master want to write data to slave. At the same time, the SI flag is cleared by writting "1" to CONCLR bit 3');
//8 Receive ACK from Slave
add_page(read_pages, 'The slave then acknowledges that it has received the message by replying with an acknowledge bit "ACK", which is SDA low during the 9th clock pulse.');

//9
add_page(read_pages, 'The next step is for the Master to instruct the slave on the register it wants to access, in this case we want to read from LSB light sensor register address with address 0x04 or 00000100. This is followed by an acknowledge bit from the slave. A stop condition is not necessary as a (repeat) START condition can initiate a change in direction of communication. Before this, SI flag needs to be set.');
//10  Set SI flag
add_page(read_pages, 'After ACK from slave is received, the I2C interrupt flag is set by writting "1" to CONSET bit 3.');
//11 Send Reg address and clear SI flag
add_page(read_pages, 'Next the master sends out the address of LSB_sensor register on the light, which is 0x04, or 00000100. At the same time, the SI flag is cleared by writting "1" to CONCLR bit 3');
//12 Send START bit, STAC & SIC
add_page(read_pages, 'After the STA flag is set, the master will send out START bit, the START bit is SDA changes from high to low while SCL is at high. At the same time, STA flag is cleared by writting "1" to CONCLR bit 5, interrupt flag is cleared by writting "1" to CONCLR bit 3. All slaves will start listening to the bus again. This is one way to "claim" the bus.');
//13 Send Slave address with "R"
add_page(read_pages, 'The master then sends out slave address 0x44 appended with "R" bit. At the same time, the SI flag is cleared by writting "1" to CONCLR bit 3.');
//14 STA for Sr
add_page(read_pages, 'A repeat START condition to be setup when there is a change of direction within a transfer. In this case, change dirction from "write" to "read", needs to set STA flag by writting "1" to CONSET bit 5');

//15 Read LSB
add_page(read_pages, 'The slave sends data 11001011 or 0xCB to the master, at the same time, the SI flag is cleared.');
//16 NACK
add_page(read_pages, 'If we wanted to continue reading from the slave, we would transmit an acknowledge bit. In case the master needs to read from MSB_SENSOR after finish reading from LSB_SENSOR, a repeat START needs to send out, all the other steps would be same as reading from LSB_SENSOR. However, as we want to stop communications, a NACK bit is transmitted instead.');
//17 SI
add_page(read_pages, 'The interrupt flag is set after send out NACK.');
//18 STO
add_page(read_pages, 'The next step is to set STO flag by writting "1" to CONSET bit 4 before STOP condition "P" can be sent');
//19 STOP and Clear SI
add_page(read_pages, 'The STOP condition is sent after STO flag is set. At the same time, the SI flag is cleared.');
//20 Clear STO
add_page(read_pages, 'The STO flag is self cleared after STOP condition is sent');
//21 I2ENC
add_page(read_pages, 'If I2C no more in use, the I2C interface is disabled by writting "1" to CONCLR bit 6, the Master device exit "Master" status.');

show_read_page(0);
show_page(0);

var chatMessages = [];
var r_chatMessages = [];


write_message('Hello is anyone there?',  0);
write_message('I am looking for the light sensor, its address is 0x44, I want to transmit some data ', 0);
write_message('Yes, that is me', 1);
write_message('I want to access the command register', 0);
write_message('Okay then', 1);
write_message('Okay good, I would like to enable the ADC core', 0);
write_message('Sure, I have done that for you', 1);
write_message('Thank you, that will be all from me', 0);

write_r_message('Hello is anyone there?', 0);
write_r_message('I am looking for the light sensor, its address is 0x44, I want to transmit some data', 0);
write_r_message('Yes, that is me', 1);
write_r_message('I want to access light sensor data register', 0);
write_r_message('Okay then', 1);
write_r_message('Alright that will be all from me', 0);
write_r_message('Hello is anyone there?', 0);
write_r_message('I am looking for the light sensor, its address is 0x44, I want to read some data', 0);
write_r_message('Yes, that is me', 1);
write_r_message('Here is the data you requested', 1);
write_r_message('Thank you, I do not need any more data', 0);
write_r_message('That will be all from me', 0);

  var chatDelay = 0;
  
  




var path = new Rectangle(new Point(500,400), new Size(50,50));
var box = new Path.Rectangle(path);
box_diagram = en_diagram.clone();
box_diagram.children[0].position += new Point(-80, 100);
box_diagram.children[1].position += new Point(-240, 100);
box_diagram.children[2].position += new Point(-380, 100);
layer2.addChild(box_diagram);

read_box_diagram = read_diagram.clone();
read_box_diagram.children[0].position += new Point(40, 100);
read_box_diagram.children[1].position += new Point(-140, 100);
read_box_diagram.children[2].position += new Point(-280, 100);
read_box_diagram.children[3].position += new Point(-460, 100);
layer2.addChild(read_box_diagram);
// box_diagram.children[0].visible = true;

// var SCL_group = new Group();
// function SCL_overlay(){
//  var overlay = new Rectangle(new Point(200, 130), new Size(460, 75));
// var path = new Path.Rectangle(overlay);
// SCL_group.addChild(path);   
// }

// SCL_overlay();

     
function compiled_enable_scenario(num){
    hide_overlay();
    document.getElementById('master_popup').style.display = 'block';
    all_waves.removeChildren();
    regBox_group.removeChildren();
    regBox_group1.removeChildren();
    conset_path.visible=false;
    conclr_path.visible=false;
    enable_play_buttons();
    show_page(0);
    show_read_page(0);
    scene_num_1.content = scene_num;
    testing.content = scene_num;
    slave_group.position = new Point(823, 143);
    scenario.content = 'Enabling The Light Sensor';
    // document.getElementById('feedback').style.display = 'none';
    switch(num) {
        case 0:
            show_layer(1);
            show_page(1);
            break;
        case 1: //I2C ENABLE
            show_layer(1);
            gen_scenario(0);
            show_page(2);
            break;
        case 2://SET STA FLAG
            show_layer(1);
            gen_scenario(2);
            show_page(3);
            break;  
        case 3:
            show_layer(2);
            show_box_diagram(0);     
            show_box_children(box_diagram.children[0], 99);   
            show_page(4);
            scenario.content = 'Send Start Bit';
            break;      
        case 4:
            show_layer(2);
            all_red();
            change_signal_item('S');
            show_box_diagram(0);
            show_box_children(box_diagram.children[0], 0);
            move_to_position(left_path.children[2], box_diagram.children[0].children[0], single_signal);
            show_page(5);
            scenario.content = 'Send Start Bit';
            break;  
        case 5:
            show_layer(2);
            enable_scenario_2(0);
            show_box_diagram(0);
            show_box_children(box_diagram.children[0], 0);
            // add_message(chatMessages[0]);
            add_message_mass(chatMessages, 0);
            show_page(5);
            scenario.content = 'Send Start Bit';
            break;   
        case 6://SEND START BIT
            show_layer(1);
            gen_scenario(3);
            gen_scenario(10);
            add_message_mass_no_wait(chatMessages, 0);
            show_page(6);
            scenario.content = 'Send Start Bit, CLR STA';
            break; 

        case 7://SET SI FLAG
            show_layer(1);
            gen_scenario(4);
            show_page(7);
            break;   
        case 8:
            // temp_stop_2();
            show_layer(2);  
            change_value_item('0x44', 'W');
            show_box_diagram(0);
            show_box_children(box_diagram.children[0], 1);
            move_to_position(left_path.children[2], box_diagram.children[0].children[1], value_item);
            add_message_mass_no_wait(chatMessages, 0);
            show_page(8);
            scenario.content = 'Send Slave Address & "W" Bit';
            break;    
        case 9:
            show_layer(2);
            enable_scenario_2(1);
            show_box_diagram(0);
            show_box_children(box_diagram.children[0], 1);
            // add_message(chatMessages[1]);
            add_message_mass(chatMessages, 1);
            show_page(8);
            scenario.content = 'Send Slave Address & "W" Bit';
            break;
        case 10://SEND SLAVE ADDRESS N CLR SI
            show_layer(1);
            gen_scenario(5);
            gen_scenario(16);
            add_message_mass_no_wait(chatMessages, 1);
            show_page(9);
            scenario.content = 'Send Slave Address & "W" BIT, CLR SI';
            break;   
        case 11:
            show_layer(1);
            gen_scenario(12);
            add_message_mass(chatMessages, 2);
            show_page(10);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 12:
            // temp_stop_2();
            show_layer(2);
            change_signal_item('A');
            show_box_diagram(0);
            show_box_children(box_diagram.children[0], 2);
            move_to_position_2(right_path.children[4], box_diagram.children[0].children[2], single_signal);
            add_message_mass_no_wait(chatMessages, 2);
            show_page(10);
            scenario.content = 'Receive ACK from Slave';
            break; 
        case 13:
            show_layer(2);
            enable_scenario_2(2);
            show_box_diagram(0);
            show_box_children(box_diagram.children[0], 2);
            // add_message(chatMessages[2]);
            add_message_mass_no_wait(chatMessages, 2);
            show_page(10);
            scenario.content = 'Receive ACK from Slave';
            break; 
        case 14:
            show_layer(1);
            enable_scenario(1);
            add_message_mass_no_wait(chatMessages, 2);
            break; 
        case 15://SET SI FLAG after receiving ACK
            show_layer(1);
            gen_scenario(4);
            show_page(11);
            break;
        case 16:
            show_layer(2);
            add_message_mass(chatMessages, 3);
            show_box_diagram(1);
            show_box_children(box_diagram.children[1], 99);
            show_page(12);
            scenario.content = 'Send Register Address';
            break;
        case 17: 
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(chatMessages, 3);
            change_value_item('0x00', '');
            show_box_diagram(1);
            show_box_children(box_diagram.children[1], 0);
            move_to_position(left_path.children[2], box_diagram.children[1].children[0], value_item);
            show_page(12);
            scenario.content = 'Send Register Address';
            break; 
        case 18:
            show_layer(2);   
            enable_scenario_2(3);
            show_box_diagram(1);
            show_box_children(box_diagram.children[1], 0);
            // add_message(chatMessages[3]);
            add_message_mass_no_wait(chatMessages, 3);
            show_page(12);
            scenario.content = 'Send Register Address';
            break;
        case 19:
            show_layer(1);
            add_message_mass_no_wait(chatMessages, 3);
            gen_scenario(5);
            gen_scenario(17);
            show_page(12);
            scenario.content = 'Send Register Address, CLR SI';
            break;
        case 20:
            // temp_stop_2();
            show_layer(2);
            add_message_mass(chatMessages, 4);
            change_signal_item('A');
            show_box_diagram(1);
            show_box_children(box_diagram.children[1], 1);
            move_to_position_2(right_path.children[4], box_diagram.children[1].children[1], single_signal);
            show_page(10);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 21:
            show_layer(2);
            enable_scenario_2(4);
            show_box_diagram(1);
            show_box_children(box_diagram.children[1], 1);
            // add_message(chatMessages[4]);
            add_message_mass_no_wait(chatMessages, 4);
            scenario.content = 'Receive ACK from Slave';
            show_page(10);
            break;
        case 22:
            show_layer(1);
            gen_scenario(12);
            show_page(10);
            add_message_mass_no_wait(chatMessages, 4);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 23://SET SI FLAG
            show_layer(1);
            gen_scenario(4);
            show_page(11);
            break; 
        case 24:
            show_layer(2);
            add_message_mass(chatMessages, 5);
            show_box_diagram(2);
            show_box_children(box_diagram.children[2], 99);
            show_page(0);
            scenario.content ='Write to Resgister';
            break; 
        case 25:
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(chatMessages, 5);
            show_box_diagram(2);
            show_box_children(box_diagram.children[2], 0);
            change_value_item('0x80', '');
            move_to_position(left_path.children[2], box_diagram.children[2].children[0], value_item);
            show_page(0);
            scenario.content ='Write 1 Byte Data';
            break;
        case 26:
            show_layer(2);
            enable_scenario_2(5);
            show_box_diagram(2);
            show_box_children(box_diagram.children[2], 0);
            // add_message(chatMessages[5]);
            add_message_mass_no_wait(chatMessages, 5);
            show_page(0);
            scenario.content ='Write 1 Byte Data';
            break;  
        case 27:
            show_layer(1); 
            add_message_mass_no_wait(chatMessages, 5);
            gen_scenario(5);
            gen_scenario(18);
            show_page(13);
            scenario.content = 'Send 1 Byte Data, CLR SI';
            break;
        case 28:
            // temp_stop_2();
            show_layer(2);
            add_message_mass(chatMessages, 6);
            show_box_diagram(2);
            show_box_children(box_diagram.children[2], 1);
            change_signal_item('A');
            move_to_position_2(right_path.children[4], box_diagram.children[2].children[1], single_signal);
            show_page(10);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 29:
            show_layer(2);
            enable_scenario_2(6);
            show_box_diagram(2);
            show_box_children(box_diagram.children[2], 1);
            // add_message(chatMessages[6]);
            add_message_mass_no_wait(chatMessages, 6);            
            show_page(10);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 30://SET SI FLAG
            show_layer(1);
            gen_scenario(4);
            show_page(11);
            break; 
        case 31://SET STO FLAG
            show_layer(1);
            gen_scenario(6);
            show_page(14);
            break;
         case 32://Send STOP Bit, CLR SI
            show_layer(1);
            add_message_mass(chatMessages, 7);
            gen_scenario(5);
            gen_scenario(11);
            show_page(15);
            scenario.content = 'Send STOP Bit, CLR SI';
            break; 
        case 33:
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(chatMessages, 7);
            show_box_diagram(2);
            show_box_children(box_diagram.children[2], 2);
            change_signal_item('P');
            move_to_position(left_path.children[2], box_diagram.children[2].children[2], single_signal);
            show_page(15);
            scenario.content = 'Send Stop Bit';
            break;
        case 34:
            show_layer(2);
            enable_scenario_2(7);
            show_box_diagram(2);
            show_box_children(box_diagram.children[2], 2);
            add_message_mass_no_wait(chatMessages, 7);
            show_page(15);
            scenario.content = 'Send Stop Bit';
            break;
        case 35:
            show_layer(1);
            add_message_mass_no_wait(chatMessages, 7);
            enable_scenario(5);
            show_page(15);
            break;
         case 36://CLR STO
            show_layer(1);
            gen_scenario(7);
            show_page(16);
            scenario.content = 'CLR STO';
            break;  
    }    
}
function compiled_read_scenario(num){
    hide_overlay();
    document.getElementById('master_popup').style.display = 'block';
    // document.getElementById('feedback').style.display = 'none';
    all_waves.removeChildren();
    regBox_group.removeChildren();
    regBox_group1.removeChildren();
    conset_path.visible=false;
    conclr_path.visible=false;
    enable_play_buttons();
    show_page(0);
    show_read_page(0);
    scene_num_1.content = scene_num;
    testing.content = scene_num;
    slave_group.position = new Point(823, 143);
    scenario.content = 'Reading from The Light Sensor';
    switch(num){
        case 0:
            show_layer(1);
            show_read_page(1);
            break;
        case 1: //I2C ENABLE
            show_layer(1);
            gen_scenario(0);
            show_read_page(2);
            break;
        case 2://SET STA FLAG
            show_layer(1);
            gen_scenario(2);
            show_read_page(3);
            break;  
        case 3:
            show_layer(2);
            show_read_box_diagram(0);     
            show_box_children(read_box_diagram.children[0], 99);   
            show_read_page(4);
            scenario.content = 'Send Start Bit';
            break;      
        case 4:
            show_layer(2);
            all_red();
            change_signal_item('S');
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 0);
            move_to_position(left_path.children[2], read_box_diagram.children[0].children[0], single_signal);
            show_read_page(5);
            scenario.content = 'Send Start Bit';
            break;  
        case 5:
            show_layer(2);
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 0);
            read_scenario_2(0);
            // add_message(chatMessages[0]);
            add_message_mass(r_chatMessages, 0);
            show_read_page(5);
            scenario.content = 'Send Start Bit';
            break;   
        case 6://SEND START BIT
            show_layer(1);
            gen_scenario(3);
            gen_scenario(10);
            add_message_mass_no_wait(r_chatMessages, 0);
            show_read_page(5);
            scenario.content = 'Send Start Bit, CLR STA';
            break; 

        case 7://SET SI FLAG
            show_layer(1);
            gen_scenario(4);
            show_read_page(6);
            break;   
        case 8:
            // temp_stop_2();
            show_layer(2);  
            change_value_item('0x44', 'W');
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 1);
            move_to_position(left_path.children[2], read_box_diagram.children[0].children[1], value_item);
            add_message_mass_no_wait(r_chatMessages, 0);
            show_read_page(7);
            scenario.content = 'Send Slave Address & "W" Bit';
            break;    
        case 9:
            show_layer(2);
            read_scenario_2(1);
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 1);
            add_message_mass(r_chatMessages, 1);
            show_read_page(7);
            scenario.content = 'Send Slave Address & "W" Bit';
            break;
        case 10://SEND SLAVE ADDRESS N CLR SI
            show_layer(1);
            gen_scenario(5);
            gen_scenario(16);
            add_message_mass_no_wait(r_chatMessages, 1);
            show_read_page(7);
            scenario.content = 'Send Slave Address & "W" BIT, CLR SI';
            break;   
        case 11:
            show_layer(1);
            gen_scenario(12);
            add_message_mass(r_chatMessages, 2);
            show_read_page(8);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 12:
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 1);
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 2);
            change_signal_item('A');
            move_to_position_2(right_path.children[4], read_box_diagram.children[0].children[2], single_signal);
            show_read_page(8);
            scenario.content = 'Receive ACK from Slave';
            break; 
        case 13:
            show_layer(2);
            add_message_mass(r_chatMessages, 2);
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 2);
            read_scenario_2(2);
            show_read_page(8);
            scenario.content = 'Receive ACK from Slave';
            break; 
        case 14:
            show_layer(1);
            add_message_mass_no_wait(r_chatMessages, 2);
            read_scenario(1);
            show_read_page(9);
            break; 
        case 15://SET SI FLAG after receiving ACK
            show_layer(1);
            gen_scenario(4);
            show_read_page(10);
            break;
        case 16:
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 2);
            show_read_box_diagram(1);
            show_box_children(read_box_diagram.children[1], 99);
            show_read_page(11);
            scenario.content = 'Send LSB_SENSOR Address';
            break;
        case 17: 
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 2);
            change_value_item('0x04', '');
            show_read_box_diagram(1);
            show_box_children(read_box_diagram.children[1], 0);
            move_to_position(left_path.children[2], read_box_diagram.children[1].children[0], value_item);
            show_read_page(11);
            scenario.content = 'Send LSB_SENSOR Address';
            break; 
        case 18:
            show_layer(2);   
            add_message_mass(r_chatMessages, 3);
            show_read_box_diagram(1);
            show_box_children(read_box_diagram.children[1], 0);
            read_scenario_2(3);
            show_read_page(11);
            scenario.content = 'Send LSB_SENSOR Address';
            break;
        case 19:
            show_layer(1);
            add_message_mass_no_wait(r_chatMessages, 3);
            gen_scenario(5);
            gen_scenario(20);
            show_read_page(11);
            scenario.content = 'Send LSB_SENSOR Address, CLR SI';
            break;
        case 20:
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 3);
            change_signal_item('A');
            show_read_box_diagram(1);
            show_box_children(read_box_diagram.children[1], 1);
            move_to_position_2(right_path.children[4], read_box_diagram.children[1].children[1], single_signal);
            show_read_page(8);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 21:
            show_layer(2);
            read_scenario_2(4);
            show_read_box_diagram(1);
            show_box_children(read_box_diagram.children[1], 1);
            // add_message(chatMessages[4]);
            add_message_mass(r_chatMessages, 4);
            scenario.content = 'Receive ACK from Slave';
            show_read_page(8);
            break;
        case 22:
            show_layer(1);
            gen_scenario(12);
            show_read_page(8);
            add_message_mass_no_wait(r_chatMessages, 4);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 23:
            show_layer(1);
            gen_scenario(15);
            add_message_mass_no_wait(r_chatMessages, 4);
            scenario.content = 'Send LSB_Sensor & Receive ACK from Slave';
            break;
        case 24://SET SI FLAG
            show_layer(1);
            gen_scenario(4);
            show_read_page(10);
            break; 
        case 25://SET STA FLAG
            show_layer(1);
            gen_scenario(13);
            show_read_page(14);
            break;  
        case 26:
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 0);
            show_read_box_diagram(2);
            show_box_children(read_box_diagram.children[2], 99);   
            show_read_page(12);
            scenario.content = 'Send Start Bit';
            break;      
        case 27:
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 0);
            change_signal_item('S');
            show_read_box_diagram(2);
            show_box_children(read_box_diagram.children[2], 0);
            move_to_position(left_path.children[2], read_box_diagram.children[2].children[0], single_signal);
            show_read_page(12);
            scenario.content = 'Send Start Bit';
            break;  
        case 28:
            show_layer(2);
            add_message_mass(r_chatMessages, 0);
            show_read_box_diagram(2);
            show_box_children(read_box_diagram.children[2], 0);
            read_scenario_2(6);
            show_read_page(12);
            scenario.content = 'Send Start Bit';
            break;   
        case 29://SEND START BIT
            show_layer(1);
            gen_scenario(14);
            gen_scenario(10);
            add_message_mass_no_wait(r_chatMessages, 0);
            show_read_page(12);
            scenario.content = 'Send Start Bit, CLR STA & SI';
            break; 

        case 30://SET SI FLAG
            show_layer(1);
            gen_scenario(4);
            show_read_page(6);
            break;   
        case 31:
            // temp_stop_2();
            show_layer(2);  
            add_message_mass_no_wait(r_chatMessages, 6);
            change_value_item('0x44', 'R');
            show_read_box_diagram(2);
            show_box_children(read_box_diagram.children[2], 1);
            temp_container = new Group();
            move_to_position(left_path.children[2], read_box_diagram.children[2].children[1], value_item);
            show_read_page(13);
            scenario.content = 'Send Slave Address & "R" Bit';
            break;    
        case 32:
            show_layer(2);
            add_message_mass(r_chatMessages, 7);
            show_read_box_diagram(2);
            show_box_children(read_box_diagram.children[2], 1);
            read_scenario_2(7);
            show_read_page(13);
            scenario.content = 'Send Slave Address & "R" Bit';
            break;
        case 33://SEND SLAVE ADDRESS N CLR SI
            show_layer(1);
            gen_scenario(5);
            gen_scenario(21);
            add_message_mass_no_wait(r_chatMessages, 7);
            show_read_page(13);
            scenario.content = 'Send Slave Address & "R" BIT, CLR SI';
            break;   
        case 34:
            show_layer(1);
            gen_scenario(12);
            add_message_mass(r_chatMessages, 8);
            show_read_page(8);
            scenario.content = 'Receive ACK from Slave';
            break;
        case 35:
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 8);
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 2);
            change_signal_item('A');
            move_to_position_2(right_path.children[4], read_box_diagram.children[0].children[2], single_signal);
            show_read_page(8);
            scenario.content = 'Receive ACK from Slave';
            break; 
        case 36:
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 8);
            show_read_box_diagram(0);
            show_box_children(read_box_diagram.children[0], 2);
            read_scenario_2(2);
            show_read_page(8);
            scenario.content = 'Receive ACK from Slave';
            break; 
        case 37:
            show_layer(1);
            add_message_mass_no_wait(r_chatMessages, 8);
            read_scenario(5);
            // show_read_page(9);
            break; 
        case 38://SET SI FLAG after receiving ACK
            show_layer(1);
            gen_scenario(4);
            show_read_page(10);
            break;
        case 39:
            show_layer(1);
            add_message_mass(r_chatMessages, 9);
            gen_scenario(5);
            gen_scenario(22);
            show_read_page(15);
            scenario.content = 'Read from LSB_SENSOR and Clear SI';
            break;
        case 40:
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 9);
            show_read_box_diagram(3);
            show_box_children(read_box_diagram.children[3], 0);
            read_scenario_2(9);
            show_read_page(15);
            scenario.content = 'Read Data and Clear SI';
            break;
        case 41:
            // temp_stop_2();
            show_layer(2);
            add_message_mass(r_chatMessages, 10);
            change_signal_item('Ā');
            show_read_box_diagram(3);
            show_box_children(read_box_diagram.children[3], 1);
            move_to_position(left_path.children[2], read_box_diagram.children[3].children[1], single_signal);
            show_read_page(16);
            scenario.content = 'Send Ā';
            break;
        case 42:
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 10);
            show_read_box_diagram(3);
            show_box_children(read_box_diagram.children[3], 1);
            read_scenario_2(10);
            show_read_page(16);
            scenario.content = 'Send Ā';
            break;
        case 43: 
            show_layer(1);
            gen_scenario(23);
            add_message_mass_no_wait(r_chatMessages, 10);
            show_read_page(16);
            scenario.content = 'Send Ā';
            break;
        case 44:
            show_layer(1);
            gen_scenario(4);
            add_message_mass_no_wait(r_chatMessages, 10);
            show_read_page(17);
            break;
        case 45:
            show_layer(1);
            gen_scenario(6);
            add_message_mass_no_wait(r_chatMessages, 10);
            show_read_page(18);
            break;
        case 46:
            show_layer(1);
            gen_scenario(5);
            gen_scenario(11);
            add_message_mass_no_wait(r_chatMessages, 10);
            show_read_page(19);
            scenario.content = 'Send STOP Condition & Clear SI';
            break;
        case 47:
            // temp_stop_2();
            show_layer(2);
            add_message_mass_no_wait(r_chatMessages, 10);
            change_signal_item('P');
            show_read_box_diagram(3);
            show_box_children(read_box_diagram.children[3], 2);
            move_to_position(left_path.children[2], read_box_diagram.children[3].children[2], single_signal);
            show_read_page(19);
            scenario.content = 'Send STOP bit & Clear SI';
            break;
        case 48:
            show_layer(2);
            add_message_mass(r_chatMessages, 10);
            show_read_box_diagram(3);
            show_box_children(read_box_diagram.children[3], 2);
            read_scenario_2(11);
            show_read_page(19);
            scenario.content = 'Send STOP bit & Clear SI';
            break;
        case 49:
            show_layer(1); 
            add_message_mass_no_wait(r_chatMessages, 10);
            read_scenario(7);
            break;
        case 50:
            show_layer(1);
            gen_scenario(7);
            add_message_mass_no_wait(r_chatMessages, 10);
            show_read_page(20);
            break;
        case 51:
            show_layer(1);
            add_message_mass(r_chatMessages, 10);
            gen_scenario(1);
            show_read_page(21);
            break;
       
    }
}

var scene_num = 0;
testing.content = scene_num;
scene_num_1.content = scene_num;



//UI buttons



show_overlay();

disable_play_buttons();


// var window = new Group();
// window.addChild(layer1);
// window.addChild(layer2);
// window.addChild(layer3);

// function onResize(event){
//     window.fitBounds(view.bounds);
// }