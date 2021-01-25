import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  public productId:string | any;
  public selectedProduct:IProduct | any;
  public errorMessage: any;
  public emptyFields:any;



  constructor(private activatedRoute:ActivatedRoute,
     private productService:ProductService,
     private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.productId = param.get('id');
    });
    this.productService.getProduct(this.productId).subscribe((data)=>{
        this.selectedProduct = data;
    },(error)=>{
      console.error(error);
      this.errorMessage=error;
    })

  }
   // select image
   public selectProductImage(event:any){
    if(event.target.files && event.target.files.length){
      const[file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      // this.imageFileName = file;
      reader.addEventListener('load',()=>{
        return reader.result ? this.selectedProduct.image = String(reader.result):'';
      });
    }

  }
  public submitUpdateProduct(){
    if(this.selectedProduct.name !== "" && this.selectedProduct.image !== "" && this.selectedProduct.info !== "" && this.selectedProduct.price !== null && this.selectedProduct.qty !== null){
    this.productService.updateProduct(this.selectedProduct, this.productId).subscribe((data)=>{
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


