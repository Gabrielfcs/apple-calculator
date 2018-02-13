import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public display:string = '0';
  public operator:string = '';
  public aOperators = ["x", "-", "+", "÷", "%"];
  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
  
  addToDisplay(sValue:string){
    if(sValue.toLowerCase() == 'ac'){
      this.resetDisplay();
      return;
    }
    if(sValue.toLowerCase() == '+/-'){
      this.display = (parseFloat(this.display) * -1).toString();
      return;
    }
    if(sValue.toLowerCase() == '%'){
      this.display = (parseFloat(this.display) / 100).toString();
      return;
    }
    let character = this.display;
    if(this.display.length > 1){
      character = this.display.slice(-1);
    }
    let alreadyHave = false;
    let isLastCharacter = false;
    let isAnOperator = false;
    for(let i:number = 0; i < this.aOperators.length; i++) {
      if(this.aOperators[i] == character){
        isLastCharacter = true;
      }
      if(this.aOperators[i] == sValue){
        isAnOperator = true;
      }
      if(this.display.length > 1){
        if(this.display.indexOf(this.aOperators[i]) > -1){
          alreadyHave = true;
        }
      }
    }
    if(!isLastCharacter && isAnOperator && alreadyHave && sValue != '-' && sValue != '+'){
      return;
    }
    if(isLastCharacter && isAnOperator){
      this.display = this.display.slice(0, -1);
    }
    if(this.display == '0'){
      this.display = sValue;
    } else{
      this.display += sValue;
    }
  }
  
  getResult(){
    let character = this.display.slice(-1);
    for(let i:number = 0; i < this.aOperators.length; i++) {
      if(this.aOperators[i] == character){
        this.showAlert("ALERT","It's not possible! Please insert a number after the operator.");
        return;
      }
    }
    let sDisplay = this.display.toLocaleLowerCase();
    sDisplay = sDisplay.replace(/÷/g, "/");
    sDisplay = sDisplay.replace(/x/g, "*");
    sDisplay = sDisplay.replace(/,/g, ".");
    let result = eval(sDisplay);
    let sResult = result.toString();
    result = sResult.replace(/[.]/g, ",");
    this.resetDisplay();
    this.display = result;
  }
  
  resetDisplay(){
    this.display = '0';
  }
  
  showAlert(title:string = 'ERROR', message:string = 'Números informados inválidos!') {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  
}
