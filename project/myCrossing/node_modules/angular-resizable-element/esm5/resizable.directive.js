/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Renderer2, ElementRef, Output, Input, EventEmitter, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Observable, merge, EMPTY } from 'rxjs';
import { map, mergeMap, takeUntil, filter, pairwise, take, share, auditTime, switchMap, startWith, tap } from 'rxjs/operators';
import { IS_TOUCH_DEVICE } from './is-touch-device';
/**
 * @record
 */
function PointerEventCoordinate() { }
if (false) {
    /** @type {?} */
    PointerEventCoordinate.prototype.clientX;
    /** @type {?} */
    PointerEventCoordinate.prototype.clientY;
    /** @type {?} */
    PointerEventCoordinate.prototype.event;
}
/**
 * @record
 */
function Coordinate() { }
if (false) {
    /** @type {?} */
    Coordinate.prototype.x;
    /** @type {?} */
    Coordinate.prototype.y;
}
/**
 * @param {?} value1
 * @param {?} value2
 * @param {?=} precision
 * @return {?}
 */
function isNumberCloseTo(value1, value2, precision) {
    if (precision === void 0) { precision = 3; }
    /** @type {?} */
    var diff = Math.abs(value1 - value2);
    return diff < precision;
}
/**
 * @param {?} startingRect
 * @param {?} edges
 * @param {?} clientX
 * @param {?} clientY
 * @return {?}
 */
function getNewBoundingRectangle(startingRect, edges, clientX, clientY) {
    /** @type {?} */
    var newBoundingRect = {
        top: startingRect.top,
        bottom: startingRect.bottom,
        left: startingRect.left,
        right: startingRect.right
    };
    if (edges.top) {
        newBoundingRect.top += clientY;
    }
    if (edges.bottom) {
        newBoundingRect.bottom += clientY;
    }
    if (edges.left) {
        newBoundingRect.left += clientX;
    }
    if (edges.right) {
        newBoundingRect.right += clientX;
    }
    newBoundingRect.height = newBoundingRect.bottom - newBoundingRect.top;
    newBoundingRect.width = newBoundingRect.right - newBoundingRect.left;
    return newBoundingRect;
}
/**
 * @param {?} element
 * @param {?} ghostElementPositioning
 * @return {?}
 */
function getElementRect(element, ghostElementPositioning) {
    /** @type {?} */
    var translateX = 0;
    /** @type {?} */
    var translateY = 0;
    /** @type {?} */
    var style = element.nativeElement.style;
    /** @type {?} */
    var transformProperties = [
        'transform',
        '-ms-transform',
        '-moz-transform',
        '-o-transform'
    ];
    /** @type {?} */
    var transform = transformProperties
        .map(function (property) { return style[property]; })
        .find(function (value) { return !!value; });
    if (transform && transform.includes('translate')) {
        translateX = transform.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/, '$1');
        translateY = transform.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/, '$2');
    }
    if (ghostElementPositioning === 'absolute') {
        return {
            height: element.nativeElement.offsetHeight,
            width: element.nativeElement.offsetWidth,
            top: element.nativeElement.offsetTop - translateY,
            bottom: element.nativeElement.offsetHeight +
                element.nativeElement.offsetTop -
                translateY,
            left: element.nativeElement.offsetLeft - translateX,
            right: element.nativeElement.offsetWidth +
                element.nativeElement.offsetLeft -
                translateX
        };
    }
    else {
        /** @type {?} */
        var boundingRect = element.nativeElement.getBoundingClientRect();
        return {
            height: boundingRect.height,
            width: boundingRect.width,
            top: boundingRect.top - translateY,
            bottom: boundingRect.bottom - translateY,
            left: boundingRect.left - translateX,
            right: boundingRect.right - translateX,
            scrollTop: element.nativeElement.scrollTop,
            scrollLeft: element.nativeElement.scrollLeft
        };
    }
}
/**
 * @param {?} __0
 * @return {?}
 */
function isWithinBoundingY(_a) {
    var clientY = _a.clientY, rect = _a.rect;
    return clientY >= rect.top && clientY <= rect.bottom;
}
/**
 * @param {?} __0
 * @return {?}
 */
function isWithinBoundingX(_a) {
    var clientX = _a.clientX, rect = _a.rect;
    return clientX >= rect.left && clientX <= rect.right;
}
/**
 * @param {?} __0
 * @return {?}
 */
function getResizeEdges(_a) {
    var clientX = _a.clientX, clientY = _a.clientY, elm = _a.elm, allowedEdges = _a.allowedEdges, cursorPrecision = _a.cursorPrecision;
    /** @type {?} */
    var elmPosition = elm.nativeElement.getBoundingClientRect();
    /** @type {?} */
    var edges = {};
    if (allowedEdges.left &&
        isNumberCloseTo(clientX, elmPosition.left, cursorPrecision) &&
        isWithinBoundingY({ clientY: clientY, rect: elmPosition })) {
        edges.left = true;
    }
    if (allowedEdges.right &&
        isNumberCloseTo(clientX, elmPosition.right, cursorPrecision) &&
        isWithinBoundingY({ clientY: clientY, rect: elmPosition })) {
        edges.right = true;
    }
    if (allowedEdges.top &&
        isNumberCloseTo(clientY, elmPosition.top, cursorPrecision) &&
        isWithinBoundingX({ clientX: clientX, rect: elmPosition })) {
        edges.top = true;
    }
    if (allowedEdges.bottom &&
        isNumberCloseTo(clientY, elmPosition.bottom, cursorPrecision) &&
        isWithinBoundingX({ clientX: clientX, rect: elmPosition })) {
        edges.bottom = true;
    }
    return edges;
}
/**
 * @record
 */
export function ResizeCursors() { }
if (false) {
    /** @type {?} */
    ResizeCursors.prototype.topLeft;
    /** @type {?} */
    ResizeCursors.prototype.topRight;
    /** @type {?} */
    ResizeCursors.prototype.bottomLeft;
    /** @type {?} */
    ResizeCursors.prototype.bottomRight;
    /** @type {?} */
    ResizeCursors.prototype.leftOrRight;
    /** @type {?} */
    ResizeCursors.prototype.topOrBottom;
}
/** @type {?} */
var DEFAULT_RESIZE_CURSORS = Object.freeze({
    topLeft: 'nw-resize',
    topRight: 'ne-resize',
    bottomLeft: 'sw-resize',
    bottomRight: 'se-resize',
    leftOrRight: 'col-resize',
    topOrBottom: 'row-resize'
});
/**
 * @param {?} edges
 * @param {?} cursors
 * @return {?}
 */
function getResizeCursor(edges, cursors) {
    if (edges.left && edges.top) {
        return cursors.topLeft;
    }
    else if (edges.right && edges.top) {
        return cursors.topRight;
    }
    else if (edges.left && edges.bottom) {
        return cursors.bottomLeft;
    }
    else if (edges.right && edges.bottom) {
        return cursors.bottomRight;
    }
    else if (edges.left || edges.right) {
        return cursors.leftOrRight;
    }
    else if (edges.top || edges.bottom) {
        return cursors.topOrBottom;
    }
    else {
        return '';
    }
}
/**
 * @param {?} __0
 * @return {?}
 */
function getEdgesDiff(_a) {
    var edges = _a.edges, initialRectangle = _a.initialRectangle, newRectangle = _a.newRectangle;
    /** @type {?} */
    var edgesDiff = {};
    Object.keys(edges).forEach(function (edge) {
        edgesDiff[edge] = (newRectangle[edge] || 0) - (initialRectangle[edge] || 0);
    });
    return edgesDiff;
}
/** @type {?} */
var RESIZE_ACTIVE_CLASS = 'resize-active';
/** @type {?} */
var RESIZE_LEFT_HOVER_CLASS = 'resize-left-hover';
/** @type {?} */
var RESIZE_RIGHT_HOVER_CLASS = 'resize-right-hover';
/** @type {?} */
var RESIZE_TOP_HOVER_CLASS = 'resize-top-hover';
/** @type {?} */
var RESIZE_BOTTOM_HOVER_CLASS = 'resize-bottom-hover';
/** @type {?} */
var RESIZE_GHOST_ELEMENT_CLASS = 'resize-ghost-element';
/** @type {?} */
export var MOUSE_MOVE_THROTTLE_MS = 50;
/**
 * Place this on an element to make it resizable. For example:
 *
 * ```html
 * <div
 *   mwlResizable
 *   [resizeEdges]="{bottom: true, right: true, top: true, left: true}"
 *   [enableGhostResize]="true">
 * </div>
 * ```
 */
