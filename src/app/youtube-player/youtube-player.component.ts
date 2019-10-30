import {Component, OnDestroy, OnInit} from '@angular/core';
import {YoutubeService} from '../youtube.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit, OnDestroy {
  song: any;
  sub: Subscription;
  private xUrl: SafeResourceUrl;
  constructor(
    private youtubeService: YoutubeService,
    private activatedRouter: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.sub = this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.song = this.youtubeService.find(id);
    });
  }
  getSrc() {
    const url =  'https://www.youtube.com/embed/' + this.song.id;
    this.xUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
 /*   this.sub.unsubscribe();*/
  }

}
