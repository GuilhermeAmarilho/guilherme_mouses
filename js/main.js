const min = document.getElementById('min');
const max = document.getElementById('max');
const med = document.getElementById('med');
const median = document.getElementById('median');
const amp = document.getElementById('amp');
const val = document.getElementById('valores');
const desvp = document.getElementById('dp');
const divBarras = document.getElementsByClassName('barras')[0];
document.getElementsByClassName('add')[0].addEventListener('click', function () {
  Dados.valores.push(parseInt(document.getElementById('add').value));
  Dados.atualizaView();
});
document.getElementsByClassName('classe')[0].addEventListener('click', function () {
  var x=[document.getElementById('name').value,parseInt(document.getElementById('de').value),parseInt(document.getElementById('ate').value),0];
  if (x[1]==0){x[1]=-0.1}
  a=document.createElement('div');
  a.classList.add('barra');
  p=document.createElement('p');
  p.innerText=0;
  a.appendChild(p);
  divBarras.appendChild(a);
  b=document.createElement('td');
  b.innerText=x[0];
  document.querySelector('tr').appendChild(b);
  Dados.classes.push(x)
  Dados.atualizaView();
});
var Dados = {
  valores: [],
  classes: [["N/C",,,0]],
  get min(){
    return this.valores[0];
  },
  get mediana() {
    return mediana(this.valores);
  },
  get amplitude() {
    return this.max - this.min;
  },
  get max() {
    return this.valores[this.valores.length-1];
  },
  get media() { // média aritmética
    return media(this.valores);
  },
  get dp(){
    return dp(this.valores);
  },
  atualizaView: function () {
    if (this.valores.length>0) {
    var p=document.querySelectorAll('p')
    var div=document.getElementsByClassName('barra')
    this.valores= this.valores.sort(sortfunction);
    val.value= this.valores;
    max.value= this.max;
    min.value= this.min;
    median.value= this.mediana;
    med.value= this.media;
    amp.value= this.amplitude;
    desvp.value = this.dp;
    zera(this.classes);
    this.classes=roda(this.classes,this.valores);
    molde(div,p,this.classes);
    }
  }
}
function sortfunction(a, b){
  return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
}
function mediana(valor){
  if (valor.length%2==1) {
    return valor[parseInt(valor.length/2)];
  }
  if (valor.length%2==0) {
    return (valor[valor.length/2-1]+valor[parseInt(valor.length/2)]/2);
  }
}
function media(valor){
  for(i=0,a=0;i<valor.length;i++){
    a+=(valor[i]);
}
  var media = a/valor.length;
  return media;
}
function dp(valor){
  for (var i = 0, a=0; i<valor.length; i++) {
    a += Math.pow((valor[i])-media(valor), 2);
  }
  var dp = Math.sqrt(parseInt(a)/valor.length);
  return dp;
}
function zera(classes){
  for (var i = 0; i < classes.length; i++) {
    classes[i][3]=0;
  }
  return classes;
}
function roda(classes,valor){
  a=[0,];b=0;
  for (j=1 ;  j<classes.length ; j++){
    for (i = 0, a.push(0) ; i < valor.length ; i++) {
      if ((valor[i]>classes[j][1])&&(valor[i]<=classes[j][2])) {
        a[j]++;b++;
      }
    }
  }
  if (b<valor.length) {
    a[0]=valor.length-b;
  }
  for (var i = 0; i < a.length; i++) {
    classes[i][3]=a[i];
  }
  return classes;
}
function molde(div,p,classes){
  for (var i = 0,b=classes[i][3]; i < classes.length; i++) {
    if (b<classes[i][3]) {
      b=classes[i][3]
    }
  }
  a=[]
  for (var i = 0; i < classes.length; i++) {
    a[i]=classes[i][3];
    p[i].innerText=a[i];
    tamanho=a[i]/b*100;
    console.log(tamanho);
    div[i].style.width=`${tamanho}%`;
  }
}
