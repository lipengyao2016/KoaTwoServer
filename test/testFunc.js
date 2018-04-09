/**
 * Created by Administrator on 2018/4/8.
 */

class A {
    constructor(){}
    fun1(){
        console.log('A.fun1');
    }
    fun2(){
        console.log('A.fun2');
    }
    fun3(){
        console.log('A.fun3');
    }
    fun(){

        console.log('A.fun');
        this.fun1();
        this.fun2();
        this.fun3();
    }
}

class B extends A{
    constructor(){
        super();
    }

    fun2(){
        super.fun2();
        console.log('B.fun2');
    }
}

let b = new B();
b.fun();