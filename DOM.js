// Permite anadir una fila de contacto nueva
function AgregarContacto(event) {
    event.preventDefault()

    // Obteniendo los valores de los campos
    var nombre = document.getElementById('name').value
    var numero = document.getElementById('number').value

    if (nombre === '' || numero === '') {
        alert('Por favor introducir nombre y telefono')
    } else {


        // Obteniendo la referencia de la tabla
        var tbodyreference = document.getElementById('table-body')


        // en el siguiente for vamos a iterar para revisar todos los nodos de la tabla
        for(const tr of tbodyreference.querySelectorAll("tbody tr")) {
           
          // recuperamos los valores de la celda ()
          var nombre_que_existe = tr.querySelector("td:nth-child(1)");
          var telefono_primary_key = tr.querySelector("td:nth-child(2)");
          
          // evitamos error en caso de que no exista el nodo, ejemplo cuando es el primer registro
          if(!telefono_primary_key) {
            continue;
          }
          
          if (telefono_primary_key.innerHTML == numero) {
            
            nombre_que_existe.innerHTML = nombre;
            
            document.getElementById('name').value = ''
            document.getElementById('number').value = ''
            return;
          }
        }  
      
        // Creando Fila Nueva
        var filaNueva = tbodyreference.insertRow();

        // Anadiendo celda nombre
        var celdaNombre = filaNueva.insertCell();
        var nodoNombre = document.createTextNode(nombre);
        celdaNombre.appendChild(nodoNombre);

        // Anadiendo Celda Numero
        var celdaNumero = filaNueva.insertCell();
        var nodoNumero = document.createTextNode(numero);
        celdaNumero.appendChild(nodoNumero);

        //Añadir Boton Borrar
        var celdaBtn = filaNueva.insertCell();
        celdaBtn.classList.add('btn-x');
        var btnTd = document.createTextNode('borrar');
        celdaBtn.appendChild(btnTd);
        celdaBtn.addEventListener('click', e => {
            e.target.parentElement.remove();
        })

        // Añadir Boton Editar
        var celdaBtnE = filaNueva.insertCell();
        celdaBtnE.classList.add('btn-e');
        var btnTd2 = document.createTextNode("editar" );
        celdaBtnE.appendChild(btnTd2);
        celdaBtnE.addEventListener('click', () => { edit_row(numero,nombre) });

        document.getElementById('name').value = ''
        document.getElementById('number').value = ''

    }
}

function edit_row(prm_numero,prm_nombre)
{
 document.getElementById('name').value = prm_nombre ;
 document.getElementById('number').value = prm_numero;
}

document.querySelector('.btn-add').addEventListener("click", AgregarContacto);
