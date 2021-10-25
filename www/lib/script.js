var api = 'bb560ac25813234aa20b1470348c4943';
var linkArtista = '';

$(document).on('click', '#pesquisaArtista', function(){
  var url = 'https://api.vagalume.com.br/search.art?apikey='+api+'&q='+$('#buscaArtista').val()+'&limit=10';
  $('#resulArtista').html("");
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      var datas = JSON.parse(data); 
      for(i=0; i<10;i++){
        var nome = (datas.response.docs[i].band).replace(" ", "-");
        nome = nome.trim();
        nome = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        var link = "https://www.vagalume.com.br/"+nome.toLowerCase();
        var linha = '<a href="'+link+'" class="btn col-12 resultados border-top border-bottom"><img src="https://www.vagalume.com.br'+datas.response.docs[i].url+'images/profile.jpg" alt="" class="img rounded-pill col-12"> <div class="col-12" align="center"> <h3 class="artistaNome">'+datas.response.docs[i].band+'</h3> </div> </a>';
        $('#resulArtista').append(linha);
      }
    }
  });
});

$(document).on('click', '#pesquisaMusica', function(){
  var url = 'https://api.vagalume.com.br/search.excerpt?apikey='+api+'&q='+$('#buscaMusica').val()+'&limit=10';
  $('#resulMusica').html("");
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      var datas = JSON.parse(data); 
      for(i=0; i<10;i++){
        titulo = datas.response.docs[i].title;
        banda = datas.response.docs[i].band;

        var linha = '<button class="btn col-12 resultados border-top border-bottom" onClick="escolhaMusica('+i+')" value="'+i+'"><div class="row"><h3>'+titulo+'</h3></div> <div class="row"><p>'+banda+'</p></div></div> </button>';
        $('#resulMusica').append(linha);
      }      
    }
  });
});

function escolhaArtista(i){
  var url = 'https://api.vagalume.com.br/search.excerpt?apikey='+api+'&q='+$('#buscaArtista').val()+'&limit=10';

  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      var datas = JSON.parse(data); 

      banda = datas.response.docs[i].band;

      $('#buscaArtista').val(banda);
      window.scrollTo(0, 0);

      banda = $('#buscaArtista').val();
      $("#linkDados").val(datas.response.docs[i].url);
    }
  })
  window.scrollTo(0, 0); 
}



function escolhaMusica(i){
  var endereco = 'https://api.vagalume.com.br/search.excerpt?apikey='+api+'&q='+$('#buscaMusica').val()+'&limit=10';

  $.ajax({
    type: "GET",
    url: endereco,
    success: function(data) {
      var datas = JSON.parse(data); 

      titulo = datas.response.docs[i].title;
      banda = datas.response.docs[i].band;

      $("#pesquisaNomeM").val(titulo);
      $("#pesquisaNomeA").val(banda);

      $("#encontrarMusica").css("color","#00C851");
      window.scrollTo(0, 0);
      $("#pesquisaNomeM").css("background","#cecece");
      $("#pesquisaNomeA").css("background","#cecece");
    }
  })
}

$(document).on("click","#encontrarMusica", function(){
  var artist = $("#pesquisaNomeA").val();
  var song   = $("#pesquisaNomeM").val();
  jQuery.getJSON(
      "https://api.vagalume.com.br/search.php"
          + "?art=" + artist
          + "&mus=" + song
          + "&apikey=" + api,
      function (data) {
          var letra = data.mus[0].text;
          $("#letraMusica").html(letra);     
      }
  );  
  $("#nomeMusica").html("<h5>"+song+"</h5>");
  $("#nomeMusica").append("<p>"+artist+"</p>");
});

var x = true;

$(document).on("click","#traduzir", function(){
  var artist = $("#pesquisaNomeA").val();
  var song = $("#pesquisaNomeM").val();
  jQuery.getJSON(
      "https://api.vagalume.com.br/search.php"
          + "?art=" + artist
          + "&mus=" + song
          + "&apikey=" + api,
      function (data) {
        if(x == true){
          var texto = data.mus[0].translate[0].text;
          $("#letraMusica").html(texto);   
          $("#traduzir").html("Original");
          x = false;
        }  
        else{
          var texto = data.mus[0].text;
          $("#letraMusica").html(texto);   
          $("#traduzir").html("Traduzir");
          x = true;
        }
      }
  );
});
