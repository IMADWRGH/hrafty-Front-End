import { Component } from '@angular/core';
import { Service } from 'src/app/models/Service.model';
import { SearchService } from 'src/app/shared/services/service/search.service';

@Component({
  selector: 'app-details-services',
  templateUrl: './details-services.component.html',
  styleUrls: ['./details-services.component.css']
})
export class DetailsServicesComponent {
  constructor(private serch:SearchService){}
  cards:Service[]=[];
  card = [
    {
      title: 'Shiba Inu',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: `The Shiba Inu is the smallest of the six original and distinct spitz
                    breeds of dog from Japan. A small, agile dog that copes very well with
                    mountainous terrain, the Shiba Inu was originally bred for hunting.`,
      location: 'Casa'
    },
    {
      title: 'Akita Inu',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: `The Akita Inu is a large breed of dog originating from the mountainous northern regions of Japan.`,
      location: 'Tokyo'
    },
    {
      title: 'Hokkaido',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: `The Hokkaido is a breed of dog known for its hunting abilities and its ability to cope with harsh winters.`,
      location: 'Hokkaido'
    }
  ];

  ngOnInit(){
    this.serch.searchResults$.subscribe(
      {
        next: (data) => {
          this.cards = data;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}
