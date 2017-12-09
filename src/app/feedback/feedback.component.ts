import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CouchService } from '../shared/couchdb.service';
import { MatCheckboxModule, MatRadioModule , MatFormFieldModule, MatButtonModule } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';


export class Feedback {
  name: string;
  isUrgent: boolean;
  feedbackType: string;
  feedbackMsg: string;
}

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html'
})

export class FeedbackComponent implements OnInit {
  msgForUsr: string;
  feedback: Feedback= new Feedback();
  message: string;
  fedbkSubmitted: string;
  messageType = {
    'pass': false,
    'fail': false
  };
  feedbackForm: FormGroup;

  constructor(
    private userService: UserService,
    private couchService: CouchService,
    private fg: FormBuilder
    ) {
      this.feedbackForm = fg.group({
         feedbackMsg : [ '', Validators.required ],
         feedbackType : [ '' ],
         isUrgent : [ '' ]
      });
    }

  ngOnInit() {
    this.feedback.name = this.userService.get().name;
  }

  addfeedback(post) {
    console.log(post);
    console.log(this.feedbackForm.value);
    this.feedback.feedbackMsg = post.feedbackMsg;
    this.feedback.feedbackType = post.feedbackType;
    this.feedback.isUrgent = post.isUrgent;
    this.couchService.post('feedback/', this.feedback)
    .then((data) => {
      console.log(data);
      this.message = 'feedbackSuccess';
      this.messageType.fail = false;
      this.messageType.pass = true;
    },
    (error) => {
      this.message = 'feedbackError';
      this.messageType.pass = false;
      this.messageType.fail = true;
    });

  }
   onSubmit(val) {
    console.log(val.value);
    console.log(this.feedbackForm.value);
  }
  submitfeedback() {
    if (!this.feedback.feedbackMsg) {
      this.message = 'feedbackInvalid';
      this.messageType.pass = false;
      this.messageType.fail = true;
    } else {
      this.couchService.post('feedback/', this.feedback)
      .then((data) => {
        this.message = 'feedbackSuccess';
        this.messageType.fail = false;
        this.messageType.pass = true;
      },
      (error) => {
        this.message = 'feedbackError';
        this.messageType.pass = false;
        this.messageType.fail = true;
      });
    }
  }
}