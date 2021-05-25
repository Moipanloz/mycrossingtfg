/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Renderer2, ElementRef, NgZone } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizableDirective } from './resizable.directive';
import { IS_TOUCH_DEVICE } from './is-touch-device';
/**
 * An element placed inside a `mwlResizable` directive to be used as a drag and resize handle
 *
 * For example
 *
 * ```html
 * <div mwlResizable>
 *   <div mwlResizeHandle [resizeEdges]="{bottom: true, right: true}"></div>
 * </div>
 * ```
 */
export class ResizeHandleDirective {
    /**
     * @param {?} renderer
     * @param {?} element
     * @param {?} zone
     * @param {?} resizable
     */
    constructor(renderer, element, zone, resizable) {
        this.renderer = renderer;
        this.element = element;
        this.zone = zone;
        this.resizable = resizable;
        /**
         * The `Edges` object that contains the edges of the parent element that dragging the handle will trigger a resize on
         */
        this.resizeEdges = {};
        this.eventListeners = {};
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.listenOnTheHost('mousedown').subscribe(event => {
                this.onMousedown(event, event.clientX, event.clientY);
            });
            this.listenOnTheHost('mouseup').subscribe(event => {
                this.onMouseup(event.clientX, event.clientY);
            });
            if (IS_TOUCH_DEVICE) {
                this.listenOnTheHost('touchstart').subscribe(event => {
                    this.onMousedown(event, event.touches[0].clientX, event.touches[0].clientY);
                });
                merge(this.listenOnTheHost('touchend'), this.listenOnTheHost('touchcancel')).subscribe(event => {
                    this.onMouseup(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
                });
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.unsubscribeEventListeners();
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    onMousedown(event, clientX, clientY) {
        event.preventDefault();
        if (!this.eventListeners.touchmove) {
            this.eventListeners.touchmove = this.renderer.listen(this.element.nativeElement, 'touchmove', (touchMoveEvent) => {
                this.onMousemove(touchMoveEvent, touchMoveEvent.targetTouches[0].clientX, touchMoveEvent.targetTouches[0].clientY);
            });
        }
        if (!this.eventListeners.mousemove) {
            this.eventListeners.mousemove = this.renderer.listen(this.element.nativeElement, 'mousemove', (mouseMoveEvent) => {
                this.onMousemove(mouseMoveEvent, mouseMoveEvent.clientX, mouseMoveEvent.clientY);
            });
        }
        this.resizable.mousedown.next({
            clientX,
            clientY,
            edges: this.resizeEdges
        });
    }
    /**
     * @hidden
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    onMouseup(clientX, clientY) {
        this.unsubscribeEventListeners();
        this.resizable.mouseup.next({
            clientX,
            clientY,
            edges: this.resizeEdges
        });
    }
    /**
     * @private
     * @param {?} event
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    onMousemove(event, clientX, clientY) {
        this.resizable.mousemove.next({
            clientX,
            clientY,
            edges: this.resizeEdges,
            event
        });
    }
    /**
     * @private
     * @return {?}
     */
    unsubscribeEventListeners() {
        Object.keys(this.eventListeners).forEach(type => {
            ((/** @type {?} */ (this))).eventListeners[type]();
            delete this.eventListeners[type];
        });
    }
    /**
     * @private
     * @template T
     * @param {?} eventName
     * @return {?}
     */
    listenOnTheHost(eventName) {
        return fromEvent(this.element.nativeElement, eventName).pipe(takeUntil(this.destroy$));
    }
}
ResizeHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlResizeHandle]'
            },] }
];
/** @nocollapse */
ResizeHandleDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone },
    { type: ResizableDirective }
];
ResizeHandleDirective.propDecorators = {
    resizeEdges: [{ type: Input }]
};
if (false) {
    /**
     * The `Edges` object that contains the edges of the parent element that dragging the handle will trigger a resize on
     * @type {?}
     */
    ResizeHandleDirective.prototype.resizeEdges;
    /**
     * @type {?}
     * @private
     */
    ResizeHandleDirective.prototype.eventListeners;
    /**
     * @type {?}
     * @private
     */
    ResizeHandleDirective.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    ResizeHandleDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ResizeHandleDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    ResizeHandleDirective.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    ResizeHandleDirective.prototype.resizable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLWhhbmRsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXJlc2l6YWJsZS1lbGVtZW50LyIsInNvdXJjZXMiOlsicmVzaXplLWhhbmRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBR1YsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7QUFnQnBELE1BQU0sT0FBTyxxQkFBcUI7Ozs7Ozs7SUFjaEMsWUFDVSxRQUFtQixFQUNuQixPQUFtQixFQUNuQixJQUFZLEVBQ1osU0FBNkI7UUFIN0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixjQUFTLEdBQVQsU0FBUyxDQUFvQjs7OztRQWQ5QixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUV6QixtQkFBYyxHQUlsQixFQUFFLENBQUM7UUFFQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQU9wQyxDQUFDOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQWEsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxL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ICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZXNpemFibGVEaXJlY3RpdmUgfSBmcm9tICcuL3Jlc2l6YWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRWRnZXMgfSBmcm9tICcuL2ludGVyZmFjZXMvZWRnZXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IElTX1RPVUNIX0RFVklDRSB9IGZyb20gJy4vaXMtdG91Y2gtZGV2aWNlJztcblxuLyoqXG4gKiBBbiBlbGVtZW50IHBsYWNlZCBpbnNpZGUgYSBgbXdsUmVzaXphYmxlYCBkaXJlY3RpdmUgdG8gYmUgdXNlZCBhcyBhIGRyYWcgYW5kIHJlc2l6ZSBoYW5kbGVcbiAqXG4gKiBGb3IgZXhhbXBsZVxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgbXdsUmVzaXphYmxlPlxuICogICA8ZGl2IG13bFJlc2l6ZUhhbmRsZSBbcmVzaXplRWRnZXNdPVwie2JvdHRvbTogdHJ1ZSwgcmlnaHQ6IHRydWV9XCI+PC9kaXY+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsUmVzaXplSGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzaXplSGFuZGxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGBFZGdlc2Agb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGVkZ2VzIG9mIHRoZSBwYXJlbnQgZWxlbWVudCB0aGF0IGRyYWdnaW5nIHRoZSBoYW5kbGUgd2lsbCB0cmlnZ2VyIGEgcmVzaXplIG9uXG4gICAqL1xuICBASW5wdXQoKSByZXNpemVFZGdlczogRWRnZXMgPSB7fTtcblxuICBwcml2YXRlIGV2ZW50TGlzdGVuZXJzOiB7XG4gICAgdG91Y2htb3ZlPzogKCkgPT4gdm9pZDtcbiAgICBtb3VzZW1vdmU/OiAoKSA9PiB2b2lkO1xuICAgIFtrZXk6IHN0cmluZ106ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgfSA9IHt9O1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZXNpemFibGU6IFJlc2l6YWJsZURpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuT25UaGVIb3N0PE1vdXNlRXZlbnQ+KCdtb3VzZWRvd24nKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLm9uTW91c2Vkb3duKGV2ZW50LCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxpc3Rlbk9uVGhlSG9zdDxNb3VzZUV2ZW50PignbW91c2V1cCcpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIHRoaXMub25Nb3VzZXVwKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChJU19UT1VDSF9ERVZJQ0UpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5PblRoZUhvc3Q8VG91Y2hFdmVudD4oJ3RvdWNoc3RhcnQnKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgIHRoaXMub25Nb3VzZWRvd24oXG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgICAgIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgIHRoaXMubGlzdGVuT25UaGVIb3N0PFRvdWNoRXZlbnQ+KCd0b3VjaGVuZCcpLFxuICAgICAgICAgIHRoaXMubGlzdGVuT25UaGVIb3N0PFRvdWNoRXZlbnQ+KCd0b3VjaGNhbmNlbCcpXG4gICAgICAgICkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICB0aGlzLm9uTW91c2V1cChcbiAgICAgICAgICAgIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBvbk1vdXNlZG93bihcbiAgICBldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsXG4gICAgY2xpZW50WDogbnVtYmVyLFxuICAgIGNsaWVudFk6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVycy50b3VjaG1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMudG91Y2htb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAndG91Y2htb3ZlJyxcbiAgICAgICAgKHRvdWNoTW92ZUV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5vbk1vdXNlbW92ZShcbiAgICAgICAgICAgIHRvdWNoTW92ZUV2ZW50LFxuICAgICAgICAgICAgdG91Y2hNb3ZlRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICAgICAgdG91Y2hNb3ZlRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmV2ZW50TGlzdGVuZXJzLm1vdXNlbW92ZSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5tb3VzZW1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgICAobW91c2VNb3ZlRXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLm9uTW91c2Vtb3ZlKFxuICAgICAgICAgICAgbW91c2VNb3ZlRXZlbnQsXG4gICAgICAgICAgICBtb3VzZU1vdmVFdmVudC5jbGllbnRYLFxuICAgICAgICAgICAgbW91c2VNb3ZlRXZlbnQuY2xpZW50WVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMucmVzaXphYmxlLm1vdXNlZG93bi5uZXh0KHtcbiAgICAgIGNsaWVudFgsXG4gICAgICBjbGllbnRZLFxuICAgICAgZWRnZXM6IHRoaXMucmVzaXplRWRnZXNcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBvbk1vdXNldXAoY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnJlc2l6YWJsZS5tb3VzZXVwLm5leHQoe1xuICAgICAgY2xpZW50WCxcbiAgICAgIGNsaWVudFksXG4gICAgICBlZGdlczogdGhpcy5yZXNpemVFZGdlc1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlbW92ZShcbiAgICBldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsXG4gICAgY2xpZW50WDogbnVtYmVyLFxuICAgIGNsaWVudFk6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLnJlc2l6YWJsZS5tb3VzZW1vdmUubmV4dCh7XG4gICAgICBjbGllbnRYLFxuICAgICAgY2xpZW50WSxcbiAgICAgIGVkZ2VzOiB0aGlzLnJlc2l6ZUVkZ2VzLFxuICAgICAgZXZlbnRcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVFdmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmV2ZW50TGlzdGVuZXJzKS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgKHRoaXMgYXMgYW55KS5ldmVudExpc3RlbmVyc1t0eXBlXSgpO1xuICAgICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0ZW5lcnNbdHlwZV07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3Rlbk9uVGhlSG9zdDxUIGV4dGVuZHMgRXZlbnQ+KGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZyb21FdmVudDxUPih0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgKTtcbiAgfVxufVxuIl19