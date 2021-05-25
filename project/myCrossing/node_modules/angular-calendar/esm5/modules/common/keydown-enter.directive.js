import { __decorate, __metadata } from "tslib";
import { Directive, Output, EventEmitter, ElementRef, NgZone, Renderer2, OnInit, OnDestroy, } from '@angular/core';
var KeydownEnterDirective = /** @class */ (function () {
    function KeydownEnterDirective(host, ngZone, renderer) {
        this.host = host;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.keydown = new EventEmitter(); // tslint:disable-line
        this.keydownListener = null;
    }
    KeydownEnterDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.keydownListener = _this.renderer.listen(_this.host.nativeElement, 'keydown', function (event) {
                if (event.keyCode === 13 ||
                    event.which === 13 ||
                    event.key === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.ngZone.run(function () {
                        _this.keydown.emit(event);
                    });
                }
            });
        });
    };
    KeydownEnterDirective.prototype.ngOnDestroy = function () {
        if (this.keydownListener !== null) {
            this.keydownListener();
            this.keydownListener = null;
        }
    };
    KeydownEnterDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
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
    return KeydownEnterDirective;
}());
export { KeydownEnterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24va2V5ZG93bi1lbnRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCO0lBS0UsK0JBQ1UsSUFBNkIsRUFDN0IsTUFBYyxFQUNkLFFBQW1CO1FBRm5CLFNBQUksR0FBSixJQUFJLENBQXlCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUEYsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUMsQ0FBQyxzQkFBc0I7UUFFNUUsb0JBQWUsR0FBd0IsSUFBSSxDQUFDO0lBTWpELENBQUM7SUFFSix3Q0FBUSxHQUFSO1FBQUEsaUJBcUJDO1FBcEJDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDNUIsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDekMsS0FBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQ3ZCLFNBQVMsRUFDVCxVQUFDLEtBQUs7Z0JBQ0osSUFDRSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ3BCLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDbEIsS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQ3JCO29CQUNBLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUV4QixLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzt3QkFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNILENBQUM7O2dCQWpDZSxVQUFVO2dCQUNSLE1BQU07Z0JBQ0osU0FBUzs7SUFQRjtRQUExQixNQUFNLENBQUMsaUJBQWlCLENBQUM7OzBEQUFtQztJQURsRCxxQkFBcUI7UUFEakMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLENBQUM7eUNBTzNCLFVBQVU7WUFDUixNQUFNO1lBQ0osU0FBUztPQVJsQixxQkFBcUIsQ0F3Q2pDO0lBQUQsNEJBQUM7Q0FBQSxBQXhDRCxJQXdDQztTQXhDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmUsXG4gIFJlbmRlcmVyMixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbXdsS2V5ZG93bkVudGVyXScgfSlcbmV4cG9ydCBjbGFzcyBLZXlkb3duRW50ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoJ213bEtleWRvd25FbnRlcicpIGtleWRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIHByaXZhdGUga2V5ZG93bkxpc3RlbmVyOiBWb2lkRnVuY3Rpb24gfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmtleWRvd25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ2tleWRvd24nLFxuICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSAxMyB8fFxuICAgICAgICAgICAgZXZlbnQud2hpY2ggPT09IDEzIHx8XG4gICAgICAgICAgICBldmVudC5rZXkgPT09ICdFbnRlcidcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5rZXlkb3duLmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5ZG93bkxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgdGhpcy5rZXlkb3duTGlzdGVuZXIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19