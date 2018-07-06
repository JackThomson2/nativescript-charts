declare var com;
//let cLegend = com.github.mikephil.charting.components.Legends;

declare const NSObject: any;

declare class ChartLegendHorizontalAlignment extends NSObject {}
declare class ChartLegendVerticalAlignment extends NSObject {}
declare class ChartLegendForm extends NSObject {}

export enum LegendHorizontalAlignment {
	CENTER = ChartLegendHorizontalAlignment.center,
	LEFT = ChartLegendHorizontalAlignment.left,
	RIGHT = ChartLegendHorizontalAlignment.right
}
export enum LegendVerticalAlignment {
	TOP = ChartLegendVerticalAlignment.top,
	CENTER = ChartLegendVerticalAlignment.center,
	BOTTOM = ChartLegendVerticalAlignment.bottom
}

export enum LegendForm {
	SQUARE = ChartLegendForm.square,
	CIRCLE = ChartLegendForm.circle,
	LINE = ChartLegendForm.line
}

export interface ILegend {
	enabled?: boolean;
	textColor?: string | number;
	wordWrap?: boolean;
	maxSize?: number;
	form?: LegendForm;
}
