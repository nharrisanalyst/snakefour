



class Snake {
    constructor(){
      this.length=3;
      this.head = [4,6];
      var start=Math.random()*2>1?'down':'right';
       this.tail=[];

       for(var i =0; i<2;i++){
        if(start==='down'){
          this.tail.push([this.head[0]-(i+1),this.head[0]]);
           }
        if(start==='right'){
           this.tail.push(this.head[0],this.head-(i+1))
          }
       }




    }
    move(dir){
      const no_Move={R:'L',L:'R',U:'D',D:'U'};



    }

}
