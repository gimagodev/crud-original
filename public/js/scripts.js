const webApiDomain = 'http://localhost:3000'

$( document ).ready( function() {

    loadTable();

   // $( '#divCadastro' ).hide()
    $('#divListagem,.alert').hide()

    $( '#btnListar,#btnCadastrar' ).click( function() {
        $( '#divListagem, #divCadastro' ).toggle()
    })

    $( 'form' ).submit( function( event ) {

        event.preventDefault()

        if ( $( 'input[name="nome"]' ).val() === ''
            || $( 'input[name="idade"]' ).val() === '') {
                alert("dados incompletos")
                // $('.alert-danger').show(1000, function() {
                //     // setTimeout( function() { $('.alert-danger').hide(1000) }, 2000 )
                // })
                return
        }
        
        const data = $( this ).serializeArray()

        updateDatabase( data, loadTable )
        $( '#divListagem, #divCadastro' ).toggle()
       
    })

/*
    $( 'form' ).submit( function( event ) {
        const data = $( this ).serializeArray()

        updateDatabase( data, loadTable )
        $( '#divListagem, #divCadastro' ).toggle()
        event.preventDefault()
    })
*/
    $('table').on('click', 'a[class="btn btn-xs btn-danger"]', function() {
        if( confirm( 'Tem certeza que deseja excluir este cliente?')) {
            const input = $(this)
            const id = input.attr('data-id')
            deleteCustomer(id, function() {
                input.closest( 'tr' ).remove()
            })
        }
        return false
    } )

})

function updateDatabase( data, callback ) {

    const json = {}
    data.forEach( item => json[ item[ 'name' ] ] = item[ 'value' ] )

    $.post(webApiDomain + '/clientes', json, function( data ) {
      
        alert("Cliente cadastrado com sucesso!")
        $('.alert-success').html('<strong>Sucesso!</strong> Cliente cadastrado comsucesso!')
        // $('.alert-success').show(1000, function() {
        //     setTimeout( function() 
        //         { 
        //             $('.alert-success').hide(1000)
        //         },
        //         2000
        //     ) 
        // })  
        callback()
    })
}

function loadTable() {
    const tbody = $( 'table > tbody' )
    tbody.empty()

    $.getJSON( webApiDomain + '/clientes', function( data ) {
        data.forEach( item => {
            let linha = '<td>' + item.nome + '</td><td>' + 
            item.idade + '</td><td>' + item.uf + '</td>'
            tbody.append( '<tr>' + linha + '<td><a href="#" class="btn btn-xs btn-danger" data-id="'
            +item._id+'"><span class="glyphicon glyphicon-remove"></span></a></td></tr>')
        })
    })
}

function deleteCustomer( id, callback ) {
    $.ajax ( {
        url     : webApiDomain + '/clientes/' + id,
        method  : 'DELETE',
        success : function( result ) {
            alert(' Cliente excluído com sucesso-aqui ')
            callback()
        }
    })
}


