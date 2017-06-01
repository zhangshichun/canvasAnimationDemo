/**
 * Created by zhangsc on 2017/5/25.
 */
var canvasPoint=function() {
    var id;
    var cssHeight;
    var canvasHeight;
    var cssWidth;
    var canvasWidth;
    var pointList;
    var context;
    var itemWidth;

    function init(_id,_option) {
        id=_id;
        var a=(_option.height||(console.error("canvas point need a height"),false))
            &&((typeof _option.height=="number")||(console.error("height mast be a number"),false))
            &&(cssHeight=_option.height,canvasHeight=cssHeight*2);
        var b=(_option.pointList||(console.error("canvas point need a pointList"),false))
        &&((_option.pointList.length!=0)||(console.error("length of pointList must not be 0"),false))
        &&(pointList=_option.pointList);
        if(!(a&&b)){
            return;
        }
        var itemWidth=_option.itemWidth?_option.itemWidth:400;
        var size=pointList.length;
        cssWidth=400*size;
        canvasWidth=2*cssWidth;
        render();
    }
    
    function render() {
        var el=document.getElementById(id);
        el.setAttribute("width",canvasWidth+"px");
        el.setAttribute("height",canvasHeight+"px");
        el.style.height=cssHeight+"px";
        el.style.width=cssWidth+"px";
        context=el.getContext("2d");
        context.font="36px bold Verdana";
        context.strokeStyle='lightgray';
        context.lineWidth=30;
        context.lineCap='round';
        context.beginPath();
        context.moveTo(20,canvasHeight/2);
        context.lineTo(780*pointList.length,canvasHeight/2);
        context.stroke();
        context.closePath();
        pointList.forEach(function (p1, p2, p3) {
            var r1=new Circle({x:400*(p2)*2+400,y:canvasHeight/2,color1:"lightgray",color2:"blue",r1:60,r2:30});
            console.log(r1)
            r1.draw(context)

            context.textAlign="center";
            context.textBaseline = 'middle';
            context.fillStyle = "white";
            context.fillText((p2+1)+"",400*(p2)*2+400,canvasHeight/2);
            context.textBaseline = 'bottom';
            context.fillStyle = "blue";
            context.fillText(p1.name,400*(p2)*2+400,canvasHeight);
        });
    }

    function BaseObject(option) {
        this.color=option.color?option.color:"black";
        this.x=option.x?option.x:0;
        this.y=option.y?option.y:0;
        this.alpha=(option.alpha!=undefined)?option.alpha:1;
    }

    //对象：圆。圆拥有画自己的方法；
    function Round(option) {
        //继承自会动的物体；
        BaseObject.apply(this,arguments);
        this.r=option.r?option.r:0;
    }
    extend(Round,BaseObject);
    Round.prototype.draw=function (context) {
        context.save();
        context.fillStyle=this.color;
        context.globalAlpha=this.alpha;
        context.beginPath();
        context.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.restore();
    }

    //环形
    function Circle(option) {
        BaseObject.apply(this,arguments);
        this.r1=option.r1?option.r1:10;
        this.r2=option.r2?option.r2:0;
        this.color1=option.color1?option.color1:"black";
        this.color2=option.color2?option.color2:0;
    }
    extend(Circle,BaseObject);
    Circle.prototype.draw=function (context) {
        var r1=new Round({x:this.x,y:this.y,color:this.color1,r:this.r1});
        r1.draw(context);
        var r2=new Round({x:this.x,y:this.y,color:this.color2,r:this.r2})
        r2.draw(context);
    }

    function Triangle() {
        BaseObject.apply(this,arguments);

    }
    function extend(Child, Parent) {
        var F = function(){};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        console.log(Child.prototype)
        Child.prototype.constructor = Child;
        Child.uber = Parent.prototype;
    }
    return init;
}();