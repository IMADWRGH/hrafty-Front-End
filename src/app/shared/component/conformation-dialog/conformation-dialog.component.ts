import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation-dialog',
  templateUrl: './conformation-dialog.component.html',
  styleUrls: ['./conformation-dialog.component.css']
})
export class ConformationDialogComponent {
  message:string ='Are you sure want to delete ?';
confirmButtonText='Yes';
cancelButtonText='No';
 constructor(@Inject(MAT_DIALOG_DATA) private data:any,private dialogRef:MatDialogRef<ConformationDialogComponent> ){
  if(data){
    this.message = data.msg || this.message;
    if (data.buttonText) {
      this.confirmButtonText=data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText=data.buttonText.cancel || this.cancelButtonText;
    }
  }
 }
 onConfirmClick(){
  this.dialogRef.close(true);
 }
}
