import { __decorate, __metadata } from "tslib";
import { Directive, Output, EventEmitter, ElementRef, NgZone, Renderer2, OnInit, OnDestroy, } from '@angular/core';
let KeydownEnterDirective = class KeydownEnterDirective {
    constructor(host, ngZone, renderer) {
        this.host = host;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.keydown = new EventEmitter(); // tslint:disable-line
        this.keydownListener = null;
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.keydownListener = this.renderer.listen(this.host.nativeElement, 'keydown', (event) => {
                if (event.keyCode === 13 ||
                    event.which === 13 ||
                    event.key === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();
                    this.ngZone.run(() => {
                        this.keydown.emit(event);
                    });
                }
            });
        });
    }
    ngOnDestroy() {
        if (this.keydownListener !== null) {
            this.keydownListener();
            this.keydownListener = null;
        }
    }
};
KeydownEnterDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
__decorate([
    Output('mwlKeydownEnter'),
    __metadata("design:type", Object)
], KeydownEnterDirective.prototype, "keydown", void 0);
KeydownEnterDirective = __decorate([
    Directive({ selector: '[mwlKeydownEnter]' }),
    __metadata("design:paramtypes", [ElementRef,
        NgZone,
        Renderer2])
], KeydownEnterDirective);
export { KeydownEnterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24va2V5ZG93bi1lbnRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBS2hDLFlBQ1UsSUFBNkIsRUFDN0IsTUFBYyxFQUNkLFFBQW1CO1FBRm5CLFNBQUksR0FBSixJQUFJLENBQXlCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUEYsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUMsQ0FBQyxzQkFBc0I7UUFFNUUsb0JBQWUsR0FBd0IsSUFBSSxDQUFDO0lBTWpELENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQ3ZCLFNBQVMsRUFDVCxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNSLElBQ0UsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNwQixLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ2xCLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUNyQjtvQkFDQSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO3dCQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNILENBQUM7Q0FDRixDQUFBOztZQWxDaUIsVUFBVTtZQUNSLE1BQU07WUFDSixTQUFTOztBQVBGO0lBQTFCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzs7c0RBQW1DO0FBRGxELHFCQUFxQjtJQURqQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztxQ0FPM0IsVUFBVTtRQUNSLE1BQU07UUFDSixTQUFTO0dBUmxCLHFCQUFxQixDQXdDakM7U0F4Q1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBSZW5kZXJlcjIsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW213bEtleWRvd25FbnRlcl0nIH0pXG5leHBvcnQgY2xhc3MgS2V5ZG93bkVudGVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KCdtd2xLZXlkb3duRW50ZXInKSBrZXlkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuICBwcml2YXRlIGtleWRvd25MaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5rZXlkb3duTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICdrZXlkb3duJyxcbiAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gMTMgfHxcbiAgICAgICAgICAgIGV2ZW50LndoaWNoID09PSAxMyB8fFxuICAgICAgICAgICAgZXZlbnQua2V5ID09PSAnRW50ZXInXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMua2V5ZG93bi5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleWRvd25MaXN0ZW5lciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5rZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgIHRoaXMua2V5ZG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==