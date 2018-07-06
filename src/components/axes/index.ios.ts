declare var com;
//let cLegend = com.github.mikephil.charting.components.Legends;

declare const NSObject: any;

declare class YAxisLabelPosition extends NSObject {}
declare class XAxisLabelPosition extends NSObject {}

export enum YPosition {
	OUTSIDE_CHART = YAxisLabelPosition.outsideChart,
	INSIDE_CHART = YAxisLabelPosition.insideChart
}
export enum XPosition {
	TOP = XAxisLabelPosition.top,
	BOTTOM = XAxisLabelPosition.bottom,
	BOTH_SIDED = XAxisLabelPosition.bothSided,
	TOP_INSIDE = XAxisLabelPosition.topInside,
	BOTTOM_INSIDE = XAxisLabelPosition.bottomInside
}
/*export enum YSide{
    LEFT,
    RIGHT,
    BOTH
}*/
export interface Axis {
	enabled?: boolean;
	drawLabels?: boolean;
	drawAxisLine?: boolean;
	drawGridLines?: boolean;
	axisMaximum?: number;
	axisMinimum?: number;
	inverted?: boolean;
	showOnlyMinMax?: boolean;
	labelCount?: {
		count: number;
		force: boolean;
	};
	granularity?: number;
	granularityEnabled?: boolean;
	textColor?: string | number;
	textSize?: number;
	gridColor?: string | number;
	gridLineWidth?: number;
	axisLineWidth?: number;
	enableGridDashedLine?: {
		lineLength: number;
		spaceLength: number;
		phase: number;
	};
}

export interface IYAxis extends Axis {
	position?: YPosition;
	drawZeroLine?: boolean;
	zeroLineWidth?: number;
	zeroLineColor?: string | number;
	spaceTop?: number;
	spaceBottom?: number;
}
export interface RightYAxis extends IYAxis {}
export interface LeftYAxis extends IYAxis {}

export interface IXAxis extends Axis {
	position?: XPosition;
	labelRotationAngle?: number;
}
