import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) 
  {
    
  }
  
  p = 0;
  number = 1;

  url: string = 'https://listmoz.com';
  enable_url: boolean = true;
  mod_url: string = 'FGVMT9PmMXxy525wshvm';
  enable_mod_url: boolean = true;
  read_url: string = '8BXqt7BH02pgSpFGCxVy';
  enable_read_url: boolean = true;

  posts: DriverLog[];
  newItemTitle: string;
  
  ngOnInit() {
    this.GetItems()
  }

  GetItems() {
    var promise = this.http.get(this.url + "/actions?action=FETCH&mod_url=FGVMT9PmMXxy525wshvm")
    .toPromise();
    promise.then((data) => {
      this.posts = data['items'];
      if (this.posts.length == 0) document.getElementById('itemslist').style.visibility='hidden';
      document.getElementById('itemslist').style.visibility='visible';
    }).catch((error) => {
      console.log(error);
    });
  }

  AddNewItem() {
    if (this.newItemTitle != undefined && 
      this.newItemTitle != '') {
      var newDriverLog: AddDriverLogDto = 
      {
        description : this.newItemTitle,
        force_creation_of_new_list: false,
        mod_url: this.mod_url,
        read_url: this.read_url
      };

      var promise = this.http.post(this.url + "/actions?action=ADD", newDriverLog)
      .toPromise();
      promise.then((data) => {
        this.newItemTitle = '';
        this.GetItems();
      }).catch((error) => {
        console.log(error);
      });      
    }
  }

  DeleteItem(itemId: string) {

    var deleteItemdto: DeleteDriverLogDto = 
    {
      force_creation_of_new_list: false,
      item_id: itemId,
      mod_url: this.mod_url
    };

    var promise = this.http.post(this.url + "/actions?action=DELETE", deleteItemdto).toPromise();
    promise.then((data) => {
      this.GetItems();
    }).catch((error) => {
      console.log(error);
    });
  }
  
}

export interface DriverLog {
  added_on: number,
  completed_on: string,
  description: string,
  edited_on: string,
  item_id: number,
  order_id: number,
  status: boolean
}

export interface AddDriverLogDto {
  description: string,
  force_creation_of_new_list: boolean,
  mod_url: string,
  read_url
}

export interface DeleteDriverLogDto{
  force_creation_of_new_list: boolean,
  item_id: string,
  mod_url: string,
}
