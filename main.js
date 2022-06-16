function initLocalClocks() {
    // Obtener la hora local usando JS
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    // Creacion de un objeto de cada manecilla y su angulo en grados
    var hands = [
        {
            hand: "hours",
            angle: hours * 30 + minutes / 2,
        },
        {
            hand: "minutes",
            angle: minutes * 6,
        },
        {
            hand: "seconds",
            angle: seconds * 6,
        },
    ];
    //Ciclo para cada una de las manecillas para obtener su angulo
    for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll("." + hands[j].hand);
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform =
                "rotateZ(" + hands[j].angle + "deg)";
            elements[k].style.transform = "rotateZ(" + hands[j].angle + "deg)";
            // Si se trata del minutero, observe la posición de los segundos (para calcular la posición de los minutos más adelante)
            if (hands[j].hand === "minutes") {
                elements[k].parentNode.setAttribute(
                    "data-second-angle",
                    hands[j + 1].angle
                );
            }
        }
    }
}
initLocalClocks();
//  ----------------------------------------------------------------------

//HACER QUE SE MUEVA EL MINUTERO.
//Establecer un tiempo de espera para el primer movimiento de la manecilla de minutos(menos de 1 minuto), para luego girarlo cada minuto.
function setUpMinuteHands() {
    // Encontrar qué tan lejos en el minuto estamos
    var containers = document.querySelectorAll(".minutes-container");
    var secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {
        //Establecer un tiempo de espera hasta el final del minuto actual, para mover la mano
        var delay = ((360 - secondAngle) / 6 + 0.1) * 1000;
        setTimeout(function () {
            moveMinuteHands(containers);
        }, delay);
    }
}
setUpMinuteHands();
//  ----------------------------------------------------------------------

//Haz la rotación del primer minuto
function moveMinuteHands(containers) {
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = "rotateZ(6deg)";
        containers[i].style.transform = "rotateZ(6deg)";
    }
    // Continuar luego de un intervalo de 60 segundos.
    setInterval(function () {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 12;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform =
                "rotateZ(" + containers[i].angle + "deg)";
            containers[i].style.transform =
                "rotateZ(" + containers[i].angle + "deg)";
        }
    }, 60000);
}
moveMinuteHands();
//  ----------------------------------------------------------------------

//HACER QUE SE MUEVA EL SEGUNDERO Y AGREGAR REBOTE.
/*function moveSecondHands() {
    var containers = document.querySelectorAll(".seconds-container");
    setInterval(function () {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 6;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform =
                "rotateZ(" + containers[i].angle + "deg)";
            containers[i].style.transform =
                "rotateZ(" + containers[i].angle + "deg)";
        }
    }, 1000);
}
moveMinuteHands();*/
