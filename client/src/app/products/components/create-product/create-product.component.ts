import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product:IProduct ={
    _id: '',
    name:'',
    image:'',
    price: null,
    qty: null,
    info:''
  }
  public imageFileName: any;
  public errorMessage: any;
  public emptyFields:boolean | any;

  constructor( private productService:ProductService , private router:Router) { }

  ngOnInit(): void {
  }
  // select image
  public selectProductImage(event:any){
    if(event.target.files && event.target.files.length){
      const[file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.imageFileName = file;
      reader.addEventListener('load',()=>{
        return reader.result ? this.product.image = String(reader.result):'';
      });
    }

  }
  public submitCreateProduct(){
    if(this.product.name !== "" && this.product.image !== "" && this.product.info !== "" && this.product.price !== null && this.product.qty !== null){
    this.productService.createProduct(this.product).subscribe((data)=>{
      this.router.navigate(['/products/admin']);
    },(error)=>{
      this.errorMessage = error;
    });
    }
    else{
      this.emptyFields = true;
    }


}
}