import { Component, OnInit } from '@angular/core';
import { CouchService } from '../shared/couchdb.service';
import { Headers } from '@angular/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Jsonp, Response } from '@angular/http';

@Component({
  templateUrl: './resources.component.html'
})
export class ResourcesComponent implements OnInit {
  rating;
  mRating;
  fRating;
  resources = [];
  message = '';
  file: any;
  resource = { mediaType: '' };
  nationname = '';

  getRating(sum, timesRated) {
    this.rating = 0;

    if (sum > 0 && timesRated > 0) {
      const temp = (sum / timesRated).toFixed(1);
      this.rating = parseFloat(temp);
    }
    return this.rating;
  }

  constructor(
    private couchService: CouchService,
    private route: ActivatedRoute,
    private jsonp: Jsonp
  ) {}

  ngOnInit() {
    this.getResources();
    this.getNationResources();
    // Temp fields to fill in for male and female rating
    this.fRating = Math.floor(Math.random() * 101);
    this.mRating = 100 - this.fRating;
  }

  getResources() {
    this.couchService
      .get('resources/_all_docs?include_docs=true')
      .then(data => {
        this.resources = data.rows;
      }, error => (this.message = 'Error'));
  }

  getNationResources() {
    if (this.route.snapshot.paramMap.get('nationname') !== null) {
      this.couchService.get('nations/_all_docs?include_docs=true')
      .then((data) => {
         data.rows.map(function(nt){
          if (nt.doc.name === this.route.snapshot.paramMap.get('nationname')) {
            this.nationname = this.route.snapshot.paramMap.get('nationname');
            const nationUrl = nt.doc.nationurl;
            if (nationUrl) {
              this.jsonp.request('http://' + nationUrl + '/resources/_all_docs?include_docs=true&callback=JSONP_CALLBACK&limit=5')
              .subscribe(res => {
                this.resources = [];
                this.resources = res.json().rows.length > 0 ? res.json().rows : [];
              });
            } else {
              this.message = 'There is no data.';
            }
          }
        }, this);
      }, (error) => this.message = 'There was a problem getting NationList');
    }
  }

}