var ResizableDirective = /** @class */ (function () {
    /**
     * @hidden
     */
    function ResizableDirective(platformId, renderer, elm, zone) {
        this.platformId = platformId;
        this.renderer = renderer;
        this.elm = elm;
        this.zone = zone;
        /**
         * The edges that an element can be resized from. Pass an object like `{top: true, bottom: false}`. By default no edges can be resized.
         * @deprecated use a resize handle instead that positions itself to the side of the element you would like to resize
         */
        this.resizeEdges = {};
        /**
         * Set to `true` to enable a temporary resizing effect of the element in between the `resizeStart` and `resizeEnd` events.
         */
        this.enableGhostResize = false;
        /**
         * A snap grid that resize events will be locked to.
         *
         * e.g. to only allow the element to be resized every 10px set it to `{left: 10, right: 10}`
         */
        this.resizeSnapGrid = {};
        /**
         * The mouse cursors that will be set on the resize edges
         */
        this.resizeCursors = DEFAULT_RESIZE_CURSORS;
        /**
         * Mouse over thickness to active cursor.
         * @deprecated invalid when you migrate to use resize handles instead of setting resizeEdges on the element
         */
        this.resizeCursorPrecision = 3;
        /**
         * Define the positioning of the ghost element (can be fixed or absolute)
         */
        this.ghostElementPositioning = 'fixed';
        /**
         * Allow elements to be resized to negative dimensions
         */
        this.allowNegativeResizes = false;
        /**
         * The mouse move throttle in milliseconds, default: 50 ms
         */
        this.mouseMoveThrottleMS = MOUSE_MOVE_THROTTLE_MS;
        /**
         * Called when the mouse is pressed and a resize event is about to begin. `$event` is a `ResizeEvent` object.
         */
        this.resizeStart = new EventEmitter();
        /**
         * Called as the mouse is dragged after a resize event has begun. `$event` is a `ResizeEvent` object.
         */
        this.resizing = new EventEmitter();
        /**
         * Called after the mouse is released after a resize event. `$event` is a `ResizeEvent` object.
         */
        this.resizeEnd = new EventEmitter();
        /**
         * @hidden
         */
        this.mouseup = new Subject();
        /**
         * @hidden
         */
        this.mousedown = new Subject();
        /**
         * @hidden
         */
        this.mousemove = new Subject();
        this.destroy$ = new Subject();
        this.resizeEdges$ = new Subject();
        this.pointerEventListeners = PointerEventListeners.getInstance(renderer, zone);
    }
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    ResizableDirective.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var mousedown$ = merge(this.pointerEventListeners.pointerDown, this.mousedown);
        /** @type {?} */
        var mousemove$ = merge(this.pointerEventListeners.pointerMove, this.mousemove).pipe(tap(function (_a) {
            var event = _a.event;
            if (currentResize) {
                event.preventDefault();
            }
        }), share());
        /** @type {?} */
        var mouseup$ = merge(this.pointerEventListeners.pointerUp, this.mouseup);
        /** @type {?} */
        var currentResize;
        /** @type {?} */
        var removeGhostElement = function () {
            if (currentResize && currentResize.clonedNode) {
                _this.elm.nativeElement.parentElement.removeChild(currentResize.clonedNode);
                _this.renderer.setStyle(_this.elm.nativeElement, 'visibility', 'inherit');
            }
        };
        /** @type {?} */
        var getResizeCursors = function () {
            return tslib_1.__assign({}, DEFAULT_RESIZE_CURSORS, _this.resizeCursors);
        };
        this.resizeEdges$
            .pipe(startWith(this.resizeEdges), map(function () {
            return (_this.resizeEdges &&
                Object.keys(_this.resizeEdges).some(function (edge) { return !!_this.resizeEdges[edge]; }));
        }), switchMap(function (legacyResizeEdgesEnabled) {
            return legacyResizeEdgesEnabled ? mousemove$ : EMPTY;
        }), auditTime(this.mouseMoveThrottleMS), takeUntil(this.destroy$))
            .subscribe(function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            /** @type {?} */
            var resizeEdges = getResizeEdges({
                clientX: clientX,
                clientY: clientY,
                elm: _this.elm,
                allowedEdges: _this.resizeEdges,
                cursorPrecision: _this.resizeCursorPrecision
            });
            /** @type {?} */
            var resizeCursors = getResizeCursors();
            if (!currentResize) {
                /** @type {?} */
                var cursor = getResizeCursor(resizeEdges, resizeCursors);
                _this.renderer.setStyle(_this.elm.nativeElement, 'cursor', cursor);
            }
            _this.setElementClass(_this.elm, RESIZE_LEFT_HOVER_CLASS, resizeEdges.left === true);
            _this.setElementClass(_this.elm, RESIZE_RIGHT_HOVER_CLASS, resizeEdges.right === true);
            _this.setElementClass(_this.elm, RESIZE_TOP_HOVER_CLASS, resizeEdges.top === true);
            _this.setElementClass(_this.elm, RESIZE_BOTTOM_HOVER_CLASS, resizeEdges.bottom === true);
        });
        /** @type {?} */
        var mousedrag = mousedown$
            .pipe(mergeMap(function (startCoords) {
            /**
             * @param {?} moveCoords
             * @return {?}
             */
            function getDiff(moveCoords) {
                return {
                    clientX: moveCoords.clientX - startCoords.clientX,
                    clientY: moveCoords.clientY - startCoords.clientY
                };
            }
            /** @type {?} */
            var getSnapGrid = function () {
                /** @type {?} */
                var snapGrid = { x: 1, y: 1 };
                if (currentResize) {
                    if (_this.resizeSnapGrid.left && currentResize.edges.left) {
                        snapGrid.x = +_this.resizeSnapGrid.left;
                    }
                    else if (_this.resizeSnapGrid.right &&
                        currentResize.edges.right) {
                        snapGrid.x = +_this.resizeSnapGrid.right;
                    }
                    if (_this.resizeSnapGrid.top && currentResize.edges.top) {
                        snapGrid.y = +_this.resizeSnapGrid.top;
                    }
                    else if (_this.resizeSnapGrid.bottom &&
                        currentResize.edges.bottom) {
                        snapGrid.y = +_this.resizeSnapGrid.bottom;
                    }
                }
                return snapGrid;
            };
            /**
             * @param {?} coords
             * @param {?} snapGrid
             * @return {?}
             */
            function getGrid(coords, snapGrid) {
                return {
                    x: Math.ceil(coords.clientX / snapGrid.x),
                    y: Math.ceil(coords.clientY / snapGrid.y)
                };
            }
            return ((/** @type {?} */ (merge(mousemove$.pipe(take(1)).pipe(map(function (coords) { return [, coords]; })), mousemove$.pipe(pairwise())))))
                .pipe(map(function (_a) {
                var _b = tslib_1.__read(_a, 2), previousCoords = _b[0], newCoords = _b[1];
                return [
                    previousCoords ? getDiff(previousCoords) : previousCoords,
                    getDiff(newCoords)
                ];
            }))
                .pipe(filter(function (_a) {
                var _b = tslib_1.__read(_a, 2), previousCoords = _b[0], newCoords = _b[1];
                if (!previousCoords) {
                    return true;
                }
                /** @type {?} */
                var snapGrid = getSnapGrid();
                /** @type {?} */
                var previousGrid = getGrid(previousCoords, snapGrid);
                /** @type {?} */
                var newGrid = getGrid(newCoords, snapGrid);
                return (previousGrid.x !== newGrid.x || previousGrid.y !== newGrid.y);
            }))
                .pipe(map(function (_a) {
                var _b = tslib_1.__read(_a, 2), newCoords = _b[1];
                /** @type {?} */
                var snapGrid = getSnapGrid();
                return {
                    clientX: Math.round(newCoords.clientX / snapGrid.x) * snapGrid.x,
                    clientY: Math.round(newCoords.clientY / snapGrid.y) * snapGrid.y
                };
            }))
                .pipe(takeUntil(merge(mouseup$, mousedown$)));
        }))
            .pipe(filter(function () { return !!currentResize; }));
        mousedrag
            .pipe(map(function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            return getNewBoundingRectangle((/** @type {?} */ (currentResize)).startingRect, (/** @type {?} */ (currentResize)).edges, clientX, clientY);
        }))
            .pipe(filter(function (newBoundingRect) {
            return (_this.allowNegativeResizes ||
                !!(newBoundingRect.height &&
                    newBoundingRect.width &&
                    newBoundingRect.height > 0 &&
                    newBoundingRect.width > 0));
        }))
            .pipe(filter(function (newBoundingRect) {
            return _this.validateResize
                ? _this.validateResize({
                    rectangle: newBoundingRect,
                    edges: getEdgesDiff({
                        edges: (/** @type {?} */ (currentResize)).edges,
                        initialRectangle: (/** @type {?} */ (currentResize)).startingRect,
                        newRectangle: newBoundingRect
                    })
                })
                : true;
        }), takeUntil(this.destroy$))
            .subscribe(function (newBoundingRect) {
            if (currentResize && currentResize.clonedNode) {
                _this.renderer.setStyle(currentResize.clonedNode, 'height', newBoundingRect.height + "px");
                _this.renderer.setStyle(currentResize.clonedNode, 'width', newBoundingRect.width + "px");
                _this.renderer.setStyle(currentResize.clonedNode, 'top', newBoundingRect.top + "px");
                _this.renderer.setStyle(currentResize.clonedNode, 'left', newBoundingRect.left + "px");
            }
            if (_this.resizing.observers.length > 0) {
                _this.zone.run(function () {
                    _this.resizing.emit({
                        edges: getEdgesDiff({
                            edges: (/** @type {?} */ (currentResize)).edges,
                            initialRectangle: (/** @type {?} */ (currentResize)).startingRect,
                            newRectangle: newBoundingRect
                        }),
                        rectangle: newBoundingRect
                    });
                });
            }
            (/** @type {?} */ (currentResize)).currentRect = newBoundingRect;
        });
        mousedown$
            .pipe(map(function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY, edges = _a.edges;
            return (edges ||
                getResizeEdges({
                    clientX: clientX,
                    clientY: clientY,
                    elm: _this.elm,
                    allowedEdges: _this.resizeEdges,
                    cursorPrecision: _this.resizeCursorPrecision
                }));
        }))
            .pipe(filter(function (edges) {
            return Object.keys(edges).length > 0;
        }), takeUntil(this.destroy$))
            .subscribe(function (edges) {
            if (currentResize) {
                removeGhostElement();
            }
            /** @type {?} */
            var startingRect = getElementRect(_this.elm, _this.ghostElementPositioning);
            currentResize = {
                edges: edges,
                startingRect: startingRect,
                currentRect: startingRect
            };
            /** @type {?} */
            var resizeCursors = getResizeCursors();
            /** @type {?} */
            var cursor = getResizeCursor(currentResize.edges, resizeCursors);
            _this.renderer.setStyle(document.body, 'cursor', cursor);
            _this.setElementClass(_this.elm, RESIZE_ACTIVE_CLASS, true);
            if (_this.enableGhostResize) {
                currentResize.clonedNode = _this.elm.nativeElement.cloneNode(true);
                _this.elm.nativeElement.parentElement.appendChild(currentResize.clonedNode);
                _this.renderer.setStyle(_this.elm.nativeElement, 'visibility', 'hidden');
                _this.renderer.setStyle(currentResize.clonedNode, 'position', _this.ghostElementPositioning);
                _this.renderer.setStyle(currentResize.clonedNode, 'left', currentResize.startingRect.left + "px");
                _this.renderer.setStyle(currentResize.clonedNode, 'top', currentResize.startingRect.top + "px");
                _this.renderer.setStyle(currentResize.clonedNode, 'height', currentResize.startingRect.height + "px");
                _this.renderer.setStyle(currentResize.clonedNode, 'width', currentResize.startingRect.width + "px");
                _this.renderer.setStyle(currentResize.clonedNode, 'cursor', getResizeCursor(currentResize.edges, resizeCursors));
                _this.renderer.addClass(currentResize.clonedNode, RESIZE_GHOST_ELEMENT_CLASS);
                (/** @type {?} */ (currentResize.clonedNode)).scrollTop = (/** @type {?} */ (currentResize.startingRect
                    .scrollTop));
                (/** @type {?} */ (currentResize.clonedNode)).scrollLeft = (/** @type {?} */ (currentResize.startingRect
                    .scrollLeft));
            }
            if (_this.resizeStart.observers.length > 0) {
                _this.zone.run(function () {
                    _this.resizeStart.emit({
                        edges: getEdgesDiff({
                            edges: edges,
                            initialRectangle: startingRect,
                            newRectangle: startingRect
                        }),
                        rectangle: getNewBoundingRectangle(startingRect, {}, 0, 0)
                    });
                });
            }
        });
        mouseup$.pipe(takeUntil(this.destroy$)).subscribe(function () {
            if (currentResize) {
                _this.renderer.removeClass(_this.elm.nativeElement, RESIZE_ACTIVE_CLASS);
                _this.renderer.setStyle(document.body, 'cursor', '');
                _this.renderer.setStyle(_this.elm.nativeElement, 'cursor', '');
                if (_this.resizeEnd.observers.length > 0) {
                    _this.zone.run(function () {
                        _this.resizeEnd.emit({
                            edges: getEdgesDiff({
                                edges: (/** @type {?} */ (currentResize)).edges,
                                initialRectangle: (/** @type {?} */ (currentResize)).startingRect,
                                newRectangle: (/** @type {?} */ (currentResize)).currentRect
                            }),
                            rectangle: (/** @type {?} */ (currentResize)).currentRect
                        });
                    });
                }
                removeGhostElement();
                currentResize = null;
            }
        });
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ResizableDirective.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.resizeEdges) {
            this.resizeEdges$.next(this.resizeEdges);
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    ResizableDirective.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        // browser check for angular universal, because it doesn't know what document is
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setStyle(document.body, 'cursor', '');
        }
        this.mousedown.complete();
        this.mouseup.complete();
        this.mousemove.complete();
        this.resizeEdges$.complete();
        this.destroy$.next();
    };
    /**
     * @private
     * @param {?} elm
     * @param {?} name
     * @param {?} add
     * @return {?}
     */
    ResizableDirective.prototype.setElementClass = /**
     * @private
     * @param {?} elm
     * @param {?} name
     * @param {?} add
     * @return {?}
     */
    function (elm, name, add) {
        if (add) {
            this.renderer.addClass(elm.nativeElement, name);
        }
        else {
            this.renderer.removeClass(elm.nativeElement, name);
        }
    };
    ResizableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlResizable]'
                },] }
    ];
    /** @nocollapse */
    ResizableDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    ResizableDirective.propDecorators = {
        validateResize: [{ type: Input }],
        resizeEdges: [{ type: Input }],
        enableGhostResize: [{ type: Input }],
        resizeSnapGrid: [{ type: Input }],
        resizeCursors: [{ type: Input }],
        resizeCursorPrecision: [{ type: Input }],
        ghostElementPositioning: [{ type: Input }],
        allowNegativeResizes: [{ type: Input }],
        mouseMoveThrottleMS: [{ type: Input }],
        resizeStart: [{ type: Output }],
        resizing: [{ type: Output }],
        resizeEnd: [{ type: Output }]
    };
    return ResizableDirective;
}());
export { ResizableDirective };
if (false) {
    /**
     * A function that will be called before each resize event. Return `true` to allow the resize event to propagate or `false` to cancel it
     * @type {?}
     */
    ResizableDirective.prototype.validateResize;
    /**
     * The edges that an element can be resized from. Pass an object like `{top: true, bottom: false}`. By default no edges can be resized.
     * @deprecated use a resize handle instead that positions itself to the side of the element you would like to resize
     * @type {?}
     */
    ResizableDirective.prototype.resizeEdges;
    /**
     * Set to `true` to enable a temporary resizing effect of the element in between the `resizeStart` and `resizeEnd` events.
     * @type {?}
     */
    ResizableDirective.prototype.enableGhostResize;
    /**
     * A snap grid that resize events will be locked to.
     *
     * e.g. to only allow the element to be resized every 10px set it to `{left: 10, right: 10}`
     * @type {?}
     */
    ResizableDirective.prototype.resizeSnapGrid;
    /**
     * The mouse cursors that will be set on the resize edges
     * @type {?}
     */
    ResizableDirective.prototype.resizeCursors;
    /**
     * Mouse over thickness to active cursor.
     * @deprecated invalid when you migrate to use resize handles instead of setting resizeEdges on the element
     * @type {?}
     */
    ResizableDirective.prototype.resizeCursorPrecision;
    /**
     * Define the positioning of the ghost element (can be fixed or absolute)
     * @type {?}
     */
    ResizableDirective.prototype.ghostElementPositioning;
    /**
     * Allow elements to be resized to negative dimensions
     * @type {?}
     */
    ResizableDirective.prototype.allowNegativeResizes;
    /**
     * The mouse move throttle in milliseconds, default: 50 ms
     * @type {?}
     */
    ResizableDirective.prototype.mouseMoveThrottleMS;
    /**
     * Called when the mouse is pressed and a resize event is about to begin. `$event` is a `ResizeEvent` object.
     * @type {?}
     */
    ResizableDirective.prototype.resizeStart;
    /**
     * Called as the mouse is dragged after a resize event has begun. `$event` is a `ResizeEvent` object.
     * @type {?}
     */
    ResizableDirective.prototype.resizing;
    /**
     * Called after the mouse is released after a resize event. `$event` is a `ResizeEvent` object.
     * @type {?}
     */
    ResizableDirective.prototype.resizeEnd;
    /**
     * @hidden
     * @type {?}
     */
    ResizableDirective.prototype.mouseup;
    /**
     * @hidden
     * @type {?}
     */
    ResizableDirective.prototype.mousedown;
    /**
     * @hidden
     * @type {?}
     */
    ResizableDirective.prototype.mousemove;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.pointerEventListeners;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.resizeEdges$;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.renderer;
    /** @type {?} */
    ResizableDirective.prototype.elm;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.zone;
}
var PointerEventListeners = /** @class */ (function () {
    function PointerEventListeners(renderer, zone) {
        this.pointerDown = new Observable(function (observer) {
            /** @type {?} */
            var unsubscribeMouseDown;
            /** @type {?} */
            var unsubscribeTouchStart;
            zone.runOutsideAngular(function () {
                unsubscribeMouseDown = renderer.listen('document', 'mousedown', function (event) {
                    observer.next({
                        clientX: event.clientX,
                        clientY: event.clientY,
                        event: event
                    });
                });
                if (IS_TOUCH_DEVICE) {
                    unsubscribeTouchStart = renderer.listen('document', 'touchstart', function (event) {
                        observer.next({
                            clientX: event.touches[0].clientX,
                            clientY: event.touches[0].clientY,
                            event: event
                        });
                    });
                }
            });
            return function () {
                unsubscribeMouseDown();
                if (IS_TOUCH_DEVICE) {
                    (/** @type {?} */ (unsubscribeTouchStart))();
                }
            };
        }).pipe(share());
        this.pointerMove = new Observable(function (observer) {
            /** @type {?} */
            var unsubscribeMouseMove;
            /** @type {?} */
            var unsubscribeTouchMove;
            zone.runOutsideAngular(function () {
                unsubscribeMouseMove = renderer.listen('document', 'mousemove', function (event) {
                    observer.next({
                        clientX: event.clientX,
                        clientY: event.clientY,
                        event: event
                    });
                });
                if (IS_TOUCH_DEVICE) {
                    unsubscribeTouchMove = renderer.listen('document', 'touchmove', function (event) {
                        observer.next({
                            clientX: event.targetTouches[0].clientX,
                            clientY: event.targetTouches[0].clientY,
                            event: event
                        });
                    });
                }
            });
            return function () {
                unsubscribeMouseMove();
                if (IS_TOUCH_DEVICE) {
                    (/** @type {?} */ (unsubscribeTouchMove))();
                }
            };
        }).pipe(share());
        this.pointerUp = new Observable(function (observer) {
            /** @type {?} */
            var unsubscribeMouseUp;
            /** @type {?} */
            var unsubscribeTouchEnd;
            /** @type {?} */
            var unsubscribeTouchCancel;
            zone.runOutsideAngular(function () {
                unsubscribeMouseUp = renderer.listen('document', 'mouseup', function (event) {
                    observer.next({
                        clientX: event.clientX,
                        clientY: event.clientY,
                        event: event
                    });
                });
                if (IS_TOUCH_DEVICE) {
                    unsubscribeTouchEnd = renderer.listen('document', 'touchend', function (event) {
                        observer.next({
                            clientX: event.changedTouches[0].clientX,
                            clientY: event.changedTouches[0].clientY,
                            event: event
                        });
                    });
                    unsubscribeTouchCancel = renderer.listen('document', 'touchcancel', function (event) {
                        observer.next({
                            clientX: event.changedTouches[0].clientX,
                            clientY: event.changedTouches[0].clientY,
                            event: event
                        });
                    });
                }
            });
            return function () {
                unsubscribeMouseUp();
                if (IS_TOUCH_DEVICE) {
                    (/** @type {?} */ (unsubscribeTouchEnd))();
                    (/** @type {?} */ (unsubscribeTouchCancel))();
                }
            };
        }).pipe(share());
    }
    // tslint:disable-line
    /**
     * @param {?} renderer
     * @param {?} zone
     * @return {?}
     */
    PointerEventListeners.getInstance = 
    // tslint:disable-line
    /**
     * @param {?} renderer
     * @param {?} zone
     * @return {?}
     */
    function (renderer, zone) {
        if (!PointerEventListeners.instance) {
            PointerEventListeners.instance = new PointerEventListeners(renderer, zone);
        }
        return PointerEventListeners.instance;
    };
    return PointerEventListeners;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    PointerEventListeners.instance;
    /** @type {?} */
    PointerEventListeners.prototype.pointerDown;
    /** @type {?} */
    PointerEventListeners.prototype.pointerMove;
    /** @type {?} */
    PointerEventListeners.prototype.pointerUp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQvIiwic291cmNlcyI6WyJyZXNpemFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLE1BQU0sRUFDTixLQUFLLEVBQ0wsWUFBWSxFQUVaLE1BQU0sRUFHTixNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFZLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxHQUFHLEVBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUl4QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFFcEQscUNBSUM7OztJQUhDLHlDQUFnQjs7SUFDaEIseUNBQWdCOztJQUNoQix1Q0FBK0I7Ozs7O0FBR2pDLHlCQUdDOzs7SUFGQyx1QkFBVTs7SUFDVix1QkFBVTs7Ozs7Ozs7QUFHWixTQUFTLGVBQWUsQ0FDdEIsTUFBYyxFQUNkLE1BQWMsRUFDZCxTQUFxQjtJQUFyQiwwQkFBQSxFQUFBLGFBQXFCOztRQUVmLElBQUksR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDOUMsT0FBTyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQzFCLENBQUM7Ozs7Ozs7O0FBRUQsU0FBUyx1QkFBdUIsQ0FDOUIsWUFBK0IsRUFDL0IsS0FBWSxFQUNaLE9BQWUsRUFDZixPQUFlOztRQUVULGVBQWUsR0FBc0I7UUFDekMsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHO1FBQ3JCLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtRQUMzQixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7UUFDdkIsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLO0tBQzFCO0lBRUQsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ2IsZUFBZSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUM7S0FDaEM7SUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDaEIsZUFBZSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUM7S0FDbkM7SUFDRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDZCxlQUFlLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQztLQUNqQztJQUNELElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNmLGVBQWUsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO0tBQ2xDO0lBQ0QsZUFBZSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUM7SUFDdEUsZUFBZSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7SUFFckUsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQzs7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQ3JCLE9BQW1CLEVBQ25CLHVCQUErQjs7UUFFM0IsVUFBVSxHQUFHLENBQUM7O1FBQ2QsVUFBVSxHQUFHLENBQUM7O1FBQ1osS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSzs7UUFDbkMsbUJBQW1CLEdBQUc7UUFDMUIsV0FBVztRQUNYLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsY0FBYztLQUNmOztRQUNLLFNBQVMsR0FBRyxtQkFBbUI7U0FDbEMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFmLENBQWUsQ0FBQztTQUNoQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQztJQUN6QixJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2hELFVBQVUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUM1QiwrQ0FBK0MsRUFDL0MsSUFBSSxDQUNMLENBQUM7UUFDRixVQUFVLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FDNUIsK0NBQStDLEVBQy9DLElBQUksQ0FDTCxDQUFDO0tBQ0g7SUFFRCxJQUFJLHVCQUF1QixLQUFLLFVBQVUsRUFBRTtRQUMxQyxPQUFPO1lBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWTtZQUMxQyxLQUFLLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXO1lBQ3hDLEdBQUcsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxVQUFVO1lBQ2pELE1BQU0sRUFDSixPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVk7Z0JBQ2xDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUztnQkFDL0IsVUFBVTtZQUNaLElBQUksRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxVQUFVO1lBQ25ELEtBQUssRUFDSCxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVc7Z0JBQ2pDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVTtnQkFDaEMsVUFBVTtTQUNiLENBQUM7S0FDSDtTQUFNOztZQUNDLFlBQVksR0FBc0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtRQUNyRixPQUFPO1lBQ0wsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNO1lBQzNCLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztZQUN6QixHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsR0FBRyxVQUFVO1lBQ2xDLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTSxHQUFHLFVBQVU7WUFDeEMsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLEdBQUcsVUFBVTtZQUNwQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVO1lBQ3RDLFNBQVMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVM7WUFDMUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVTtTQUM3QyxDQUFDO0tBQ0g7QUFDSCxDQUFDOzs7OztBQUVELFNBQVMsaUJBQWlCLENBQUMsRUFNMUI7UUFMQyxvQkFBTyxFQUNQLGNBQUk7SUFLSixPQUFPLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3ZELENBQUM7Ozs7O0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxFQU0xQjtRQUxDLG9CQUFPLEVBQ1AsY0FBSTtJQUtKLE9BQU8sT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkQsQ0FBQzs7Ozs7QUFFRCxTQUFTLGNBQWMsQ0FBQyxFQVl2QjtRQVhDLG9CQUFPLEVBQ1Asb0JBQU8sRUFDUCxZQUFHLEVBQ0gsOEJBQVksRUFDWixvQ0FBZTs7UUFRVCxXQUFXLEdBQWUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTs7UUFDbkUsS0FBSyxHQUFVLEVBQUU7SUFFdkIsSUFDRSxZQUFZLENBQUMsSUFBSTtRQUNqQixlQUFlLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDO1FBQzNELGlCQUFpQixDQUFDLEVBQUUsT0FBTyxTQUFBLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQ2pEO1FBQ0EsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDbkI7SUFFRCxJQUNFLFlBQVksQ0FBQyxLQUFLO1FBQ2xCLGVBQWUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUM7UUFDNUQsaUJBQWlCLENBQUMsRUFBRSxPQUFPLFNBQUEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFDakQ7UUFDQSxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUNwQjtJQUVELElBQ0UsWUFBWSxDQUFDLEdBQUc7UUFDaEIsZUFBZSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQztRQUMxRCxpQkFBaUIsQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUNqRDtRQUNBLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0tBQ2xCO0lBRUQsSUFDRSxZQUFZLENBQUMsTUFBTTtRQUNuQixlQUFlLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDO1FBQzdELGlCQUFpQixDQUFDLEVBQUUsT0FBTyxTQUFBLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQ2pEO1FBQ0EsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDckI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7Ozs7QUFFRCxtQ0FPQzs7O0lBTkMsZ0NBQWdCOztJQUNoQixpQ0FBaUI7O0lBQ2pCLG1DQUFtQjs7SUFDbkIsb0NBQW9COztJQUNwQixvQ0FBb0I7O0lBQ3BCLG9DQUFvQjs7O0lBR2hCLHNCQUFzQixHQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzFELE9BQU8sRUFBRSxXQUFXO0lBQ3BCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFVBQVUsRUFBRSxXQUFXO0lBQ3ZCLFdBQVcsRUFBRSxXQUFXO0lBQ3hCLFdBQVcsRUFBRSxZQUFZO0lBQ3pCLFdBQVcsRUFBRSxZQUFZO0NBQzFCLENBQUM7Ozs7OztBQUVGLFNBQVMsZUFBZSxDQUFDLEtBQVksRUFBRSxPQUFzQjtJQUMzRCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUMzQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7S0FDeEI7U0FBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7S0FDekI7U0FBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUM7S0FDM0I7U0FBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUN0QyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7S0FDNUI7U0FBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNwQyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7S0FDNUI7U0FBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNwQyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7S0FDNUI7U0FBTTtRQUNMLE9BQU8sRUFBRSxDQUFDO0tBQ1g7QUFDSCxDQUFDOzs7OztBQUVELFNBQVMsWUFBWSxDQUFDLEVBUXJCO1FBUEMsZ0JBQUssRUFDTCxzQ0FBZ0IsRUFDaEIsOEJBQVk7O1FBTU4sU0FBUyxHQUFVLEVBQUU7SUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1FBQzdCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQzs7SUFFSyxtQkFBbUIsR0FBVyxlQUFlOztJQUM3Qyx1QkFBdUIsR0FBVyxtQkFBbUI7O0lBQ3JELHdCQUF3QixHQUFXLG9CQUFvQjs7SUFDdkQsc0JBQXNCLEdBQVcsa0JBQWtCOztJQUNuRCx5QkFBeUIsR0FBVyxxQkFBcUI7O0lBQ3pELDBCQUEwQixHQUFXLHNCQUFzQjs7QUFFakUsTUFBTSxLQUFPLHNCQUFzQixHQUFXLEVBQUU7Ozs7Ozs7Ozs7OztBQWFoRDtJQXNHRTs7T0FFRztJQUNILDRCQUMrQixVQUFlLEVBQ3BDLFFBQW1CLEVBQ3BCLEdBQWUsRUFDZCxJQUFZO1FBSFMsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFROzs7OztRQWhHYixnQkFBVyxHQUFVLEVBQUUsQ0FBQzs7OztRQUt4QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7Ozs7OztRQU9uQyxtQkFBYyxHQUFVLEVBQUUsQ0FBQzs7OztRQUszQixrQkFBYSxHQUFrQixzQkFBc0IsQ0FBQzs7Ozs7UUFNdEQsMEJBQXFCLEdBQVcsQ0FBQyxDQUFDOzs7O1FBS2xDLDRCQUF1QixHQUF5QixPQUFPLENBQUM7Ozs7UUFLeEQseUJBQW9CLEdBQVksS0FBSyxDQUFDOzs7O1FBS3RDLHdCQUFtQixHQUFXLHNCQUFzQixDQUFDOzs7O1FBS3BELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQzs7OztRQUs5QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQzs7OztRQUszQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQzs7OztRQUsvQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBSXhCLENBQUM7Ozs7UUFLRSxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBSTFCLENBQUM7Ozs7UUFLRSxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBSzFCLENBQUM7UUFJRyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUUvQixpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFTLENBQUM7UUFXMUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDLFdBQVcsQ0FDNUQsUUFBUSxFQUNSLElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFROzs7O0lBQVI7UUFBQSxpQkF1WUM7O1lBdFlPLFVBQVUsR0FJWCxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDOztZQUU1RCxVQUFVLEdBQUcsS0FBSyxDQUN0QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUN0QyxJQUFJLENBQUMsU0FBUyxDQUNmLENBQUMsSUFBSSxDQUNKLEdBQUcsQ0FBQyxVQUFDLEVBQVM7Z0JBQVAsZ0JBQUs7WUFDVixJQUFJLGFBQWEsRUFBRTtnQkFDakIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLEVBQ0YsS0FBSyxFQUFFLENBQ1I7O1lBRUssUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7O1lBRXRFLGFBS0k7O1lBRUYsa0JBQWtCLEdBQUc7WUFDekIsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtnQkFDN0MsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FDOUMsYUFBYSxDQUFDLFVBQVUsQ0FDekIsQ0FBQztnQkFDRixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDekU7UUFDSCxDQUFDOztZQUVLLGdCQUFnQixHQUFHO1lBQ3ZCLDRCQUNLLHNCQUFzQixFQUN0QixLQUFJLENBQUMsYUFBYSxFQUNyQjtRQUNKLENBQUM7UUFFRCxJQUFJLENBQUMsWUFBWTthQUNkLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUMzQixHQUFHLENBQUM7WUFDRixPQUFPLENBQ0wsS0FBSSxDQUFDLFdBQVc7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQ3JFLENBQUM7UUFDSixDQUFDLENBQUMsRUFDRixTQUFTLENBQUMsVUFBQSx3QkFBd0I7WUFDaEMsT0FBQSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQTdDLENBQTZDLENBQzlDLEVBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QjthQUNBLFNBQVMsQ0FBQyxVQUFDLEVBQW9CO2dCQUFsQixvQkFBTyxFQUFFLG9CQUFPOztnQkFDdEIsV0FBVyxHQUFVLGNBQWMsQ0FBQztnQkFDeEMsT0FBTyxTQUFBO2dCQUNQLE9BQU8sU0FBQTtnQkFDUCxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUc7Z0JBQ2IsWUFBWSxFQUFFLEtBQUksQ0FBQyxXQUFXO2dCQUM5QixlQUFlLEVBQUUsS0FBSSxDQUFDLHFCQUFxQjthQUM1QyxDQUFDOztnQkFDSSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGFBQWEsRUFBRTs7b0JBQ1osTUFBTSxHQUFHLGVBQWUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDO2dCQUMxRCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDbEU7WUFDRCxLQUFJLENBQUMsZUFBZSxDQUNsQixLQUFJLENBQUMsR0FBRyxFQUNSLHVCQUF1QixFQUN2QixXQUFXLENBQUMsSUFBSSxLQUFLLElBQUksQ0FDMUIsQ0FBQztZQUNGLEtBQUksQ0FBQyxlQUFlLENBQ2xCLEtBQUksQ0FBQyxHQUFHLEVBQ1Isd0JBQXdCLEVBQ3hCLFdBQVcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUMzQixDQUFDO1lBQ0YsS0FBSSxDQUFDLGVBQWUsQ0FDbEIsS0FBSSxDQUFDLEdBQUcsRUFDUixzQkFBc0IsRUFDdEIsV0FBVyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQ3pCLENBQUM7WUFDRixLQUFJLENBQUMsZUFBZSxDQUNsQixLQUFJLENBQUMsR0FBRyxFQUNSLHlCQUF5QixFQUN6QixXQUFXLENBQUMsTUFBTSxLQUFLLElBQUksQ0FDNUIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDOztZQUVDLFNBQVMsR0FBb0IsVUFBVTthQUMxQyxJQUFJLENBQ0gsUUFBUSxDQUFDLFVBQUEsV0FBVzs7Ozs7WUFDbEIsU0FBUyxPQUFPLENBQUMsVUFBZ0Q7Z0JBQy9ELE9BQU87b0JBQ0wsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU87b0JBQ2pELE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPO2lCQUNsRCxDQUFDO1lBQ0osQ0FBQzs7Z0JBRUssV0FBVyxHQUFHOztvQkFDWixRQUFRLEdBQWUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBRTNDLElBQUksYUFBYSxFQUFFO29CQUNqQixJQUFJLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO3dCQUN4RCxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7cUJBQ3hDO3lCQUFNLElBQ0wsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO3dCQUN6QixhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDekI7d0JBQ0EsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO3FCQUN6QztvQkFFRCxJQUFJLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUN0RCxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7cUJBQ3ZDO3lCQUFNLElBQ0wsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO3dCQUMxQixhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDMUI7d0JBQ0EsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO3FCQUMxQztpQkFDRjtnQkFFRCxPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDOzs7Ozs7WUFFRCxTQUFTLE9BQU8sQ0FDZCxNQUE0QyxFQUM1QyxRQUFvQjtnQkFFcEIsT0FBTztvQkFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDMUMsQ0FBQztZQUNKLENBQUM7WUFFRCxPQUFPLENBQUMsbUJBQUEsS0FBSyxDQUNYLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBVixDQUFVLENBQUMsQ0FBQyxFQUN4RCxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQzVCLEVBS0EsQ0FBQztpQkFDQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsRUFBMkI7b0JBQTNCLDBCQUEyQixFQUExQixzQkFBYyxFQUFFLGlCQUFTO2dCQUM3QixPQUFPO29CQUNMLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjO29CQUN6RCxPQUFPLENBQUMsU0FBUyxDQUFDO2lCQUNuQixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQ0g7aUJBQ0EsSUFBSSxDQUNILE1BQU0sQ0FBQyxVQUFDLEVBQTJCO29CQUEzQiwwQkFBMkIsRUFBMUIsc0JBQWMsRUFBRSxpQkFBUztnQkFDaEMsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDbkIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7O29CQUVLLFFBQVEsR0FBZSxXQUFXLEVBQUU7O29CQUNwQyxZQUFZLEdBQWUsT0FBTyxDQUN0QyxjQUFjLEVBQ2QsUUFBUSxDQUNUOztvQkFDSyxPQUFPLEdBQWUsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7Z0JBRXhELE9BQU8sQ0FDTCxZQUFZLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUM3RCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQ0g7aUJBQ0EsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFDLEVBQWE7b0JBQWIsMEJBQWEsRUFBVixpQkFBUzs7b0JBQ1QsUUFBUSxHQUFlLFdBQVcsRUFBRTtnQkFDMUMsT0FBTztvQkFDTCxPQUFPLEVBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztvQkFDekQsT0FBTyxFQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7aUJBQzFELENBQUM7WUFDSixDQUFDLENBQUMsQ0FDSDtpQkFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUNIO2FBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsQ0FBQyxDQUFDLGFBQWEsRUFBZixDQUFlLENBQUMsQ0FBQztRQUV0QyxTQUFTO2FBQ04sSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFDLEVBQW9CO2dCQUFsQixvQkFBTyxFQUFFLG9CQUFPO1lBQ3JCLE9BQU8sdUJBQXVCLENBQzVCLG1CQUFBLGFBQWEsRUFBQyxDQUFDLFlBQVksRUFDM0IsbUJBQUEsYUFBYSxFQUFDLENBQUMsS0FBSyxFQUNwQixPQUFPLEVBQ1AsT0FBTyxDQUNSLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSDthQUNBLElBQUksQ0FDSCxNQUFNLENBQUMsVUFBQyxlQUFrQztZQUN4QyxPQUFPLENBQ0wsS0FBSSxDQUFDLG9CQUFvQjtnQkFDekIsQ0FBQyxDQUFDLENBQ0EsZUFBZSxDQUFDLE1BQU07b0JBQ3RCLGVBQWUsQ0FBQyxLQUFLO29CQUNyQixlQUFlLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQzFCLGVBQWUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUMxQixDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSDthQUNBLElBQUksQ0FDSCxNQUFNLENBQUMsVUFBQyxlQUFrQztZQUN4QyxPQUFPLEtBQUksQ0FBQyxjQUFjO2dCQUN4QixDQUFDLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQztvQkFDbEIsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLEtBQUssRUFBRSxZQUFZLENBQUM7d0JBQ2xCLEtBQUssRUFBRSxtQkFBQSxhQUFhLEVBQUMsQ0FBQyxLQUFLO3dCQUMzQixnQkFBZ0IsRUFBRSxtQkFBQSxhQUFhLEVBQUMsQ0FBQyxZQUFZO3dCQUM3QyxZQUFZLEVBQUUsZUFBZTtxQkFDOUIsQ0FBQztpQkFDSCxDQUFDO2dCQUNKLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDWCxDQUFDLENBQUMsRUFDRixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QjthQUNBLFNBQVMsQ0FBQyxVQUFDLGVBQWtDO1lBQzVDLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzdDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixhQUFhLENBQUMsVUFBVSxFQUN4QixRQUFRLEVBQ0wsZUFBZSxDQUFDLE1BQU0sT0FBSSxDQUM5QixDQUFDO2dCQUNGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixhQUFhLENBQUMsVUFBVSxFQUN4QixPQUFPLEVBQ0osZUFBZSxDQUFDLEtBQUssT0FBSSxDQUM3QixDQUFDO2dCQUNGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixhQUFhLENBQUMsVUFBVSxFQUN4QixLQUFLLEVBQ0YsZUFBZSxDQUFDLEdBQUcsT0FBSSxDQUMzQixDQUFDO2dCQUNGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixhQUFhLENBQUMsVUFBVSxFQUN4QixNQUFNLEVBQ0gsZUFBZSxDQUFDLElBQUksT0FBSSxDQUM1QixDQUFDO2FBQ0g7WUFFRCxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RDLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUNqQixLQUFLLEVBQUUsWUFBWSxDQUFDOzRCQUNsQixLQUFLLEVBQUUsbUJBQUEsYUFBYSxFQUFDLENBQUMsS0FBSzs0QkFDM0IsZ0JBQWdCLEVBQUUsbUJBQUEsYUFBYSxFQUFDLENBQUMsWUFBWTs0QkFDN0MsWUFBWSxFQUFFLGVBQWU7eUJBQzlCLENBQUM7d0JBQ0YsU0FBUyxFQUFFLGVBQWU7cUJBQzNCLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsbUJBQUEsYUFBYSxFQUFDLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVMLFVBQVU7YUFDUCxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsRUFBMkI7Z0JBQXpCLG9CQUFPLEVBQUUsb0JBQU8sRUFBRSxnQkFBSztZQUM1QixPQUFPLENBQ0wsS0FBSztnQkFDTCxjQUFjLENBQUM7b0JBQ2IsT0FBTyxTQUFBO29CQUNQLE9BQU8sU0FBQTtvQkFDUCxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUc7b0JBQ2IsWUFBWSxFQUFFLEtBQUksQ0FBQyxXQUFXO29CQUM5QixlQUFlLEVBQUUsS0FBSSxDQUFDLHFCQUFxQjtpQkFDNUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSDthQUNBLElBQUksQ0FDSCxNQUFNLENBQUMsVUFBQyxLQUFZO1lBQ2xCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pCO2FBQ0EsU0FBUyxDQUFDLFVBQUMsS0FBWTtZQUN0QixJQUFJLGFBQWEsRUFBRTtnQkFDakIsa0JBQWtCLEVBQUUsQ0FBQzthQUN0Qjs7Z0JBQ0ssWUFBWSxHQUFzQixjQUFjLENBQ3BELEtBQUksQ0FBQyxHQUFHLEVBQ1IsS0FBSSxDQUFDLHVCQUF1QixDQUM3QjtZQUNELGFBQWEsR0FBRztnQkFDZCxLQUFLLE9BQUE7Z0JBQ0wsWUFBWSxjQUFBO2dCQUNaLFdBQVcsRUFBRSxZQUFZO2FBQzFCLENBQUM7O2dCQUNJLGFBQWEsR0FBRyxnQkFBZ0IsRUFBRTs7Z0JBQ2xDLE1BQU0sR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUM7WUFDbEUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksS0FBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQixhQUFhLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FDOUMsYUFBYSxDQUFDLFVBQVUsQ0FDekIsQ0FBQztnQkFDRixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQ3RCLFlBQVksRUFDWixRQUFRLENBQ1QsQ0FBQztnQkFDRixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsYUFBYSxDQUFDLFVBQVUsRUFDeEIsVUFBVSxFQUNWLEtBQUksQ0FBQyx1QkFBdUIsQ0FDN0IsQ0FBQztnQkFDRixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsYUFBYSxDQUFDLFVBQVUsRUFDeEIsTUFBTSxFQUNILGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFJLENBQ3ZDLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLGFBQWEsQ0FBQyxVQUFVLEVBQ3hCLEtBQUssRUFDRixhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBSSxDQUN0QyxDQUFDO2dCQUNGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixhQUFhLENBQUMsVUFBVSxFQUN4QixRQUFRLEVBQ0wsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLE9BQUksQ0FDekMsQ0FBQztnQkFDRixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsYUFBYSxDQUFDLFVBQVUsRUFDeEIsT0FBTyxFQUNKLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxPQUFJLENBQ3hDLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLGFBQWEsQ0FBQyxVQUFVLEVBQ3hCLFFBQVEsRUFDUixlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FDcEQsQ0FBQztnQkFDRixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsYUFBYSxDQUFDLFVBQVUsRUFDeEIsMEJBQTBCLENBQzNCLENBQUM7Z0JBQ0YsbUJBQUEsYUFBYSxDQUFDLFVBQVUsRUFBQyxDQUFDLFNBQVMsR0FBRyxtQkFBQSxhQUFhLENBQUMsWUFBWTtxQkFDN0QsU0FBUyxFQUFVLENBQUM7Z0JBQ3ZCLG1CQUFBLGFBQWEsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxVQUFVLEdBQUcsbUJBQUEsYUFBYSxDQUFDLFlBQVk7cUJBQzlELFVBQVUsRUFBVSxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDWixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzt3QkFDcEIsS0FBSyxFQUFFLFlBQVksQ0FBQzs0QkFDbEIsS0FBSyxPQUFBOzRCQUNMLGdCQUFnQixFQUFFLFlBQVk7NEJBQzlCLFlBQVksRUFBRSxZQUFZO3lCQUMzQixDQUFDO3dCQUNGLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzNELENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFTCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDaEQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3ZFLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzdELElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdkMsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQ1osS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7NEJBQ2xCLEtBQUssRUFBRSxZQUFZLENBQUM7Z0NBQ2xCLEtBQUssRUFBRSxtQkFBQSxhQUFhLEVBQUMsQ0FBQyxLQUFLO2dDQUMzQixnQkFBZ0IsRUFBRSxtQkFBQSxhQUFhLEVBQUMsQ0FBQyxZQUFZO2dDQUM3QyxZQUFZLEVBQUUsbUJBQUEsYUFBYSxFQUFDLENBQUMsV0FBVzs2QkFDekMsQ0FBQzs0QkFDRixTQUFTLEVBQUUsbUJBQUEsYUFBYSxFQUFDLENBQUMsV0FBVzt5QkFDdEMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELGtCQUFrQixFQUFFLENBQUM7Z0JBQ3JCLGFBQWEsR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsd0NBQVc7Ozs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILHdDQUFXOzs7O0lBQVg7UUFDRSxnRkFBZ0Y7UUFDaEYsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7Ozs7SUFFTyw0Q0FBZTs7Ozs7OztJQUF2QixVQUF3QixHQUFlLEVBQUUsSUFBWSxFQUFFLEdBQVk7UUFDakUsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQzs7Z0JBL2hCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0RBd0dJLE1BQU0sU0FBQyxXQUFXO2dCQXRZckIsU0FBUztnQkFDVCxVQUFVO2dCQU1WLE1BQU07OztpQ0E0UkwsS0FBSzs4QkFNTCxLQUFLO29DQUtMLEtBQUs7aUNBT0wsS0FBSztnQ0FLTCxLQUFLO3dDQU1MLEtBQUs7MENBS0wsS0FBSzt1Q0FLTCxLQUFLO3NDQUtMLEtBQUs7OEJBS0wsTUFBTTsyQkFLTixNQUFNOzRCQUtOLE1BQU07O0lBOGRULHlCQUFDO0NBQUEsQUFoaUJELElBZ2lCQztTQTdoQlksa0JBQWtCOzs7Ozs7SUFJN0IsNENBQStEOzs7Ozs7SUFNL0QseUNBQWlDOzs7OztJQUtqQywrQ0FBNEM7Ozs7Ozs7SUFPNUMsNENBQW9DOzs7OztJQUtwQywyQ0FBK0Q7Ozs7OztJQU0vRCxtREFBMkM7Ozs7O0lBSzNDLHFEQUFpRTs7Ozs7SUFLakUsa0RBQStDOzs7OztJQUsvQyxpREFBOEQ7Ozs7O0lBSzlELHlDQUF3RDs7Ozs7SUFLeEQsc0NBQXFEOzs7OztJQUtyRCx1Q0FBc0Q7Ozs7O0lBS3RELHFDQUlLOzs7OztJQUtMLHVDQUlLOzs7OztJQUtMLHVDQUtLOzs7OztJQUVMLG1EQUFxRDs7Ozs7SUFFckQsc0NBQXVDOzs7OztJQUV2QywwQ0FBNEM7Ozs7O0lBTTFDLHdDQUE0Qzs7Ozs7SUFDNUMsc0NBQTJCOztJQUMzQixpQ0FBc0I7Ozs7O0lBQ3RCLGtDQUFvQjs7QUFxYnhCO0lBc0JFLCtCQUFZLFFBQW1CLEVBQUUsSUFBWTtRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksVUFBVSxDQUMvQixVQUFDLFFBQTBDOztnQkFDckMsb0JBQWdDOztnQkFDaEMscUJBQStDO1lBRW5ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDckIsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDcEMsVUFBVSxFQUNWLFdBQVcsRUFDWCxVQUFDLEtBQWlCO29CQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUNaLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzt3QkFDdEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO3dCQUN0QixLQUFLLE9BQUE7cUJBQ04sQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FDRixDQUFDO2dCQUVGLElBQUksZUFBZSxFQUFFO29CQUNuQixxQkFBcUIsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUNyQyxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQUMsS0FBaUI7d0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUM7NEJBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTzs0QkFDakMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTzs0QkFDakMsS0FBSyxPQUFBO3lCQUNOLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQ0YsQ0FBQztpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTztnQkFDTCxvQkFBb0IsRUFBRSxDQUFDO2dCQUN2QixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsbUJBQUEscUJBQXFCLEVBQUMsRUFBRSxDQUFDO2lCQUMxQjtZQUNILENBQUMsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQy9CLFVBQUMsUUFBMEM7O2dCQUNyQyxvQkFBZ0M7O2dCQUNoQyxvQkFBOEM7WUFFbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUNyQixvQkFBb0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUNwQyxVQUFVLEVBQ1YsV0FBVyxFQUNYLFVBQUMsS0FBaUI7b0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO3dCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87d0JBQ3RCLEtBQUssT0FBQTtxQkFDTixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUNGLENBQUM7Z0JBRUYsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQ3BDLFVBQVUsRUFDVixXQUFXLEVBQ1gsVUFBQyxLQUFpQjt3QkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQzs0QkFDWixPQUFPLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPOzRCQUN2QyxPQUFPLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPOzRCQUN2QyxLQUFLLE9BQUE7eUJBQ04sQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FDRixDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPO2dCQUNMLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLElBQUksZUFBZSxFQUFFO29CQUNuQixtQkFBQSxvQkFBb0IsRUFBQyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FDN0IsVUFBQyxRQUEwQzs7Z0JBQ3JDLGtCQUE4Qjs7Z0JBQzlCLG1CQUE2Qzs7Z0JBQzdDLHNCQUFnRDtZQUVwRCxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3JCLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQ2xDLFVBQVUsRUFDVixTQUFTLEVBQ1QsVUFBQyxLQUFpQjtvQkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDWixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87d0JBQ3RCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzt3QkFDdEIsS0FBSyxPQUFBO3FCQUNOLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQ0YsQ0FBQztnQkFFRixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDbkMsVUFBVSxFQUNWLFVBQVUsRUFDVixVQUFDLEtBQWlCO3dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUNaLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87NEJBQ3hDLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87NEJBQ3hDLEtBQUssT0FBQTt5QkFDTixDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUNGLENBQUM7b0JBRUYsc0JBQXNCLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDdEMsVUFBVSxFQUNWLGFBQWEsRUFDYixVQUFDLEtBQWlCO3dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUNaLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87NEJBQ3hDLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87NEJBQ3hDLEtBQUssT0FBQTt5QkFDTixDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUNGLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU87Z0JBQ0wsa0JBQWtCLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLG1CQUFBLG1CQUFtQixFQUFDLEVBQUUsQ0FBQztvQkFDdkIsbUJBQUEsc0JBQXNCLEVBQUMsRUFBRSxDQUFDO2lCQUMzQjtZQUNILENBQUMsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7Ozs7Ozs7SUF6SmEsaUNBQVc7Ozs7Ozs7SUFBekIsVUFDRSxRQUFtQixFQUNuQixJQUFZO1FBRVosSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRTtZQUNuQyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQkFBcUIsQ0FDeEQsUUFBUSxFQUNSLElBQUksQ0FDTCxDQUFDO1NBQ0g7UUFDRCxPQUFPLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBK0lILDRCQUFDO0FBQUQsQ0FBQyxBQW5LRCxJQW1LQzs7Ozs7O0lBNUpDLCtCQUErQzs7SUFOL0MsNENBQXVEOztJQUV2RCw0Q0FBdUQ7O0lBRXZELDBDQUFxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSW5qZWN0LFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIE9ic2VydmVyLCBtZXJnZSwgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIG1hcCxcbiAgbWVyZ2VNYXAsXG4gIHRha2VVbnRpbCxcbiAgZmlsdGVyLFxuICBwYWlyd2lzZSxcbiAgdGFrZSxcbiAgc2hhcmUsXG4gIGF1ZGl0VGltZSxcbiAgc3dpdGNoTWFwLFxuICBzdGFydFdpdGgsXG4gIHRhcFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFZGdlcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9lZGdlcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQm91bmRpbmdSZWN0YW5nbGUgfSBmcm9tICcuL2ludGVyZmFjZXMvYm91bmRpbmctcmVjdGFuZ2xlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBSZXNpemVFdmVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9yZXNpemUtZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IElTX1RPVUNIX0RFVklDRSB9IGZyb20gJy4vaXMtdG91Y2gtZGV2aWNlJztcblxuaW50ZXJmYWNlIFBvaW50ZXJFdmVudENvb3JkaW5hdGUge1xuICBjbGllbnRYOiBudW1iZXI7XG4gIGNsaWVudFk6IG51bWJlcjtcbiAgZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50O1xufVxuXG5pbnRlcmZhY2UgQ29vcmRpbmF0ZSB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBpc051bWJlckNsb3NlVG8oXG4gIHZhbHVlMTogbnVtYmVyLFxuICB2YWx1ZTI6IG51bWJlcixcbiAgcHJlY2lzaW9uOiBudW1iZXIgPSAzXG4pOiBib29sZWFuIHtcbiAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5hYnModmFsdWUxIC0gdmFsdWUyKTtcbiAgcmV0dXJuIGRpZmYgPCBwcmVjaXNpb247XG59XG5cbmZ1bmN0aW9uIGdldE5ld0JvdW5kaW5nUmVjdGFuZ2xlKFxuICBzdGFydGluZ1JlY3Q6IEJvdW5kaW5nUmVjdGFuZ2xlLFxuICBlZGdlczogRWRnZXMsXG4gIGNsaWVudFg6IG51bWJlcixcbiAgY2xpZW50WTogbnVtYmVyXG4pOiBCb3VuZGluZ1JlY3RhbmdsZSB7XG4gIGNvbnN0IG5ld0JvdW5kaW5nUmVjdDogQm91bmRpbmdSZWN0YW5nbGUgPSB7XG4gICAgdG9wOiBzdGFydGluZ1JlY3QudG9wLFxuICAgIGJvdHRvbTogc3RhcnRpbmdSZWN0LmJvdHRvbSxcbiAgICBsZWZ0OiBzdGFydGluZ1JlY3QubGVmdCxcbiAgICByaWdodDogc3RhcnRpbmdSZWN0LnJpZ2h0XG4gIH07XG5cbiAgaWYgKGVkZ2VzLnRvcCkge1xuICAgIG5ld0JvdW5kaW5nUmVjdC50b3AgKz0gY2xpZW50WTtcbiAgfVxuICBpZiAoZWRnZXMuYm90dG9tKSB7XG4gICAgbmV3Qm91bmRpbmdSZWN0LmJvdHRvbSArPSBjbGllbnRZO1xuICB9XG4gIGlmIChlZGdlcy5sZWZ0KSB7XG4gICAgbmV3Qm91bmRpbmdSZWN0LmxlZnQgKz0gY2xpZW50WDtcbiAgfVxuICBpZiAoZWRnZXMucmlnaHQpIHtcbiAgICBuZXdCb3VuZGluZ1JlY3QucmlnaHQgKz0gY2xpZW50WDtcbiAgfVxuICBuZXdCb3VuZGluZ1JlY3QuaGVpZ2h0ID0gbmV3Qm91bmRpbmdSZWN0LmJvdHRvbSAtIG5ld0JvdW5kaW5nUmVjdC50b3A7XG4gIG5ld0JvdW5kaW5nUmVjdC53aWR0aCA9IG5ld0JvdW5kaW5nUmVjdC5yaWdodCAtIG5ld0JvdW5kaW5nUmVjdC5sZWZ0O1xuXG4gIHJldHVybiBuZXdCb3VuZGluZ1JlY3Q7XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWN0KFxuICBlbGVtZW50OiBFbGVtZW50UmVmLFxuICBnaG9zdEVsZW1lbnRQb3NpdGlvbmluZzogc3RyaW5nXG4pOiBCb3VuZGluZ1JlY3RhbmdsZSB7XG4gIGxldCB0cmFuc2xhdGVYID0gMDtcbiAgbGV0IHRyYW5zbGF0ZVkgPSAwO1xuICBjb25zdCBzdHlsZSA9IGVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZTtcbiAgY29uc3QgdHJhbnNmb3JtUHJvcGVydGllcyA9IFtcbiAgICAndHJhbnNmb3JtJyxcbiAgICAnLW1zLXRyYW5zZm9ybScsXG4gICAgJy1tb3otdHJhbnNmb3JtJyxcbiAgICAnLW8tdHJhbnNmb3JtJ1xuICBdO1xuICBjb25zdCB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1Qcm9wZXJ0aWVzXG4gICAgLm1hcChwcm9wZXJ0eSA9PiBzdHlsZVtwcm9wZXJ0eV0pXG4gICAgLmZpbmQodmFsdWUgPT4gISF2YWx1ZSk7XG4gIGlmICh0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtLmluY2x1ZGVzKCd0cmFuc2xhdGUnKSkge1xuICAgIHRyYW5zbGF0ZVggPSB0cmFuc2Zvcm0ucmVwbGFjZShcbiAgICAgIC8uKnRyYW5zbGF0ZTM/ZD9cXCgoLT9bMC05XSopcHgsICgtP1swLTldKilweC4qLyxcbiAgICAgICckMSdcbiAgICApO1xuICAgIHRyYW5zbGF0ZVkgPSB0cmFuc2Zvcm0ucmVwbGFjZShcbiAgICAgIC8uKnRyYW5zbGF0ZTM/ZD9cXCgoLT9bMC05XSopcHgsICgtP1swLTldKilweC4qLyxcbiAgICAgICckMidcbiAgICApO1xuICB9XG5cbiAgaWYgKGdob3N0RWxlbWVudFBvc2l0aW9uaW5nID09PSAnYWJzb2x1dGUnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgIHdpZHRoOiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICB0b3A6IGVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgLSB0cmFuc2xhdGVZLFxuICAgICAgYm90dG9tOlxuICAgICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICtcbiAgICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCAtXG4gICAgICAgIHRyYW5zbGF0ZVksXG4gICAgICBsZWZ0OiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCAtIHRyYW5zbGF0ZVgsXG4gICAgICByaWdodDpcbiAgICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoICtcbiAgICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQgLVxuICAgICAgICB0cmFuc2xhdGVYXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3Q6IEJvdW5kaW5nUmVjdGFuZ2xlID0gZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IGJvdW5kaW5nUmVjdC5oZWlnaHQsXG4gICAgICB3aWR0aDogYm91bmRpbmdSZWN0LndpZHRoLFxuICAgICAgdG9wOiBib3VuZGluZ1JlY3QudG9wIC0gdHJhbnNsYXRlWSxcbiAgICAgIGJvdHRvbTogYm91bmRpbmdSZWN0LmJvdHRvbSAtIHRyYW5zbGF0ZVksXG4gICAgICBsZWZ0OiBib3VuZGluZ1JlY3QubGVmdCAtIHRyYW5zbGF0ZVgsXG4gICAgICByaWdodDogYm91bmRpbmdSZWN0LnJpZ2h0IC0gdHJhbnNsYXRlWCxcbiAgICAgIHNjcm9sbFRvcDogZWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0XG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1dpdGhpbkJvdW5kaW5nWSh7XG4gIGNsaWVudFksXG4gIHJlY3Rcbn06IHtcbiAgY2xpZW50WTogbnVtYmVyO1xuICByZWN0OiBDbGllbnRSZWN0O1xufSk6IGJvb2xlYW4ge1xuICByZXR1cm4gY2xpZW50WSA+PSByZWN0LnRvcCAmJiBjbGllbnRZIDw9IHJlY3QuYm90dG9tO1xufVxuXG5mdW5jdGlvbiBpc1dpdGhpbkJvdW5kaW5nWCh7XG4gIGNsaWVudFgsXG4gIHJlY3Rcbn06IHtcbiAgY2xpZW50WDogbnVtYmVyO1xuICByZWN0OiBDbGllbnRSZWN0O1xufSk6IGJvb2xlYW4ge1xuICByZXR1cm4gY2xpZW50WCA+PSByZWN0LmxlZnQgJiYgY2xpZW50WCA8PSByZWN0LnJpZ2h0O1xufVxuXG5mdW5jdGlvbiBnZXRSZXNpemVFZGdlcyh7XG4gIGNsaWVudFgsXG4gIGNsaWVudFksXG4gIGVsbSxcbiAgYWxsb3dlZEVkZ2VzLFxuICBjdXJzb3JQcmVjaXNpb25cbn06IHtcbiAgY2xpZW50WDogbnVtYmVyO1xuICBjbGllbnRZOiBudW1iZXI7XG4gIGVsbTogRWxlbWVudFJlZjtcbiAgYWxsb3dlZEVkZ2VzOiBFZGdlcztcbiAgY3Vyc29yUHJlY2lzaW9uOiBudW1iZXI7XG59KTogRWRnZXMge1xuICBjb25zdCBlbG1Qb3NpdGlvbjogQ2xpZW50UmVjdCA9IGVsbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBlZGdlczogRWRnZXMgPSB7fTtcblxuICBpZiAoXG4gICAgYWxsb3dlZEVkZ2VzLmxlZnQgJiZcbiAgICBpc051bWJlckNsb3NlVG8oY2xpZW50WCwgZWxtUG9zaXRpb24ubGVmdCwgY3Vyc29yUHJlY2lzaW9uKSAmJlxuICAgIGlzV2l0aGluQm91bmRpbmdZKHsgY2xpZW50WSwgcmVjdDogZWxtUG9zaXRpb24gfSlcbiAgKSB7XG4gICAgZWRnZXMubGVmdCA9IHRydWU7XG4gIH1cblxuICBpZiAoXG4gICAgYWxsb3dlZEVkZ2VzLnJpZ2h0ICYmXG4gICAgaXNOdW1iZXJDbG9zZVRvKGNsaWVudFgsIGVsbVBvc2l0aW9uLnJpZ2h0LCBjdXJzb3JQcmVjaXNpb24pICYmXG4gICAgaXNXaXRoaW5Cb3VuZGluZ1koeyBjbGllbnRZLCByZWN0OiBlbG1Qb3NpdGlvbiB9KVxuICApIHtcbiAgICBlZGdlcy5yaWdodCA9IHRydWU7XG4gIH1cblxuICBpZiAoXG4gICAgYWxsb3dlZEVkZ2VzLnRvcCAmJlxuICAgIGlzTnVtYmVyQ2xvc2VUbyhjbGllbnRZLCBlbG1Qb3NpdGlvbi50b3AsIGN1cnNvclByZWNpc2lvbikgJiZcbiAgICBpc1dpdGhpbkJvdW5kaW5nWCh7IGNsaWVudFgsIHJlY3Q6IGVsbVBvc2l0aW9uIH0pXG4gICkge1xuICAgIGVkZ2VzLnRvcCA9IHRydWU7XG4gIH1cblxuICBpZiAoXG4gICAgYWxsb3dlZEVkZ2VzLmJvdHRvbSAmJlxuICAgIGlzTnVtYmVyQ2xvc2VUbyhjbGllbnRZLCBlbG1Qb3NpdGlvbi5ib3R0b20sIGN1cnNvclByZWNpc2lvbikgJiZcbiAgICBpc1dpdGhpbkJvdW5kaW5nWCh7IGNsaWVudFgsIHJlY3Q6IGVsbVBvc2l0aW9uIH0pXG4gICkge1xuICAgIGVkZ2VzLmJvdHRvbSA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gZWRnZXM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzaXplQ3Vyc29ycyB7XG4gIHRvcExlZnQ6IHN0cmluZztcbiAgdG9wUmlnaHQ6IHN0cmluZztcbiAgYm90dG9tTGVmdDogc3RyaW5nO1xuICBib3R0b21SaWdodDogc3RyaW5nO1xuICBsZWZ0T3JSaWdodDogc3RyaW5nO1xuICB0b3BPckJvdHRvbTogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX1JFU0laRV9DVVJTT1JTOiBSZXNpemVDdXJzb3JzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIHRvcExlZnQ6ICdudy1yZXNpemUnLFxuICB0b3BSaWdodDogJ25lLXJlc2l6ZScsXG4gIGJvdHRvbUxlZnQ6ICdzdy1yZXNpemUnLFxuICBib3R0b21SaWdodDogJ3NlLXJlc2l6ZScsXG4gIGxlZnRPclJpZ2h0OiAnY29sLXJlc2l6ZScsXG4gIHRvcE9yQm90dG9tOiAncm93LXJlc2l6ZSdcbn0pO1xuXG5mdW5jdGlvbiBnZXRSZXNpemVDdXJzb3IoZWRnZXM6IEVkZ2VzLCBjdXJzb3JzOiBSZXNpemVDdXJzb3JzKTogc3RyaW5nIHtcbiAgaWYgKGVkZ2VzLmxlZnQgJiYgZWRnZXMudG9wKSB7XG4gICAgcmV0dXJuIGN1cnNvcnMudG9wTGVmdDtcbiAgfSBlbHNlIGlmIChlZGdlcy5yaWdodCAmJiBlZGdlcy50b3ApIHtcbiAgICByZXR1cm4gY3Vyc29ycy50b3BSaWdodDtcbiAgfSBlbHNlIGlmIChlZGdlcy5sZWZ0ICYmIGVkZ2VzLmJvdHRvbSkge1xuICAgIHJldHVybiBjdXJzb3JzLmJvdHRvbUxlZnQ7XG4gIH0gZWxzZSBpZiAoZWRnZXMucmlnaHQgJiYgZWRnZXMuYm90dG9tKSB7XG4gICAgcmV0dXJuIGN1cnNvcnMuYm90dG9tUmlnaHQ7XG4gIH0gZWxzZSBpZiAoZWRnZXMubGVmdCB8fCBlZGdlcy5yaWdodCkge1xuICAgIHJldHVybiBjdXJzb3JzLmxlZnRPclJpZ2h0O1xuICB9IGVsc2UgaWYgKGVkZ2VzLnRvcCB8fCBlZGdlcy5ib3R0b20pIHtcbiAgICByZXR1cm4gY3Vyc29ycy50b3BPckJvdHRvbTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RWRnZXNEaWZmKHtcbiAgZWRnZXMsXG4gIGluaXRpYWxSZWN0YW5nbGUsXG4gIG5ld1JlY3RhbmdsZVxufToge1xuICBlZGdlczogRWRnZXM7XG4gIGluaXRpYWxSZWN0YW5nbGU6IEJvdW5kaW5nUmVjdGFuZ2xlO1xuICBuZXdSZWN0YW5nbGU6IEJvdW5kaW5nUmVjdGFuZ2xlO1xufSk6IEVkZ2VzIHtcbiAgY29uc3QgZWRnZXNEaWZmOiBFZGdlcyA9IHt9O1xuICBPYmplY3Qua2V5cyhlZGdlcykuZm9yRWFjaChlZGdlID0+IHtcbiAgICBlZGdlc0RpZmZbZWRnZV0gPSAobmV3UmVjdGFuZ2xlW2VkZ2VdIHx8IDApIC0gKGluaXRpYWxSZWN0YW5nbGVbZWRnZV0gfHwgMCk7XG4gIH0pO1xuICByZXR1cm4gZWRnZXNEaWZmO1xufVxuXG5jb25zdCBSRVNJWkVfQUNUSVZFX0NMQVNTOiBzdHJpbmcgPSAncmVzaXplLWFjdGl2ZSc7XG5jb25zdCBSRVNJWkVfTEVGVF9IT1ZFUl9DTEFTUzogc3RyaW5nID0gJ3Jlc2l6ZS1sZWZ0LWhvdmVyJztcbmNvbnN0IFJFU0laRV9SSUdIVF9IT1ZFUl9DTEFTUzogc3RyaW5nID0gJ3Jlc2l6ZS1yaWdodC1ob3Zlcic7XG5jb25zdCBSRVNJWkVfVE9QX0hPVkVSX0NMQVNTOiBzdHJpbmcgPSAncmVzaXplLXRvcC1ob3Zlcic7XG5jb25zdCBSRVNJWkVfQk9UVE9NX0hPVkVSX0NMQVNTOiBzdHJpbmcgPSAncmVzaXplLWJvdHRvbS1ob3Zlcic7XG5jb25zdCBSRVNJWkVfR0hPU1RfRUxFTUVOVF9DTEFTUzogc3RyaW5nID0gJ3Jlc2l6ZS1naG9zdC1lbGVtZW50JztcblxuZXhwb3J0IGNvbnN0IE1PVVNFX01PVkVfVEhST1RUTEVfTVM6IG51bWJlciA9IDUwO1xuXG4vKipcbiAqIFBsYWNlIHRoaXMgb24gYW4gZWxlbWVudCB0byBtYWtlIGl0IHJlc2l6YWJsZS4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdlxuICogICBtd2xSZXNpemFibGVcbiAqICAgW3Jlc2l6ZUVkZ2VzXT1cIntib3R0b206IHRydWUsIHJpZ2h0OiB0cnVlLCB0b3A6IHRydWUsIGxlZnQ6IHRydWV9XCJcbiAqICAgW2VuYWJsZUdob3N0UmVzaXplXT1cInRydWVcIj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xSZXNpemFibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgZWFjaCByZXNpemUgZXZlbnQuIFJldHVybiBgdHJ1ZWAgdG8gYWxsb3cgdGhlIHJlc2l6ZSBldmVudCB0byBwcm9wYWdhdGUgb3IgYGZhbHNlYCB0byBjYW5jZWwgaXRcbiAgICovXG4gIEBJbnB1dCgpIHZhbGlkYXRlUmVzaXplOiAocmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgZWRnZXMgdGhhdCBhbiBlbGVtZW50IGNhbiBiZSByZXNpemVkIGZyb20uIFBhc3MgYW4gb2JqZWN0IGxpa2UgYHt0b3A6IHRydWUsIGJvdHRvbTogZmFsc2V9YC4gQnkgZGVmYXVsdCBubyBlZGdlcyBjYW4gYmUgcmVzaXplZC5cbiAgICogQGRlcHJlY2F0ZWQgdXNlIGEgcmVzaXplIGhhbmRsZSBpbnN0ZWFkIHRoYXQgcG9zaXRpb25zIGl0c2VsZiB0byB0aGUgc2lkZSBvZiB0aGUgZWxlbWVudCB5b3Ugd291bGQgbGlrZSB0byByZXNpemVcbiAgICovXG4gIEBJbnB1dCgpIHJlc2l6ZUVkZ2VzOiBFZGdlcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBTZXQgdG8gYHRydWVgIHRvIGVuYWJsZSBhIHRlbXBvcmFyeSByZXNpemluZyBlZmZlY3Qgb2YgdGhlIGVsZW1lbnQgaW4gYmV0d2VlbiB0aGUgYHJlc2l6ZVN0YXJ0YCBhbmQgYHJlc2l6ZUVuZGAgZXZlbnRzLlxuICAgKi9cbiAgQElucHV0KCkgZW5hYmxlR2hvc3RSZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBzbmFwIGdyaWQgdGhhdCByZXNpemUgZXZlbnRzIHdpbGwgYmUgbG9ja2VkIHRvLlxuICAgKlxuICAgKiBlLmcuIHRvIG9ubHkgYWxsb3cgdGhlIGVsZW1lbnQgdG8gYmUgcmVzaXplZCBldmVyeSAxMHB4IHNldCBpdCB0byBge2xlZnQ6IDEwLCByaWdodDogMTB9YFxuICAgKi9cbiAgQElucHV0KCkgcmVzaXplU25hcEdyaWQ6IEVkZ2VzID0ge307XG5cbiAgLyoqXG4gICAqIFRoZSBtb3VzZSBjdXJzb3JzIHRoYXQgd2lsbCBiZSBzZXQgb24gdGhlIHJlc2l6ZSBlZGdlc1xuICAgKi9cbiAgQElucHV0KCkgcmVzaXplQ3Vyc29yczogUmVzaXplQ3Vyc29ycyA9IERFRkFVTFRfUkVTSVpFX0NVUlNPUlM7XG5cbiAgLyoqXG4gICAqIE1vdXNlIG92ZXIgdGhpY2tuZXNzIHRvIGFjdGl2ZSBjdXJzb3IuXG4gICAqIEBkZXByZWNhdGVkIGludmFsaWQgd2hlbiB5b3UgbWlncmF0ZSB0byB1c2UgcmVzaXplIGhhbmRsZXMgaW5zdGVhZCBvZiBzZXR0aW5nIHJlc2l6ZUVkZ2VzIG9uIHRoZSBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSByZXNpemVDdXJzb3JQcmVjaXNpb246IG51bWJlciA9IDM7XG5cbiAgLyoqXG4gICAqIERlZmluZSB0aGUgcG9zaXRpb25pbmcgb2YgdGhlIGdob3N0IGVsZW1lbnQgKGNhbiBiZSBmaXhlZCBvciBhYnNvbHV0ZSlcbiAgICovXG4gIEBJbnB1dCgpIGdob3N0RWxlbWVudFBvc2l0aW9uaW5nOiAnZml4ZWQnIHwgJ2Fic29sdXRlJyA9ICdmaXhlZCc7XG5cbiAgLyoqXG4gICAqIEFsbG93IGVsZW1lbnRzIHRvIGJlIHJlc2l6ZWQgdG8gbmVnYXRpdmUgZGltZW5zaW9uc1xuICAgKi9cbiAgQElucHV0KCkgYWxsb3dOZWdhdGl2ZVJlc2l6ZXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIG1vdXNlIG1vdmUgdGhyb3R0bGUgaW4gbWlsbGlzZWNvbmRzLCBkZWZhdWx0OiA1MCBtc1xuICAgKi9cbiAgQElucHV0KCkgbW91c2VNb3ZlVGhyb3R0bGVNUzogbnVtYmVyID0gTU9VU0VfTU9WRV9USFJPVFRMRV9NUztcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG1vdXNlIGlzIHByZXNzZWQgYW5kIGEgcmVzaXplIGV2ZW50IGlzIGFib3V0IHRvIGJlZ2luLiBgJGV2ZW50YCBpcyBhIGBSZXNpemVFdmVudGAgb2JqZWN0LlxuICAgKi9cbiAgQE91dHB1dCgpIHJlc2l6ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNpemVFdmVudD4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIGFzIHRoZSBtb3VzZSBpcyBkcmFnZ2VkIGFmdGVyIGEgcmVzaXplIGV2ZW50IGhhcyBiZWd1bi4gYCRldmVudGAgaXMgYSBgUmVzaXplRXZlbnRgIG9iamVjdC5cbiAgICovXG4gIEBPdXRwdXQoKSByZXNpemluZyA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzaXplRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCBhZnRlciB0aGUgbW91c2UgaXMgcmVsZWFzZWQgYWZ0ZXIgYSByZXNpemUgZXZlbnQuIGAkZXZlbnRgIGlzIGEgYFJlc2l6ZUV2ZW50YCBvYmplY3QuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVzaXplRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNpemVFdmVudD4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcHVibGljIG1vdXNldXAgPSBuZXcgU3ViamVjdDx7XG4gICAgY2xpZW50WDogbnVtYmVyO1xuICAgIGNsaWVudFk6IG51bWJlcjtcbiAgICBlZGdlcz86IEVkZ2VzO1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwdWJsaWMgbW91c2Vkb3duID0gbmV3IFN1YmplY3Q8e1xuICAgIGNsaWVudFg6IG51bWJlcjtcbiAgICBjbGllbnRZOiBudW1iZXI7XG4gICAgZWRnZXM/OiBFZGdlcztcbiAgfT4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcHVibGljIG1vdXNlbW92ZSA9IG5ldyBTdWJqZWN0PHtcbiAgICBjbGllbnRYOiBudW1iZXI7XG4gICAgY2xpZW50WTogbnVtYmVyO1xuICAgIGVkZ2VzPzogRWRnZXM7XG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50O1xuICB9PigpO1xuXG4gIHByaXZhdGUgcG9pbnRlckV2ZW50TGlzdGVuZXJzOiBQb2ludGVyRXZlbnRMaXN0ZW5lcnM7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSByZXNpemVFZGdlcyQgPSBuZXcgU3ViamVjdDxFZGdlcz4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHB1YmxpYyBlbG06IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5wb2ludGVyRXZlbnRMaXN0ZW5lcnMgPSBQb2ludGVyRXZlbnRMaXN0ZW5lcnMuZ2V0SW5zdGFuY2UoXG4gICAgICByZW5kZXJlcixcbiAgICAgIHpvbmVcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IG1vdXNlZG93biQ6IE9ic2VydmFibGU8e1xuICAgICAgY2xpZW50WDogbnVtYmVyO1xuICAgICAgY2xpZW50WTogbnVtYmVyO1xuICAgICAgZWRnZXM/OiBFZGdlcztcbiAgICB9PiA9IG1lcmdlKHRoaXMucG9pbnRlckV2ZW50TGlzdGVuZXJzLnBvaW50ZXJEb3duLCB0aGlzLm1vdXNlZG93bik7XG5cbiAgICBjb25zdCBtb3VzZW1vdmUkID0gbWVyZ2UoXG4gICAgICB0aGlzLnBvaW50ZXJFdmVudExpc3RlbmVycy5wb2ludGVyTW92ZSxcbiAgICAgIHRoaXMubW91c2Vtb3ZlXG4gICAgKS5waXBlKFxuICAgICAgdGFwKCh7IGV2ZW50IH0pID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRSZXNpemUpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgY29uc3QgbW91c2V1cCQgPSBtZXJnZSh0aGlzLnBvaW50ZXJFdmVudExpc3RlbmVycy5wb2ludGVyVXAsIHRoaXMubW91c2V1cCk7XG5cbiAgICBsZXQgY3VycmVudFJlc2l6ZToge1xuICAgICAgZWRnZXM6IEVkZ2VzO1xuICAgICAgc3RhcnRpbmdSZWN0OiBCb3VuZGluZ1JlY3RhbmdsZTtcbiAgICAgIGN1cnJlbnRSZWN0OiBCb3VuZGluZ1JlY3RhbmdsZTtcbiAgICAgIGNsb25lZE5vZGU/OiBIVE1MRWxlbWVudDtcbiAgICB9IHwgbnVsbDtcblxuICAgIGNvbnN0IHJlbW92ZUdob3N0RWxlbWVudCA9ICgpID0+IHtcbiAgICAgIGlmIChjdXJyZW50UmVzaXplICYmIGN1cnJlbnRSZXNpemUuY2xvbmVkTm9kZSkge1xuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoXG4gICAgICAgICAgY3VycmVudFJlc2l6ZS5jbG9uZWROb2RlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbG0ubmF0aXZlRWxlbWVudCwgJ3Zpc2liaWxpdHknLCAnaW5oZXJpdCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRSZXNpemVDdXJzb3JzID0gKCk6IFJlc2l6ZUN1cnNvcnMgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uREVGQVVMVF9SRVNJWkVfQ1VSU09SUyxcbiAgICAgICAgLi4udGhpcy5yZXNpemVDdXJzb3JzXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2l6ZUVkZ2VzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLnJlc2l6ZUVkZ2VzKSxcbiAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5yZXNpemVFZGdlcyAmJlxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5yZXNpemVFZGdlcykuc29tZShlZGdlID0+ICEhdGhpcy5yZXNpemVFZGdlc1tlZGdlXSlcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgc3dpdGNoTWFwKGxlZ2FjeVJlc2l6ZUVkZ2VzRW5hYmxlZCA9PlxuICAgICAgICAgIGxlZ2FjeVJlc2l6ZUVkZ2VzRW5hYmxlZCA/IG1vdXNlbW92ZSQgOiBFTVBUWVxuICAgICAgICApLFxuICAgICAgICBhdWRpdFRpbWUodGhpcy5tb3VzZU1vdmVUaHJvdHRsZU1TKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh7IGNsaWVudFgsIGNsaWVudFkgfSkgPT4ge1xuICAgICAgICBjb25zdCByZXNpemVFZGdlczogRWRnZXMgPSBnZXRSZXNpemVFZGdlcyh7XG4gICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICBjbGllbnRZLFxuICAgICAgICAgIGVsbTogdGhpcy5lbG0sXG4gICAgICAgICAgYWxsb3dlZEVkZ2VzOiB0aGlzLnJlc2l6ZUVkZ2VzLFxuICAgICAgICAgIGN1cnNvclByZWNpc2lvbjogdGhpcy5yZXNpemVDdXJzb3JQcmVjaXNpb25cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc2l6ZUN1cnNvcnMgPSBnZXRSZXNpemVDdXJzb3JzKCk7XG4gICAgICAgIGlmICghY3VycmVudFJlc2l6ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGdldFJlc2l6ZUN1cnNvcihyZXNpemVFZGdlcywgcmVzaXplQ3Vyc29ycyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsbS5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgY3Vyc29yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEVsZW1lbnRDbGFzcyhcbiAgICAgICAgICB0aGlzLmVsbSxcbiAgICAgICAgICBSRVNJWkVfTEVGVF9IT1ZFUl9DTEFTUyxcbiAgICAgICAgICByZXNpemVFZGdlcy5sZWZ0ID09PSB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0RWxlbWVudENsYXNzKFxuICAgICAgICAgIHRoaXMuZWxtLFxuICAgICAgICAgIFJFU0laRV9SSUdIVF9IT1ZFUl9DTEFTUyxcbiAgICAgICAgICByZXNpemVFZGdlcy5yaWdodCA9PT0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNldEVsZW1lbnRDbGFzcyhcbiAgICAgICAgICB0aGlzLmVsbSxcbiAgICAgICAgICBSRVNJWkVfVE9QX0hPVkVSX0NMQVNTLFxuICAgICAgICAgIHJlc2l6ZUVkZ2VzLnRvcCA9PT0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNldEVsZW1lbnRDbGFzcyhcbiAgICAgICAgICB0aGlzLmVsbSxcbiAgICAgICAgICBSRVNJWkVfQk9UVE9NX0hPVkVSX0NMQVNTLFxuICAgICAgICAgIHJlc2l6ZUVkZ2VzLmJvdHRvbSA9PT0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtb3VzZWRyYWc6IE9ic2VydmFibGU8YW55PiA9IG1vdXNlZG93biRcbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcChzdGFydENvb3JkcyA9PiB7XG4gICAgICAgICAgZnVuY3Rpb24gZ2V0RGlmZihtb3ZlQ29vcmRzOiB7IGNsaWVudFg6IG51bWJlcjsgY2xpZW50WTogbnVtYmVyIH0pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNsaWVudFg6IG1vdmVDb29yZHMuY2xpZW50WCAtIHN0YXJ0Q29vcmRzLmNsaWVudFgsXG4gICAgICAgICAgICAgIGNsaWVudFk6IG1vdmVDb29yZHMuY2xpZW50WSAtIHN0YXJ0Q29vcmRzLmNsaWVudFlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZ2V0U25hcEdyaWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbmFwR3JpZDogQ29vcmRpbmF0ZSA9IHsgeDogMSwgeTogMSB9O1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFJlc2l6ZSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5yZXNpemVTbmFwR3JpZC5sZWZ0ICYmIGN1cnJlbnRSZXNpemUuZWRnZXMubGVmdCkge1xuICAgICAgICAgICAgICAgIHNuYXBHcmlkLnggPSArdGhpcy5yZXNpemVTbmFwR3JpZC5sZWZ0O1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplU25hcEdyaWQucmlnaHQgJiZcbiAgICAgICAgICAgICAgICBjdXJyZW50UmVzaXplLmVkZ2VzLnJpZ2h0XG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNuYXBHcmlkLnggPSArdGhpcy5yZXNpemVTbmFwR3JpZC5yaWdodDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZVNuYXBHcmlkLnRvcCAmJiBjdXJyZW50UmVzaXplLmVkZ2VzLnRvcCkge1xuICAgICAgICAgICAgICAgIHNuYXBHcmlkLnkgPSArdGhpcy5yZXNpemVTbmFwR3JpZC50b3A7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVTbmFwR3JpZC5ib3R0b20gJiZcbiAgICAgICAgICAgICAgICBjdXJyZW50UmVzaXplLmVkZ2VzLmJvdHRvbVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzbmFwR3JpZC55ID0gK3RoaXMucmVzaXplU25hcEdyaWQuYm90dG9tO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzbmFwR3JpZDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0R3JpZChcbiAgICAgICAgICAgIGNvb3JkczogeyBjbGllbnRYOiBudW1iZXI7IGNsaWVudFk6IG51bWJlciB9LFxuICAgICAgICAgICAgc25hcEdyaWQ6IENvb3JkaW5hdGVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHg6IE1hdGguY2VpbChjb29yZHMuY2xpZW50WCAvIHNuYXBHcmlkLngpLFxuICAgICAgICAgICAgICB5OiBNYXRoLmNlaWwoY29vcmRzLmNsaWVudFkgLyBzbmFwR3JpZC55KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKG1lcmdlKFxuICAgICAgICAgICAgbW91c2Vtb3ZlJC5waXBlKHRha2UoMSkpLnBpcGUobWFwKGNvb3JkcyA9PiBbLCBjb29yZHNdKSksXG4gICAgICAgICAgICBtb3VzZW1vdmUkLnBpcGUocGFpcndpc2UoKSlcbiAgICAgICAgICApIGFzIE9ic2VydmFibGU8XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHsgY2xpZW50WDogbnVtYmVyOyBjbGllbnRZOiBudW1iZXIgfSxcbiAgICAgICAgICAgICAgeyBjbGllbnRYOiBudW1iZXI7IGNsaWVudFk6IG51bWJlciB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgPilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKFtwcmV2aW91c0Nvb3JkcywgbmV3Q29vcmRzXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA/IGdldERpZmYocHJldmlvdXNDb29yZHMpIDogcHJldmlvdXNDb29yZHMsXG4gICAgICAgICAgICAgICAgICBnZXREaWZmKG5ld0Nvb3JkcylcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcigoW3ByZXZpb3VzQ29vcmRzLCBuZXdDb29yZHNdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2aW91c0Nvb3Jkcykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc25hcEdyaWQ6IENvb3JkaW5hdGUgPSBnZXRTbmFwR3JpZCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzR3JpZDogQ29vcmRpbmF0ZSA9IGdldEdyaWQoXG4gICAgICAgICAgICAgICAgICBwcmV2aW91c0Nvb3JkcyxcbiAgICAgICAgICAgICAgICAgIHNuYXBHcmlkXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdHcmlkOiBDb29yZGluYXRlID0gZ2V0R3JpZChuZXdDb29yZHMsIHNuYXBHcmlkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICBwcmV2aW91c0dyaWQueCAhPT0gbmV3R3JpZC54IHx8IHByZXZpb3VzR3JpZC55ICE9PSBuZXdHcmlkLnlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgoWywgbmV3Q29vcmRzXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNuYXBHcmlkOiBDb29yZGluYXRlID0gZ2V0U25hcEdyaWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgY2xpZW50WDpcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChuZXdDb29yZHMuY2xpZW50WCAvIHNuYXBHcmlkLngpICogc25hcEdyaWQueCxcbiAgICAgICAgICAgICAgICAgIGNsaWVudFk6XG4gICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQobmV3Q29vcmRzLmNsaWVudFkgLyBzbmFwR3JpZC55KSAqIHNuYXBHcmlkLnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKG1lcmdlKG1vdXNldXAkLCBtb3VzZWRvd24kKSkpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+ICEhY3VycmVudFJlc2l6ZSkpO1xuXG4gICAgbW91c2VkcmFnXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IGNsaWVudFgsIGNsaWVudFkgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBnZXROZXdCb3VuZGluZ1JlY3RhbmdsZShcbiAgICAgICAgICAgIGN1cnJlbnRSZXNpemUhLnN0YXJ0aW5nUmVjdCxcbiAgICAgICAgICAgIGN1cnJlbnRSZXNpemUhLmVkZ2VzLFxuICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigobmV3Qm91bmRpbmdSZWN0OiBCb3VuZGluZ1JlY3RhbmdsZSkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmFsbG93TmVnYXRpdmVSZXNpemVzIHx8XG4gICAgICAgICAgICAhIShcbiAgICAgICAgICAgICAgbmV3Qm91bmRpbmdSZWN0LmhlaWdodCAmJlxuICAgICAgICAgICAgICBuZXdCb3VuZGluZ1JlY3Qud2lkdGggJiZcbiAgICAgICAgICAgICAgbmV3Qm91bmRpbmdSZWN0LmhlaWdodCA+IDAgJiZcbiAgICAgICAgICAgICAgbmV3Qm91bmRpbmdSZWN0LndpZHRoID4gMFxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChuZXdCb3VuZGluZ1JlY3Q6IEJvdW5kaW5nUmVjdGFuZ2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVSZXNpemVcbiAgICAgICAgICAgID8gdGhpcy52YWxpZGF0ZVJlc2l6ZSh7XG4gICAgICAgICAgICAgICAgcmVjdGFuZ2xlOiBuZXdCb3VuZGluZ1JlY3QsXG4gICAgICAgICAgICAgICAgZWRnZXM6IGdldEVkZ2VzRGlmZih7XG4gICAgICAgICAgICAgICAgICBlZGdlczogY3VycmVudFJlc2l6ZSEuZWRnZXMsXG4gICAgICAgICAgICAgICAgICBpbml0aWFsUmVjdGFuZ2xlOiBjdXJyZW50UmVzaXplIS5zdGFydGluZ1JlY3QsXG4gICAgICAgICAgICAgICAgICBuZXdSZWN0YW5nbGU6IG5ld0JvdW5kaW5nUmVjdFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKG5ld0JvdW5kaW5nUmVjdDogQm91bmRpbmdSZWN0YW5nbGUpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRSZXNpemUgJiYgY3VycmVudFJlc2l6ZS5jbG9uZWROb2RlKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIGN1cnJlbnRSZXNpemUuY2xvbmVkTm9kZSxcbiAgICAgICAgICAgICdoZWlnaHQnLFxuICAgICAgICAgICAgYCR7bmV3Qm91bmRpbmdSZWN0LmhlaWdodH1weGBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICBjdXJyZW50UmVzaXplLmNsb25lZE5vZGUsXG4gICAgICAgICAgICAnd2lkdGgnLFxuICAgICAgICAgICAgYCR7bmV3Qm91bmRpbmdSZWN0LndpZHRofXB4YFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIGN1cnJlbnRSZXNpemUuY2xvbmVkTm9kZSxcbiAgICAgICAgICAgICd0b3AnLFxuICAgICAgICAgICAgYCR7bmV3Qm91bmRpbmdSZWN0LnRvcH1weGBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICBjdXJyZW50UmVzaXplLmNsb25lZE5vZGUsXG4gICAgICAgICAgICAnbGVmdCcsXG4gICAgICAgICAgICBgJHtuZXdCb3VuZGluZ1JlY3QubGVmdH1weGBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzaXppbmcub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzaXppbmcuZW1pdCh7XG4gICAgICAgICAgICAgIGVkZ2VzOiBnZXRFZGdlc0RpZmYoe1xuICAgICAgICAgICAgICAgIGVkZ2VzOiBjdXJyZW50UmVzaXplIS5lZGdlcyxcbiAgICAgICAgICAgICAgICBpbml0aWFsUmVjdGFuZ2xlOiBjdXJyZW50UmVzaXplIS5zdGFydGluZ1JlY3QsXG4gICAgICAgICAgICAgICAgbmV3UmVjdGFuZ2xlOiBuZXdCb3VuZGluZ1JlY3RcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHJlY3RhbmdsZTogbmV3Qm91bmRpbmdSZWN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UmVzaXplIS5jdXJyZW50UmVjdCA9IG5ld0JvdW5kaW5nUmVjdDtcbiAgICAgIH0pO1xuXG4gICAgbW91c2Vkb3duJFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoeyBjbGllbnRYLCBjbGllbnRZLCBlZGdlcyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGVkZ2VzIHx8XG4gICAgICAgICAgICBnZXRSZXNpemVFZGdlcyh7XG4gICAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICAgIGNsaWVudFksXG4gICAgICAgICAgICAgIGVsbTogdGhpcy5lbG0sXG4gICAgICAgICAgICAgIGFsbG93ZWRFZGdlczogdGhpcy5yZXNpemVFZGdlcyxcbiAgICAgICAgICAgICAgY3Vyc29yUHJlY2lzaW9uOiB0aGlzLnJlc2l6ZUN1cnNvclByZWNpc2lvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoZWRnZXM6IEVkZ2VzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGVkZ2VzKS5sZW5ndGggPiAwO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChlZGdlczogRWRnZXMpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRSZXNpemUpIHtcbiAgICAgICAgICByZW1vdmVHaG9zdEVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGFydGluZ1JlY3Q6IEJvdW5kaW5nUmVjdGFuZ2xlID0gZ2V0RWxlbWVudFJlY3QoXG4gICAgICAgICAgdGhpcy5lbG0sXG4gICAgICAgICAgdGhpcy5naG9zdEVsZW1lbnRQb3NpdGlvbmluZ1xuICAgICAgICApO1xuICAgICAgICBjdXJyZW50UmVzaXplID0ge1xuICAgICAgICAgIGVkZ2VzLFxuICAgICAgICAgIHN0YXJ0aW5nUmVjdCxcbiAgICAgICAgICBjdXJyZW50UmVjdDogc3RhcnRpbmdSZWN0XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc2l6ZUN1cnNvcnMgPSBnZXRSZXNpemVDdXJzb3JzKCk7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGdldFJlc2l6ZUN1cnNvcihjdXJyZW50UmVzaXplLmVkZ2VzLCByZXNpemVDdXJzb3JzKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnY3Vyc29yJywgY3Vyc29yKTtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50Q2xhc3ModGhpcy5lbG0sIFJFU0laRV9BQ1RJVkVfQ0xBU1MsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5lbmFibGVHaG9zdFJlc2l6ZSkge1xuICAgICAgICAgIGN1cnJlbnRSZXNpemUuY2xvbmVkTm9kZSA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGN1cnJlbnRSZXNpemUuY2xvbmVkTm9kZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAndmlzaWJpbGl0eScsXG4gICAgICAgICAgICAnaGlkZGVuJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIGN1cnJlbnRSZXNpemUuY2xvbmVkTm9kZSxcbiAgICAgICAgICAgICdwb3NpdGlvbicsXG4gICAgICAgICAgICB0aGlzLmdob3N0RWxlbWVudFBvc2l0aW9uaW5nXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgY3VycmVudFJlc2l6ZS5jbG9uZWROb2RlLFxuICAgICAgICAgICAgJ2xlZnQnLFxuICAgICAgICAgICAgYCR7Y3VycmVudFJlc2l6ZS5zdGFydGluZ1JlY3QubGVmdH1weGBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICBjdXJyZW50UmVzaXplLmNsb25lZE5vZGUsXG4gICAgICAgICAgICAndG9wJyxcbiAgICAgICAgICAgIGAke2N1cnJlbnRSZXNpemUuc3RhcnRpbmdSZWN0LnRvcH1weGBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICBjdXJyZW50UmVzaXplLmNsb25lZE5vZGUsXG4gICAgICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgICAgIGAke2N1cnJlbnRSZXNpemUuc3RhcnRpbmdSZWN0LmhlaWdodH1weGBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICBjdXJyZW50UmVzaXplLmNsb25lZE5vZGUsXG4gICAgICAgICAgICAnd2lkdGgnLFxuICAgICAgICAgICAgYCR7Y3VycmVudFJlc2l6ZS5zdGFydGluZ1JlY3Qud2lkdGh9cHhgXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgY3VycmVudFJlc2l6ZS5jbG9uZWROb2RlLFxuICAgICAgICAgICAgJ2N1cnNvcicsXG4gICAgICAgICAgICBnZXRSZXNpemVDdXJzb3IoY3VycmVudFJlc2l6ZS5lZGdlcywgcmVzaXplQ3Vyc29ycylcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoXG4gICAgICAgICAgICBjdXJyZW50UmVzaXplLmNsb25lZE5vZGUsXG4gICAgICAgICAgICBSRVNJWkVfR0hPU1RfRUxFTUVOVF9DTEFTU1xuICAgICAgICAgICk7XG4gICAgICAgICAgY3VycmVudFJlc2l6ZS5jbG9uZWROb2RlIS5zY3JvbGxUb3AgPSBjdXJyZW50UmVzaXplLnN0YXJ0aW5nUmVjdFxuICAgICAgICAgICAgLnNjcm9sbFRvcCBhcyBudW1iZXI7XG4gICAgICAgICAgY3VycmVudFJlc2l6ZS5jbG9uZWROb2RlIS5zY3JvbGxMZWZ0ID0gY3VycmVudFJlc2l6ZS5zdGFydGluZ1JlY3RcbiAgICAgICAgICAgIC5zY3JvbGxMZWZ0IGFzIG51bWJlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZXNpemVTdGFydC5vYnNlcnZlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVTdGFydC5lbWl0KHtcbiAgICAgICAgICAgICAgZWRnZXM6IGdldEVkZ2VzRGlmZih7XG4gICAgICAgICAgICAgICAgZWRnZXMsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFJlY3RhbmdsZTogc3RhcnRpbmdSZWN0LFxuICAgICAgICAgICAgICAgIG5ld1JlY3RhbmdsZTogc3RhcnRpbmdSZWN0XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICByZWN0YW5nbGU6IGdldE5ld0JvdW5kaW5nUmVjdGFuZ2xlKHN0YXJ0aW5nUmVjdCwge30sIDAsIDApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBtb3VzZXVwJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChjdXJyZW50UmVzaXplKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbG0ubmF0aXZlRWxlbWVudCwgUkVTSVpFX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICcnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsbS5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJycpO1xuICAgICAgICBpZiAodGhpcy5yZXNpemVFbmQub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplRW5kLmVtaXQoe1xuICAgICAgICAgICAgICBlZGdlczogZ2V0RWRnZXNEaWZmKHtcbiAgICAgICAgICAgICAgICBlZGdlczogY3VycmVudFJlc2l6ZSEuZWRnZXMsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFJlY3RhbmdsZTogY3VycmVudFJlc2l6ZSEuc3RhcnRpbmdSZWN0LFxuICAgICAgICAgICAgICAgIG5ld1JlY3RhbmdsZTogY3VycmVudFJlc2l6ZSEuY3VycmVudFJlY3RcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHJlY3RhbmdsZTogY3VycmVudFJlc2l6ZSEuY3VycmVudFJlY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZUdob3N0RWxlbWVudCgpO1xuICAgICAgICBjdXJyZW50UmVzaXplID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMucmVzaXplRWRnZXMpIHtcbiAgICAgIHRoaXMucmVzaXplRWRnZXMkLm5leHQodGhpcy5yZXNpemVFZGdlcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIC8vIGJyb3dzZXIgY2hlY2sgZm9yIGFuZ3VsYXIgdW5pdmVyc2FsLCBiZWNhdXNlIGl0IGRvZXNuJ3Qga25vdyB3aGF0IGRvY3VtZW50IGlzXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5tb3VzZWRvd24uY29tcGxldGUoKTtcbiAgICB0aGlzLm1vdXNldXAuY29tcGxldGUoKTtcbiAgICB0aGlzLm1vdXNlbW92ZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMucmVzaXplRWRnZXMkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIHNldEVsZW1lbnRDbGFzcyhlbG06IEVsZW1lbnRSZWYsIG5hbWU6IHN0cmluZywgYWRkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGFkZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbG0ubmF0aXZlRWxlbWVudCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxtLm5hdGl2ZUVsZW1lbnQsIG5hbWUpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBQb2ludGVyRXZlbnRMaXN0ZW5lcnMge1xuICBwdWJsaWMgcG9pbnRlckRvd246IE9ic2VydmFibGU8UG9pbnRlckV2ZW50Q29vcmRpbmF0ZT47XG5cbiAgcHVibGljIHBvaW50ZXJNb3ZlOiBPYnNlcnZhYmxlPFBvaW50ZXJFdmVudENvb3JkaW5hdGU+O1xuXG4gIHB1YmxpYyBwb2ludGVyVXA6IE9ic2VydmFibGU8UG9pbnRlckV2ZW50Q29vcmRpbmF0ZT47XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFBvaW50ZXJFdmVudExpc3RlbmVyczsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICB6b25lOiBOZ1pvbmVcbiAgKTogUG9pbnRlckV2ZW50TGlzdGVuZXJzIHtcbiAgICBpZiAoIVBvaW50ZXJFdmVudExpc3RlbmVycy5pbnN0YW5jZSkge1xuICAgICAgUG9pbnRlckV2ZW50TGlzdGVuZXJzLmluc3RhbmNlID0gbmV3IFBvaW50ZXJFdmVudExpc3RlbmVycyhcbiAgICAgICAgcmVuZGVyZXIsXG4gICAgICAgIHpvbmVcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBQb2ludGVyRXZlbnRMaXN0ZW5lcnMuaW5zdGFuY2U7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihyZW5kZXJlcjogUmVuZGVyZXIyLCB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLnBvaW50ZXJEb3duID0gbmV3IE9ic2VydmFibGUoXG4gICAgICAob2JzZXJ2ZXI6IE9ic2VydmVyPFBvaW50ZXJFdmVudENvb3JkaW5hdGU+KSA9PiB7XG4gICAgICAgIGxldCB1bnN1YnNjcmliZU1vdXNlRG93bjogKCkgPT4gdm9pZDtcbiAgICAgICAgbGV0IHVuc3Vic2NyaWJlVG91Y2hTdGFydDogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIHVuc3Vic2NyaWJlTW91c2VEb3duID0gcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAgICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoe1xuICAgICAgICAgICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKElTX1RPVUNIX0RFVklDRSkge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmVUb3VjaFN0YXJ0ID0gcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICAgIChldmVudDogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoe1xuICAgICAgICAgICAgICAgICAgY2xpZW50WDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgY2xpZW50WTogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgdW5zdWJzY3JpYmVNb3VzZURvd24oKTtcbiAgICAgICAgICBpZiAoSVNfVE9VQ0hfREVWSUNFKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZVRvdWNoU3RhcnQhKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICkucGlwZShzaGFyZSgpKTtcblxuICAgIHRoaXMucG9pbnRlck1vdmUgPSBuZXcgT2JzZXJ2YWJsZShcbiAgICAgIChvYnNlcnZlcjogT2JzZXJ2ZXI8UG9pbnRlckV2ZW50Q29vcmRpbmF0ZT4pID0+IHtcbiAgICAgICAgbGV0IHVuc3Vic2NyaWJlTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xuICAgICAgICBsZXQgdW5zdWJzY3JpYmVUb3VjaE1vdmU6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcblxuICAgICAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICB1bnN1YnNjcmliZU1vdXNlTW92ZSA9IHJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHtcbiAgICAgICAgICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChJU19UT1VDSF9ERVZJQ0UpIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlVG91Y2hNb3ZlID0gcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAndG91Y2htb3ZlJyxcbiAgICAgICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgICBjbGllbnRYOiBldmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICBjbGllbnRZOiBldmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFksXG4gICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICB1bnN1YnNjcmliZU1vdXNlTW92ZSgpO1xuICAgICAgICAgIGlmIChJU19UT1VDSF9ERVZJQ0UpIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlVG91Y2hNb3ZlISgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICApLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLnBvaW50ZXJVcCA9IG5ldyBPYnNlcnZhYmxlKFxuICAgICAgKG9ic2VydmVyOiBPYnNlcnZlcjxQb2ludGVyRXZlbnRDb29yZGluYXRlPikgPT4ge1xuICAgICAgICBsZXQgdW5zdWJzY3JpYmVNb3VzZVVwOiAoKSA9PiB2b2lkO1xuICAgICAgICBsZXQgdW5zdWJzY3JpYmVUb3VjaEVuZDogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdW5zdWJzY3JpYmVUb3VjaENhbmNlbDogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIHVuc3Vic2NyaWJlTW91c2VVcCA9IHJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoSVNfVE9VQ0hfREVWSUNFKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZVRvdWNoRW5kID0gcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAndG91Y2hlbmQnLFxuICAgICAgICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHtcbiAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICBjbGllbnRZOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdW5zdWJzY3JpYmVUb3VjaENhbmNlbCA9IHJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAgICAgJ3RvdWNoY2FuY2VsJyxcbiAgICAgICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgICBjbGllbnRYOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgY2xpZW50WTogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgIHVuc3Vic2NyaWJlTW91c2VVcCgpO1xuICAgICAgICAgIGlmIChJU19UT1VDSF9ERVZJQ0UpIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlVG91Y2hFbmQhKCk7XG4gICAgICAgICAgICB1bnN1YnNjcmliZVRvdWNoQ2FuY2VsISgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICApLnBpcGUoc2hhcmUoKSk7XG4gIH1cbn1cbiJdfQ==